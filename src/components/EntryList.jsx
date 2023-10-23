import React, { useState } from "react";
import { formatPrice } from "../utils/extras";
import { useLoaderData } from "react-router";
import axios from "axios";
import Pagination from "./Pagination";

const deleteEntry = async (id) => {
  try {
    const response = await axios.delete(
      `/.netlify/functions/removeEntry?id=${id}`
    );

    return response;
  } catch (error) {
    return { error: "Error making request" };
  }
};

const EntryList = ({ entries, fetchData }) => {
  const { id, item } = useLoaderData();
  const [isListVisible, setListVisible] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteEntry(id);

      await fetchData();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="border-t-4 border-slate-600 my-16 mx-auto w-1/2 rounded-full"></div>

      <div className="px-4 py-12">
        <div className="collapse-title">
          <h1 className="text-3xl font-semibold mb-6 text-slate-800">
            {item} Entries
          </h1>
          <button
            onClick={() => setListVisible(!isListVisible)}
            className="btn btn-primary"
          >
            {isListVisible ? "Hide Entries" : "Show Entries"}
          </button>
        </div>
        {isListVisible && (
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
                    <tr
                      key={id}
                      className="hover:bg-slate-200 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center justify-evenly">
                        <span>{fields.name}</span>{" "}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleDelete(id)}
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
            <Pagination />
          </div>
        )}
      </div>
    </>
  );
};

export default EntryList;
