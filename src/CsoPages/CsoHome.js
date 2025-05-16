import React, { useEffect, useMemo, useState } from "react";
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
  fetchFullyPaidLoansStart,
  fetchLoansByCsoForHome,
  searchCustomer,
  searchCustomerCsoHome,
  setCsoHomePage,
  setPage,
  updateGuarantorFormPic,
} from "../redux/slices/LoanSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import TopLoader from "../Preload/TopLoader";
import { fetchOutstandingLoans } from "../redux/slices/otherLoanSlice";
import { fetchCsoByWorkId } from "../redux/slices/csoSlice";

const HomeCsoRap = styled.div`
  color: #005e78;
  background: #d9d9d9;
  min-height: 100vh;
  .success-visible {
    background: #ffffff;
    padding: 20px;
    margin: 20px;
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
  .close-pop-btn,
  .previous-loans {
    border: 1px solid #005e78;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color: #005e78;
  }
  .previous-loans-div {
    display: flex;
    gap: 20px;
  }
  .previous-loans {
    width: 130px;
    text-decoration: none;
    background: #005e78;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .no-cutomer {
    font-size: 25px;
    font-weight: 700;
    height: 700px !important;
    width: 100%;
    color: #005e78;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .images-container img {
    height: 127px;
    width: 120px;
  }
  .images-container p,
  .images-container h4 {
    max-width: 120px;
  }
`;

