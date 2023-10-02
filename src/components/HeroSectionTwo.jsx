import React from "react";
import animeAIpiggy from "../assets/animeAIpiggy.png";

const HeroSectionTwo = () => {
  return (
    <div className="bg-emerald-200 py-24  h-screen">
      <div className="items-center gap-8 w-1/2">
        <article className="hidden md:block"></article>
        <article>
          <h1 className="text-7xl font-bold tracking-wider">Instructions</h1>
          <p className="mt-4 text-3xl text-slate-700 capitalize tracking-wide"></p>
          <p className="mt-2 text-lg text-slate-700 capitalize tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
            rerum magnam laborum voluptates ratione. Modi facilis nulla dolores
            totam? Provident numquam in quasi sit obcaecati perspiciatis
            corporis deserunt tenetur sint!
          </p>
          <div className="flex gap-x-4 mt-4"></div>
        </article>
      </div>
    </div>
  );
};

export default HeroSectionTwo;
