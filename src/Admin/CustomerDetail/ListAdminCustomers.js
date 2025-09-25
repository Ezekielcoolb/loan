import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLoan, fetchAdminLoans, fetchAdminLoansNewOne, fetchAdminLoansSearch } from '../../redux/slices/LoanSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  .search-div {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .search-position {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .search-div input {
    width: 259px !important;
    height: 38px !important;
    padding: 0px 10px;
    border-radius: 8px !important;
    border: 1px solid #dbe0ee !important;
  }

  .search-div p {
    color: #9499ac;
    font-weight: 600;
    font-size: 14px;
  }
`

const AdminCustomerTable = () => {
  const dispatch = useDispatch();
  const { loans, pagination, loading, error } = useSelector((state) => state.loan);
  const itemsPerPage = 15;
 const [search, setSearch] = useState('');
  

  console.log(loans);
  


  // Calculate total pages
  const totalPages = Math.ceil(loans?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current items to display
  const currentLoans = loans?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


 useEffect(() => {
     dispatch(fetchAdminLoansNewOne({ page: 1, limit: 20 }));
   }, [dispatch]);
 
   const handlePageChange = (newPage) => {
     dispatch(fetchAdminLoansNewOne({ page: newPage, limit: pagination.limit }));
   };


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
    
  // }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
        dispatch(deleteLoan(id));
    }
};

    
  return (
    <TableRap>
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
          {loans?.slice().reverse().map((loan) => (
            <tr key={loan._id} >
              <td>
                {loan.customerDetails.firstName} {loan.customerDetails.lastName}
              </td>
              <td>{loan.customerDetails.address}</td>
              <td>{loan.customerDetails.phoneOne}</td>
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
         <button
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
          className="page-btn"
        >
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
          className=""
        >
          Next
        </button>
      </div>
    </div>
    </div>
    </TableRap>
  );
};

export default AdminCustomerTable;
