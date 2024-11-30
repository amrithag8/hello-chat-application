import React, { useContext, useEffect, useState } from "react";
import ChatsMain from "./ChatsMain";
import FriendsList from "./FriendsList";
import { SERVER_URL } from "../utils/constants";
import { videoContext } from "../contexts/videoCallContext";
import { useNavigate } from "react-router-dom";

const MessageChats = ({
  
  socket,
  
  
  
}) => {

  const navigate=useNavigate();
  const {receiveVideoCall, setReceiveVideoCall}=useContext(videoContext);


  const acceptButtonHandler=()=>{
    navigate(`/video-call?roomID=${receiveVideoCall?.roomID}`);
    setReceiveVideoCall();
  }

  const declineHandler=()=>{
    socket.current.emit("call_declined", {message:"Call declined", receiverID:receiveVideoCall?.roomID, senderID:receiveVideoCall?.callerID});
    setReceiveVideoCall();
    
  }

  return (
    <div className="w-full h-5/6 flex relative">

{
  receiveVideoCall&&(<div className="absolute w-5/12 bg-white z-50 h-1/3 rounded-xl p-8 shadow-md shadow-black inset-3.5">
    <h3 className="font-bold text-center">{receiveVideoCall?.caller} Video Calling</h3>
<div className="flex justify-around m-8">
    <button className="bg-green-700 py-2 px-4 rounded-lg text-white cursor-pointer" onClick={acceptButtonHandler}>Accept</button> 
    <button className="bg-red-600 py-2 px-4 rounded-lg text-white cursor-pointer" onClick={declineHandler}>Decline</button>
    </div>
    
    </div>)
}
  
    
  




      <FriendsList/>

      <ChatsMain
       
        
        
        socket={socket}
        
        
        
      />
    </div>
  );
};

export default MessageChats;
