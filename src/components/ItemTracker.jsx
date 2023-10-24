import React, { useState, useEffect, useRef } from "react";
import {
  useLoaderData,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import axios from "axios";

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
    console.log(line);

    return line;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const ItemTracker = ({ fetchData }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { id } = useLoaderData();
  const formRef = useRef();

  const [isSuccess, setIsSuccess] = useState(false);
  const newEntry = useActionData();

  useEffect(() => {
    if (newEntry && newEntry.length > 0) {
      setIsSuccess(true);
      fetchData();
      formRef.current.reset();
    } else {
      fetchData();
    }
  }, [newEntry]);

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
      <div className="border-t-2 border-slate-600 mt-6 mb-1 mx-auto w-1/2 rounded-full"></div>
      <Form
        method="POST"
        className="flex flex-col gap-y-4 w-full p-4 bg-slate-50 rounded-lg shadow-lg"
        ref={formRef}
      >
        <h4 className="font-medium text-xl capitalize text-center">
          Add New Entry
        </h4>
        <div className="flex flex-row gap-y-2 gap-x-2 w-1/2 mx-auto">
          <div className="form-control">
            <input type="hidden" name="id" value={id} />
          </div>

          <div className="form-control w-1/4">
            <label htmlFor="units" className="label">
              <span className="label-text capitalize">Quantity:</span>
            </label>
            <input
              type="number"
              name="units"
              className={`input input-bordered sm`}
              required
            />
          </div>

          <div className="form-control w-2/3">
            <label htmlFor="date" className="label">
              <span className="label-text capitalize">Date:</span>
            </label>
            <input
              type="date"
              name="date"
              className={`input input-bordered sm`}
              required
            />
          </div>
        </div>

        <div className="mt-4 w-1/3 mx-auto">
          <button
            type="submit"
            className="btn btn-primary btn-block "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Add Entry" || "Submit"
            )}
          </button>
        </div>
      </Form>
      <div className="border-t-2 border-slate-600 my-1 mx-auto w-1/2 rounded-full"></div>
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-42">
          <div className="alert alert-success w-2/3 m-auto p-8 rounded-lg shadow-lg flex items-center justify-center">
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
            <span className="text-xl capitalize">
              Your entry was added successfully!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemTracker;
