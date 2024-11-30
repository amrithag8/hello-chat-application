import React, { useContext, useEffect, useRef, useState } from "react";
import MessagesSidebar from "../Components/MessagesSidebar";
import MessagesHeader from "../Components/MessagesHeader";
import MessageChats from "../Components/MessageChats";
import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";
import { UserContext, UserProvider } from "../contexts/userContext";
import { ChatsContext } from "../contexts/chatsContext";
import { videoContext } from "../contexts/videoCallContext";

const MessagesHomePage = () => {
  const socket = useRef();

  const { setFriendsList } = useContext(UserContext);
  const { selecteduserMessages, receivedMsg, setReceivedMsg } =
    useContext(ChatsContext);

    const {setReceiveVideoCall, setVideoDeclineMsg}=useContext(videoContext);

  useEffect(() => {
    const getAllChats = async () => {
      const response = await fetch(`${SERVER_URL}/messages/all-chats`, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("friendslist",result );

      setFriendsList(result);
    };

    getAllChats();
  }, [selecteduserMessages, receivedMsg]);

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("userID", { userID: localStorage.getItem("userID") });

    socket.current.on("receive_msg", (data) => {
      setReceivedMsg(data);
      console.log("received msg", data);
    });

    socket.current.on("receive_video_call", (data)=>{
      console.log("receive_video_call", data);
      setReceiveVideoCall(data);
    })

    socket.current.on("receive_call_decline_msg", (data)=>{
      console.log("data from decline", data.message);
      setVideoDeclineMsg(data.message);
    })

    
  }, []);
  return (
    <div className="w-screen h-screen py-16 bg-gradient-to-b from-pink-400 to-purple-400">
      <div className="w-8/12 h-full shadow-md shadow-slate-800 bg-white mx-auto flex">
        <MessagesSidebar />

        <div className="flex flex-col w-full h-full">
          <MessagesHeader />
          <MessageChats socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default MessagesHomePage;
