import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  setDropdownVisible,
  setDropSuccessVisible,
} from "../redux/slices/appSlice";
import LoanApplicationForm from "./CustomerLoanPop";
import {
  fetchAllLoansByCsoId,
  searchCustomer,
  setPage,
  updateGuarantorFormPic,
} from "../redux/slices/LoanSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const HomeCsoRap = styled.div`
  color: #005e78;

  .success-visible {
    background: #ffffff;
    padding: 20px;
  }
  .success-visible p {
    color: #005e78;
    font-size: 16px;
    font-weight: 500;
  }
  .success-visible button {
    border: 1px solid #005e78;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color: #005e78;
    margin-top: 15px;
  }

  input {
    background: #daf7ff;
    padding: 20px 40px;
    width: 333px;
    height: 45px !important;
    border-style: none;
    border-radius: 20px;
  }
  .input-div {
    position: relative;
  }
  .search-input-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .home-customers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 333px;
  }
  .home-customers h2 {
    color: #005e78;
    font-size: 24px;
    font-weight: 500;
  }
  .home-first-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
  }
  .homes {
    margin: auto;
    color: #005e78;

    padding-top: 20px;
  }
  .images-container {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping if there are more images than fit in one row */
    gap: 10px; /* Adds space between the images */
    justify-content: center; /* Centers images horizontally */
    align-items: center; /* Aligns images vertically */
    padding: 10px;
    list-style-type: none; /* Removes bullets from li elements */
  }
  .images-mapped {
    display: inline-block; /* Ensures each item is treated as an inline block for spacing */
    text-align: center;
    position: relative;
  }
  .circle-div {
    width: 12px;
    border-radius: 50%;
    height: 12px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .images-mapped img {
    width: 95px;
    height: 117px;
  }
  .custom-name {
    color: #005e78;
    font-size: 14px;
    font-weight: 700;
  }
  .custom-business {
    color: #005e78;
    font-size: 12px;
    font-weight: 400;
  }
  .pop-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 333px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
  }
  .popup p {
    font-size: 14px;
    font-weight: 600;
  }
  .close-pop-btn {
    border: 1px solid #005e78;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color: #005e78;
  }
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
  .gurantor-form-btn {
    background: #005e78;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border-style: none;
    height: 38px;
    padding: 0px 10px;
    border-radius: 10px;
    }
  .file-upload {
    position: relative;
    display: inline-block;
    cursor: pointer;

    overflow: hidden;
  }

  .hidden-input {
    display: none;
    padding: 10px;
  }

  .custom-file-upload {
    display: block;
    height: 43px;
    width: 304px;
    background: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    text-align: center;
    color: #005e7880;

    font-size: 20px;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  .custom-file-upload:hover {
    background-color: #e8e8e8;
  }

  .custom-file-upload:active {
    background-color: #ddd;
  }
`;

const CsoHome = () => {
  const { user } = useSelector((state) => state.auth);
  const { dropdowVisible, dropSuccessVisible } = useSelector(
    (state) => state.app
  );
  const [customerId, setCustomerId] = useState("");
  const [guarantorImage, setGuarantorImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [openGuarantorForm, setOpenGuarantorForm] = useState(false)
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupColor, setPopupColor] = useState("#005e78");
const [successGuarantorForm, setSuccessGuarantorForm] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { loans, status, error } = useSelector(
    (state) => state.loan
  );
  const [query, setQuery] = useState("");

  const csoId = user.workId;

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      dispatch(searchCustomer(e.target.value));
    }
  };
  const handleVisisble = () => {
    dispatch(setDropdownVisible());
  };

  const handleSuccessVisible = () => {
    dispatch(setDropSuccessVisible());
  };

 
  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);


  const handleGuarantorImage = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e[0]);
      form.append("upload_preset", "ml_default");
      const imageUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        form
      );
      setGuarantorImage(imageUrl.data.secure_url);
      // setFormData(formData.pictures.business === imageUrl.data.secure_url)
      console.log(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    if (guarantorImage) {
      setLoading(true);
      dispatch(
        updateGuarantorFormPic({ loanId: customerId, imageUrl: guarantorImage })

      );

      setLoading(false);
      setPopupMessage(null)
      setSuccessGuarantorForm(true)

    } else {
      alert("Please provide an image URL");
    }
  };
  // Handle customer click for different statuses

  const handleCustomerClick = (loan) => {
    let message = "";
    let color = "";
    if (loan?.status === "waiting for approval") {
      message = "Waiting for approval";
      color = "#005e78"; // Color for waiting for approval
      
      setCustomerId(loan?._id);
      setOpenGuarantorForm(true)
    } else if (loan?.status === "waiting for disbursement") {
      message = "Waiting for disbursement";
      color = "green"; // Color for waiting disbursement
    } else if (loan?.status === "rejected") {
      message = `Loan was rejected: ${loan?.rejectionReason}`;
      color = "red"; // Color for rejected loan
    } else if (loan?.status === "active loan") {
      // Redirect to the customer details page if status is "active loan"
      navigate(`/cso/customer-details/${loan?._id}`);
    }

    setPopupMessage(message);
    setPopupColor(color); // Store the color based on status
  };

  // Calculate total pages
  const totalPages = Math.ceil(loans?.length / itemsPerPage);

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
  };

  return (
    <HomeCsoRap>
      <div>
        <div className="homes">
          <div className="home-first-div">
            <div className="home-customers">
              <h2>Customers</h2>
              <Icon
                onClick={handleVisisble}
                className=""
                icon="simple-line-icons:plus"
                width="24"
                height="24"
                style={{ color: "#005e78" }}
              />
            </div>
            <div className="input-div">
              <input
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="Search"
              />
              <Icon
                className="search-input-icon"
                icon="ic:baseline-search"
                width="24"
                height="24"
                style={{ color: " #005E7880" }}
              />
            </div>
          </div>
          <ul>
            <div>
              <div className="images-container">
                {currentLoans?.reverse().map((loan, index) => (
                  <li
                    className="images-mapped"
                    key={index}
                    onClick={() => handleCustomerClick(loan)}
                  >
                    <img
                      src={loan?.pictures?.customer}
                      alt="Customer"
                      width={100}
                      height={100}
                    />
                    <h4 className="custom-name">
                      {loan?.customerDetails?.firstName}{" "}
                      {loan?.customerDetails?.lastName}
                    </h4>
                    <p className="custom-business">
                      {loan?.businessDetails?.businessName}
                    </p>
                    <div style={{
                      background: loan?.status === "waiting for approval" ? "green" :
                                  loan?.status === "waiting for disbursement" ? "orange" :
                                  loan?.status === "rejected" ? "red" : "blue"
                    }}   className="circle-div"></div>
                  </li>
                ))}
              </div>
               {/* Pagination Buttons */}
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
          </ul>
        </div>
      </div>
      {dropdowVisible ? <LoanApplicationForm /> : ""}
      {/* Conditional Popup Display */}
      {popupMessage && (
        <div className="pop-container">
          <div className="popup">
            <p
              style={{
                color: popupColor,
              }}
            >
              {popupMessage}
            </p>
          {openGuarantorForm ? (
            <div>
              <div className="file-upload">
                <input
                  id="fileInput"
                  type="file"
                  capture="user"
                  className="hidden-input"
                  onChange={(e) => handleGuarantorImage(e.target.files)}
                  required
                />
                <label htmlFor="fileInput" className="custom-file-upload">
                  {guarantorImage || "Upload guarantor form"}
                </label>{" "}
                <br />
              </div>
              <button className="gurantor-form-btn" onClick={handleUpdate} disabled={loading}>
                {loading ? (
                  <PulseLoader color="white" size={10} />
                ) : (
                  "Update Guarantor Form"
                )}
              </button>
            </div>
            ) : ""}


            <button
              className="close-pop-btn"
              onClick={() => setPopupMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
{successGuarantorForm ? (
<>
<div className="dropdown-container">
          <div className="success-visible">
            <p>Guarantor's Form uploaded successfully</p>
            <button onClick={() => setSuccessGuarantorForm(false)}>Cancel</button>
          </div>
        </div>
</>
) : ""}
      {dropSuccessVisible ? (
        <div className="dropdown-container">
          <div className="success-visible">
            <p>Loan application submitted successfully</p>
            <button onClick={handleSuccessVisible}>Cancel</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </HomeCsoRap>
  );
};
export default CsoHome;
