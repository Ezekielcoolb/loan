import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setOpenSideBar } from "../redux/slices/appSlice";
import { logoutAdmin } from "../redux/slices/adminSlice";
import { logout } from "../redux/slices/authSlice";


const AdminNavbar = () => {
  const navigate = useNavigate()
  const {openSideBar} = useSelector((state)=> state.app)
  const dispatch =useDispatch()
  console.log(openSideBar);

  const ShowBar = ()=> {
    dispatch(setOpenSideBar())
  }
  

  const handleLogOut = () => {
    localStorage.removeItem("managerToken");
     localStorage.removeItem("solutionToken");
    localStorage.removeItem("officerToken");
    localStorage.removeItem("superAdminToken");
    dispatch(logoutAdmin())
    dispatch(logout())
    navigate("/")

  }
  return (
    <nav className="admin-nav">
        <Icon className="icon-admin-menu"
                width="50px"
                height="50px"
                icon={openSideBar ? "mdi-light:menu" :"prime:times" }
                color="white"
                onClick={()=> ShowBar()}
              />
     

      <div className="admin-nav-2">
        <p>Welcome back!</p>
       
      </div>
      <div className="admin-nav-3">
       
       
      <button onClick={handleLogOut} className="log-out-admins">Logout</button>
      </div>

    </nav>
  );
};

export default AdminNavbar;
