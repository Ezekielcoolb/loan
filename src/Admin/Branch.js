import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLoanBranches } from '../redux/slices/branchLoanSlice';
import styled from 'styled-components';


const BranchRap = styled.div` 
.branch-1 h1{
    font-weight: 700;
    font-size: 20px;
    padding: 20px;
}
.branch-1 {
    background: #ffffff;
    border-radius: 15px;
    margin: 20px;
}
`

const BranchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branches, loading, error } = useSelector((state) => state.loanBranches);

  useEffect(() => {
    dispatch(fetchLoanBranches());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
        <BranchRap>
        <div className='branch-1'>
            <h1>Branch List</h1>
            <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Supervisor Name</th>
                        <th>Supervisor Phone</th>
                        <th>Total Loan Disbursed</th>
                        <th>Total Amount To Be Paid</th>
                        <th>Total Amount Paid</th>
                        <th>Loan Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map(branch => (
                        <tr key={branch._id}>
                            <td>{branch.name}</td>
                            <td>{branch.address}</td>
                            <td>{branch.supervisorName}</td>
                            <td>{branch.supervisorPhone}</td>
                            <td>{branch.totalLoanDisbursed}</td>
                            <td>{branch.totalAmountToBePaid}</td>
                            <td>{branch.totalAmountPaid}</td>
                            <td>{branch.totalAmountToBePaid - branch.totalAmountPaid}</td>
                            <td>
                            <Link to={`/branches/${branch.name}`} >
                View Details
              </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            </div>
        
        </div>
        </BranchRap>
    );
};

export default BranchList;
