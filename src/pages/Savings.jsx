import React from "react";
import ItemsContainer from "../components/ItemsContainer";
import ItemsForm from "../components/ItemsForm";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const response = await customFetch();

  const items = response.data.records;

  return items;
};

const Savings = () => {
  return (
    <div className="bg-emerald-200 py-24 h-screen flex  items-center flex-col w-[100%]">
      <ItemsForm />
      <ItemsContainer />
    </div>
  );
};

export default Savings;
