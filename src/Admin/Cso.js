import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MonthlySalesChart from "./csoMatrics/MonthlySalesChart";
import WeeklySalesChart from "./csoMatrics/WeeklySalesChart";
import DailySalesChart from "./csoMatrics/DailySalesChart";
import YearlySalesChart from "./csoMatrics/YearlySalesChart";

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
  .table-container {
    margin: 15px auto;
    width: 1090px;
    overflow-x: auto;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
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
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #d0d5dd;
  }
  table {
  }
  .custom-table thead th {
    padding: 10px;
    background-color: #f4f4f4;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #d0d5dd;
  }

  .custom-table tbody tr {
    padding: 10px;
    border: 1px solid #d0d5dd;
  }
  .custom-table tbody td {
    padding: 10px;
    border: none;
  }

  .custom-table tbody tr td input[type="checkbox"] {
    margin: 0;
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
    width: 40%;

    border-right: 1px solid #d0d5dd;
    padding: 20px 20px;
    display: flex;

    flex-direction: column;
    gap: 15px;
  }
  .client-info-drop-2 {
    width: 60%;
    padding: 20px 5px;
    gap: 10px;
   
  }
  .financial-matric {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .year-sub {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .year-sub p {
    font-size: 15px;
    font-weight: 700;
    color: #030b26;
  }
  .year-sub h3 {
    font-size: 12px;
    font-weight: 500;
    color: #727789;
  }
  .year-trans {
    border: 1px solid #d0d5dd;
    border-radius: 14px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .total-year p {
    text-align: center;
    color: #030b26;
    font-size: 20px;
    font-weight: 700;
  }
  .target {
    color: green !important;
    font-size: 16px !important;
  }
  .target-red {
    color: red !important;
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
  .year-month-div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .year-month-link {
    text-decoration: none;
    color: #727789;
    font-size: 12px;
    font-weight: 500;
  }
  .year-month-link.active {
    color: green;
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

const Csos = () => {
  const clientdropdownRef = useRef(null);
  const cso = [
    {
      id: 1,
      firstName: "Jacob",
      lastName: "Jones",
      email: "jacob@gmail.com",
      phone: "(406) 555-0120",
      address: "21b, Lagon",
      workId: "0002",
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
      noCustomer: "5",
      branch: "Ikeja",
    },
    {
      id: 2,
      firstName: "Dariene",
      lastName: "Roberon",
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
      noCustomer: "5",
      branch: "Ikeja",
    },
    {
      id: 3,
      firstName: "Annette",
      lastName: "Black",
      email: "black@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      workId: "0003",
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
      noCustomer: "10",
      branch: "Lekki",
    },
    {
      id: 4,
      firstName: "Jerome",
      lastName: "Bel",
      email: "bel@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      workId: "0004",
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
      noCustomer: "1",
      branch: "Ikeja",
    },
    {
      id: 5,
      firstName: "Devon",
      lastName: "Lane",
      email: "lane@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      workId: "0005",
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
      noCustomer: "8",
      branch: "Lekki",
    },
    {
      id: 6,
      firstName: "Darin",
      lastName: "Love",
      email: "jacob@gmail.com",
      phone: "(406) 555-0120",
      address: "21b, Lagon",
      workId: "0006",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",
      date: "2024-10-30",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      profileImg: "DL",
      noCustomer: "4",
      branch: "Ikeja",
    },
    {
      id: 7,
      firstName: "Love",
      lastName: "Faith",
      email: "dariene@gmail.com",
      phone: "(207) 555-0120",
      address: "21b, Lagos",
      workId: "0007",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Female",
      status: "female",
      date: "2024-10-30",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      profileImg: "LF",
      noCustomer: "2",
      branch: "Lekki",
    },
    {
      id: 8,
      firstName: "Anitt",
      lastName: "Black",
      email: "black@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      workId: "0008",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Male",
      status: "male",
      date: "2024-11-01",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      profileImg: "AB",
      noCustomer: "2",
      branch: "Lekki",
    },
    {
      id: 9,
      firstName: "Mary",
      lastName: "Bill",
      email: "bel@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      workId: "0009",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      gender: "Female",
      status: "female",
      date: "2024-11-01",
      profileImg: "MB",
      noCustomer: "5",
      branch: "Ikeja",
    },
    {
      id: 10,
      firstName: "Tife",
      lastName: "Code",
      email: "lane@gmail.com",
      phone: "(239) 555-0120",
      address: "8502 Preston Rd...",
      workId: "00010",
      city: "Lagos",
      state: "Lagos",
      zipCode: "00001",
      country: "Nigeria",
      guaratorName: "Segun Adams",
      guaratorAddress: "Lagos Ng",
      guaratorPhone: "0902827654",
      guaratorEmail: "guarant@gmail.com",
      date: "2024-11-09",
      gender: "Male",
      status: "male",
      profileImg: "TC",
      noCustomer: "2",
      branch: "Ikeja",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [activeLink, setActiveLink] = useState("cso");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isopen, setOpen] = useState(false);
  const [matrixOpen, setMatricOpen] = useState("yearly");
  const [selectedCso, setSelectedCso] = useState(null);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  const handleMatricOpen = (links) => {
    setMatricOpen(links);
  };
  const [formData, setFormData] = useState({
    img: null, // Store the file object
    imgPreview: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    workId: "",
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
  });

  const filteredCso =
    filter === "all" ? cso : cso.filter((c) => c.status === filter);

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

  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleOpen = () => {
    setOpen(!isopen);
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

  const isValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setDropdownVisible(false);
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
              className={`client-link ${activeLink === "cso" ? "active" : ""}`}
              onClick={() => handleLinkClick("cso")}
            >
              CSO
            </Link>
          </div>
          <div>
            <Link onClick={toggleDropdown} className="create-new-client">
              Add New CSO
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
                <h4>Add CSO</h4>
                <Icon
                  onClick={() => setDropdownVisible(false)}
                  icon="uil:times"
                  width="16"
                  height="16"
                  style={{ color: "black", cursor: "pointer" }}
                />
              </div>

              <div className="client-dropdown-div">
                <div class="image-upload-container">
                  <label for="upload-input">
                    <div class="upload-icon"></div>
                    <input
                      type="file"
                      id="upload-input"
                      accept="images/*"
                      onChange={handleImage}
                    />
                  </label>
                </div>

                <div className="client-input-div">
                  <label>
                    First Name
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </label>
                  <label>
                    Last Name
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </label>
                </div>

                <label>
                  Email Address
                  <span className="star">*</span> <br />
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                  />
                </label>

                <label>
                  Phone Number
                  <span className="star">*</span> <br />
                  <input
                    type="number"
                    placeholder=""
                    onChange={handleChange}
                    name="PhoneNumber"
                    value={formData.phone}
                  />
                </label>
                <label>
                  Work Id
                  <span className="star">*</span> <br />
                  <input
                    type="number"
                    placeholder=""
                    onChange={handleChange}
                    name="workId"
                    value={formData.workId}
                  />
                </label>
                <label>
                  Date employed
                  <span className="star">*</span> <br />
                  <input
                    type="date"
                    placeholder=""
                    onChange={handleChange}
                    name="date"
                    value={formData.date}
                  />
                </label>
                <label>
                  Address
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="address"
                    value={formData.address}
                  />
                </label>

                <div className="client-input-div">
                  <label>
                    City
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={formData.city}
                      name="city"
                    />
                  </label>

                  <label>
                    State
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      name="state"
                      value={formData.state}
                    />
                  </label>
                </div>

                <div className="client-input-div">
                  <label>
                    Zip code
                    <span className="star">*</span> <br />
                    <input
                      className="client-small-input-div"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={formData.zipCode}
                      name="city"
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
                <div>
                  <h4>Guarantor </h4>
                  <label>
                    Full name
                    <span className="star">*</span> <br />
                    <input
                      className=""
                      type="text"
                      placeholder=""
                      name="guaratorName"
                      onChange={handleChange}
                      value={formData.guaratorName}
                    />
                  </label>
                  <label>
                    Full Address
                    <span className="star">*</span> <br />
                    <input
                      style={{ height: "90px" }}
                      type="text"
                      placeholder=""
                      name="guaratorAddress"
                      onChange={handleChange}
                      value={formData.guaratorAddress}
                    />
                  </label>
                  <label>
                    Email
                    <span className="star">*</span> <br />
                    <input
                      className=""
                      type="text"
                      placeholder=""
                      name="guaratorEmail"
                      onChange={handleChange}
                      value={formData.guaratorEmail}
                    />
                  </label>
                  <label>
                    Phone Number
                    <span className="star">*</span> <br />
                    <input
                      className=""
                      type="number"
                      placeholder=""
                      name="guaratorPhone"
                      onChange={handleChange}
                      value={formData.guaratorPhone}
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
                  <Link
                    className="client-create-btn"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid ? "#0c1d55" : "#727789",
                    }}
                  >
                    Save
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "15px" }}>
          {activeLink === "cso" && (
            <>
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
              <div className="table-container">
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
                      <th>No of customer</th>
                      <th>Branch</th>
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
                            {caseItem.firstName} {caseItem.lastName}
                          </td>
                          <td>{caseItem.email}</td>
                          <td>{caseItem.phone}</td>
                          <td>{caseItem.gender}</td>
                          <td>{caseItem.noCustomer}</td>
                          <td>{caseItem.branch}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="no-case">
                          <img src="/images/mask_img.png" alt="" />
                          <h3>No case found.</h3>
                          <p style={{}}>
                            Stay organized by keeping every case detail in one
                            place.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

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

                        width: "700px",

                        overflowY: "auto",
                      }}
                    >
                      <div className="client-drop-header">
                        <div className="client-show-head">
                          <h4>
                            {selectedCso.firstName} {selectedCso.lastName}
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
                          <div className="year-trans">
                            <h4>Monthly Transaction</h4>
                            <div className="year-sub">
                              <h3>Target</h3>
                              <p>300000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Amount Made</h3>
                              <p>250000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Evaluation</h3>
                              <p className="target-red">Target Not Met</p>
                            </div>
                          </div>
                          <div className="year-trans">
                            <h4>Weekly Transaction</h4>
                            <div className="year-sub">
                              <h3>Target</h3>
                              <p>100000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Amount Made</h3>
                              <p>150000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Evaluation</h3>
                              <p className="target">Target Met</p>
                            </div>
                          </div>
                          <div className="year-trans">
                            <h4>Daily Transaction</h4>
                            <div className="year-sub">
                              <h3>Target</h3>
                              <p>50000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Amount Made</h3>
                              <p>70000</p>
                            </div>
                            <div className="year-sub">
                              <h3>Evaluation</h3>
                              <p className="target">Target Met</p>
                            </div>
                          </div>
                        </div>
                        <div className="client-info-drop-2">
                          
                          <div className="financial-matric">
                          <h4>Financial Matrics</h4>
                          <div className="year-month-div">
                            <Link
                              className={`year-month-link ${
                                matrixOpen === "yearly" ? "active" : ""
                              }`}
                              onClick={() => handleMatricOpen("yearly")}
                            >
                              Yearly
                            </Link>
                            <Link className={`year-month-link ${
                                matrixOpen === "monthly" ? "active" : ""
                              }`}
                            onClick={() => handleMatricOpen("monthly")}>
                              Monthly
                            </Link>
                            <Link className={`year-month-link ${
                                matrixOpen === "weekly" ? "active" : ""
                              }`}
                            onClick={() => handleMatricOpen("weekly")}>
                              Weekly
                            </Link>
                            <Link className={`year-month-link ${
                                matrixOpen === "daily" ? "active" : ""
                              }`}
                            onClick={() => handleMatricOpen("daily")}>
                              Daily
                            </Link>
                          </div>
                          <div>
                            {matrixOpen === "yearly" && (
                              <div>
                                <h5>Yearly Matrics</h5>
                                <YearlySalesChart />
                              </div>
                            )}
                            {matrixOpen === "monthly" && (
                              <div>
                                <h5>Monthly Matrics</h5>
                                <MonthlySalesChart />
                              </div>
                            )}
                            {matrixOpen === "weekly" && (
                              <div>
                                <h5>Weekly Matrics</h5>
                                <WeeklySalesChart />
                              </div>
                            )}
                            {matrixOpen === "daily" && (
                              <div>
                                <h5>Daily Matrics</h5>
                                <DailySalesChart />
                              </div>
                            )}
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="edi-del-btn">
                        <Link to="/csodetails" className="edit-client">
                          See Details
                        </Link>
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

export default Csos;
