import { createContext, useState } from "react";

export const ChatsContext=createContext();

export const ChatsProvider=({children})=>{
    const [selecteduserMessages, setSelectedUserMessages] = useState([]);
  
    const [receivedMsg, setReceivedMsg] = useState();
  


    return(<ChatsContext.Provider value={{selecteduserMessages, setSelectedUserMessages, receivedMsg, setReceivedMsg}}>
        {children}
    </ChatsContext.Provider>)
}