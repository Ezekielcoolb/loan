import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import { updateCsoPassword } from "../redux/slices/authSlice";

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
  .profile-image {
    border: 4px solid #005e78;
    background: #d9d9d9;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-image img {
    width: 110px;
    height: 110px;
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
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successPop, setSuccessPop] = useState(false);
  const { user, csoSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitValid =
    currentPassword !== "" &&
    newPassword !== "" &&
    confirmPassword !== "" &&
    currentPassword === user.password &&
    newPassword === confirmPassword;

  const adminId = user?._id;

  console.log(csoSuccess);

  const handleGoBachHome = () => {
    navigate("/cso");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitValid) {
      try {
        dispatch(updateCsoPassword({ id: adminId, newPassword }));
        setSuccessPop(true);

        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
      } catch (e) {
        console.log(e);
      }
    }
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
          <div className="profile-image">
            <img src={user.profileImg} alt="" />
          </div>
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
            <input
              type="text"
              placeholder="current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="New password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button onClick={handleSubmit}
              className="save-btn"
              disabled={!submitValid}
              style={{
                backgroundColor: submitValid ? "#0c1d55" : "#727789",
                cursor: !submitValid ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <>
                  <PulseLoader color="white" size={10} />
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
      {successPop ? (
      <div className="dropdown-container">
        <div className="successPop">
            <p>{csoSuccess}</p>
            <button onClick={() => setSuccessPop(false)}>Exit</button>
        </div>

      </div>
      ) : ""}
    </ProfileRap>
  );
};

export default CsoProfile;
