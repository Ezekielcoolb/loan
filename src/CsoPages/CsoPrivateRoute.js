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
    <div style={{background: "#D9D9D9 " , height: "auto"  }}> 
      <CsoNav />
      <div style={{marginBottom: "70px", height: "fit-content", paddingTop: "110px" }}>

        <Outlet /> 
      </div>
        <CsoFooter />
    </div>  : <Navigate to="/csoLogin" />
 )
};

export default ProtectedRoute;
