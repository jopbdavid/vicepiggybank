import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const ParallaxImage = ({ image }) => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Attach the scroll listener to the container
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define the rotation animation
  const { rotate } = useSpring({
    rotate: scrollY * 0.5, // Adjust the rotation factor as needed
  });

  return (
    <div className="w-full m-auto h-full overflow-y-scroll" ref={containerRef}>
      <div className="parallax-container" style={{ height: "100%" }}>
        <animated.div
          className="img-container w-full h-full"
          style={{
            transform: rotate.interpolate((r) => `rotate(${r}deg)`),
          }}
        >
          <img src={image} className="w-60 h-60 mx-auto" alt="Parallax Image" />
        </animated.div>
      </div>
    </div>
  );
};

export default ParallaxImage;
