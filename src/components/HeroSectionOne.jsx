import React from "react";
import animeAIpiggy from "../assets/animeAIpiggy.png";

const HeroSectionOne = () => {
  return (
    <div className=" py-12 h-screen bg-transparent w-[80%] ">
      <div className="items-center gap-8 w-1/2 ">
        {/* <div className=""> */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            preserveAspectRatio="none"
            className="w-full -mb-1 text-white"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex items-center justify-center flex-col">
            <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Hey There, Welcome to{" "}
              <span className="text-emerald-600">VicePiggyBank</span> !
            </h2>{" "}
            <p className="mb-6 text-base text-gray-700 md:text-lg">
              VicePiggyBank, where the fun meets finance! We're all about
              helping you conquer those sneaky expenses with style. Get ready to
              uncover the secret life of your wallet! Keep your Piggybank on a
              leash!
            </p>{" "}
            <a
              href="/"
              aria-label="Scroll down"
              className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110"
              draggable="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z"></path>
              </svg>
            </a>
          </div>
        </div>
        {/* </div> */}
        {/* <article>
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
        </article> */}
      </div>
    </div>
  );
};

export default HeroSectionOne;
