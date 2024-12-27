import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import CsoFooter from './csoFooter';

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

 return (
    token ?
    <div style={{background: "#D9D9D9 " , height: "auto"  }}>
      <div style={{marginBottom: "70px" }}>

        <Outlet />
      </div>
        <CsoFooter />
    </div>  : <Navigate to="/csoLogin" />
 )
};

export default ProtectedRoute;
