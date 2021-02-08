import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Utils";

export const Chat = () => {
  const [user] = useContext(UserContext);
  console.log(user);
  return <div>Chat</div>;
};
