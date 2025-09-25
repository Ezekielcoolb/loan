import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchAdminLoans, fetchAdminLoansNewOne, fetchAdminLoansSearch } from '../redux/slices/LoanSlice';
import { Icon } from '@iconify/react/dist/iconify.js';

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

const ManagerListCustomer = () => {
  const dispatch = useDispatch();
  const { loans, loading, pagination, error } = useSelector((state) => state.loan);
  const itemsPerPage = 15;
   const [search, setSearch] = useState('');
  

  // useEffect(() => {
  //   dispatch(fetchAdminLoans());
  // }, [dispatch]);


   useEffect(() => {
    dispatch(fetchAdminLoansNewOne({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchAdminLoansNewOne({ page: newPage, limit: pagination.limit }));
  };
  // Calculate total pages
  const totalPages = Math.ceil(loans?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current items to display
  const currentLoans = loans?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    useEffect(() => {
      const debounce = setTimeout(() => {
        dispatch(fetchAdminLoansSearch(search));
      }, 400); // debounce delay
  
      return () => clearTimeout(debounce);
    }, [search, dispatch]);
  

  // Handle pagination click
  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };
  return (
    <div>
      <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              
            }}>
            <h2 >Customers</h2>
      
             <div className='search-div' style={{ position: "relative" }}>
                            <input  value={search}
                             onChange={e => setSearch(e.target.value)}
                             type="text" placeholder="search" />
                            <Icon
                              className="search-position"
                              icon="material-symbols-light:search"
                              width="18"
                              height="18"
                              style={{ color: "#9499AC" }}
                            />
                          </div>
             
            </div>
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
            <th>Phone Number</th>
            <th>Amount Requested</th>
            <th>Amount Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLoans?.slice().reverse().map((loan) => (
            <tr key={loan._id} >
              <td>
                {loan.customerDetails.firstName} {loan.customerDetails.lastName}
              </td>
              <td>{loan.customerDetails.address}</td>
              <td>{loan.customerDetails.phoneOne}</td>
              <td>{loan.loanDetails.amountRequested}</td>
              <td>{loan.loanDetails.amountApproved}</td>
              <td>  <Link to={`/manager/downloadLoanForm/${loan._id}`}>View Details</Link>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

       <div className="page-div">
        <button className="page-btn"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button className="page-btn"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          Next
        </button>
      </div>
      {/* <div className="page-div">
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
      </div> */}
    </div>
    </div>
  );
};

export default ManagerListCustomer;
