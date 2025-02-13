import React from "react";
import { Outlet } from "react-router-dom";

import { styled } from "styled-components";
import AdminNavbar from "../Admin/AdminNavbar";
import { useSelector } from "react-redux";
import ManagerSidebar from "../Sidebars/managerSidebar";



export default function ManagerDashboardLayout() {
  const {openSideBar} = useSelector((state)=> state.app)

  return (
    <Wrapper>
      <AdminNavbar />
      <div
        style={{}}
        className="outlet"
      >
         <ManagerSidebar />
       
         <div style={{width: openSideBar ? "100%" : "80%"}} className="div">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  
  .outlet {
   
    
    display: flex;
    flex-direction: row;
  }
  .div{
   background: #f7f7f7;
    margin-top: 60px !important;
  width: 100% !important;
  }
  
  @media screen and (max-width: 1100px) {
    .outlet {
      width: 100% !important;
    }
  }
`;
