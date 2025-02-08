import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchWaitingLoans } from "../../redux/slices/LoanSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";


const GurarantoRap = styled.div`
padding: 30px;
.guarantor-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}
.guarantor-pic img {
    min-width: 300px;
    max-width: 600px;
    height: 500px;
}
.header {
    display: flex;
    align-items: center;
    gap: 10px;
}
`


const GuarantorDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
 
    const loans = useSelector((state) => state.loan.loans);
    const loan = loans.find((loan) => loan._id === id);




      // Fetch loans if not already in the Redux store
      useEffect(() => {
        if (!loan) {
          dispatch(fetchWaitingLoans());
        }
      }, [loan, dispatch]);
    return (
        <GurarantoRap>
            <div className="header">
            <Link
              style={{ marginLeft: "-50px" }}
              className="cso-link"
              to={`/loan/${id}`}
            >
              <Icon
                icon="formkit:arrowleft"
                width="90"
                height="16"
                style={{ color: "black", cursor: "pointer" }}
              />
            </Link>
            <h4>Uploaded Guarantor Form Picture</h4>

            </div>
            
 <div className="guarantor-pic">
                  <img src={loan?.guarantorFormPic} alt="" />
                </div>
        </GurarantoRap>
    )
}

export default GuarantorDetails