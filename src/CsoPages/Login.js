import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, login } from "../redux/slices/authSlice";
import { ClipLoader } from "react-spinners";

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
.message-para {
  color: #005E78;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  right: 10px;
  top: 40px;
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
    gap: 100px;

}
`;

const CsoLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token, message,  user, error } = useSelector((state) => state.auth);
      const [isLoading, setIsLoading] = useState(false)
  
console.log(message);

    const handleLogin = () => {
      setIsLoading(true)

      dispatch(login({ email, password }));
      setIsLoading(false)

    };
    useEffect(() => {
      if (message || error) {
        setTimeout(() => {
          dispatch(clearMessage());
        }, 5000);
      }
    }, [message, error, dispatch]);
    useEffect(() => {
        if (token) {
          navigate("/cso"); // Redirect to the protected route
        }
      }, [token, navigate]);

      
  return (
    <CsoLoginRap>
      {message !==null ? (
        <p className="message-para">{message}</p>
      ): ""}
      <div className="all-login-div">
        <div className="loan-img">
            <img src="/images/login_img.png" alt="" />
        </div>
        <div className="login-input-div">
          <input  type="email" placeholder="Enter your email"  value={email}
        onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter your password"  value={password}
        onChange={(e) => setPassword(e.target.value)}/>
          <Link onClick={handleLogin} className="login-btn">
          {isLoading ? 
      
      <ClipLoader color="white" size={10} />
        : "Login"
  }
          </Link>
        </div>


     
      </div>
    </CsoLoginRap>
  );
};

export default CsoLogin;
