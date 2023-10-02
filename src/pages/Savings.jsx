import React from "react";
import ItemsContainer from "../components/ItemsContainer";
import ItemsForm from "../components/ItemsForm";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const url = "/savings";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch(url, { params });
  console.log(response);

  const items = response.data.data;
  const metaData = response.data.meta;

  return null;
};

const Savings = () => {
  return (
    <div className="bg-emerald-200 py-24 h-screen flex  items-center flex-col ">
      <ItemsForm />
      <ItemsContainer />
    </div>
  );
};

export default Savings;
