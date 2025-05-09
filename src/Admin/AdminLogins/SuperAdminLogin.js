import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { superAdminLogin } from "../../redux/slices/authSlice";
import { ClipLoader, PulseLoader } from "react-spinners";

const CsoLoginRap = styled.div`
height: 100vh;
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
font-size: 16px;
font-weight: 500;
color: #005E7880;
background-color: #f4f4f4;
.disburse-off h2 {
  font-size: 20px;
  font-weight: 900;
  color: #005E7880;

}
.disburse-off p {
  font-size: 12px;
  font-weight: 450;
  color: #60667a;

}
.disburse-off  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
input {
    width: 334px;
    color: #005E7880;
    height: 55px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #005E78
}
.login-input-div {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.login-btn {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #005E78;
    width: 334px;
    height: 55px;
    border-radius: 15px;
    color: #97B434;
    font-size: 16px;
    font-weight: 500;
}
.loan-img {
    width: 160px;
    height: 116px;
}
.loan-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.all-login-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;

}
`;

const SuperAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {adminToken,  superUser, error } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false)
  

    const handleLogin = () => {
      try {
      setIsLoading(true)

      dispatch(superAdminLogin({ email, password }));
      setIsLoading(false)
      }  catch(e){
        console.log(e)
    }

    };
    useEffect(() => {
        if (adminToken) {
            navigate("/admin");
            localStorage.setItem("superAdminToken", adminToken);
        }
      }, [adminToken, navigate]);

      
  return (
    <CsoLoginRap>
      <div className="all-login-div">
        <div className="loan-img">
            <img src="/images/login_img.png" alt="" />
        </div>
        <div className="disburse-off">
        <h2>Welcome back Super Admin!</h2>
        <p>Sign in to your account</p>
        </div>
        <div className="login-input-div">
          <input  type="email" placeholder="Enter your email"  value={email}
        onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter your password"  value={password}
        onChange={(e) => setPassword(e.target.value)}/>
          <Link onClick={handleLogin} className="login-btn">
          {isLoading ? 
      
      <PulseLoader color="white"  />
        : "Login"
  }
          </Link>
        </div>


     
      </div>
    </CsoLoginRap>
  );
};

export default SuperAdminLogin;
