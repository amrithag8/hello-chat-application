import React from 'react'
import { useNavigate } from 'react-router-dom';

const MessagesSidebar = () => {
  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userID");

    navigate("/");
  }
  return (
    <div className='h-full w-1/12 bg-violet-700 px-6 pt-12'>
      <i className="fa-solid fa-right-from-bracket text-white text-3xl cursor-pointer" onClick={logoutHandler}></i>
    </div>
  )
}

export default MessagesSidebar
