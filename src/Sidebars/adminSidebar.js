import styled from "styled-components";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/Context";
import { useSelector } from "react-redux";
const sidebarConfig = [
  {
    id: 1,
    icon: "ic:round-dashboard",
    link: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: "fluent:people-edit-16-regular",
    link: "/admincso",
    title: "Customer Service Officer",
  },
  {
    id: 3,
    icon: "carbon:global-loan-and-trial",
    link: "/loan",
    title: "Loans",
  },
  {
    id: 4,
    icon: "arcticons:studentloan-connect",
    link: "/newloan",
    title: "New Loan",
  },


  {
    id: 5,
    icon: "carbon:money",
    link: "/disbursement",
    title: "Disbursement",
  },
  {
    id: 6,
    icon: "streamline:information-desk-customer",
    link: "/customerdetails",
    title: "Customers",
  },

  {
    id: 7,
    icon: "mdi:comment-account-outline",
    link: "/transactions",
    title: "Transaction",
  },
  {
    id: 8,
    icon: "mdi:comment-account-outline",
    link: "/admin-members",
    title: "Admin Panel",
  },
  {
    id: 9,
    icon: "ri:home-office-line",
    link: "/branches",
    title: "Branch",
  },
  {
    id: 10,
    icon: "lets-icons:setting-line",
    link: "/settings",
    title: "Setting",
  },
  {
    id: 11,
    icon: "lets-icons:setting-line",
    link: "/test",
    title: "Test",
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
 
  const {openSideBar} = useSelector((state)=> state.app)

  return (
    <SIDEBAR className={ openSideBar ? "open" : "close"}>
      <div 
        className={`containers ${
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
              <img src="/images/help_center.png" alt="..."/>
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
  width: 15%;
  position: relative;
  z-index: 999;
  margin-top: 45px !important;
  @media (max-width: 1024px) {
    
     width: 300px;
  height: 100vh;
  position: fixed;

}
  .container {
    display: flex;
    flex-direction: row;
    width: 15%;
   
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
  padding-top: 30px;

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
      background: white;
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
  @media screen and (max-width: 678px) {
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
      background-color: white;
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
