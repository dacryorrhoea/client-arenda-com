import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Login from '../pages/Login/Login';


function PrivateRoute({ userInfo, }) {
  if (userInfo.isAuthenticated) {
    return <Outlet/>
  } else {
    return <Navigate to='/login' replace={true}/>
  }
}

export default PrivateRoute;