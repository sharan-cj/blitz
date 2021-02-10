import React from "react";
import Particles from "react-particles-js";
import styled from "styled-components";

export const Background = () => {
  return (
    <BackGround>
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
    </BackGround>
  );
};

const BackGround = styled.div`
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
`;
