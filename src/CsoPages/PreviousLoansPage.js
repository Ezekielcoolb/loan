import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchAllLoansByCsoId,
  fetchFullyPaidLoans,
} from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const PreviousRap = styled.div`
background: #EAEAEA;
min-height: 100vh;
th,
  td,
  tr,
  table,
  thead,
  tbody {
    border: none;
    color: #005e78;
    font-size: 16px;
    background-color: transparent !important;
  }
  th {
    padding: 5px;
    font-weight: 700;
  }
  td {
    font-weight: 400;
    padding: 5px;
    white-space: nowrap;
    text-align: center;
  }
  .table-div-con {
    min-width: 100%;
    min-height: 400px;
  }
  .customer-details-div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .no-other-loans {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #005e78;
    font-size: 18px;
    font-weight: 700;
  }
  .customer-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .customer-details h4 {
    color: #005e78;
    font-size: 16px;
    font-weight: 700;
  }

  a {
    color: #005e78;
    text-decoration: none;
    font-size: 12px !important;
    font-weight: 600 !important;
  }
  .customer-details p {
    color: #005e78;
    font-size: 12px;
    font-weight: 500;
  }
  .the-active-box h3 {
    color: #005e78;
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
  }
  .pay-now-button {
    background: #009a49;
    width: 114px;
    height: 91px;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .loan-balances h6, .disbursement-info h6  {
    color: #319f43;
    font-size: 12px;
    font-weight: 400;
  }
  .loan-balances h1 {
    color: #005e78;
    font-size: 24px;
    font-weight: 900;
  }
  .loan-balances, .disbursement-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .loan-take-action, .disbursement-info-divs{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .disbursement-info h3 {
    color: #005e78;
    font-size: 15px;
    font-weight: 900;
  }
  .all-payment-action-div {
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .active-loan-details {
    max-width: 500px;
    min-width: 409px;
   
    background: #ffffff;
    border-radius: 40px;
   
  }
  .loan-details-move-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
   
    padding: 20px;
    
  }
 
  .Customer-upper-details {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .Customer-upper-details h2 {
    color: #005e78;
    font-size: 24px;
    font-weight: 700;
    text-align: center;

  }
  .div-date-payment {
    border-top: 2px solid #005E78;
    border-radius: 40px;
margin-top: 50px;
    background: #DAF7FF;
padding: 30px;
display: flex;
flex-direction: column;

gap: 20px;
  }
  .div-date-payment h2 {
    color: #E33629;
font-size: 16px;
font-weight: 900;
text-align: center;
  }
  .check-loan-card {
    box-shadow: 2px 2px 4px 0px #005E7833;
animation-duration: 0ms;
background: #005E78;
width: 112px;
height: 38px;
border-style: none;
color: #D9D9D9;
font-size: 12px;
font-weight: 700;
border-radius: 10px;
margin: auto;

  }
  .cancel-icon {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

  }
  .the-current-loan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px;
    background: #DAF7FF;
    border: 1px solid  #005E78;
    border-radius: 20px;
    width: 140px;
    


  }
   .the-current-loan p {
    color: #319F43;
    font-size: 9px;
    font-weight: 400;

   }
   .the-current-loan h4 {
    color: #005E78;

    font-size: 16px;
    font-weight: 900;

   }
   .first-custom-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   .request-new-loan {
    border-radius: 10px;
    text-decoration: none;
    background: #DAF7FF;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #2D7F3A;
    font-size: 12px;
    font-weight: 800;
    padding: 10px;
   }
   .the-active-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
   }
`;

const PreviousLoans = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const loans = useSelector((state) => state.loan.loans);
  const { fullyPaidLoans, loading, error } = useSelector(
    (state) => state.loan || {}
  );
  const loan = loans.find((loan) => loan._id === id);
  const navigate = useNavigate();

  const bvn = loan?.customerDetails?.bvn;
  const csoId = user?.workId;

console.log(loan);
console.log(fullyPaidLoans);



  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    
      dispatch(fetchFullyPaidLoans(bvn));
    
  }, [bvn, id, dispatch]);


  const handleMoveBack = () => {
    navigate("/cso")
  }
  return (
    <PreviousRap>
      <div>
      <div className="Customer-upper-details">
             <div className="cancel-icon">
                      <Icon
                        onClick={handleMoveBack}
                        icon="stash:times-circle"
                        width="30"
                        height="30"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
            <h2>Customer's Loan Details</h2>
            <div className="first-custom-div">
              <div className="customer-details-div">
                <div>
                  <img
                    src={loan?.pictures?.customer}
                    alt="Customer"
                    width={79}
                    height={100}
                  />
                </div>
                <div className="customer-details">
                  <h4>
                    {`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}
                  </h4>
                  <p>{loan?.customerDetails?.address}</p>
                  <a href={`tel:${loan?.customerDetails?.phoneOne}`}>
  {loan?.customerDetails?.phoneOne}
</a>                  <p>{loan?.businessDetails?.businessName}</p>
                </div>
              </div>
              {/* <div className="the-active-box">
                <h3>Active Loan</h3>
              <div className="the-current-loan">
              {loan?.status === "active loan" ? (
                <>
                <p>Ammout Disbursed</p>
                <h4>{loan?.loanDetails?.amountApproved}</h4>
                <p>Total Paid</p>
                <h4>{loan?.loanDetails?.amountPaidSoFar}</h4>
                </>): <h4>No Active Loan</h4>}
              </div>
              {loan?.status === "fully paid" ? (
                <>
                <Link to={`/cso/minimalApplication/${loan?._id}`} className="request-new-loan">Request New Loan</Link>
                </>
              ): ""}
              </div> */}
            </div>
          </div>
          {fullyPaidLoans && fullyPaidLoans.length > 0 ? (
             <div className="">
             <div className="new-table-scroll">
               <div className="table-div-con">
                 <table className="" border="1" cellPadding="10">
                   <thead>
                     <tr>
                       <th>S/N</th> {/* Serial number column header */}
                       <th>Date</th>
                       {/* <th>Amount Requested</th> */}
                       <th>Principal +  Interest</th>
                       <th>Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {fullyPaidLoans?.map((customer, index) => (
                       <tr key={index}>
                         <td>{index + 1}</td>{" "}
                         {/* Serial number, starting from 1 */}
            <td>{customer?.disbursedAt ? new Date(customer.disbursedAt).toLocaleDateString('en-GB') : ''}</td>
                         {/* <td>{customer?.loanDetails?.amountRequested}</td> */}
                         <td>{customer?.loanDetails?.amountPaidSoFar}</td>
                         <td>{customer.status}</td> {/* Display status */}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
            </div>
          ): 
          <p className="no-other-loans">No previous loan found</p>
          }
      </div>
    </PreviousRap>
  );
};

export default PreviousLoans;
