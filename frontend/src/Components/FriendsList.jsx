import React, { useContext, useEffect, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import moment from "moment";
import { UserContext } from "../contexts/userContext";

const FriendsList = () => {

  const{friendsList, setSelectedUser}=useContext(UserContext);
  return (
    <div className=" max-h-full bg-purple-300 w-[30%] overflow-y-scroll">
      {friendsList.map((friends) => {
        return (
          <div
            key={friends._id}
            className="flex justify-between px-4 cursor-pointer hover:bg-purple-700 py-2"
            onClick={() => setSelectedUser(friends)}
          >
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full"
                src="https://pics.craiyon.com/2024-02-03/dJ8t1F7sQP2i6LM_USBiyA.webp"
              />
              <div className="flex flex-col">
                <h6 className=" font-bold">{friends.fullName}</h6>
                <div className="flex flex-col items-start">
                  {
                    (friends.unRead===true&&friends.senderID!==localStorage.getItem('userID'))?(<h6 className="text-left font-bold">{friends.lastMessage}</h6>):(<h6 className="text-left">{friends.lastMessage}</h6>)
                  }
                  
                </div>
              </div>
            </div>
            <h6 className=" font-bold">
              {moment(friends.lastMessageTime).format("hh:mm A")}
            </h6>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsList;
