import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewLoanRap = styled.div`
  width: 100%;
  padding: 20px;
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #727789;
  }
  .left-drop-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 50%;
    padding: 0px 15px;
    border-right: 1px solid #d0d5dd;
  }
  .left-drop-div p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #030b26;
    font-weight: 700;
    font-size: 14px;
  }
  .right-drop-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .right-drop-div h4 {
    color: #030b26;
  }
  .left-drop-div span {
    font-size: 14px;
    font-weight: 400;
    color: #727789;
  }
  .customer-pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgb(222, 225, 235);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .verify-btn {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 100px;
    height: 30px;
    background: #0c1d55;
    padding: 10px;
    border-radius: 10px;
  }
  .dropdown-div {
    display: flex !important;
    padding: 0px !important;
  }
  .flex-verify {
    display: flex;
    gap: 10px;
  }
  .flex-verify p {
    max-width: 120px;
    font-size: 12px;
  }
  .edit-client {
    height: 30px;
    width: 90px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: green;
  }
  .reject-btn {
    background-color: red !important;
  }
  .delete-client {
    height: 30px;
    width: 86px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c1d55;
    border: 1px solid #dbe0ee;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #ffffff;
  }
  .edi-del-btn {
    display: flex;
    margin: 15px;
    gap: 10px;
    border-top: 1px solid #dbe0ee;
    padding-top: 15px;
  }
  .approve-can-btn {
    display: flex;
   
    gap: 10px;
    
  }
  .amount-approved  input{
    border-style: none;
    background:rgb(234, 234, 239);
    height: 35px;
    width: 250px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .approve, .reject {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 150px;
    height: 40px;
    background: #0c1d55;
    padding: 10px;
    border-radius: 10px;
  }
  .approve-cancel {
    width: 150px;
    height: 40px;
  }
  .reject {
    background: red;
  }
  .perform-action {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .perform-action  div {
    display: flex;
    gap: 20px;
  }
`;

// Initial loan request data
const initialLoanRequests = [
  {
    id: 1,
    pic: "JD",
    name: "John Doe",
    amount: 50000,
    businessType: "Retail",
    businessSize: "Small",
    bvn: "12345678901",
    accountNumber: "1234567890",
    phone: "000000000",
    bank: "XYZ Bank",
    status: "Waiting Approval",
    address: "123 Main St, City, Country",
    guarantor: "Jane Doe",
    guarantorNo: "07098765432",
    cso: "Officer A",
    association: "Iya Alata",
  },
  {
    id: 2,
    pic: "SS",
    name: "Sarah Smith",
    amount: 100000,
    businessType: "Wholesale",
    businessSize: "Medium",
    bvn: "98765432109",
    phone: "000000000",
    accountNumber: "0987654321",
    bank: "ABC Bank",
    status: "Waiting Approval",
    address: "456 Elm St, City, Country",
    guarantor: "Mark Smith ",
    guarantorNo: "07098765432",
    cso: "Officer B",
    association: "Bread committe",
  },
  {
    id: 2,
    pic: "JS",
    name: "Johnson Smith",
    amount: 500000,
    businessType: "Wholesale",
    businessSize: "Large",
    bvn: "00765432109",
    phone: "000000000",
    accountNumber: "0987654321",
    bank: "RTY Bank",
    status: "Waiting Approval",
    address: "456 Sol St, City, Country",
    guarantor: "John Smith",
    guarantorNo: "07098765432",
    cso: "Officer B",
    association: "Bread committe",
  },
];

