import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Stats = () => {
  return (
    <div className="bg-emerald-200 py-24 h-screen flex  items-center flex-col w-[100%]">
      <AiOutlineLoading3Quarters size={100} className="animate-spin" />
      <h1 className="text-5xl text-slate-700 capitalize font-bold tracking-wider mt-12">
        Under construction!
      </h1>
    </div>
  );
};

export default Stats;
