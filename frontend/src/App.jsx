import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MessagesHomePage from "./Pages/MessagesHomePage";



function App() {
 
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <SignupPage />,
    },
    {
      path: "/home",
      element: (
        <MessagesHomePage
         
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
        <SignupPage />
        <LoginPage />
      </RouterProvider>
    </>
  );
}

export default App;
