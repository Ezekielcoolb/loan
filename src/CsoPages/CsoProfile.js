import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileRap = styled.div`
  padding: 20px;
  padding-bottom: 40px;
  .profile h4 {
    color: #005e78;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
  }
  .profile-1 label {
    color: #005e78;
    font-size: 16px;
    font-weight: 500;
  }
  .profile-1 p {
    background: #eeeeee;
    padding: 10px;
    width: 333px;
    border-radius: 20px;
    color: #005e78;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  .profile-1 img {
    border: 4px solid #005e78;
    background: #d9d9d9;
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
  .profile-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  .profile-2 h5 {
    color: #005e78;
    font-size: 18px;
    font-weight: 500;
  }
  .profile-2 p {
    color: #005e78;
    font-size: 12px;
    font-weight: 400;
  }
  .profile-2 input {
    border: 1px solid #005e78;
    background: #ffffff;
    width: 333px;
    height: 55px;
    border-radius: 15px;
    padding-left: 10px;
  }
  .profile-2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  .profile-2-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .save-btn {
    background: #005e78;
    box-shadow: 4px 4px 5px 0px #005e7833;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    color: #d9d9d9;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
 
`;

const CsoProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGoBachHome = () => {
    navigate("/cso");
  };

  return (
    <ProfileRap>
      <Icon
        onClick={handleGoBachHome}
        className="cancle-icon"
        icon="stash:times-circle"
        width="24"
        height="24"
        style={{ color: "#005e78", cursor: "pointer" }}
      />
      <div className="profile">
        <h4>Profile</h4>

        <div className="profile-1">
          <img src={user.profileImg} alt="" />
          <label>
            Names in full
            <p>
              {user.lastName} {user.firstName}
            </p>
          </label>
          <label>
            Address
            <p>{user.address}</p>
          </label>
          <label>
            Email
            <p>{user.email}</p>
          </label>
          <label>
            Phone number
            <p>{user.phone}</p>
          </label>
          <label>
            Date Employed
            <p>{user.date}</p>
          </label>
          <label>
            Branch Associated
            <p>{user.branch}</p>
          </label>
        </div>
        <div className="profile-2">
          <div>
            <h5>Security</h5>
            <p>Reset Password</p>
          </div>
          <div className="profile-2-div">
            <input type="text" placeholder="current password" />
            <input type="text" placeholder="New password" />
            <input type="text" placeholder="Confirm password" />
            <Link className="save-btn">Save Changes</Link>
          </div>
        </div>
      </div>
    </ProfileRap>
  );
};

export default CsoProfile;
