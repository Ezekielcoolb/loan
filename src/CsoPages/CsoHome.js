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
import { MoonLoader, PulseLoader } from "react-spinners";
import TopLoader from "../Preload/TopLoader";
import { fetchOutstandingLoans } from "../redux/slices/otherLoanSlice";
import {
  fetchCsoByWorkId,
  fetchRemittanceStatus,
  updateCsoOverdueOnePerDay,
  updateCsoOverSHootLoansOnePerDay,
  updateCsoRecoveryOnePerDay,

} from "../redux/slices/csoSlice";
import { addGroupLeader, clearGroupLeaderMessages, fetchGroupLeadersByCso } from "../redux/slices/groupLeaderSlice";

const HomeCsoRap = styled.div`
  color: #005e78;
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
  .side-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
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
  display: flex; /* Ensures each item is treated as an inline block for spacing */
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: #ffffff;
  width: fit-content;
  border-radius: 12px;
  padding: 10px;
  height: 170px;
  width: 120px;

  /* ✅ shadow added */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Optional: lift effect on hover */
.images-mapped:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
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
    width: 100%;
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
  .dropdown-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
  .dropdown-content p {
    font-size: 20px;
    color: #112240;
    font-weight: 500;
  }
  .submit-btn {
    border: 1px solid #112240;
    background-color: #112240;
    color: white;
    width: 380px;
    height: 40px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
  }
  .submit-btn-2 {
    border: 1px solid #112240;
    color: #112240;
    background: transparent;
    width: 380px;
    height: 40px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 24px;
`;

const ModalContent = styled.div`
  width: min(640px, 100%);

  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e4e7ec;
  padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
  overflow-y: auto;
  @media (max-width: 400px) { 
  max-height: 450px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  button {
    border: none;
    background: transparent;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    color: #344054;
  }
`;

const ModalForm = styled.form`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  button {
    grid-column: 1 / -1;
    height: 44px;
    border-radius: 10px;
    border: none;
    background: #0c1d55;
    color: #ffffff;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }
input {
  width: 100% !important;
}
  button:disabled {
    background: #98a2b3;
    cursor: not-allowed;
  }
  
`;
const initialState = {
  groupName: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  csoId: '',
  csoName: '',
};

const MAX_GROUPS_ALLOWED = 10;


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
   const [popupStatus, setPopupStatus] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [formData, setFormData] = useState(initialState);
  const [popupColor, setPopupColor] = useState("#005e78");
  const [successGuarantorForm, setSuccessGuarantorForm] = useState(false);
  const [remittanceAvailableShow, setRemittanceAvailableShow] =
    React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loans, csoHomepage, csoHometotalPages, csoHomeloans, status, error } =
    useSelector((state) => state.loan);
  const { outstandingLoans, totalOutstandingLoans } = useSelector(
    (state) => state.otherLoan
  );

  const {
    leaders,
    submitting,
    errorMessage,
    successMessage,
    options: groupLeaderOptions = [],
    optionsLoading: groupLeaderOptionsLoading,
  } = useSelector((state) => state.groupLeader);

    console.log(csoHomeloans);
    

  const { specificCso,
    overdueUpdateData,
    overdueUpdateSkipped,
    overShootLoanUpdateSkipped,
    overShootLoanUpdateData,
    recoveryUpdateData,
    recoveryUpdateSkipped,
    remittancestatus, hoursLeft, minutesLeft } = useSelector(
    (state) => state.cso
  );
