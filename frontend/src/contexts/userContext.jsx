import { createContext, useState } from "react";

export const UserContext=createContext();


export const UserProvider=({children})=>{
    const [friendsList, setFriendsList] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    

    return(
        <UserContext.Provider value={{friendsList, setFriendsList, selectedUser, setSelectedUser}}>
            {children}
        </UserContext.Provider>
    )
}