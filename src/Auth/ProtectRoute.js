import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { DataState } from '../context/Provider';
const ProtectRoute = () => {
    const {user} = DataState();
  return user?<Outlet/>:<Navigate to='/'/>
}

export default ProtectRoute