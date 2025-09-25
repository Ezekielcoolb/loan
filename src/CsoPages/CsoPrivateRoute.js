import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import CsoFooter from './csoFooter';
import CsoNav from './csoNav';

const ProtectedRoute = () => {
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("csoToken");

 return (
    token ?
    <div style={{background: "#fbf6f6ff " , height: "auto"  }}> 
      <CsoNav />
      <div style={{marginBottom: "70px", height: "fit-content", paddingTop: "80px" }}>

        <Outlet /> 
      </div>
        <CsoFooter />
    </div>  : <Navigate to="/csoLogin" />
 )
};

export default ProtectedRoute;
