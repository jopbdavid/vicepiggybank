import React, { useState, useLayoutEffect, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import HeroSectionOne from "../components/HeroSectionOne";
import HeroSectionTwo from "../components/HeroSectionTwo";
import HeroSectionThree from "../components/HeroSectionThree";
import ParallaxImage from "../components/ParallaxImage";
import redbarn from "../assets/redbarn.png";
import redneck from "../assets/redneckRich.jpeg";
import piggygif from "../assets/piggygif.gif";

const Hero = () => {
  return (
    <section>
      <Parallax pages={3.5} className="bg-emerald-200">
        {/* Sticky section  */}
        <ParallaxLayer
          sticky={{ start: 0, end: 0.2 }}
          offset={0}
          style={{
            backgroundImage: `url(${redbarn})`,
            backgroundSize: "20%",
            backgroundPosition: "top",
            backgroundColor: "rgb(167 243 208)",
          }}
        >
          <HeroSectionOne />
        </ParallaxLayer>

        {/* First section  */}
        <ParallaxLayer offset={0.5} speed={1} factor={4}></ParallaxLayer>
        {/* Second section */}

        <ParallaxLayer sticky={{ start: 0.5, end: 2.0 }} style={{ zIndex: 2 }}>
          <ParallaxImage image={piggygif} />
        </ParallaxLayer>
        {/* Third section */}
        <ParallaxLayer offset={0} speed={0.05}></ParallaxLayer>
        <ParallaxLayer
          offset={2.2}
          style={
            {
              // backgroundImage: `url(${redneck})`,
              // backgroundSize: "25%",
              // backgroundPosition: "center",
            }
          }
        >
          <div className="w-full mx-auto bg-emerald-300 h-full flex flex-col justify-center items-center">
            <img
              src={redneck}
              alt="richRedneck"
              className="w-1/3 rounded-full mx-auto"
            />
          </div>
        </ParallaxLayer>
        {/* Fourth section */}
        <ParallaxLayer offset={1.5} speed={1}>
          <HeroSectionTwo />
        </ParallaxLayer>
      </Parallax>
    </section>
  );
};

export default Hero;
