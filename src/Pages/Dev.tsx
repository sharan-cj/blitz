import React from "react";
import { Button, Container, Input } from "../Styles";
import { SiLinkedin, SiGithub } from "react-icons/si";
import styled from "styled-components";

export const Dev = () => {
  return (
    <Container>
      <b>Find me @</b>
      <Link target="_blank" href="https://www.linkedin.com/in/sharan-cj/">
        <SiLinkedin /> &nbsp; /sharan-cj
      </Link>
      <Link target="_blank" href="https://github.com/sharan-cj">
        <SiGithub /> &nbsp; /sharan-cj
      </Link>
    </Container>
  );
};

const Link = styled.a`
  min-width: 200px;
  color: black;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
