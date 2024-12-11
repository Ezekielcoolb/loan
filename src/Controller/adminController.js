import React from "react";
import { Outlet } from "react-router-dom";

import { styled } from "styled-components";
import AdminSidebar from "../Sidebars/adminSidebar";



export default function AdminDashboardLayout() {
  return (
    <Wrapper>
      
      <div
        style={{}}
        className="outlet"
      >
         <AdminSidebar />
       
        <div className="div">
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
   
    margin-top: 30px !important;
    width: 80% !important;
  }
  @media screen and (max-width: 1100px) {
    .outlet {
      width: 100% !important;
    }
  }
`;
