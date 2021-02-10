import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext, Firebase } from "../Utils";
import { Button, Container, Input } from "../Styles";
import styled from "styled-components";
import dp from "../Assets/dp.png";
import { MdSend } from "react-icons/md";
interface Chat {
  message: string;
  time: Date;
  from: string;
  to: string;
}

export const Chat = () => {
  const [user] = useContext(UserContext);
  const db = Firebase.database();
  const [currentUserFriends, setCurrentUserFriends] = useState<any>([]);
  const [chatBuddy, setChatBuddy] = useState<any>("");
  const [textInput, setTextInput] = useState("");
  const inputFieldRef = useRef<any>();

  const [messages, setMessages] = useState<Chat[]>();

  db.ref(`Users/${user.uid}/Profile`).once("value", (snap) => {
    if (snap.val() == null) {
      const Profile = {
        email: user.email,
        displayName: user.displayName ?? "No name",
        uid: user.uid,
      };
      db.ref(`Users/${user.uid}/Profile`).set(Profile);
    }
  });

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const element = document.getElementById("chatroom");
    element?.scroll({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (chatBuddy?.uid) {
      db.ref(`Users/${user.uid}/Chats/${chatBuddy.uid}`).on("value", (snap) => {
        const messageObj = snap.val();
        const messageArr: Chat[] = [];
        if (messageObj) {
          Object.keys(messageObj).forEach((message) => {
            messageArr.push(messageObj[message]);
          });
        }

        setMessages(messageArr);
      });
    }
  }, [chatBuddy]);

  const sendMessageHandler = () => {
    const from = user.uid;
    const to = chatBuddy.uid;
    const date = new Date().toISOString();
    const message = textInput;
    if (textInput) {
      console.log({ from, to, date, message });
      inputFieldRef.current.value = "";
      db.ref(`Users/${from}/Chats/${to}`).push({ from, to, date, message });
      db.ref(`Users/${to}/Chats/${from}`).push({ from, to, date, message });
    }
  };

  return (
    <>
      {chatBuddy ? (
        <Container width="600px" style={{ height: "80vh", overflow: "auto" }}>
          <TopBar>
            <div
              style={{ display: "flex", flexFlow: "row", alignItems: "center" }}
            >
              <Img src={dp} alt="blitz" />
              <Name>{chatBuddy.displayName}</Name>
            </div>
            <Button Color="#3414c0" onClick={() => setChatBuddy("")}>
              Back
            </Button>
          </TopBar>
          <ChatRoom id="chatroom">
            {messages && messages.length >= 1 ? (
              <>
                {messages.map((message) => {
                  return (
                    <Messages
                      fromUser={message.from === user.uid ? true : false}
                    >
                      {message.message}
                    </Messages>
                  );
                })}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: "120px",
                  width: "calc(100% - 2rem)",
                }}
              >
                Start conversation
              </div>
            )}
          </ChatRoom>
          <BottomSpace>
            <div style={{ display: "flex", flexFlow: "row" }}>
              <Input
                placeholder="Type a message..."
                onChange={(e) => setTextInput(e.target.value)}
                ref={inputFieldRef}
              />
              <SendButton onClick={sendMessageHandler}>
                <MdSend />
              </SendButton>
            </div>
          </BottomSpace>
        </Container>
      ) : (
        <div>
          <Container width="600px" style={{ height: "80vh", overflow: "auto" }}>
            <h2 style={{ margin: "1rem" }}>My Chats</h2>
            {currentUserFriends.length >= 1 ? (
              <>
                {currentUserFriends.map((friend: any) => {
                  return (
                    <Card key={friend.uid} onClick={() => setChatBuddy(friend)}>
                      <Name> {friend.displayName}</Name>
                      <Email>{friend.email}</Email>
                    </Card>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>Add friends to chat</div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

const Messages = styled.div<{ fromUser?: boolean }>`
  background: rgb(255 255 255 / 20%);
  border-radius: 5px;
  margin: 1rem;
  padding: 0.5rem;
  max-width: 60%;
  margin-left: ${(props) => (props.fromUser ? "30%" : "1rem")};
`;

const ChatRoom = styled.div`
  position: absolute;
  overflow: auto;
  top: 70px;
  bottom: 100px;
  // background: green;
  width: calc(100% - 2rem);
`;
const Card = styled(Container)`
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const SendButton = styled.button`
  margin: 1rem;
  border: none;
  background: none;
  font-size: 32px;
  transform: translateY(3px);
  cursor: pointer;
  outline: none;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 400px) {
    margin: 0;
    margin-right: 0.5rem;
  }
`;

const Name = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Email = styled.div`
  overflow: auto;
  font-size: 14px;
  color: cornsilk;
  margin: 0.5rem 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(255 255 255 / 20%);
  border-radius: 5px;
  position: absolute;
  width: calc(100% - 2rem);
`;

const BottomSpace = styled.div`
  background: rgb(255 255 255 / 20%);
  border-radius: 5px;
  position: absolute;
  width: calc(100% - 2rem);
  bottom: 1rem;
`;
