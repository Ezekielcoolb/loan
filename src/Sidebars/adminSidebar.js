import styled from "styled-components";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/Context";
const sidebarConfig = [
  {
    id: 1,
    icon: "ic:round-dashboard",
    link: "/dashboard",
    title: "DASHBOARD",
  },
  {
    id: 2,
    icon: "fluent:people-edit-16-regular",
    link: "/cso",
    title: "CSO",
  },
  {
    id: 3,
    icon: "carbon:global-loan-and-trial",
    link: "",
    title: "LAONS",
  },
  {
    id: 4,
    icon: "arcticons:studentloan-connect",
    link: "",
    title: "NEW LOAN",
  },


  {
    id: 5,
    icon: "carbon:money",
    link: "",
    title: "DISBURSEMENT",
  },
  {
    id: 6,
    icon: "streamline:information-desk-customer",
    link: "",
    title: "CUSTOMERS",
  },


  {
    id: 7,
    icon: "mdi:comment-account-outline",
    link: "",
    title: "ACCOUNT",
  },
  {
    id: 8,
    icon: "ri:home-office-line",
    link: "",
    title: "BRANCH",
  },
  {
    id: 9,
    icon: "lets-icons:setting-line",
    link: "",
    title: "SETTING",
  },
 
];

export default function AdminSidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { isSidebarOpen, setIsSidebarOpen, setIsProfileOpen } = useAppContext();
  const navigate = useNavigate()

  function handleNavClick(title) {
    setActiveTab(title);
    setIsSidebarOpen(false);
    setIsProfileOpen(false);
  }
 


  return (
    <SIDEBAR>
      <div
        className={`containers  ${
          isSidebarOpen ? "opened" : "closed"
        }`}
      >
        <div className="nav-container ">
            
          <div className="wrapper ">
            <div className="nav-links ">
              {sidebarConfig.map(({ link, icon, title }, index) => (
                <Link
                  className={`nav-link react-router-link ${
                    activeTab === title ? "active-tab" : ""
                  }`}
                  to={link}
                  key={index}
                  onClick={() => handleNavClick(title)}
                >
                  <Icon icon={icon} />
                  {title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="help-center">
              <img src="/images/loan_logo.jpg" alt="..."/>
          </div>
        </div>
        <Closer
          style={{display: "flex"}}
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        ></Closer>
      </div>
    </SIDEBAR>
  );
}
const SIDEBAR = styled.div`
  background-color: #ffffff;
  border-right: 1px solid #DBE0EE;
  height: auto !important;
  padding: 20px;
  padding-top: 40px;
  width: 20%;
  position: relative;
  z-index: 9999;
  .containers {
    display: flex;
    flex-direction: row;
    width:14%;
 
    align-items: center;
    position: fixed;
    background-color: #ffffff;
    padding-right: 0 !important;
  }
  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 100px;
    align-items: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    

    width: 100%;
    align-items: center;
    padding-right: 0 !important;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    
    gap: 20px;
    width: 100% !important;
  }
  .help-center {
    width: 188px;
    height: 212px;
  }
  .help-center img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .nav-link {
    font-weight: 500 !important;
    color: #727789 !important;
    display: flex;
    font-size: 14px !important;
    justify-content: left !important;
    text-decoration: none !important;
    gap: 15px;
    align-items: center;
    &:hover {
    font-weight: 600 !important;
    color: #030b26 !important;
      transition: 0.3s;
    }
  }
  .active-tab {
    font-weight: 600 !important;
    color: #030b26 !important;
  }
  
  @media screen and (max-width: 1100px) {
   
    .container {
      background: black;
    }
    /* .closed {
      margin-left: -1000px;
      transition: 0.3s;
    } */
    /* .opened {
      width: 250px;
      margin-left: 0;
      transition: 0.3s;
      display: flex;
      position: fixed !important;
      z-index: 2;
    } */
  }
  @media screen and (max-width: 550px) {
    .container {
      padding-right: 0 !important;
      padding-left: 0 !important;

      background-color: transparent;
    }
    .opened {
      width: 100%;
    }
    .nav-container {
      width: 250px;
      background-color: black;
    }
  }
`;
const Closer = styled.div`
  display: none;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 9999;
  @media screen and (max-width: 500px) {
    display: flex;
    height: 100%;
    width: calc(100vw - 250px);
  }
`;
