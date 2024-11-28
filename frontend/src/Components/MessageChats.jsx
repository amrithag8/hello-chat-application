import React, { useEffect, useState } from "react";
import ChatsMain from "./ChatsMain";
import FriendsList from "./FriendsList";
import { SERVER_URL } from "../utils/constants";

const MessageChats = ({
  
  socket,
  
  
  
}) => {
  return (
    <div className="w-full h-5/6 flex ">
      <FriendsList/>

      <ChatsMain
       
        
        
        socket={socket}
        
        
        
      />
    </div>
  );
};

export default MessageChats;
