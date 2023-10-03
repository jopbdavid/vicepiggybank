import React from "react";
import ItemsList from "./ItemsList";

const ItemsContainer = () => {
  const total = 1;
  return (
    <>
      <h4 className="font-medium text-md border-b border-slate-800 pb-2 pt-10 w-[66%] text-center">
        {total} {total > 1 ? "Products" : "Product"} found
      </h4>
      <div className="flex w-full justify-center items-center pb-5">
        {total > 0 ? (
          <ItemsList />
        ) : (
          <h5 className="text-2xl mt-16">No items are being tracked!</h5>
        )}
      </div>
    </>
  );
};

export default ItemsContainer;
