import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CsoNotifications from "./csoNotification";

const CsoNavRap = styled.div`
  
.home-header h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    color: #ffffff;
  }
  .home-header p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #ffffff;
  }
  .home-header-text {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .home-header {
    display: flex;
    align-items: center;
    background: #005e78;
    justify-content: space-between;
    width: 100%;
    padding: 20px 30px;
    padding-top: 50px;
    position: fixed;
    top: 0px;
    z-index: 9999;
  }
  .notification-icon-div {
    position: relative;
  }
  .the-notification {
    position: absolute;
    right: 0px;
    width: 300px !important;
  }
`


const CsoNav = () => {
    const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()


  const [openNotification, setOpenNotification] = useState(false)

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification)
  }

    const handleGoToProfile = () => {
      navigate("/cso/csos-profile")
    }
    return (
        <CsoNavRap>
                  {user && (
                          <div  className="home-header">
                            <div onClick={handleGoToProfile} className="home-header-text">
                              <h3>Hi, {user.firstName}</h3>
                              <p>{user.email}</p>
                            </div>
                            <div className="notification-icon-div">
                              <Icon onClick={handleOpenNotification}
                                className="notify"
                                icon="ion:notifications-outline"
                                width="24"
                                height="24"
                                style={{ color: "white" }}
                              />
                              {openNotification? ( 
                              <div className="the-notification">
                                  <CsoNotifications />
                              </div>
                              ): ""}
                            </div>
                          </div>
                        )}
        </CsoNavRap>
    )
}
export default CsoNav