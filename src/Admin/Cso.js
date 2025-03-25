import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MonthlySalesChart from "./csoMatrics/MonthlySalesChart";
import WeeklySalesChart from "./csoMatrics/WeeklySalesChart";
import DailySalesChart from "./csoMatrics/DailySalesChart";
import YearlySalesChart from "./csoMatrics/YearlySalesChart";
import {
  activateCSO,
  clearMessages,
  createCso,
  deactivateCSO,
  fetchCso,
  searchCso,
} from "../redux/slices/csoSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MoonLoader, PulseLoader } from "react-spinners";
import { fetchAllBranches } from "../redux/slices/branchSlice";
import axios from "axios";

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
  .button {
    border-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 80px;
    height: 30px;
    background: #0c1d55;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
  }
  .exit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: #0c1d55;
    width: 80px;
    height: 30px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid #0c1d55 ;
    border-radius: 10px;
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

  .client-dropdown-div input,
  .client-dropdown-div select {
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
  .upper-image-display {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin: auto;
  }
  .upper-image-display {
    width: 200px;
    height: 100px;
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

  const dispatch = useDispatch();
  const { successMessage, cso, totalPages, currentPage, status, error } =
    useSelector((state) => state.cso);
  const limit = 10;
  console.log(successMessage);

  const [filter, setFilter] = useState("all");
  const [activeLink, setActiveLink] = useState("cso");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isopen, setOpen] = useState(false);
  const [matrixOpen, setMatricOpen] = useState("yearly");
  const [selectedCso, setSelectedCso] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loanerImage, setLoanerIamge] = useState("");
  const [formattedDateRange, setFormattedDateRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { branches } = useSelector((state) => state.branches);
  const [query, setQuery] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdownActivate = (csoId) => {
    setDropdownOpen(dropdownOpen === csoId ? null : csoId);
  };

  const handleMatricOpen = (links) => {
    setMatricOpen(links);
  };
  const [formData, setFormData] = useState({
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
    status: "",
    profileImg: "",
    date: "",
    city: "",
    branch: selectedBranch,
    state: "",
    zipCode: "",
    country: "",
  });

  // Update formData.branch whenever selectedBranch changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      branch: selectedBranch,
    }));
  }, [selectedBranch]);

  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [dispatch]);

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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCso({ page: currentPage, limit }));
    }
  }, [dispatch, status, currentPage]);

  if (status === "loading")
    return (
      <p
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <MoonLoader />
      </p>
    );
  if (status === "failed") return <p>Error: {error}</p>;

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

  // Handle page change in pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent going to invalid pages
    dispatch(fetchCso({ page, limit }));
  };

  const isValid =
    formData.firstName !== "" &&
    formData.lastName !== "" &&
    formData.email !== "" &&
    formData.address !== "" &&
    formData.workId !== "" &&
    formData.guaratorName !== "" &&
    formData.guaratorAddress !== "" &&
    formData.guaratorPhone !== "" &&
    formData.date !== "" &&
    formData.status !== "" &&
    formData.branch !== "" &&
    formData.phone !== "";

  const handleSecondImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);

      setLoanerIamge(imageUrl);

      // Update formData state
      setFormData((prevData) => ({
        ...prevData,
        profileImg: imageUrl,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        dispatch(createCso(formData));
        setDropdownVisible(false);
        setFormData({
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
          status: "",
          branch: "",
          profileImg: "",
          date: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        });
      } catch (error) {
        setIsLoading(false);

        toast.error("Failed to create branch");
      }
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

  const handleSuccessExit = () => {
    dispatch(clearMessages())
    window.location.reload();
  }

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
                <div className="upper-image-display">
                  <div class="image-upload-container">
                    <label for="upload-input">
                      <div class="upload-icon"></div>
                      <input
                        type="file"
                        id="upload-input"
                        accept="images/*"
                        onChange={(e) => handleSecondImage(e.target.files)}
                      />
                    </label>
                  </div>
                  <img src={`${loanerImage}`} alt="" />
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
                    name="phone"
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
                  Branch Assigned
                  {status === "failed" && <p>Error: {error}</p>}
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.name} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Gender
                  <span className="star">*</span> <br />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
                      name="zipCode"
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
                        <PulseLoader color="white" size={10} />
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: "0px 20px" }}>
          {activeLink === "cso" && (
            <>
              <div className="sub-bill-1 find-lawyer-header">
                <div className="status-btn" style={{ marginBottom: "20px" }}>
                  {["all", "Male", "Female"].map((status) => (
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
                <div className="search-div" style={{ marginBottom: "20px" }}>
                  {/* <div style={{ position: "relative" }}>
                    <input  type="text" placeholder="search" />
                    <Icon
                      className="search-position"
                      icon="material-symbols-light:search"
                      width="18"
                      height="18"
                      style={{ color: "#9499AC" }}
                    />
                  </div> */}
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
                <th>Branch</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCso?.length > 0 ? (
                filteredCso.map((caseItem) => (
                  <tr key={caseItem?.id} onClick={() => handleRowClick(caseItem)} style={{ cursor: "pointer" }}>
                    <td>
                      <input
                        type="checkbox"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(caseItem);
                        }}
                      />
                    </td>
                    <td>{caseItem?.firstName} {caseItem?.lastName}</td>
                    <td>{caseItem?.email}</td>
                    <td>{caseItem?.phone}</td>
                    <td>{caseItem?.status}</td>
                    <td>{caseItem?.branch}</td>
                    <td>
                      <Link to={`/admin/csoDetails/${caseItem.workId}`}>View Details</Link>
                    </td>
                    <td style={{ position: "relative" }}>
                      <button 
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdownActivate(caseItem._id);
                        }}
                      >
                        &#8226;&#8226;&#8226;
                      </button>

                      {dropdownOpen === caseItem._id && (
                        <div 
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            background: "white",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "5px",
                            padding: "5px",
                            zIndex: 10,
                          }}
                        >
                          <button 
                            className="button"
                            onClick={() => {
                              dispatch(caseItem.isActive ? deactivateCSO(caseItem._id) : activateCSO(caseItem._id));
                              toggleDropdownActivate(null);
                            }}
                            disabled={isLoading}
                            style={{
                              background: caseItem.isActive ? "red" : "green",
                              color: "white",
                              padding: "10px",
                              border: "none",
                              width: "100%",
                              cursor: "pointer",
                            }}
                          >
                            {isLoading ? (
                              <PulseLoader color="white" size={10} />
                            ) : (
                              caseItem.isActive ? "Deactivate" : "Activate"
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-case">
                    <img src="/images/mask_img.png" alt="" />
                    <h3>No CSO found.</h3>
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
          <Icon icon="formkit:arrowleft" width="18" height="18" style={{ color: "#636878" }} />
          Previous
        </Link>

        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              className="paginations"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{ color: pageNumber === currentPage ? "#030b26" : "#727789" }}
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
          <Icon icon="formkit:arrowright" width="18" height="18" style={{ color: "#636878" }} />
        </Link>
      </div>
    </div>
            </>
          )}
        </div>
      </div>
      {successMessage !== null ? (
        <div className="dropdown-container">
          <div className="successPop">
<p>{successMessage}</p>
<button onClick={handleSuccessExit} className="exit-btn">Exit</button>
</div>
</div>
      ): ""}
      
    </ClientRap>
  );
};

export default Csos;
