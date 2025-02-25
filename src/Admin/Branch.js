import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLoanBranches } from '../redux/slices/branchLoanSlice';
import styled from 'styled-components';
import { MoonLoader, PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react/dist/iconify.js';
import { createBranch } from '../redux/slices/branchSlice';


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
.client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-top: 20px;
  }
  .client-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 15px;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .client-dropdown-container {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    display: flex;

    justify-content: flex-end;

    background: rgba(0, 0, 0, 0.3); /* Semi-transparent dark background */
    backdrop-filter: blur(1px); /* Adds a blur effect */
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0px;
  }
  .client-dropdown-container.hidden {
    display: none;
  }
  .client-all-dropdown-div {
    width: 430px;
    overflow-y: auto;
    top: 18px;
    right: 18px;
    min-height: 546px;
    margin-right: 20px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;

    background: #ffffff;
    padding-bottom: 15px;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    color: #60667a;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
  }
  .client-dropdown-header {
    display: flex;
    height: 55px;
    justify-content: space-between;
    align-items: center;
    background: #f7f7f8;
    border-bottom: 1px solid #d0d5dd;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 15px;
  }
  .client-dropdown-div {
    padding: 15px;
    display: flex;

    flex-direction: column;
    gap: 15px;
    padding-bottom: 20px;
  }

  .client-dropdown-div::-webkit-scrollbar {
  height: 3px; /* Set scrollbar width */
 
}

.client-dropdown-div::-webkit-scrollbar-thumb {
  background: #888; /* Scrollbar thumb color */
  border-radius: 4px; /* Optional for rounded scrollbar */
}

.client-dropdown-div::-webkit-scrollbar-thumb:hover {
  background: #555; /* Thumb hover color */
}

.client-dropdown-div::-webkit-scrollbar-track {
  background: #f1f1f1; /* Scrollbar track color */
}

/* Hide Up and Down Arrows in Scrollbar */
.client-dropdown-div::-webkit-scrollbar-button {
  display: none; /* Hides the arrows */
}
  .client-dropdown-div input {
    width: 380px;
    height: 45px;
    border: 1px solid #dbe0ee;
    border-radius: 10px;
    margin-top: 10px;
    padding-left: 10px;
  }

  .client-small-input-div {
    padding-left: 5px;
    width: 182.5px !important;
    height: 45px;
    border-radius: 8px;
    border: 1px solid #dbe0ee;
    margin-top: 4px;
  }
  .client-input-div {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .client-create-btn {
    background: #0c1d55;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    border-style: none;
  }
  .save-cancel-div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .client-cancel-btn {
    border: 1px solid #dbe0ee;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dbe0ee;
    background: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }
  .create-new-client {
    width: 128px;
    height: 38px;
    border-radius: 6px;
    background: #12d27d;
    color: #ffffff;
    text-decoration: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const BranchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
   const [activeLink, setActiveLink] = useState("cso");
    const [dropdownVisible, setDropdownVisible] = useState(false);
  const { branches, loading, error } = useSelector((state) => state.loanBranches);
 const [formData, setFormData] = useState({
    name: "", 
    supervisorName: "",
    supervisorEmail: "",
    supervisorPhone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });


  const isValid =
    formData.name !== "" &&
    formData.supervisorName !== "" &&
    formData.supervisorEmail !== "" &&
    formData.address !== "" &&
    formData.supervisorPhone !== "" &&
    formData.city !== "" &&
    formData.state !== "" &&
    formData.zipcode !== "" &&
    formData.country !== "" ;
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
          try {
            setIsLoading(true)
            dispatch(createBranch(formData));
            setDropdownVisible(false);
            setFormData({
                name: "", 
                supervisorName: "",
                supervisorEmail: "",
                supervisorPhone: "",
                address: "",
                city: "",
                state: "",
                zipcode: "",
                country: "",
            });
            setIsLoading(false)
          } catch (error) {
            setIsLoading(false)
    
            toast.error("Failed to create branch");
          }
        }
      };


  useEffect(() => {
    dispatch(fetchLoanBranches());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically
    }));
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (loading) return <p style={{display: "flex", 
    flexDirection: "column", 
    height: "90vh",
    justifyContent: "center",
   alignItems: "center"}} > <MoonLoader /></p>;;
  if (error) return <div>Error: {error}</div>;

    return (
        <BranchRap>

<div className="client-1">
          <div className="client-link-container">
            <Link
              className={`client-link ${activeLink === "cso" ? "active" : ""}`}
              onClick={() => handleLinkClick("cso")}
            >
              Branch
            </Link>
          </div>
          <div>
            <Link onClick={toggleDropdown} className="create-new-client">
              Add New Branch
            </Link>
          </div>

          {/* Dropdown for Create New Case */}
          <div
            className={`client-dropdown-container ${
              dropdownVisible ? "" : "hidden"
            }`}
            style={{ marginTop: "10px" }}
          >
            <div className="client-all-dropdown-div">
              <div className="client-dropdown-header">
                <h4>Add Branch</h4>
                <Icon
                  onClick={() => setDropdownVisible(false)}
                  icon="uil:times"
                  width="16"
                  height="16"
                  style={{ color: "black", cursor: "pointer" }}
                />
              </div>

              <div className="client-dropdown-div">
               

                <div className="client-input-div">
                  <label>
                    Branch Name
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </label>
                  <label>
                    Supervisor Name
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      name="supervisorName"
                      onChange={handleChange}
                      value={formData.supervisorName}
                    />
                  </label>
                </div>

                <label>
                Supervisor email
                  <span className="star">*</span> <br />
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.supervisorEmail}
                    name="supervisorEmail"
                  />
                </label>

                <label>
                Supervisor Number
                  <span className="star">*</span> <br />
                  <input
                    type="number"
                    placeholder=""
                    onChange={handleChange}
                    name="supervisorPhone"
                    value={formData.supervisorPhone}
                  />
                </label>
                <label>
                 Address
                  <span className="star">*</span> <br />
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="address"
                    value={formData.address}
                  />
                </label>
                <label>
                  City
                  <span className="star">*</span> <br />
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="city"
                    value={formData.city}
                  />
                </label>
                
                <label>
                  State
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="state"
                    value={formData.state}
                  />
                </label>

                <div className="client-input-div">
                  <label>
                    Zip Code
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={formData.zipcode}
                      name="zipcode"
                    />
                  </label>

                  <label>
                  Country
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      name="country"
                      value={formData.country}
                    />
                  </label>
                </div>

               

                <div className="save-cancel-div">
                  <Link
                    className="client-cancel-btn"
                    onClick={() => setDropdownVisible(false)}
                  >
                    Cancel
                  </Link>
                  <button
                    className="client-create-btn"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid ? "#0c1d55" : "#727789",
                      cursor: !isValid ? "not-allowed" : "pointer",
                    }}
                  >
                      {isLoading ? (
                      <>
<PulseLoader
  color="white"
  size={10}
/>
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


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
                        <th>Total Principal + <br /> Interest</th>
                        <th>Total Actual Paid</th>
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
                            <Link to={`/admin/branches/${branch.name}`} >
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
