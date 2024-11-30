import { createContext, useState } from "react";

export const videoContext=createContext();

export const VideoProvider=({children})=>{

    const[receiveVideoCall, setReceiveVideoCall]=useState();
    const[videoDeclineMsg, setVideoDeclineMsg]=useState("");

    return(<videoContext.Provider value={{receiveVideoCall, setReceiveVideoCall, videoDeclineMsg, setVideoDeclineMsg}}>
        {children}
    </videoContext.Provider>)
}