console.log(specificCso);
console.log(recoveryUpdateSkipped);
console.log(recoveryUpdateData);


  const [query, setQuery] = useState("");
  const [selectedGroupLeaderId, setSelectedGroupLeaderId] = useState("");

  const csoId = user.workId;
  const workId = user.workId;
  const defaultingTarget = specificCso?.defaultingTarget;

  const isValid = useMemo(
    () =>
      formData.groupName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.phone.trim() !== '',
    [formData]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      dispatch(searchCustomerCsoHome({ query: value, csoId }));
    } else {
      dispatch(fetchLoansByCsoForHome({
        csoId,
        page: csoHomepage,
        groupLeaderId: selectedGroupLeaderId || undefined,
      }));
    }
  };
  const handleVisisble = () => {
    if (remittancestatus === false) {
      dispatch(setDropdownVisible());
    } else {
      setRemittanceAvailableShow(true);
    }
  };

  const handleSuccessVisible = () => {
    dispatch(setDropSuccessVisible());
  };

 const handleOpenModal = () => {
    const existingGroupCount = Array.isArray(groupLeaderOptions)
      ? groupLeaderOptions.length
      : 0;

    if (existingGroupCount >= MAX_GROUPS_ALLOWED) {
      alert("Your group leader exceeded 10 groups, contact the admin.");
      return;
    }

    setIsModalOpen(true);
  };
  useEffect(() => {
    if (isModalOpen && specificCso) {
      const csoFullName = [specificCso.firstName, specificCso.lastName]
        .filter(Boolean)
        .join(" ");

      setFormData((prev) => ({
        ...prev,
        csoId: specificCso.workId || "",
        csoName: csoFullName,
      }));
    }
  }, [isModalOpen, specificCso]);
    useEffect(() => {
    if (specificCso) {
      dispatch(updateCsoOverdueOnePerDay(specificCso._id));
    }
  }, [specificCso, dispatch]);

 useEffect(() => {
    if (successMessage) {
      setFormData(initialState);
      setIsModalOpen(false);
    }
  }, [successMessage]);
   useEffect(() => {
      if (errorMessage || successMessage) {
        const timeout = setTimeout(() => {
          dispatch(clearGroupLeaderMessages());
        }, 4000);
        return () => clearTimeout(timeout);
      }
      return undefined;
    }, [dispatch, errorMessage, successMessage]);

   useEffect(() => {
    if (specificCso) {
      dispatch(updateCsoOverSHootLoansOnePerDay(specificCso._id));
    }
  }, [specificCso, dispatch]);


      useEffect(() => {
    if (specificCso) {
      dispatch(updateCsoRecoveryOnePerDay(specificCso._id));
    }
  }, [specificCso, dispatch]);



  useEffect(() => {
    if (csoId) {
      dispatch(fetchRemittanceStatus(csoId));
    }
  }, [csoId, dispatch]);

  
  useEffect(() => {
    const fetchLoans = async () => {
      await dispatch(fetchAllLoansByCsoId({ csoId }));
    };

    fetchLoans();
  }, [csoId]);

  useEffect(() => {
    dispatch(fetchLoansByCsoForHome({
      csoId,
      page: csoHomepage,
      groupLeaderId: selectedGroupLeaderId || undefined,
    }));
  }, [dispatch, csoId, csoHomepage, selectedGroupLeaderId]);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchGroupLeadersByCso(csoId));
    }
  }, [dispatch, csoId]);

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


  const handleGoToEditLoan = () => {
    navigate(`/cso/editApplication/${customerId}`);
  };

  
  const handleCustomerClick = (loan) => {
    let message = "";
    let color = "";
    let status = ""
    if (loan?.status === "waiting for approval") {
      message = "Waiting for approval";
      color = "#005e78"; // Color for waiting for approval
      status = "waiting for approval"
      setCustomerId(loan?._id);
      setOpenGuarantorForm(true);
    } else if (loan?.status === "waiting for disbursement") {
      message = "Waiting for disbursement";
      setCustomerId(loan?._id);
      color = "green"; // Color for waiting disbursement
      status = "waiting for disbursement"
    }  else if (loan?.status === "edited") {
      message = "You asked to edit this application. Please ask the admin/manager for the update and make the correction";
      setCustomerId(loan?._id);
    status = "edited"
    }else if (loan?.status === "rejected") {
      message = `Loan was rejected: ${loan?.rejectionReason}`;
      setCustomerId(loan?._id);
      color = "red"; // Color for rejected loan
      status = "rejected"
    } else if (
      loan?.status === "active loan" ||
      loan?.status === "fully paid"
    ) {
      // Redirect to the customer details page if status is "active loan"
      navigate(`/cso/customer-details/${loan?._id}`);
    }
setPopupStatus(status)
    setPopupMessage(message);
    setPopupColor(color); // Store the color based on status
  };

  // Calculate total pages
  const totalPages = Math.ceil(csoHomeloans?.length / itemsPerPage);

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
  if (!specificCso && !csoHomeloans) {
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

  
// 1️⃣ Get today's date in UTC (no time component)
const now = new Date();
const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

// 2️⃣ Calculate "effective yesterday" (adjusted for weekends)
let effectiveDate = new Date(todayUTC);
effectiveDate.setDate(effectiveDate.getDate() - 1); // Normal yesterday

// If Saturday → move back to Friday
if (effectiveDate.getDay() === 6) {
  effectiveDate.setDate(effectiveDate.getDate() - 1);
}

// If Sunday → move back to Friday
if (effectiveDate.getDay() === 0) {
  effectiveDate.setDate(effectiveDate.getDate() - 2);
}

// 3️⃣ Format effective date as YYYY-MM-DD (to match item.date)
const effectiveDateString = effectiveDate.toISOString().slice(0, 10);

// 4️⃣ Filter remittance items where date matches
const filteredRemittance = specificCso?.remittance?.filter(item => {
  const itemDateString = new Date(item.date).toISOString().slice(0, 10);
  return itemDateString === effectiveDateString;
});

const filteredRemittanceIssue = specificCso?.remitanceIssues?.filter(item => {
  const itemDateString = new Date(item.date).toISOString().slice(0, 10);
  return itemDateString === effectiveDateString;
});

 const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addGroupLeader(formData));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialState);
    dispatch(clearGroupLeaderMessages());
  };


  
  return (
    <HomeCsoRap>
      {specificCso && csoHomeloans ? (<>
      {filteredRemittance?.length > 0 || filteredRemittanceIssue?.length > 0 ? (
      <div>
        <div className="homes">
          <div className="home-first-div">
            <div className="home-customers">
              <h2>Customers</h2>
              <div className="side-button">
                <Icon
                  onClick={handleVisisble}
                  className=""
                  icon="simple-line-icons:plus"
                  width="24"
                  height="24"
                  style={{ color: "#005e78" }}
                />
                <Icon
                  onClick={handleOpenModal}
                  className=""
                  icon="radix-icons:file-plus"
                  width="24"
                  height="24"
                  style={{ color: "#005e78" }}
                />
              </div>
            </div>
            <div className="input-div" style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "center", marginLeft:"20px" }}>
              <select
                value={selectedGroupLeaderId}
                onChange={(e) => setSelectedGroupLeaderId(e.target.value)}
                style={{
                  background: "#daf7ff",
                  padding: "12px 16px",
                  minWidth: "333px",
                  height: "45px",
                  border: "none",
                  borderRadius: "20px",
                }}
              >
                <option value="">All Groups</option>
                {groupLeaderOptions.map((leader) => (
                  <option key={leader._id} value={leader._id}>
                    {leader.groupName || `${leader.firstName || ""} ${leader.lastName || ""}`.trim()}
                  </option>
                ))}
              </select>
              <div style={{ position: "relative" }}>
                <input
                  value={query}
                  onChange={handleChange}
                  type="text"
                  placeholder="Search"
                  style={{
                    paddingLeft: "36px",
                    width: "333px",
                  }}
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
                      <img loading="lazy"
                        src={
                          loan?.pictures?.customer?.startsWith("http")
                            ? loan?.pictures?.customer // Cloudinary URL
                            : loan?.pictures?.customer
                            ? `https://api.jksolutn.com${loan?.pictures?.customer}` // Local image
                            : "fallback.jpg" // Optional fallback image
                        }
                        alt="customer"
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
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
                               : loan?.status === "edited"
                              ? "orange"
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
):
    (<>
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <p style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "600",
              margin: "20px",
              maxWidth: "500px"
            }}> You did not submit remittance for {effectiveDateString}. Please  contact the manager to resolve issue. Thanks.</p>
          </div>
        </div>
        </>)
      
}

