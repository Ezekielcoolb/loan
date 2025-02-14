import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"


const HomeRap = styled.div`
height: 100vh;
background: #101828;
.home-upper h2 {
    color: #ffffff;
    font-size: 20px;
    font-weight: 700
}
.login-btn {
    font-size: 14px;
    font-weight: 500;
    color: #101828;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 15px;
    white-space: nowrap;
}
.log-div {
    position: relative;
}
.login-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border-radius: 20px;
    z-index: 1000;
    background: #ffffff;
    position: absolute;
    right: 0px;
    width: fit-content;
}
.login-btn:hover {
    background: #101828;
    color: #ffffff;
}
.home-upper {
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    border-bottom: 1px solid #FFFFFF1A;
    align-items: center;

}
.small-top-div p {
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  }
  .small-top-div span {
    width: 9px;
    height: 9px;
    background: #0067d0;
    border-radius: 50%;
  }
  .small-top-div {
    background: #ffffff0a;
    display: flex;
    align-items: center;
    border-radius: 100px;
    padding: 5px 10px;
    gap: 10px;
    width: fit-content;
  }
  .home-sub-1 h1 {
    color: #ffffff;
    font-weight: 600;
    line-height: 65px;
    max-width: 514px;
    font-size: 65px;
  }
  .home-sub-1 p {
    color: #a5acbb;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    max-width: 475px;
  }
  .hire,
  .become {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0067d0;
    width: 100px;
    height: 50px;
    border-radius: 100px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
  .become {
    background: transparent;
    border: 1px solid #ffffff26;
  }
  .home-1-btn {
    display: flex;
    gap: 15px;
  }
  .home-sub-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .home-1 {
    padding-top: 70px;
    padding-bottom: 70px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  img {
    height: 380px;
    border-radius: 30px;
  }
`

const Home = () => {
    const [dropdown, setDropdown] = useState(false)


    const handleClick = () => {
        setDropdown(!dropdown)
    }
    return (
        <HomeRap>
            <div className="home-upper">
                <h2>JK SOLUTION</h2>
                <div className="log-div">
                <button onClick={handleClick} className="hire">Login</button>
                {dropdown ? (
                <div className="login-div">
                    <Link to="/superAdminLogin" className="login-btn">As Admin</Link>
                    <Link to="/disburseLogin" className="login-btn">As Disbursement officer</Link>
                    <Link to="/managerLogin" className="login-btn">As Manager</Link>
                    <Link to="/csoLogin" className="login-btn">As CSO</Link>
                </div>
                ): ""}
                </div>
            </div>
 <div className="home-1 containery">
        <div className="home-sub-1">
          <div className="small-top-div">
            <span></span>
            <p>Find solution to your loan problem →</p>
          </div>
          <h1>Get your loan with low interest rate with us!</h1>
          <p>
          We put our customers at the heart of everything we do, ensuring your satisfaction is our top priority. 
          Your needs drive us, and we’re here to exceed your expectations
          </p>
         
        </div>
        <div>
          <img src="/images/loan_logo.jpg" alt="" />
        </div>
      </div>
        </HomeRap>
    )
}

export default Home