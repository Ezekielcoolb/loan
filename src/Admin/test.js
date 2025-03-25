import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyRemittances, resolveIssue, updateRemittance } from "../redux/slices/remittanceSlice";

const MonthRemittanceTable = () => {
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
    <div>
       <h2>Remittances for {new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" })}</h2>

<div>
  <button onClick={handlePrevMonth}>Previous Month</button>
  <button onClick={handleNextMonth}>Next Month</button>
</div>


      <table border="1">
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
    <th>Update Amounts</th>
  </tr>
</thead>

<tbody>
  {remittances?.map((remit, index) => {
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
          <button onClick={() => setImageModal(remit.image)}>View Image</button>
        </td>
        <td>{remit.remark}</td>
        <td>
          {!remit.manuallyCleared && (
            <button onClick={() => setModalData(remit)}>Resolve Issue</button>
          )}
        </td>
        <td>{remit.issueResolution}</td>
        <td>{remit.manuallyCleared ? "Manually Cleared" : ""}</td>
        <td>
          <button onClick={() => handleUpdateAmounts(remit)}>Update Amounts</button>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
      {imageModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setImageModal(null)}>&times;</span>
            <img src={imageModal} alt="Remittance" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
          </div>
        </div>
      )}
      {/* Resolve Issue Modal */}
      {modalData && (
        <div className="modal">
          <h3>Resolve Issue</h3>
          <textarea
            placeholder="Enter resolution"
            value={resolutionText}
            onChange={(e) => setResolutionText(e.target.value)}
          />
          <button onClick={() => handleResolveIssue(modalData.csoId, modalData.remittanceId)}>Submit</button>
          <button onClick={() => setModalData(null)}>Close</button>
        </div>
      )}

      {/* Update Amounts Modal */}
      {editData && (
        <div className="modal">
          <h3>Update Amounts</h3>
          <label>Amount Remitted:</label>
          <input
            type="number"
            value={updatedAmountRemitted}
            onChange={(e) => setUpdatedAmountRemitted(e.target.value)}
          />
          <label>Amount on Teller:</label>
          <input
            type="number"
            value={updatedAmountOnTeller}
            onChange={(e) => setUpdatedAmountOnTeller(e.target.value)}
          />
          <button onClick={submitUpdatedAmounts}>Submit</button>
          <button onClick={() => setEditData(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MonthRemittanceTable;
