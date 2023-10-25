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

        <ParallaxLayer sticky={{ start: 0.5, end: 2.3 }} style={{ zIndex: 2 }}>
          <ParallaxImage image={piggygif} />
        </ParallaxLayer>
        {/* Third section */}
        <ParallaxLayer offset={0} speed={0.05}></ParallaxLayer>
        <ParallaxLayer
          offset={2.5}
          style={{
            backgroundImage: `url(${slumdog})`,
            backgroundSize: "40%",
            backgroundPosition: "top",
            backgroundColor: "rgb(167 243 208)",
          }}
          className="mt-16 bg-emerald-600"
        ></ParallaxLayer>
        {/* Fourth section */}
        <ParallaxLayer offset={1.5} speed={1}>
          <HeroSectionTwo />
        </ParallaxLayer>
      </Parallax>
    </section>
  );
};

export default Hero;
