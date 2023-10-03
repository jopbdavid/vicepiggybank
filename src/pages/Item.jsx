import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/customFetch";

export const loader = async ({ params }) => {
  const id = params.id;
  console.log(id);

  const response = await customFetch(`/${id}`);
  console.log(response);
  const item = response.data.data;

  return item;
};

const Item = () => {
  return <div>Item</div>;
};

export default Item;
