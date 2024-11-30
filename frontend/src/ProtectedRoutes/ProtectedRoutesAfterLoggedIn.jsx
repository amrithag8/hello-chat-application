import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutesAfterLoggedIn = () => {
  return !localStorage.getItem('accessToken') ? <Outlet/>:<Navigate to="/home"/>
}

export default ProtectedRoutesAfterLoggedIn;
