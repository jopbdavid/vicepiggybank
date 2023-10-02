import React, { useState, useLayoutEffect, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import HeroSectionOne from "../components/HeroSectionOne";
import HeroSectionTwo from "../components/HeroSectionTwo";
import HeroSectionThree from "../components/HeroSectionThree";
import ParallaxImage from "../components/ParallaxImage";
import redbarn from "../assets/redbarn.png";
import slumdog from "../assets/slumdog.jpg";
import piggygif from "../assets/piggygif.gif";

const Hero = () => {
  return (
    <section>
      <Parallax pages={3.5} className="bg-emerald-200 ">
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
        ></ParallaxLayer>

        {/* First section  */}
        <ParallaxLayer offset={0.5} speed={1} factor={4}>
          <HeroSectionOne />
        </ParallaxLayer>
        {/* Second section */}

        <ParallaxLayer sticky={{ start: 0.5, end: 2.3 }}>
          <ParallaxImage image={piggygif} />
          {/*      <div className="img-container" ref={imgContainerRef}>
            <img
              src={piggygif}
              alt="piggybankgif"
              className="w-60 h-60 mx-auto"
              style={{ transform: "none" }}
            />
          </div> */}
        </ParallaxLayer>
        {/* Third section */}
        <ParallaxLayer offset={0.2} speed={0.05}>
          <HeroSectionTwo />
        </ParallaxLayer>
        <ParallaxLayer
          offset={2.5}
          style={{
            backgroundImage: `url(${slumdog})`,
            backgroundSize: "40%",
            backgroundPosition: "top",
            backgroundColor: "rgb(167 243 208)",
            marginTop: "6rem",
          }}
        ></ParallaxLayer>
        {/* Fourth section */}
        <ParallaxLayer offset={1.5} speed={1}>
          <HeroSectionThree />
        </ParallaxLayer>
      </Parallax>
    </section>
  );
};

export default Hero;
