import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Input } from "../Styles";
import { UserContext, Firebase } from "../Utils";
import styled from "styled-components";
import dp from "../Assets/dp.png";
import { useHistory } from "react-router-dom";

export const Friends = () => {
  const [email, setEmail] = useState("");
  const [allUsersProfile, setAllUsersProfile] = useState<any>("");
  const [currentUserFriends, setCurrentUserFriends] = useState<any>([]);
  const [user] = useContext(UserContext);
  const db = Firebase.database();
  const history = useHistory();

  const searchUser = () => {};

  useEffect(() => {
    syncData();
  }, []);

  const syncData = () => {
    db.ref("Users").on("value", (snap) => {
      setAllUsersProfile(snap.val());
    });

    db.ref(`Users/${user.uid}/Friends`).once("value", (snap) => {
      const profiles = snap.val();
      const friends: any = [];
      if (profiles) {
        Object.keys(profiles).forEach((id) => {
          friends.push(profiles[id]);
        });
      }

      setCurrentUserFriends(friends);
    });
  };

  const addFriendHandler = (id: string) => {
    db.ref(`Users/${user.uid}/Friends/${id}`)
      .set(allUsersProfile[id].Profile)
      .then(() => {
        syncData();
      });
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Find friends</h2>
      <Container>
        <Input
          placeholder="Enter friend's email address."
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button Color="#3414c0" primary onClick={searchUser}>
          Search
        </Button>
      </Container>

      {allUsersProfile ? (
        <Group>
          {Object.keys(allUsersProfile).map((id: any) => {
            const email = allUsersProfile[id].Profile.email;
            let isDisabled = false;
            if (currentUserFriends.length >= 1) {
              if (
                currentUserFriends.some(
                  (profile: any) => profile.email === email
                )
              ) {
                isDisabled = true;
              }
            }
            return (
              <Container width="200px" style={{ textAlign: "center" }} key={id}>
                <Img src={dp} alt="blitz" />
                <Name>{allUsersProfile[id].Profile.displayName}</Name>
                <Email>{allUsersProfile[id].Profile.email}</Email>
                {user.uid === id ? (
                  <Button
                    Color="#3414c0"
                    primary
                    style={{ width: "90%" }}
                    onClick={() => history.push("/Profile")}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    Color="#3414c0"
                    primary={!isDisabled}
                    style={{ width: "90%" }}
                    onClick={() => addFriendHandler(id)}
                    disabled={isDisabled}
                  >
                    {isDisabled ? "Added" : "Add friend"}
                  </Button>
                )}
              </Container>
            );
          })}
        </Group>
      ) : (
        <div style={{ textAlign: "center" }}>loading... </div>
      )}
    </>
  );
};

const Img = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const Group = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`;

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
