import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setOpenSideBar } from "../redux/slices/appSlice";


const AdminNavbar = () => {
  const {openSideBar} = useSelector((state)=> state.app)
  const dispatch =useDispatch()
  console.log(openSideBar);

  const ShowBar = ()=> {
    dispatch(setOpenSideBar())
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
        <div className="admin-nav-3 ">
         
        </div>
      </div>
      <div className="admin-nav-3">
       
        <Icon
          icon="tdesign:notification"
          width="20"
          height="20"
          style={{ color: "white" }}
        />
      
      </div>

    </nav>
  );
};

export default AdminNavbar;
