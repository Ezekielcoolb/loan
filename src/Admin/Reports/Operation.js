// src/components/ExpenseForm.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCashMessage,
  clearExpenseMessage,
  deleteCash,
  deleteExpense,
  updateExpenseDate,
  fetchReport,
  goToNextMonth,
  goToPreviousMonth,
  submitCash,
  submitExpense,
} from "../../redux/slices/reportSlice";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CloudUpload } from "lucide-react";
import { PulseLoader } from "react-spinners";
import { Icon } from "@iconify/react/dist/iconify.js";
import HolidayForm from "../Holidays/AddHoliday";
import { setSuccessHolidayMessage } from "../../redux/slices/holidaySlice";
import { resetUpload, uploadImages } from "../../redux/slices/uploadSlice";
import imageCompression from "browser-image-compression";
import { clearMessages, fetchAllTheCsos, submitCsoExpense } from "../../redux/slices/csoSlice";
import { fetchAdmins } from "../../redux/slices/adminSlice";

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
  .table-div-con {
    max-width: 400px;
  }
  .all-dropdown-div {
    width: fit-content !important;
    overflow-y: auto ;
    max-height: 500px;
  }
  .all-dropdown-div input, .all-dropdown-div select {
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
    white-space: nowrap;
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
  .upperLink-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .upperLink-btn {
    display: flex;
    gap: 10px;
  }
  .upperLink-btn button {
    padding: 10px 20px;
  }
  .upperLink-flex {
    flex-wrap: wrap;
  }
  .expense-total {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 50px;

  }
  .expense-total h3 {
    font-size: 20px;
    font-weight: 600;
}

  .expense-total p {
    font-size: 30px;
    font-weight: 600;
}
.custom-table {
  max-width: 500px;
}
`;

const Operations = () => {
  const inputRef = useRef();
  const operations = [
    {
      id: 1,
      name: "Disbursements",
    },
    {
      id: 2,
      name: "New Loans",
    },

    {
      id: 3,
      name: "Add Cash At Hand",
    },
    {
      id: 4,
      name: "Add Expenses",
    },
    {
      id: 5,
      name: "Add Holidays",
    },

    {
      id: 6,
      name: "Check Holidays",
    },
    // {
    //   id: 7,
    //   name: "Add Cso Expenses",
    // },
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    cashMessage,
    expenseMessage,
    cashAtHand,
    cashDeteleloading,
    cashDelete,
    expressDelete,
    deleteExploading,
    expenses,
    month,
    year,
    updateExpenseLoading,
  } = useSelector((state) => state.report);

  console.log(expenses)

  const [amount, setAmount] = useState("");
  const [activeLink, setActiveLink] = useState("operations");

  const [cashAtHandShow, setCashAtHandShow] = useState(false);
  const [expenseShow, setExpenseShow] = useState(false);
   const [csoExpenseShow, setCsoExpenseShow] = useState(false);
  const [holidayShow, setHolidayShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectSpender, setSelectSpender] = useState(null)
  const [selectSpenderMange, setSelectSpenderManage] = useState(null)
console.log(
  selectSpender
);
console.log(
  selectSpenderMange
);

 
const handleSelectSpender = (id) => {
  const spenderObj = csos?.find((cso) => cso._id === id);
   setSelectSpenderManage(null);
  setSelectSpender(spenderObj);
  
};
const handleSelectSpenderManage = (id) => {
  const spenderObj = admins?.find((cso) => cso._id === id);
  setSelectSpenderManage(spenderObj);
    setSelectSpender(null);
};

  const [uploadedImage, setUploadedImage] = useState(null);
  const [dateEditModal, setDateEditModal] = useState({ open: false, oldDate: "", newDate: "" });
  const { holidays, successHolidayMessage, holidayloading } = useSelector(
    (state) => state.holiday
  );
   const { admins } = useSelector((state) => state.admin);
   const {  list: csos, expenseUploadLoading, expenseUploded } = useSelector(
      (state) => state.cso
    );
  const { urls, target } = useSelector((state) => state.upload);

  const triggerFileInput = () => {
    inputRef.current.click();
  };




  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    receiptImg: "",
    spenderId: "",
    spenderName: "",
    date: ""
  });


  const [dataForm, setDataForm] = useState({
    amount: "",
    purpose: "",
    receiptImg: "",
  });

  console.log(formData);

  
  useEffect(() => {
    dispatch(fetchAllTheCsos());
  }, [dispatch]);

    useEffect(() => {
      dispatch(fetchAdmins());
    }, [dispatch]);


    useEffect(() => {
  const spender = selectSpender || selectSpenderMange;

  setFormData((prev) => ({
    ...prev,
    spenderId: spender ? spender._id : "",
    spenderName: spender ? `${spender.firstName} ${spender.lastName}` : "Admin"
  }));
}, [selectSpender, selectSpenderMange]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleChangeCso = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSecondImage = async (fileList) => {
  let files = Array.from(fileList);

  files = await Promise.all(
    files.map(async (file, index) => {
      if (!file.name || !file.lastModified) {
        file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
          type: file.type || "image/jpeg",
          lastModified: Date.now(),
        });
      }

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        return await imageCompression(file, options);
      } catch {
        return file;
      }
    })
  );

  files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
  if (files.length === 0) return alert("Captured file is invalid or empty.");

  try {
    // 👇 Upload image(s) via thunk
    const result = await dispatch(
      uploadImages({ files, folderName: "cashAtHand", target })
    ).unwrap();

    // 👇 Assuming backend returns { urls: ["url1", "url2", ...] }
    if (result?.urls && result.urls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        receiptImg: result.urls[0], // save first uploaded image URL
      }));
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    alert("Failed to upload image. Please try again.");
  }
};


  const handleCsoExpenseImage = async (fileList) => {
  let files = Array.from(fileList);

  files = await Promise.all(
    files.map(async (file, index) => {
      if (!file.name || !file.lastModified) {
        file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
          type: file.type || "image/jpeg",
          lastModified: Date.now(),
        });
      }

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        return await imageCompression(file, options);
      } catch {
        return file;
      }
    })
  );

  files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
  if (files.length === 0) return alert("Captured file is invalid or empty.");

  // 👇 upload the images
  const result = await dispatch(
    uploadImages({ files, folderName: "cashAtHand", target })
  ).unwrap(); // .unwrap() lets you get the actual payload instead of action object

  // Assuming your backend returns an array of uploaded file URLs
  if (result?.urls && result.urls.length > 0) {
    setDataForm((prev) => ({
      ...prev,
      receiptImg: result.urls[0], // take the first uploaded image URL
    }));
  }
};


  // useEffect(() => {
  //   if (!loading && urls.length > 0) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       receiptImg: urls[0], // 👈 Set the first uploaded URL to receiptImg
  //     }));
  //     dispatch(resetUpload()); // 👈 Clear upload state after setting
  //   }
  // }, [urls, loading, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitExpense(formData));
    setFormData({ amount: "", purpose: "", receiptImg: "" });
  };

  
 const handleSubmitCsoExpense = (e) => {
  e.preventDefault();


  dispatch(
    submitCsoExpense({
      csoId: selectedId,
      expenseData: dataForm,
    })
  );

  // reset form
  setDataForm({ amount: "", purpose: "", receiptImg: "" });
};


  const handleSubmitCash = (e) => {
    e.preventDefault();
    dispatch(submitCash({ amount: Number(amount) }));
    setAmount("");
  };

  const handleView = (id) => {
    if (id === 1) {
      navigate("/admin/disbursement");
    } else if (id === 2) {
      navigate("/admin/newloan");
    } else if (id === 3) {
      setCashAtHandShow(!cashAtHandShow);
    } else if (id === 4) {
      setExpenseShow(!expenseShow);
    } else if (id === 5) {
      setHolidayShow(!holidayShow);
    } else if (id === 6) {
      navigate("/admin/holidays");
    } 
     else if (id === 7) {
      setCsoExpenseShow(!csoExpenseShow);
    }
  };

  const handleExpenseClose = () => {
    dispatch(clearExpenseMessage());
    setExpenseShow(false);
  };

  const openDateEditModal = (date) => {
    setDateEditModal({ open: true, oldDate: date, newDate: date });
  };

  const closeDateEditModal = () => {
    setDateEditModal({ open: false, oldDate: "", newDate: "" });
  };

  const handleDateUpdate = (e) => {
    e.preventDefault();
    if (!dateEditModal.oldDate || !dateEditModal.newDate) return;
    dispatch(updateExpenseDate({ oldDate: dateEditModal.oldDate, newDate: dateEditModal.newDate }))
      .unwrap()
      .then(() => {
        closeDateEditModal();
        dispatch(fetchReport({ month, year }));
      })
      .catch(() => {});
  };

  useEffect(() => {
    dispatch(fetchReport({ month, year }));
  }, [dispatch, month, year]);

  const handleNext = () => {
    dispatch(goToNextMonth());
  };

  const handlePrevious = () => {
    dispatch(goToPreviousMonth());
  };

  const handleCashClose = () => {
    dispatch(clearCashMessage());
    setCashAtHandShow(false);
  };

  const handleHolidayClose = () => {
    dispatch(setSuccessHolidayMessage());
    setHolidayShow(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

const totalAmount = expenses?.reduce((total, entry) => {
  const itemsTotal = entry.items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return total + itemsTotal;
}, 0);

console.log(totalAmount.toLocaleString());

  return (
    <OperationRap>
      <div className="p-4">
        <div className="find-lawyer-header">
          <h2>Operations</h2>
          <div className="upperLink-flex">
            <div className="client-1">
              <div className="client-link-container">
                <Link
                  className={`client-link ${
                    activeLink === "operations" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("operations")}
                >
                  Operations
                </Link>
                <Link
                  className={`client-link ${
                    activeLink === "expenses" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("expenses")}
                >
                  Expenses List
                </Link>
                <Link
                  className={`client-link ${
                    activeLink === "cash" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("cash")}
                >
                  Cash At Hand List
                </Link>
              </div>
            </div>
            <div className="upperLink-btn">
              <button onClick={handlePrevious}>← Previous</button>
              <button onClick={handleNext} style={{ marginLeft: "1rem" }}>
                Next →
              </button>
            </div>
          </div>
        </div>
        {activeLink === "operations" && (
          <div>
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
        )}

      {dateEditModal.open && (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <form onSubmit={handleDateUpdate}>
              <div className="dropdown-header">
                <h3>Edit Expense Date</h3>
                <Icon
                  onClick={closeDateEditModal}
                  icon="stash:times-circle"
                  width="24"
                  height="24"
                  style={{ color: "#005e78", cursor: "pointer" }}
                />
              </div>
              <div className="dropdown-content">
                <label>Current Date</label>
                <input value={dateEditModal.oldDate} disabled />
                <label>New Date</label>
                <input
                  type="date"
                  value={dateEditModal.newDate}
                  onChange={(e) =>
                    setDateEditModal((prev) => ({ ...prev, newDate: e.target.value }))
                  }
                  required
                />
                <button className="submit-btn" type="submit" disabled={updateExpenseLoading}>
                  {updateExpenseLoading ? (
                    <PulseLoader color="white" size={10} />
                  ) : (
                    "Update Date"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        {activeLink === "expenses" && (
          <>
            <div>
              <h2
                style={{
                  margin: "20px",
                }}
              >
                Expenses for {monthNames[month]} {year}
              </h2>
              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-2 py-1 border">Date</th>
                          <th className="px-2 py-1 border">Items</th>
                          <th>Total</th>
                          <th className="px-2 py-1 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses?.map((e) => (
                          <tr key={e.date}>
                            <td className="px-2 py-1 border">{e.date}</td>
                            <td className="px-2 py-1 border">
                              <ul>
                                {e.items.map((item, idx) => (
                                  <li
                                    style={{
                                      marginTop: "10px",
                                    }}
                                    key={idx}
                                  >
                                    ₦{item.amount} - {item.purpose}
                                  </li>
                                ))}
                              </ul>
                              <button
                                style={{ marginTop: "10px" }}
                                onClick={() => openDateEditModal(e.date)}
                              >
                                Edit Date
                              </button>
                            </td>
                            <td
                              style={{
                                fontWeight: "700",
                                fontSize: "18px",
                                color: "#112240",
                              }}
                            >
                              {e.items.reduce(
                                (sum, item) => sum + Number(item.amount),
                                0
                              )}
                            </td>

                            <td>
                              <ul>
                                {e.items.map((item, idx) => (
                                  <li
                                    style={{
                                      listStyleType: "none",
                                      display: "flex",
                                      marginTop: "10px",
                                    }}
                                    key={idx}
                                  >
                                    <button
                                      onClick={() =>
                                        setSelectedImage(item.receiptImg)
                                      }
                                    >
                                      View
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </td>
                            {/* <td><button onClick={() => dispatch(deleteExpense(e.date))}>Delete</button></td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="expense-total">
                <h3>Total Expenses for {monthNames[month]} {year}:</h3>
                <p style={{ color: "#112240" }}>
                  ₦{totalAmount.toLocaleString()} 
                </p>
                </div>
            </div>
          </>
        )}

        {activeLink === "cash" && (
          <div>
            <h2
              style={{
                margin: "20px",
              }}
            >
              Cash At Hand For {monthNames[month]} {year}
            </h2>
            <div className="table-container">
              <div className="new-table-scroll">
                <div className="table-div-con">
                  <table className="custom-table">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 border">Date</th>
                        <th className="px-2 py-1 border">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashAtHand.map((c) => (
                        <tr key={c.date}>
                          <td className="px-2 py-1 border">{c.date}</td>
                          <td className="px-2 py-1 border">₦{c.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
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
                          <label>If for Cso Select CSO:</label>
        <select
    value={selectSpender?._id || ""}
    onChange={(e) => handleSelectSpender(e.target.value)}
    className="border p-2 w-full"
  >
    <option value="">-- Choose a CSO --</option>
    {csos?.map((cso) => (
      <option key={cso._id} value={cso._id}>
        {cso.firstName} {cso.lastName} ({cso.branch})
      </option>
    ))}
  </select>


                            <label>If for Manager Select Manager:</label>
          <select
            value={selectSpenderMange?._id || ""}
            onChange={(e) => handleSelectSpenderManage(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">-- Choose a Manager --</option>
            {admins?.map((cso) => (
              <option key={cso._id} value={cso._id}>
                {cso.firstName} {cso.lastName} 
              </option>
            ))}
          </select>

          <label>Expenses for a specific date</label>
          <input 
          name="date"
                    value={formData.date}
                    onChange={handleChange}
           type="Date" />

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

          {csoExpenseShow ? (
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <form onSubmit={handleSubmitCsoExpense}>
                <div className="dropdown-header">
                  <h3>Add Cso Expense</h3>
                  <Icon
                    onClick={() => setCsoExpenseShow(false)}
                    icon="stash:times-circle"
                    width="24"
                    height="24"
                    style={{ color: "#005e78", cursor: "pointer" }}
                  />
                </div>


                <div className="dropdown-content">
                 <label>Select CSO:</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">-- Choose a CSO --</option>
            {csos.map((cso) => (
              <option key={cso._id} value={cso._id}>
                {cso.firstName} {cso.lastName} ({cso.branch})
              </option>
            ))}
          </select>

                  <input
                    name="amount"
                    value={dataForm.amount}
                    onChange={handleChangeCso}
                    placeholder="Enter Amount Spent"
                    type="number"
                    required
                  />
                  <input
                    name="purpose"
                    value={dataForm.purpose}
                    onChange={handleChangeCso}
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
                      onChange={(e) => handleCsoExpenseImage(e.target.files)}
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
                    {expenseUploadLoading ? (
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
        {holidayShow ? (
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <form onSubmit={handleSubmitCash}>
                <div className="dropdown-header">
                  <h3>Add Holiday</h3>
                  <Icon
                    onClick={() => setHolidayShow(false)}
                    icon="stash:times-circle"
                    width="24"
                    height="24"
                    style={{ color: "#005e78", cursor: "pointer" }}
                  />
                </div>
                <div className="dropdown-content">
                  <HolidayForm />
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

      {expenseUploded ? (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <div className="dropdown-content">
              <p>{expenseUploded?.message}</p>
              <button className="submit-btn-2" onClick={() => dispatch(clearMessages())}>
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

      {selectedImage && (
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <div className="dropdown-content">
              <img
                src={
                  selectedImage?.startsWith("http")
                    ? selectedImage // Cloudinary URL
                    : selectedImage
                    ? `https://api.jksolutn.com${selectedImage}` // Local image
                    : "fallback.jpg" // Optional fallback image
                }
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
              <button
                className="submit-btn-2"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </OperationRap>
  );
};

export default Operations;
