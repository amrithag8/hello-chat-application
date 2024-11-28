import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "../utils/validate";
import { SERVER_URL } from "../utils/constants";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const submitHandler = async () => {
    const val = validate(email, password, fullName);
    if (val === null) {
      if (password !== repeatPassword) {
        setValidationMsg("Passwords dont match");
      } else {
        try {
          const response = await fetch(`${SERVER_URL}/register-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, fullName }),
          });

          const result = await response.json();
          console.log("response", result.message);
          setEmail("");
          setpassword("");
          setFullName("");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setValidationMsg(val);
    }
  };

  return (
    <div className="w-screen h-screen py-20 bg-purple-400">
      <div className="m-auto w-8/12 h-5/6 shadow-md shadow-slate-800 rounded-lg bg-gradient-to-b from-pink-400 to-purple-400 grid grid-cols-[45%_55%]">
        <div className=" flex flex-col justify-center items-center gap-8">
          <i className="fa-brands fa-rocketchat text-8xl text-white"></i>
          <p className="text-3xl text-white text-center">
            Share your smile with the world and find friends
          </p>
        </div>
        <div className="bg-white flex flex-col gap-4 items-center py-8">
          <h1 className="text-3xl bg-gradient-to-r from-pink-400 to-purple-400 inline-block text-transparent bg-clip-text">
            SIGN UP HERE
          </h1>
          <div className="w-full space-y-3 px-24">
            <div className="relative">
              <input
                value={fullName}
                type="email"
                className="tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-regular fa-user"></i>
              </div>
            </div>

            <div className="relative">
              <input
                value={password}
                type="password"
                className=" tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-solid fa-lock"></i>
              </div>
            </div>

            <div className="relative">
              <input
                value={repeatPassword}
                type="password"
                className="tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Confirm password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-solid fa-lock"></i>
              </div>
            </div>

            <div className="relative">
              <input
                value={email}
                type="email"
                className="tracking-widest peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:outline-none focus:border-x-transparent focus:border-b-purple-400 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter Email ID"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <i className="fa-regular fa-envelope"></i>
              </div>
            </div>
            <p className="text-red-400 font-bold px-4">{validationMsg}</p>
          </div>
          <button
            onClick={submitHandler}
            className="tracking-wider bg-gradient-to-b from-pink-400 to-purple-400 text-white w-1/2 py-2 mt-4 rounded-lg font-bold text-xl"
          >
            CONTINUE
          </button>
          <p className="text-gray-500">
            Already a User?{" "}
            <Link to="/">
              <span className="font-bold hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