const NewLoan = () => {
  const [loanRequests, setLoanRequests] = useState(initialLoanRequests);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [takeAction, setTakeAction] = useState(false);
  const [rejection, setRejection] = useState(false);

const handleApproveReject = () => {
  setRejection(true)
   
}
  const handleLoanApprove = () => {
    setTakeAction(true)
   
  }
  // Handle approving loan
  const approveLoan = (id) => {
    const updatedLoans = loanRequests.map((loan) =>
      loan.id === id ? { ...loan, status: "Loan Approved" } : loan
    );
    setLoanRequests(updatedLoans);
    setSelectedCustomer(null);
  };

  // Handle rejecting loan
  const rejectLoan = (id) => {
    const updatedLoans = loanRequests.map((loan) =>
      loan.id === id ? { ...loan, status: "Not Approved" } : loan
    );
    setLoanRequests(updatedLoans);
    setSelectedCustomer(null);
  };

  return (
    <NewLoanRap>
      <div>
        <h2>Loan Requests</h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Loan Request</th>
                <th>Business Type</th>
                <th>Business Size</th>
                <th>BVN</th>
                <th>Account Number</th>
                <th>Bank</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr
                  key={loan.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCustomer(loan)}
                >
                  <td>{loan.name}</td>
                  <td>₦{loan.amount.toLocaleString()}</td>
                  <td>{loan.businessType}</td>
                  <td>{loan.businessSize}</td>
                  <td>{loan.bvn}</td>
                  <td>{loan.accountNumber}</td>
                  <td>{loan.bank}</td>
                  <td
                    style={{
                      color:
                        loan.status === "Waiting Approval"
                          ? "blue"
                          : loan.status === "Loan Approved"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {loan.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Customer Details Modal */}
          {selectedCustomer && (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="dropdown-header">
                  <h3>Customer Details</h3>
                  <Icon
                    onClick={() => setSelectedCustomer(null)}
                    icon="uil:times"
                    width="16"
                    height="16"
                    style={{ color: "black", cursor: "pointer" }}
                  />
                </div>
                <div className="dropdown-div">
                  <div className="left-drop-div">
                    <div className="customer-pic">{selectedCustomer.pic}</div>
                    <p>
                      <span>Name:</span> {selectedCustomer.name}
                    </p>
                    <p>
                      <span>Address:</span> {selectedCustomer.address}
                    </p>
                    <p>
                      <span>Phone Number:</span> {selectedCustomer.phone}
                    </p>
                    <p>
                      <span>Guarantor:</span> {selectedCustomer.guarantor}
                    </p>
                    <p>
                      <span>Guarantor Number:</span>{" "}
                      {selectedCustomer.guarantorNo}
                    </p>
                    <p>
                      <span>Amount:</span> ₦
                      {selectedCustomer.amount.toLocaleString()}
                    </p>
                    <p>
                      <span>Business Type:</span>{" "}
                      {selectedCustomer.businessType}
                    </p>
                    <p>
                      <span>Business Size:</span>{" "}
                      {selectedCustomer.businessSize}
                    </p>
                    <p>
                      <span>Cso:</span> {selectedCustomer.cso}
                    </p>
                  </div>

                  <div className="right-drop-div">
                    <h4>Verification</h4>

                    <div className="flex-verify">
                      <p>Ask CSO for more information</p>
                      <Link className="verify-btn">Call</Link>
                    </div>
                    <div className="flex-verify">
                      <p>Verify past loan record for existing customer</p>
                      <Link className="verify-btn">Verify</Link>
                    </div>

                    <div className="flex-verify">
                      <p>Send verification form to guarantor</p>
                      <Link className="verify-btn">Send</Link>
                    </div>
                    <div className="flex-verify">
                      <p> Enable CSO to change customer information</p>
                      <Link className="verify-btn">Enable</Link>
                    </div>
                    <div className="flex-verify ">
                      <Link className="verify-btn">Call Customer</Link>
                      <Link className="verify-btn">Call Guarantor</Link>
                    </div>
                    <Link className="verify-btn">Verify BVN</Link>
                    <div className="flex-verify">
                      <p> Enable CSO to change customer information</p>
                      <Link className="verify-btn">Enable</Link>
                    </div>
                  </div>
                </div>
                <div className="edi-del-btn">
                  {!takeAction   ?
                  <>
                  <Link  onClick={handleLoanApprove}className="edit-client">
                   Approve
                  </Link>
                  <Link onClick={handleApproveReject} className="edit-client reject-btn">
                   Reject
                  </Link>
                  <Link
                    onClick={() => setSelectedCustomer(null)}
                    className="delete-client"
                  >
                    Cancel
                  </Link>
                  </>
                  : 
                  <div className="amount-approved">
                   <input  type="number" placeholder="Input amount approved" />
                 <div className="approve-can-btn">
                   
                  <Link  onClick={() => approveLoan(selectedCustomer.id)}className="edit-client ">
                   Approve
                  </Link>
                  <Link
                    onClick={() => setTakeAction(false)}
                    className="delete-client"
                  >
                    Cancel
                  </Link>
                  </div> 
                  </div>}
                {rejection ? (<>
                  <div className="amount-approved">
                   <input  type="text" placeholder="Input reason for rejection" />
                 <div className="approve-can-btn">
                   
                  <Link  onClick={() => rejectLoan(selectedCustomer.id)} className="edit-client reject-btn">
                   Reject
                  </Link>
                  <Link
                    onClick={() => setRejection(false)}
                    className="delete-client"
                  >
                    Cancel
                  </Link>
                  </div> 
                  </div>
                  </>): ""}
                </div>
              
              </div>
            </div>
          )}


        </div>
      </div>
    </NewLoanRap>
  );
};

export default NewLoan;
