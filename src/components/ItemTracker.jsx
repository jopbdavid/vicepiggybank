import React, { useState, useEffect } from "react";
import {
  useLoaderData,
  useActionData,
  Form,
  useNavigation,
} from "react-router-dom";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(data);
  const date = data.date.toString();

  const newEntry = {
    fields: {
      item: [data.id],
      units: parseInt(data.units),
      date: date,
    },
  };
  try {
    const response = await axios.post(`/.netlify/functions/addEntry`, newEntry);
    const line = response.data;
    console.log(line);
    return line;
  } catch (error) {
    console.error("Error making the axios request:", error);
    throw error;
  }
};

const getEntries = async () => {
  try {
    const response = await axios.get(`/.netlify/functions/entries`);

    const data = response.data.records;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error making the axios request:", error);
    throw error;
  }
};

const ItemTracker = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { id } = useLoaderData();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getEntries();
        setEntries(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(entries);

  return (
    <>
      <Form method="POST" className="flex flex-col gap-y-4">
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
      <div>
        <h1>Airtable Entries</h1>
        <table>
          <thead>
            <tr>
              <th>Item name</th>
              <th>Date</th>
              <th>Price Total</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const { id, fields } = entry;

              return (
                <tr key={id}>
                  <td>{fields.name}</td>
                  <td>{fields.date}</td>
                  <td>{fields.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemTracker;
