import React from "react";
import Particles from "react-particles-js";

export const Background = () => {
  return (
    <Particles
      width="100%"
      height="100%"
      params={{
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      }}
    />
  );
};
