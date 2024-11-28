import React, { useContext, useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { UserContext } from "../contexts/userContext";
import { ChatsContext } from "../contexts/chatsContext";

const ChatsMain = ({ socket }) => {
  const [newMessage, setNewMessage] = useState("");
  const { friendsList, selectedUser, setSelectedUser } =
    useContext(UserContext);
  const { selecteduserMessages, setSelectedUserMessages, receivedMsg } =
    useContext(ChatsContext);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [selecteduserMessages]);

  useEffect(() => {
    if (friendsList?.length !== 0) {
      setSelectedUser(friendsList[0]);
    }
  }, [friendsList.length]);

  useEffect(() => {
    const fetchSelectedUserChats = async (selectedId) => {
      const response = await fetch(
        `${SERVER_URL}/messages?user=${selectedId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const result = await response.json();

      setSelectedUserMessages(result);
    };

    if (selectedUser) {
      fetchSelectedUserChats(selectedUser?._id);
    }
  }, [selectedUser, receivedMsg]);

  const sendMessageHandler = async (receiverID) => {
    setNewMessage("");

    if (newMessage) {
      socket.current.emit("send_msg", {
        message: newMessage,
        senderID: localStorage.getItem("userID"),
        receiverID,
      });

      const response = await fetch(`${SERVER_URL}/messages/send-message`, {
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage, receiverID }),
      });

      const res = await response.json();

      setSelectedUserMessages(res);
    }
  };

  const deleteAllMessages = async (deletedID) => {
    const response = await fetch(`${SERVER_URL}/messages/deleteAllMessages`, {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deletedID }),
    });

    const result = await response.json();

    setSelectedUserMessages(result);
  };

  return (
    <>

    
      {/* chats */}
      <div className="p-8 w-[70%]">
        <div className="flex items-center justify-between py-4 px-8">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.pinimg.com/originals/2f/cc/4d/2fcc4da297068da39d5b4e158d0e7e70.jpg"
            />
            <h4 className="font-medium">
              {selectedUser?.fullName || friendsList[0]?.fullName}
            </h4>
            {selectedUser && (
              <button
                className="bg-gray-300 p-2 rounded-lg font-medium"
                onClick={() => deleteAllMessages(selectedUser._id)}
              >
                Delete All Messages
              </button>
            )}
          </div>
          <div className="flex">
            <i className="fa-solid fa-video text-violet-500 cursor-pointer"></i>
          </div>
        </div>
        <hr />
        {/* messages */}
        <div className="max-h-[310px] p-4 my-4 flex flex-col overflow-y-scroll">
          {selecteduserMessages?.map((message) => {
            if (message.senderID === localStorage.getItem("userID")) {
              return (
                <div key={message._id} className="flex flex-col items-end">
                  <div
                    ref={scrollRef}
                    className="mt-4 max-w-sm p-2 text-end bg-purple-300 min-h-10 border-gray-500 border-2 rounded-l-2xl rounded-b-2xl"
                  >
                    <p>{message?.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={message._id} className="flex flex-col items-start">
                  <div
                    ref={scrollRef}
                    className="max-w-sm p-2 mt-4 text-start min-h-10 border-gray-500 border-2 rounded-r-2xl rounded-b-2xl"
                  >
                    <p>{message?.message}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <hr />
        {/* input */}

        <div className="h-1/6 p-4 ">
          <div className="relative">
            <input
              type="text"
              value={newMessage}
              className="tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-x-transparent text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Type your message here..."
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute inset-y-0 end-0 flex items-center">
              <i className="fa-regular fa-face-smile cursor-pointer z-10"></i>
              <button
                className="ml-4 text-3xl font-bold bg-violet-500 py-1 px-4 mb-4 cursor-pointer"
                onClick={() => sendMessageHandler(selectedUser?._id)}
              >
                {" "}
                <i className="fa-solid fa-right-long text-3xl font-bold text-white cursor-pointer"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsMain;
