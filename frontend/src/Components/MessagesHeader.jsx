import React, { useContext, useState } from 'react'
import { SERVER_URL } from '../utils/constants';
import { UserContext } from '../contexts/userContext';

const MessagesHeader = () => {

  const{setSelectedUser}=useContext(UserContext);

  const[searchUser, setSearchUser]=useState("");
  const[userResults, setUserResults]=useState([]);
  

  const searchHandler=async(e)=>{

setSearchUser(e.target.value);
if(e.target.value){

  const response=await fetch(`${SERVER_URL}/search-user?user=${e.target.value}`,{
    headers:{
      "Content-Type":"application/json",
      "authorization":`${localStorage.getItem('accessToken')}`
    }
  })
  
  const result=await response.json();
  
  setUserResults(result);
  

}


  }


  const selectuserHandler=(user)=>{
    setSearchUser("");
setSelectedUser(user);
  }


  return (
    <div className=' flex w-full h-1/6 bg-white shadow-xl'>
    <div className='w-7/12 h-full bg-white p-4 '>
    <div className="relative w-2/5">
    <input type="text" value={searchUser} id="first_name" className="mt-8 bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="Search" required onChange={searchHandler} />
              <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <i className="fa-solid fa-magnifying-glass p-2 text-gray-500"></i>
              </div>
            </div>

           { searchUser&&<div className=' absolute z-10 min-h-2 mt-2 bg-white w-1/6 rounded-lg p-4'>

           {
            userResults.map((user)=>{
              return (<p key={user._id} className='hover:bg-violet-400 cursor-pointer p-2' onClick={()=>selectuserHandler(user)}>{user.fullName}</p> )
            })
           }
       
       
      </div>}
      
    </div>
    <div className='w-5/12 h-full bg-violet-500 border-l-[100px] border-white border-b-[102px] border-b-transparent'>
    <div className=' items-center flex pt-8 gap-4'>
      <p className='text-white font-bold'> {localStorage.getItem('name')}</p>
      
        <img className="w-12 h-12 rounded-full object-cover" src="https://i.pinimg.com/originals/2f/cc/4d/2fcc4da297068da39d5b4e158d0e7e70.jpg"/>
      
      </div>

      
    </div> 
   
    </div>
    
    
  )
}

export default MessagesHeader