const CsoHome = () => {
  // const { user } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("csoUser"));

  const { dropdowVisible, dropSuccessVisible } = useSelector(
    (state) => state.app
  );
  const [customerId, setCustomerId] = useState("");
  const [guarantorImage, setGuarantorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openGuarantorForm, setOpenGuarantorForm] = useState(false);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupColor, setPopupColor] = useState("#005e78");
  const [successGuarantorForm, setSuccessGuarantorForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loans, csoHomepage, csoHometotalPages, csoHomeloans, status, error } =
    useSelector((state) => state.loan);
  const { outstandingLoans, totalOutstandingLoans } = useSelector(
    (state) => state.otherLoan
  );
  const { specificCso } = useSelector((state) => state.cso);

  console.log(totalOutstandingLoans);
  const [query, setQuery] = useState("");

  const csoId = user.workId;
  const workId = user.workId;
  const defaultingTarget = specificCso?.defaultingTarget;

  console.log(user);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      dispatch(searchCustomerCsoHome({ query: value, csoId }));
    }
  };
  const handleVisisble = () => {
    dispatch(setDropdownVisible());
  };

  const handleSuccessVisible = () => {
    dispatch(setDropSuccessVisible());
  };

  useEffect(() => {
    const fetchLoans = async () => {
      await dispatch(fetchAllLoansByCsoId({ csoId }));
    };

    fetchLoans();
  }, [csoId]);

  useEffect(() => {
    dispatch(fetchLoansByCsoForHome({ csoId, page: csoHomepage }));
  }, [dispatch, csoId, csoHomepage]);

  useEffect(() => {
    if (csoId) dispatch(fetchOutstandingLoans(csoId));
  }, [csoId, dispatch]);

  useEffect(() => {
    if (workId) dispatch(fetchCsoByWorkId(workId));
  }, [workId, dispatch]);

  const finalLoans = useMemo(() => csoHomeloans, [csoHomeloans]);

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
      setPopupMessage(null);
      setSuccessGuarantorForm(true);
    } else {
      alert("Please provide an image URL");
    }
  };
  // Handle customer click for different statuses
  const handleGoToPreviousLoans = () => {
    navigate(`/cso/previousLoans/${customerId}`);
    dispatch(fetchFullyPaidLoansStart());
  };
  const handleCustomerClick = (loan) => {
    let message = "";
    let color = "";
    if (loan?.status === "waiting for approval") {
      message = "Waiting for approval";
      color = "#005e78"; // Color for waiting for approval

      setCustomerId(loan?._id);
      setOpenGuarantorForm(true);
    } else if (loan?.status === "waiting for disbursement") {
      message = "Waiting for disbursement";
      setCustomerId(loan?._id);
      color = "green"; // Color for waiting disbursement
    } else if (loan?.status === "rejected") {
      message = `Loan was rejected: ${loan?.rejectionReason}`;
      setCustomerId(loan?._id);
      color = "red"; // Color for rejected loan
    } else if (
      loan?.status === "active loan" ||
      loan?.status === "fully paid"
    ) {
      // Redirect to the customer details page if status is "active loan"
      navigate(`/cso/customer-details/${loan?._id}`);
    }

    setPopupMessage(message);
    setPopupColor(color); // Store the color based on status
  };

  // Calculate total pages
  const totalPages = Math.ceil(csoHomeloans?.length / itemsPerPage);
  console.log(csoHomeloans);

  // Get current items to display
  const currentLoans = csoHomeloans?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(currentLoans);

  // Handle pagination click
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  if (!finalLoans) {
    return (
      <div style={{ paddingTop: "50px" }}>
        {" "}
        <TopLoader />
      </div>
    );
  }

  const handleNext = () => {
    if (csoHomepage < csoHometotalPages) {
      dispatch(setCsoHomePage(csoHomepage + 1));
    }
  };

  const handlePrev = () => {
    if (csoHomepage > 1) {
      dispatch(setCsoHomePage(csoHomepage - 1));
    }
  };

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
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
            {csoHomeloans && csoHomeloans.length > 0 ? (
              <div>
                <div className="images-container">
                  {csoHomeloans?.map((loan, index) => (
                    <li
                      className="images-mapped"
                      key={loan._id}
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
                      <div
                        style={{
                          background:
                            loan?.status === "waiting for approval"
                              ? "green"
                              : loan?.status === "waiting for disbursement"
                              ? "orange"
                              : loan?.status === "rejected"
                              ? "red"
                              : loan?.status === "fully paid"
                              ? "purple"
                              : "blue",
                        }}
                        className="circle-div"
                      ></div>
                    </li>
                  ))}
                </div>
                {/* Pagination Buttons */}
                <div className="page-div">
                  {/* <button
                    className="page-btn"
                    onClick={() => handlePrev(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button> */}
                  <button
                    className="page-btn"
                    onClick={handlePrev}
                    disabled={csoHomepage === 1}
                  >
                    Prev
                  </button>

                  <span>
                    Page {csoHomepage} of {csoHometotalPages}
                  </span>
                  {/* <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button> */}
                  <button
                    className="page-btn"
                    onClick={handleNext}
                    disabled={csoHomepage === csoHometotalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-cutomer">
                <p>No customer yet</p>{" "}
              </div>
            )}
          </ul>
        </div>
      </div>

      {dropdowVisible &&
        (totalOutstandingLoans > defaultingTarget && defaultingTarget !== 0 ? (
          <div className="dropdown-container">
            <div className="success-visible">
              <p style={{ color: "red" }}>
                You have exceeded your defaulting limit of
                <span
                  style={{
                    fontWeight: "900",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  {formatNumberWithCommas(defaultingTarget)}{" "}
                </span>
                . Try to clear the defaults in order to submit new loans. <br />{" "}
                Thanks.
              </p>
              <button onClick={handleVisisble}>Exit</button>
            </div>
          </div>
        ) : (
          <LoanApplicationForm />
        ))}
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
                <button
                  className="gurantor-form-btn"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? (
                    <PulseLoader color="white" size={10} />
                  ) : (
                    "Update Guarantor Form"
                  )}
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="previous-loans-div">
              <button
                className="close-pop-btn"
                onClick={() => setPopupMessage(null)}
              >
                Close
              </button>
              <button
                onClick={handleGoToPreviousLoans}
                className="previous-loans"
              >
                Previous Loans
              </button>
            </div>
          </div>
        </div>
      )}
      {successGuarantorForm ? (
        <>
          <div className="dropdown-container">
            <div className="success-visible">
              <p>Guarantor's Form uploaded successfully</p>
              <button onClick={() => setSuccessGuarantorForm(false)}>
                Exit
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {dropSuccessVisible ? (
        <div className="dropdown-container">
          <div className="success-visible">
            <p>Loan application submitted successfully</p>
            <button onClick={handleSuccessVisible}>Exit</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </HomeCsoRap>
  );
};
export default CsoHome;
