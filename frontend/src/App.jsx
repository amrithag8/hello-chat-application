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
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedRoutesAfterLoggedIn from "./ProtectedRoutes/ProtectedRoutesAfterLoggedIn";
import VideoCallPage from "./Pages/VideoCallPage";



function App() {
 
  

  const router = createBrowserRouter([
    {
      
      element: <ProtectedRoutesAfterLoggedIn />,
      children:[
        {path: "/",
          element: <LoginPage />,},
          {
            path: "/register",
            element: <SignupPage />,
          },
          
      ]
    },
    
    {
      
      element:<ProtectedRoute/>,
      children:[
        {path: "/home",
          element:<MessagesHomePage/>
        },
        {
          path:"/video-call",
          element:<VideoCallPage/>
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
        {/* <SignupPage />
        <LoginPage /> */}
      </RouterProvider>
    </>
  );
}

export default App;
