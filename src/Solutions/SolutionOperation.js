// src/components/ExpenseForm.js
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CloudUpload } from "lucide-react";
import { PulseLoader } from "react-spinners";
import { Icon } from "@iconify/react/dist/iconify.js";
import { clearCashMessage, clearExpenseMessage, submitCash, submitExpense } from "../redux/slices/reportSlice";
import { setSuccessHolidayMessage } from "../redux/slices/holidaySlice";


const UploadContainer = styled.div`
  width: 380px;
  height: 100px;
  border: 1px solid rgba(16, 24, 40, 0.1);
  border-radius: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
`;

const UploadIconWrapper = styled.div`
  background-color: #f2f4f7;
  padding: 10px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UploadText = styled.p`
  color: #1570ef;
  font-size: 20px;
  font-weight: 500;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  margin-top: 20px;
  max-width: 100px;
  max-height: 100px;
  border-radius: 12px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const OperationRap = styled.div`
  .table-div-con {
    max-width: 400px;
  }
  .all-dropdown-div {
    width: fit-content !important;
  }
  .all-dropdown-div input {
    border: 1px solid #d0d5dd;
    width: 380px;
    border-radius: 100px;
    height: 40px;
    padding-left: 10px;
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

  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .upperLink {
    display: flex;
    gap: 20px;
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
`;

const   SolutionOperations = () => {
  const inputRef = useRef();
  const operations = [
  
    {
      id: 1,
      name: "New Loans",
    },

    {
      id: 2,
      name: "Add Cash At Hand",
    },
    {
      id: 3,
      name: "Add Expenses",
    },
  
   
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, cashMessage, expenseMessage } = useSelector(
    (state) => state.report
  );
  const [amount, setAmount] = useState("");
  const [cashAtHandShow, setCashAtHandShow] = useState(false);
  const [expenseShow, setExpenseShow] = useState(false);
  const [holidayShow, setHolidayShow] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { holidays, successHolidayMessage, holidayloading } = useSelector(
    (state) => state.holiday
  );

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  console.log(cashMessage);

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    receiptImg: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      setUploadedImage(imageUrl);

      // Update formData state
      setFormData((prevData) => ({
        ...prevData,
        receiptImg: imageUrl,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitExpense(formData));
    setFormData({ amount: "", purpose: "", receiptImg: "" });
  };

  const handleSubmitCash = (e) => {
    e.preventDefault();
    dispatch(submitCash({ amount: Number(amount) }));
    setAmount("");
  };

  const handleView = (id) => {
    if (id === 1) {
      navigate("/solution/newloan");
    }  else if (id === 2) {
      setCashAtHandShow(!cashAtHandShow);
    } else if (id === 3) {
      setExpenseShow(!expenseShow);
    }
  };

  const handleExpenseClose = () => {
    dispatch(clearExpenseMessage());
    setExpenseShow(false);
  };

  const handleCashClose = () => {
    dispatch(clearCashMessage());
    setCashAtHandShow(false);
  };

  const handleHolidayClose = () => {
    dispatch(setSuccessHolidayMessage());
    setHolidayShow(false);
  };

  return (
    <OperationRap>
      <div className="p-4">
        <div className="find-lawyer-header">
          <h2>Operations</h2>
        </div>

        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">Operations</th>
                    <th className="border px-2 py-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {operations?.map((operation, idx) => (
                    <tr key={operation.required} className="text-center">
                      <td className="border px-2 py-1">{operation.name}</td>
                      <td className="border px-2 py-1">
                        <button onClick={() => handleView(operation?.id)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        {expenseShow ? (
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <form onSubmit={handleSubmit}>
                <div className="dropdown-header">
                  <h3>Add Expense</h3>
                  <Icon
                    onClick={() => setExpenseShow(false)}
                    icon="stash:times-circle"
                    width="24"
                    height="24"
                    style={{ color: "#005e78", cursor: "pointer" }}
                  />
                </div>
                <div className="dropdown-content">
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount Spent"
                    type="number"
                    required
                  />
                  <input
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Enter the pupose of the expense"
                    type="text"
                    required
                  />
                  <UploadContainer onClick={triggerFileInput}>
                    <UploadIconWrapper>
                      <CloudUpload size={18} color="#667085" />
                    </UploadIconWrapper>
                    <UploadText>Click to upload</UploadText>
                    <HiddenInput
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={(e) => handleSecondImage(e.target.files)}
                    />
                  </UploadContainer>
                  {uploadedImage && (
                    <PreviewImage src={uploadedImage} alt="Uploaded preview" />
                  )}
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <PulseLoader color="white" size={10} />
                    ) : (
                      "Submit Expense"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {cashAtHandShow ? (
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <form onSubmit={handleSubmitCash}>
                <div className="dropdown-header">
                  <h3>Cash At Hand</h3>
                  <Icon
                    onClick={() => setCashAtHandShow(false)}
                    icon="stash:times-circle"
                    width="24"
                    height="24"
                    style={{ color: "#005e78", cursor: "pointer" }}
                  />
                </div>
                <div className="dropdown-content">
                  <h3>Enter Cash At Hand</h3>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <PulseLoader color="white" size={10} />
                    ) : (
                      "Submit Cash"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
       
      </div>

      {expenseMessage && expenseMessage !== null ? (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <div className="dropdown-content">
              <p>{expenseMessage}</p>
              <button className="submit-btn-2" onClick={handleExpenseClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {successHolidayMessage && successHolidayMessage !== null ? (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <div className="dropdown-content">
              <p>{successHolidayMessage}</p>
              <button className="submit-btn-2" onClick={handleHolidayClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {cashMessage && cashMessage !== null ? (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <div className="dropdown-content">
              <p>{cashMessage}</p>
              <button className="submit-btn-2" onClick={handleCashClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </OperationRap>
  );
};

export default SolutionOperations;
