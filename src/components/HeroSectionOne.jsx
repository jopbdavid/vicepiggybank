import React from "react";
import animeAIpiggy from "../assets/animeAIpiggy.png";

const HeroSectionOne = () => {
  return (
    <div className="bg-emerald-200 py-24 h-screen">
      <div className="items-center gap-8 w-1/2">
        <article>
          <h1 className="text-7xl font-bold tracking-wider">
            Get Rich with your Vices
          </h1>
          <p className="mt-4 text-3xl text-slate-700 capitalize tracking-wide"></p>
          <p className="mt-2 text-lg text-slate-700 capitalize tracking-wide">
            Are you ready to turn your deepest addictions into your wildest
            adventures, dreams and hopes? Where i live we usually say, "grain by
            grain the hen fills her belly", get started today it's never too
            late.
          </p>
          <div className="flex gap-x-4 mt-4"></div>
        </article>
      </div>
    </div>
  );
};

export default HeroSectionOne;
