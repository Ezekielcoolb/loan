import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ClientRap = styled.div`
  width: 100%;

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
  }
  th {
    font-size: 14px;
    font-weight: 500;
    color: #727789;
  }
  td {
    font-size: 13px;
    font-weight: 400;
    color: #727789;
  }
  label {
    font-size: 14px !important;
    color: #60667a;
    font-weight: 600;
  }
  .star {
    font-weight: 700;
    color: red;
  }
  .bill-custom {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bill-custom h4 {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .status-link {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #727789;
    height: 36px;
    width: 78px;
    font-weight: 500;
    font-size: 14px;

    line-height: 18px;

    border-right: 1px solid #d0d5dd;
  }
  .status-btn {
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    width: 234px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .no-case {
    height: 300px;
    margin-top: 70px;
    text-align: center;
    padding: 20px;
    color: #888;
    font-style: italic;
    font-size: 14px;
    background-color: #f9f9f9;
  }
  .next-page-link {
    text-decoration: none;
    color: #636878;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pagination-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border: 1px solid #dbe0ee;
    padding: 0px 20px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .paginations {
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    margin: 0 10px;
    text-align: center;
  }
  .client-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px;
    padding: 0px 15px;
  }
  .client-show-head {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .client-drop-div {
    display: flex;

    justify-content: space-between;
    padding: 0px 20px 20px 20px;
    padding-bottom: 0px !important;
    border-bottom: 1px solid #d0d5dd;
  }
  .client-inner-div {
    display: flex;
    justify-content: space-between;
    align-items: center !important;
  }
  .client-inner-div p {
    font-size: 12px;
    margin: 0px !important;
  }
  .client-inner-p-1 {
    color: #727789;
  }
  .client-show-head h4 {
    color: #030b26;
    font-weight: 600;
    font-size: 12px;
    margin: 0px;
  }
  .client-show-head p {
    color: #727789;
    font-weight: 400;
    font-size: 12px;
    margin: 0px;
  }
  .edit-client {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #0c1d55;
  }
  .delete-client {
    height: 30px;
    width: 76px;
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
  }
  .client-inner-p-2 {
    color: #030b26;
    font-size: 14px;
    margin-top: 0px;
  }
  .client-info-drop-1 {
    width: 50%;

    border-right: 1px solid #d0d5dd;
    padding-right: 20px;
    display: flex;
    padding-bottom: 20px;
    flex-direction: column;
    gap: 20px;
  }
  .client-info-drop-2 {
    width: 50%;
    padding-bottom: 20px;
    padding-left: 20px;
    display: flex;

    flex-direction: column;
    gap: 20px;
  }

  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .client-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
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

  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    justify-content: flex-start;
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

  .client-all-dropdown-div::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and newer Edge: Hide scrollbar */
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

  .profileImg {
    width: 68px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffe7cc;
    border-radius: 50% 50%;
    margin-bottom: 20px !important;
  }

  /* Container for the image upload */
  .image-upload-container {
    position: relative;
    width: 68px; /* Adjust size */
    height: 68px;
    border: 1px solid #dbe0ee; /* Dashed border for visual cue */
    border-radius: 50%; /* Makes it round */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: auto;
    overflow: hidden; /* Ensures uploaded image doesn't overflow */
    background-color: #ffffff; /* Light background color */
  }

  /* Hide the actual file input */
  .image-upload-container input[type="file"] {
    display: none;
  }

  /* Icon styling (you can use a custom icon or SVG) */
  .upload-icon {
    width: 32px;
    height: 32px;
    background: url("../images/camera.png") no-repeat center center;
    background-size: contain;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  /* Hover effect */
  .image-upload-container:hover .upload-icon {
    opacity: 1;
  }

  /* Uploaded image preview */
  .image-upload-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; /* Keep the round shape for the image */
  }
`;

