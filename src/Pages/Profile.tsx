import React, { useContext } from "react";
import { Firebase, UserContext } from "../Utils";
import { Button, Container } from "../Styles";
import styled from "styled-components";

export const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        setUser("");
        localStorage.setItem("User", "");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Container width="300px" style={{ textAlign: "center" }}>
        <Name>{user.displayName ?? "No name"} </Name>
        <Email>{user.email}</Email>
        <Button Color="#3414c0" primary onClick={logoutHandler}>
          Logout
        </Button>
      </Container>
    </div>
  );
};

const Name = styled.div`
  text-transform: uppercase;
  font-weight: 600;
`;

const Email = styled.div`
  overflow: auto;
  font-size: 14px;
  color: cornsilk;
  margin: 0.5rem 0;
`;
