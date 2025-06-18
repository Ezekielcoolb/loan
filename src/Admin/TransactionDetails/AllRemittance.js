import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyRemittances, resolveIssue, updateRemittance } from "../../redux/slices/remittanceSlice";
import styled from "styled-components";


const RemittanceRap = styled.div`
h2 {

}
button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #0c1d55;
    width: 80px;
    height: 30px;
    border: 1px solid  #0c1d55;
    background: transparent;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px; 
}
.month-btn button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    width: 120px;
    height: 30px;
    border: 1px solid  #0c1d55;
    background: #0c1d55;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px; 
}
.month-btn {
    display: flex;
    gap: 20px;
}
.find-lawyer-header {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.successPop {
    display: flex;
    flex-direction: column;
    gap: 20px;

}
.successPop img {
    width: 300px;
    height: 400px;
}
.resolve-btn-div {
    display: flex;
    gap: 20px;
}
.resolve-btn {
    background: #0c1d55;
    color: #ffffff;
}
.successPop textarea, input {
    border: 1px solid #0c1d55;
    height: 40px;
    border-radius: 7px;
    padding: 10px;
    width: 300px;
}
label {
    display: flex;
    flex-direction: column;
    gap: 10px;
font-size: 12px;
}
.small-paragraph {
    font-weight: 400 !important;
    font-size: 16px !important;
    color: #60667a !important;
}
`