const ListOfCustomers = () => {
  const clientdropdownRef = useRef(null);
  const customers = [
    {
      id: 1,
      name: "Jacob James",

      email: "jacob@gmail.com",
      phone: "(406) 555-0120",
      address: "21b, Lagon",

      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      profileImg: "JJ",
      date: "2024-11-01",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      status: "male",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",
      residentAddress: "Lagos Lagos",
      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
    {
      id: 2,
      name: "Dariene Brad",

      email: "dariene@gmail.com",
      phone: "(207) 555-0120",
      address: "21b, Lagos",
      workId: "0002",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",
      profileImg: "DR",
      date: "2024-11-02",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",
      residentAddress: "Lagos Lagos",
      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
    {
      id: 3,
      name: "Annette Black",

      email: "black@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",

      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Female",
      status: "female",
      profileImg: "AB",
      date: "2024-11-01",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",
      residentAddress: "Lagos Lagos",
      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
    {
      id: 4,
      name: "Jerome Bel",

      email: "bel@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",

      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",
      profileImg: "JB",
      date: "2024-11-04",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",
      residentAddress: "Lagos Lagos",
      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
    {
      id: 5,
      name: "Devon Lane",

      email: "lane@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",

      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",
      date: "2024-11-05",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      profileImg: "DL",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",

      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
    {
      id: 6,
      name: "Darin Love",

      email: "jacob@gmail.com",
      phone: "(406) 555-0120",
      address: "21b, Lagon",

      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",

      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      profileImg: "DL",
      numberOfLoan: "3",
      currentLoanAmount: "66000",
      effectiveLoanDate: "Apr 23, 2024",
      loanType: "Daily",
      bvn: "0000000000",
      residentAddress: "Lagos Lagos",
      businessAddress: " Lagos Lagos",
      natureOfBusiness: "Trader",
      group: "Trader Association",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [activeLink, setActiveLink] = useState("customers");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isopen, setOpen] = useState(false);

  const [selectedCso, setSelectedCso] = useState(null);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  const [formData, setFormData] = useState({
    img: null, // Store the file object
    imgPreview: null,
    name: "",
    dateOfBirth: "",
    email: "",
    phone: "",

    guaratorName: "",
    guaratorAddress: "",
    guaratorPhone: "",
    guaratorEmail: "",
    gender: "",
    profileImg: "",
    date: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    numberOfLoan: "",
    currentLoanAmount: "",
    effectiveLoanDate: "",
    loanType: "",
    bvn: "",
    residentAddress: "",
    businessAddress: "",
    natureOfBusiness: "",
    group: "",
  });

  const filteredCso =
    filter === "all" ? customers : customers.filter((c) => c.status === filter);

  const formatDateRange = (openDate, closeDate) => {
    const open = new Date(openDate);

    // Format open date
    const options = { month: "long", day: "numeric", year: "numeric" };
    const openFormatted = open.toLocaleDateString("en-US", options);

    // Check if the case is still open
    if (!closeDate) {
      return `${openFormatted} and still open`;
    }

    // Format close date
    const close = new Date(closeDate);
    const closeOptions = { month: "long", day: "numeric" };
    const closeFormatted = close.toLocaleDateString("en-US", closeOptions);

    // Include year only once if it's the same
    const sameYear = open.getFullYear() === close.getFullYear();
    const year = sameYear
      ? `, ${open.getFullYear()}`
      : ` - ${close.getFullYear()}`;

    return `${openFormatted} - ${closeFormatted}${year}`;
  };

  const handleRowClick = (clientItem) => {
    const formattedRange = formatDateRange(
      clientItem.openDate,
      clientItem.closeDate
    );
    setSelectedCso(clientItem); // Set the clicked case as the selected case
    setFormattedDateRange(formattedRange);
  };

  const closeDropdown = () => {
    setSelectedCso(null); // Reset the selected case
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        clientdropdownRef.current &&
        !clientdropdownRef.current.contains(event.target)
      ) {
        closeDropdown(); // Close if clicked outside
      }
    };

    if (selectedCso) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedCso]);

  //   pagination

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination Logic
  const totalPages = Math.ceil(filteredCso.length / rowsPerPage);
  const indexOfLastCase = currentPage * rowsPerPage;
  const indexOfFirstCase = indexOfLastCase - rowsPerPage;
  const currentCso = filteredCso.slice(indexOfFirstCase, indexOfLastCase);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        img: file, // Update the file in formData
        imgPreview: previewUrl, // Update the preview URL
      }));
    }
  };

  return (
    <ClientRap>
      <div>
        <div className="client-1">
          <div className="client-link-container">
            <Link
              className={`client-link ${
                activeLink === "customers" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("customers")}
            >
              Customers
            </Link>
          </div>
        </div>
        <div style={{ margin: "0px 20px" }}>
          {activeLink === "customers" && (
            <>
              <div className="find-lawyer-header">
                <div className="status-btn" style={{ marginBottom: "20px" }}>
                  {["all", "male", "female"].map((status) => (
                    <Link
                      className="status-link"
                      key={status}
                      onClick={() => setFilter(status)}
                      style={{
                        backgroundColor:
                          filter === status ? "#030B260D" : "#ffffff",
                        color: filter === status ? "#030b26" : "#727789",
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th style={{ width: "30px" }}>
                            <input type="checkbox" />
                          </th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Gender</th>
                          <th>Address</th>
                          <th>Current Loan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCso ? (
                          currentCso.map((caseItem) => (
                            <tr
                              key={caseItem.id}
                              onClick={() => handleRowClick(caseItem)}
                              style={{ cursor: "pointer" }}
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(caseItem);
                                  }}
                                />
                              </td>
                              <td>
                                {caseItem.name}
                                {caseItem.lastName}
                              </td>
                              <td>{caseItem.email}</td>
                              <td>{caseItem.phone}</td>
                              <td>{caseItem.gender}</td>
                              <td>{caseItem.address}</td>
                              <td>{caseItem.currentLoanAmount}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="no-case">
                              <img src="/images/mask_img.png" alt="" />
                              <h3>No customers found.</h3>
                              <p style={{}}>
                                Stay organized by keeping every case detail in
                                one place.
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Pagination Controls */}
                <div className="pagination-div">
                  <Link
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="next-page-link"
                  >
                    <Icon
                      icon="formkit:arrowleft"
                      width="18"
                      height="18"
                      style={{ color: "#636878" }}
                    />
                    Previous
                  </Link>
                  <div>
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((pageNumber) => (
                      <Link
                        className="paginations"
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        style={{
                          color:
                            pageNumber === currentPage ? "#030b26" : "#727789",
                        }}
                      >
                        {pageNumber}
                      </Link>
                    ))}
                  </div>
                  <Link
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="next-page-link"
                  >
                    Next
                    <Icon
                      icon="formkit:arrowright"
                      width="18"
                      height="18"
                      style={{ color: "#636878" }}
                    />
                  </Link>
                </div>

                {/* Dropdown */}
                {selectedCso && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      ref={clientdropdownRef}
                      style={{
                        background: "white",
                        borderRadius: "8px",

                        width: "541px",

                        overflowY: "auto",
                      }}
                    >
                      <div className="client-drop-header">
                        <div className="client-show-head">
                          <h4>
                            {selectedCso.name} {selectedCso.lastName}
                          </h4>
                          <p>{selectedCso.date}</p>
                        </div>
                        <div>
                          <Icon
                            onClick={() => setSelectedCso(null)}
                            icon="uil:times"
                            width="16"
                            height="16"
                            style={{ color: "black", cursor: "pointer" }}
                          />
                        </div>
                      </div>

                      <div className="client-drop-div">
                        <div className="client-info-drop-1">
                          <h4>Personal Details</h4>
                          <div className="profileImg">
                            {selectedCso.profileImg}
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Name</p>
                            <p className="client-inner-p-2">
                              {selectedCso.name}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Last Name </p>
                            <p className="client-inner-p-2">
                              {selectedCso.email}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Address</p>
                            <p className="client-inner-p-2">
                              {selectedCso.address}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">State</p>
                            <p className="client-inner-p-2">
                              {selectedCso.state}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Country</p>
                            <p className="client-inner-p-2">
                              {selectedCso.country}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Email</p>
                            <p className="client-inner-p-2">
                              {selectedCso.email}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Gender</p>
                            <p className="client-inner-p-2">
                              {selectedCso.gender}
                            </p>
                          </div>
                        </div>
                        <div className="client-info-drop-2">
                          <h4>Loans</h4>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Current Laon</p>
                            <p className="client-inner-p-2">
                              {selectedCso.currentLoanAmount}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">
                              Loan Effective Date
                            </p>
                            <p className="client-inner-p-2">
                              {selectedCso.effectiveLoanDate}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Loan Type</p>
                            <p className="client-inner-p-2">
                              {selectedCso.loanType}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Balance</p>
                            <p className="client-inner-p-2">
                              {selectedCso.currentLoanAmount}
                            </p>
                          </div>

                          <div className="client-inner-div">
                            <p className="client-inner-p-1">BVN</p>
                            <p className="client-inner-p-2">
                              {selectedCso.bvn}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">Guarantor</p>
                            <p className="client-inner-p-2">
                              {selectedCso.guaratorName}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">
                              Guarantor's Address
                            </p>
                            <p className="client-inner-p-2">
                              {selectedCso.guaratorAddress}
                            </p>
                          </div>
                          <div className="client-inner-div">
                            <p className="client-inner-p-1">
                              Guarantor's Number
                            </p>
                            <p className="client-inner-p-2">
                              {selectedCso.guaratorPhone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="edi-del-btn">
                        <Link
                          onClick={() => setSelectedCso(null)}
                          className="delete-client"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ClientRap>
  );
};

export default ListOfCustomers;
