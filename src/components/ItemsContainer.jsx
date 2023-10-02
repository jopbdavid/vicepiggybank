import React from "react";
import ItemsList from "./ItemsList";

const ItemsContainer = () => {
  const total = 1;
  return (
    <div>
      <div>
        {total > 0 ? (
          <ItemsList />
        ) : (
          <h5 className="text-2xl mt-16">No items are being tracked!</h5>
        )}
      </div>
    </div>
  );
};

export default ItemsContainer;