const RemittanceTable = () => {
  const dispatch = useDispatch();
  const { remittances, status, updateSuccess, resolveSuccess } = useSelector((state) => state.remittance);
  const [imageModal, setImageModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [resolutionText, setResolutionText] = useState("");
  const [editData, setEditData] = useState(null);
  const [updatedAmountRemitted, setUpdatedAmountRemitted] = useState("");
  const [updatedAmountOnTeller, setUpdatedAmountOnTeller] = useState("");
console.log(updateSuccess, resolveSuccess);

// Get current month and year
const currentDate = new Date();
const [month, setMonth] = useState(currentDate.getMonth() + 1); // JavaScript months are 0-based
const [year, setYear] = useState(currentDate.getFullYear());


const isValid = updatedAmountRemitted !== "" &&
                updatedAmountOnTeller !== "" 

useEffect(() => {
  dispatch(fetchMonthlyRemittances({ month, year }));
}, [dispatch, month, year]);

  const handleResolveIssue = (csoId, remitId) => {
    dispatch(resolveIssue({ csoId, remitId, resolution: resolutionText }));
    setModalData(null);
  };

  const handleUpdateAmounts = (remit) => {
    console.log(remit);
    
    setEditData(remit);
    setUpdatedAmountRemitted(remit.amountRemitted || "");
    setUpdatedAmountOnTeller(remit.amountOnTeller || "");
  };

  const submitUpdatedAmounts = () => {
    dispatch(updateRemittance({
      csoId: editData.csoId,
      remitId: editData.remittanceId,
      amountRemitted: updatedAmountRemitted,
      amountOnTeller: updatedAmountOnTeller
    }));
    setEditData(null);
  };

  const handleCloseOne = () => {
    window.location.reload()
  }
  // Change month handlers
  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (month === 1) setYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (month === 12) setYear((prev) => prev + 1);
  };
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading data</p>;

  return (
    <RemittanceRap>
    <div className="find-lawyer-header">
       <h2>Remittances for {new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" })}</h2>

<div className="month-btn">
  <button onClick={handlePrevMonth}>Previous Month</button>
  <button onClick={handleNextMonth}>Next Month</button>
</div>


<div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
      <thead>
  <tr>
    <th>CSO Name</th>
    <th>Date</th>
    <th>Time</th>
    <th>Amount</th>
    <th>Amount Remitted</th>
    <th>Amount on Teller</th>
    <th>Image</th>
    <th>Remark</th>
    <th>Resolve Issue</th>
    <th>Issue Resolution</th>
    <th>Manually Cleared</th>
    <th>Review Remittance</th>
  </tr>
</thead>
<tbody>
  {remittances?.slice().reverse().map((remit, index) => {
    const dateObj = new Date(remit.date);
    return (
      <tr key={index}>
        <td>{remit.csoName}</td>
        <td>{dateObj.toLocaleDateString()}</td>
        <td>{dateObj.toLocaleTimeString()}</td>
        <td>{remit.amount}</td>
        <td>{remit.amountRemitted}</td>
        <td>{remit.amountOnTeller}</td>
        <td>
          <button onClick={() => setImageModal(remit.image)}>View</button>
        </td>
        <td style={{ color: remit.remark === "Auto Clear" ? "blue" : "red" }}>
          {remit.remark}
        </td>
        <td>
          {!remit.manuallyCleared && remit.remark !== "Auto Clear" && (
            <button onClick={() => setModalData(remit)}>Resolve</button>
          )}
        </td>
        <td>
          {remit.remark === "Auto Clear" ? "Auto Clear" : remit.issueResolution}
        </td>
        <td> 
            {remit.manuallyCleared ? "Manually Cleared" : remit.remark === "Auto Clear" ? "Auto Clear": ""}</td>
        <td>
          <button onClick={() => handleUpdateAmounts(remit)}>Review</button>
        </td>
      </tr>
    );
  })}
</tbody>


      </table>
      </div>
      </div>
      {/* Update Amounts Modal */}
{editData && (
  <div className="dropdown-container ">
    <div className="successPop">
      <h3>Review Remittance</h3>

      {editData.amountRemitted && editData.amountOnTeller ? (
        <p className="small-paragraph">You have confirmed the amount remitted and the amount on the teller.</p>
      ) : (
        <>
          <label>
            Amount Remitted:
            <input
              type="number"
              value={updatedAmountRemitted}
              onChange={(e) => setUpdatedAmountRemitted(e.target.value)}
            />
          </label>
          <label>
            Amount on Teller:
            <input
              type="number"
              value={updatedAmountOnTeller}
              onChange={(e) => setUpdatedAmountOnTeller(e.target.value)}
            />
          </label>
          <div className="resolve-btn-div">
            <button   disabled={!isValid}
            style={{
              backgroundColor: isValid ? "#0c1d55" : "#727789",
              cursor:  !isValid ? "not-allowed" : "pointer",
            }} className="resolve-btn" onClick={submitUpdatedAmounts}>Submit</button>
          </div>
        </>
      )}

      <button onClick={() => setEditData(null)}>Close</button>
    </div>
  </div>
)}

      {modalData && (
         <div className="dropdown-container ">
       
       <div className="successPop">
       <h3>Resolve Issue</h3>
          <textarea
            placeholder="Enter resolution"
            value={resolutionText}
            onChange={(e) => setResolutionText(e.target.value)}
          />
          <div className="resolve-btn-div">
          <button className="resolve-btn" onClick={() => handleResolveIssue(modalData.csoId, modalData.remittanceId)}>Submit</button>
          <button onClick={() => setModalData(null)}>Close</button>
          </div>
        </div>
        </div>
      )}
 {imageModal && (
        <div className="dropdown-container ">
          <div className="successPop">
             <img
                        src={
                          imageModal?.startsWith("http")
                            ? imageModal // Cloudinary URL
                            : imageModal
                            ? `https://api.jksolutn.com${imageModal}` // Local image
                            : "fallback.jpg" // Optional fallback image
                        }
                        alt="business"
                        style={{ objectFit: "contain" }}
                      />
            {/* <img src={imageModal} alt="Remittance" style={{ maxWidth: "100%", maxHeight: "80vh" }} /> */}
            <button onClick={() => setImageModal(null)}>Close</button>
          </div>
        </div>
      )}
      {/* Resolve Issue Modal */}
    

      {updateSuccess ? (
        <div className="dropdown-container ">
       
        <div className="successPop">
            <div>
                <p>{updateSuccess}</p>
                <button onClick={handleCloseOne}>Close</button>

            </div>
            </div>

        </div>
      ): ""}
       {resolveSuccess ? (
        <div className="dropdown-container ">
       
        <div className="successPop">
            <div>
                <p>{resolveSuccess}</p>
                <button onClick={handleCloseOne}>Close</button>

            </div>
            </div>

        </div>
      ): ""}
    </div>
    </RemittanceRap>
  );
};

export default RemittanceTable;
