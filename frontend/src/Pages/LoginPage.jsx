import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../utils/validate";
import { SERVER_URL } from "../utils/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]=useState(null);
  const navigate=useNavigate();

  const loginHandler=async()=>{
    console.log("login details", email, password);
    const isValid=loginValidation(email, password);
if(isValid!==null){
  setMessage(isValid);
}
else{
  try{
const response=await fetch(`${SERVER_URL}/login`, {
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({email, password})

})
const result=await response.json(); 
console.log("login res", result);
localStorage.setItem("accessToken", result.accessToken);
localStorage.setItem("name", result.fullName);
localStorage.setItem("userID", result.userID);

navigate("/home");
  }
  catch(err){
    console.log(err);
  }
}
  }

  return (
    <div className="w-screen h-screen py-20 bg-gradient-to-b from-pink-400 to-purple-400">
      <div className="m-auto w-3/12 h-5/6 shadow-md shadow-slate-800 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 ">
        <div className="bg-white flex flex-col gap-4 items-center pt-16 pb-4">
          <h1 className="text-3xl bg-gradient-to-r from-pink-400 to-purple-400 inline-block text-transparent bg-clip-text">
            LOGIN
          </h1>
          <div className="w-full space-y-3 px-12">
            <div className="relative">
              <input
                type="email"
                className=" tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter Email ID"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-regular fa-envelope"></i>
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                className="tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-solid fa-lock"></i>
              </div>
            </div>
            <p className="text-red-400 font-bold px-4">{message}</p>
          </div>
          <button className="tracking-wider bg-gradient-to-b from-pink-400 to-purple-400 text-white w-1/3 py-2 mt-8 rounded-lg font-bold text-xl" onClick={loginHandler}>
            LOGIN
          </button>
          <p className="text-gray-500">
            {" "}
            To register,
            <Link to="/register">
              {" "}
              <span className="font-bold hover:underline cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
