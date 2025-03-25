import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLoan, fetchAdminLoans } from '../../redux/slices/LoanSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TableRap = styled.div`
 .page-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  .page-btn {
    width: 100px;
    height: 30px;
    color: #005e78;
    border-radius: 10px;
    border: 1px solid #005e78;
  }
`

const AdminCustomerTable = () => {
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector((state) => state.loan);
  const itemsPerPage = 15;

  useEffect(() => {
    dispatch(fetchAdminLoans());
  }, [dispatch]);
  // Calculate total pages
  const totalPages = Math.ceil(loans?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current items to display
  const currentLoans = loans?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination click
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
        dispatch(deleteLoan(id));
    }
};

    
  return (
    <div>
      <h2 >Customers</h2>
      {loading && <p>Loading...</p>}
      {error && <p >Error: {error}</p>}
      <div className="table-container">
              <div className="new-table-scroll">
                <div className="table-div-con">
                  <table className="custom-table" border="1">

        <thead>
          <tr >
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Amount Requested</th>
            <th>Amount Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLoans?.reverse().map((loan) => (
            <tr key={loan._id} >
              <td>
                {loan.customerDetails.firstName} {loan.customerDetails.lastName}
              </td>
              <td>{loan.customerDetails.address}</td>
              <td>{loan.customerDetails.email}</td>
              <td>{loan.loanDetails.amountRequested}</td>
              <td>{loan.loanDetails.amountApproved}</td>
              <td>  <Link to={`/admin/downloadLoanForm/${loan._id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      <div className="page-div">
        <button  className="page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminCustomerTable;
