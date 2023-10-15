import React from "react";
import ItemsList from "./ItemsList";
import { useLoaderData } from "react-router";

const ItemsContainer = () => {
  const items = useLoaderData();

  return (
    <>
      <h4 className="font-medium text-md border-b border-slate-800 pb-2 pt-10 w-[66%] text-center">
        {items.length} {items.length > 1 ? "Products" : "Product"} found
      </h4>
      <div className="flex w-full justify-center items-center pb-5">
        {items.length > 0 ? (
          <ItemsList />
        ) : (
          <h5 className="text-2xl mt-16">No items are being tracked!</h5>
        )}
      </div>
    </>
  );
};

export default ItemsContainer;