</>) : ( <p style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}}> <MoonLoader /></p>)}
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
                Try to clear the defaults in order to submit new loans. <br />{" "}
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

            {popupStatus === "edited"  ||  popupStatus === "rejected" ? "" ||  popupStatus === "waiting for disbursement" : (

            <>
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
</>
            )}

            <div className="previous-loans-div">
              <button
                className="close-pop-btn"
                onClick={() => setPopupMessage(null)}
              >
                Close
              </button>
              {popupStatus === "edited" ? (
                <button
                onClick={handleGoToEditLoan}
                className="previous-loans"
              >
                Edit Loan
              </button>
              ) : popupStatus === "rejected" ? "" : (
                 <button
                onClick={handleGoToPreviousLoans}
                className="previous-loans"
              >
                Previous Loans
              </button>
              )}
             
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
      {remittanceAvailableShow ? (
        <>
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <div className="dropdown-content">
                <p>
                  Sorry, you cannot submit a new loan after submitting
                  remittance. <br /> Please wait till the next {hoursLeft}hr{" "}
                  {minutesLeft} minutes. <br /> Thanks.
                </p>
                <button
                  className="submit-btn-2"
                  onClick={() => setRemittanceAvailableShow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

       {isModalOpen && (
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>
                    <h3>Add Group</h3>
                    <button type="button" onClick={handleCloseModal} aria-label="Close">
                      ×
                    </button>
                  </ModalHeader>
                  <ModalForm onSubmit={handleSubmit}>
                    <label>
                      Group Name
                      <input
                        name="groupName"
                        value={formData.groupName}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    <label>
                      Group Leader First Name
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    <label>
                      Address
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    <label>
                      Phone
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                      />
                    </label>
                    {/* <label>
                      Customer Service Officer
                      <select
                        name="csoId"
                        value={formData.csoId}
                        onChange={handleCsoChange}
                        required
                      >
                        <option value="">Select CSO</option>
                        {csos.map((cso) => (
                          <option key={cso._id} value={cso.workId}>
                            {`${cso.firstName} ${cso.lastName}`} ({cso.workId})
                          </option>
                        ))}
                      </select>
                    </label> */}
      
                    {(errorMessage || successMessage) && (
                      <p className={`status-message ${errorMessage ? 'error' : 'success'}`}>
                        {errorMessage || successMessage}
                      </p>
                    )}
      
                    <button type="submit" disabled={!isValid || submitting}>
                      {submitting ? <PulseLoader color="#ffffff" size={8} /> : 'Submit'}
                    </button>
                  </ModalForm>
                </ModalContent>
              </ModalOverlay>
            )}
            {successMessage && (
              <ModalOverlay>
                <ModalContent>
                  <p>{successMessage}</p>
                  <button style={{
                    backgroundColor: "#000000",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }} onClick={() => dispatch(clearGroupLeaderMessages())}>Close</button>
                </ModalContent>
              </ModalOverlay>
            )}
    </HomeCsoRap>
  );
};
export default CsoHome;
