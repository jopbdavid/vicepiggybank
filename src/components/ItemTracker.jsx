import React, { useState, useEffect, useRef } from "react";
import { useLoaderData, Form, useNavigation } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../utils/extras";

export const action = async ({ request }) => {
  console.log(request);
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data.units);
    if ((!data.units && isNaN(data.units) && data.units < 0) || !data.date) {
      console.log("Invalid date or units");
      return;
    }

    const date = data.date.toString();

    const newEntry = {
      fields: {
        item: [data.id],
        units: parseInt(data.units),
        date: date,
      },
    };
    const response = await axios.post(`/.netlify/functions/addEntry`, newEntry);
    const line = response.data;

    return line;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const getEntries = async () => {
  try {
    const response = await axios.get(`/.netlify/functions/entries`);

    const data = response.data.records;

    return data;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const deleteEntry = async () => {
  try {
    const response = await axios.delete(`/.netlify/functions/removeEntry`);

    console.log(response);

    // return response;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const ItemTracker = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { id, item } = useLoaderData();
  const formRef = useRef();
  const [entries, setEntries] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const list = await getEntries();
      setEntries(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const formData = new FormData(e.target); // Access the form data using the event object
      console.log(formData);
      const response = await action({ request: formData });

      if (response && !response.error) {
        setIsSuccess(true);
        await fetchData();
        formRef.current.reset();
      } else {
        console.error("Error in action:", response.error);
      }
    } catch (error) {
      console.error("Error in action:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="border-t-4 border-slate-600 my-16 mx-auto w-1/2 rounded-full"></div>
      <Form
        method="POST"
        className="flex flex-col gap-y-4"
        ref={formRef}
        on
        onSubmit={handleSubmit}
      >
        <h4 className="font-medium text-xl capitalize">Add New Entry</h4>

        <div className="form-control">
          <input type="hidden" name="id" value={id} />
        </div>

        <div className="form-control">
          <label htmlFor="units" className="label">
            <span className="label-text capitalize">Quantity Consumed:</span>
          </label>
          <input
            type="number"
            name="units"
            className={`input input-bordered sm`}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date" className="label">
            <span className="label-text capitalize">Date of Consumption:</span>
          </label>
          <input
            type="date"
            name="date"
            className={`input input-bordered sm`}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                sending...
              </>
            ) : (
              "Add Entry" || "submit"
            )}
          </button>
        </div>
      </Form>
      {isSuccess && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your entry was added successfully!</span>
        </div>
      )}
      <div className="border-t-4 border-slate-600 my-16 mx-auto w-1/2 rounded-full"></div>
      <div className="px-4 py-12 ">
        <h1 className="text-3xl font-semibold mb-6 text-slate-800">
          {item} Entries
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table bg-slate-50 rounded-lg shadow-lg ">
            <thead>
              <tr className="bg-emerald-100 text-slate-800 text-[1rem] ">
                <th className="px-6 py-3">Item name</th>
                <th className="px-6 py-3">Units</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Price Total</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const { id, fields } = entry;

                return (
                  <tr key={id} className="hover:bg-slate-200 transition-colors">
                    <td className="px-6 py-4 flex items-center justify-evenly">
                      <span>{fields.name}</span>{" "}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => deleteEntry(id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4">{fields.units}</td>
                    <td className="px-6 py-4">{fields.date}</td>
                    <td className="px-6 py-4">{formatPrice(fields.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ItemTracker;
