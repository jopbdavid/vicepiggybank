import React from "react";
import ItemsContainer from "../components/ItemsContainer";
import ItemsForm from "../components/ItemsForm";

const Savings = () => {
  return (
    <div className="bg-emerald-200 py-24 h-screen flex  items-center flex-col ">
      <ItemsForm />
      <ItemsContainer />
    </div>
  );
};

export default Savings;
