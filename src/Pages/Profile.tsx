import React, { useContext, useState, useEffect } from "react";
import { Firebase, UserContext } from "../Utils";
import { Button, Container, Input } from "../Styles";
import { RiEdit2Fill } from "react-icons/ri";
import styled from "styled-components";

export const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [showEditInput, setShowEditInput] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [userProfile, setUserProfile] = useState(user);
  const db = Firebase.database();
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

  const getdisplayName = () => {
    db.ref(`Users/${user.uid}/Profile`).once("value", (snap) => {
      setUserProfile(snap.val());
    });
  };

  useEffect(() => {
    getdisplayName();
  }, []);

  const changeNameHandler = () => {
    if (newUserName) {
      db.ref(`Users/${user.uid}/Profile`)
        .update({ displayName: newUserName })
        .then((res) => {
          getdisplayName();
          setShowEditInput(false);
        });
    }
  };

  return (
    <div>
      <Container width="300px" style={{ textAlign: "center" }}>
        {showEditInput ? (
          <>
            <Input
              placeholder="Enter a new user name"
              onChange={(e: any) => setNewUserName(e.target.value)}
            />
            <Button Color="#3414c0" primary onClick={changeNameHandler}>
              Change name
            </Button>
          </>
        ) : (
          <>
            <Name>{userProfile.displayName ?? "No name"} </Name>
            <Email>{userProfile.email}</Email>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                Color="#3414c0"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowEditInput(true)}
              >
                Edit Name <RiEdit2Fill style={{ fontSize: "18px" }} />
              </Button>
              <Button Color="#3414c0" primary onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </>
        )}
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
