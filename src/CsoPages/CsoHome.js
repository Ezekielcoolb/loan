import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { setDropdownVisible } from "../redux/slices/appSlice";
import LoanApplicationForm from "./CustomerLoanPop";
import { fetchAllLoansByCsoId, setPage } from "../redux/slices/LoanSlice";
import { useNavigate } from "react-router-dom";

const HomeCsoRap = styled.div`
  color: #005e78;


  
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
  }
  .images-mapped img {
    width: 95px;
    height: 117px;
  }
  .custom-name {
    color: #005E78;
    font-size: 14px;
    font-weight: 700;
  }
  .custom-business {
    color: #005E78;
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
  .popup  {
    background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
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
  .page-btn  {
    width: 100px;
    height: 30px;
    color: #005E78;
    border-radius: 10px;
    border: 1px solid #005e78;
  }
`;

const CsoHome = () => {
  const { user } = useSelector((state) => state.auth);

  const { dropdowVisible } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleVisisble = () => {
    dispatch(setDropdownVisible());
  };

  const { loans, page, totalPages, status, error } = useSelector(
    (state) => state.loan
  );


const csoId = user.workId

console.log(csoId);



  const [popupMessage, setPopupMessage] = useState(null);
  const [popupColor, setPopupColor] = useState("#005e78")

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId, page }));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  // Handle customer click for different statuses

const handleCustomerClick = (loan) => {
  let message = "";
  let color = "";
  console.log("Loan ID:", loan._id);
  if (loan.status === "waiting for approval") {
    message = "Waiting for approval";
    color = "#005e78"; // Color for waiting for approval
  } else if (loan.status === "waiting for disbursement") {
    message = "Waiting for disbursement";
    color = "green"; // Color for waiting disbursement
  } else if (loan.status === "rejected") {
    message = `Loan was rejected: ${loan.rejectionReason}`;
    color = "red"; // Color for rejected loan
  } else if (loan.status === "active loan") {
    // Redirect to the customer details page if status is "active loan"
    navigate(`/cso/customer-details/${loan._id}`);
  }

  setPopupMessage(message);
  setPopupColor(color); // Store the color based on status
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
              <input type="text" placeholder="Search" />
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
                {loans.map((loan, index) => (
                  <li className="images-mapped" key={index}
                  onClick={() => handleCustomerClick(loan)} 
                  >
                    <img
                      src={loan?.pictures?.customer}
                      alt="Customer"
                      width={100}
                      height={100}
                    />
                    <h4 className="custom-name">{loan?.customerDetails?.firstName} {loan?.customerDetails?.lastName}</h4>
                    <p className="custom-business">{loan?.businessDetails?.businessName}</p>
                  </li>
                ))}
              </div>
              <div className="page-div">
                <button className="page-btn" onClick={handlePreviousPage} disabled={page === 1}>
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button className="page-btn" onClick={handleNextPage} disabled={page === totalPages}>
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
           color: popupColor
          }}>
            
            {popupMessage}</p>
          <button className="close-pop-btn" onClick={() => setPopupMessage(null)}>Close</button>
        </div>
        </div>
      )}
    </HomeCsoRap>
  );
};
export default CsoHome;
