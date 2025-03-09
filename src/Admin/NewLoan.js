import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteLoan, fetchWaitingLoans, setPages } from "../redux/slices/LoanSlice";
import { MoonLoader } from "react-spinners";

const NewLoanRap = styled.div`
.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  padding-bottom: 20px;
}
  
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
  .amount-approved input {
    border-style: none;
    background: rgb(234, 234, 239);
    height: 35px;
    width: 250px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .approve,
  .reject {
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
  .perform-action div {
    display: flex;
    gap: 20px;
  }
  .new-loan {
    margin: 20px;
  }
  .new-loan h2 {
    font-size: 20px;
    font-weight: 700;
  }
`;


const NewLoan = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const dispatch = useDispatch();
  const { loans, loading, totalPages, currentPage } = useSelector(
    (state) => state.loan
  );
  
  useEffect(() => {
    dispatch(fetchWaitingLoans({ page: currentPage }));
  }, [dispatch, currentPage]);


  
  const handlePageChange = (page) => {
    dispatch(setPages(page));
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPages(currentPage - 1));
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPages(currentPage + 1));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
        dispatch(deleteLoan(id));
    }
};

  
  if (loading === "loading") return <p style={{display: "flex", 
    flexDirection: "column", 
    height: "90vh",
    justifyContent: "center",
   alignItems: "center"}} > <MoonLoader /></p>;;
  if (loading === "failed") return <p>Error loading loans</p>;
  
  return (
    <NewLoanRap>
      <div className="new-loan">
        <div className="find-lawyer-header">
          <h2>Loan Requests</h2>
        </div>

        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Loan Requested</th>
                    <th>Business Name</th>
                    <th>Estimated Value</th>
                    <th>CSO in Charged</th>
                    <th>Branch Associated</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans?.map((loan) => (
                    <tr key={loan?._id}>
                      <td>{`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}</td>
                      <td>{loan?.loanDetails?.amountRequested}</td>
                      <td>{loan?.businessDetails?.businessName}</td>
                      <td>{loan?.businessDetails?.estimatedValue}</td>
                      <td>{loan?.csoName}</td>
                      <td>{loan?.branch}</td>
                      <td style={{color: "green"}}>{loan?.status}</td>
                      <td>
                        <Link to={`/admin/loan/${loan._id}`}>View Details</Link>
                      </td>
                      <td><button style={{background: "red", color: "white", padding: "10px", borderStyle: "none"}} onClick={() => handleDelete(loan._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           {/* Pagination Controls */}
     <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Render Page Numbers */}
        <div>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              style={{
                fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        </div>
      </div>
    </NewLoanRap>
  );
};

export default NewLoan;
