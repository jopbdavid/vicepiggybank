import React, { useState } from "react";
import {
  useLoaderData,
  useActionData,
  Form,
  useNavigation,
  useParams,
} from "react-router-dom";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(data);
  const date = data.date.toString();
  const newDate = new Date(date);

  const newEntry = {
    item: data.item,
    units: parseInt(data.units),
    date: newDate.toLocaleDateString(),
  };
  console.log(newEntry);

  const response = await axios.post(`/.netlify/functions/addEntry`, {
    newEntry,
  });
  console.log(response);

  //   const item = response.data;

  //   return response;
};

const ItemTracker = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { item } = useLoaderData();

  //   const response = useActionData();
  //   console.log(response);

  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Add New Entry</h4>

      <div className="form-control">
        <input type="hidden" name="item" value={item} />
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
        <input type="date" name="date" className={`input input-bordered sm`} />
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
  );
};

export default ItemTracker;
