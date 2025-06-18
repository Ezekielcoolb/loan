import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchLoanForWeeklyReportCollection, setCsoHomePage } from "../redux/slices/LoanSlice";
import html2pdf from "html2pdf.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ReportRap = styled.div`
  background: white;
  padding: 20px;
  width: 100%;
  max-width: 1000px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #d0d5dd !important;
  
    font-size: 14px;
    color: black;
  
  }
.table-div-con {
  min-width: 500px !important;
 
 
}
  .table-container {
    overflow: visible !important;
    max-height: unset !important;
  }

  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`;

const NewRap = styled.div`
  margin: 20px;
  button {
    border: none;
    background: blue;
    border-radius: 10px;
    padding: 10px 16px;
    color: white;
    cursor: pointer;
  }
  .first-div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .btn {
    background: green;
  }
`;

const CsoCollectionReportCollection = () => {
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    loans,
    csoHomepage,
    csoHometotalPages,
    csoWeeklyReport,
    status,
    error,
  } = useSelector((state) => state.loan);
  const [loading, setLoading] = useState(false);
  const csoId = user.workId;
  const reportRef = useRef(); // 👈 Ref for the report content

  useEffect(() => {
    dispatch(fetchLoanForWeeklyReportCollection({ csoId}));
  }, [dispatch, csoId]);

 const handleDownload = () => {
    if (!reportRef.current) return;

    const element = reportRef.current;

    const opt = {
      margin: 0.5,
      filename: "collection-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    setLoading(true);
    html2pdf().set(opt).from(element).save().finally(() => {
      setLoading(false);
    });
  };


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
const handleOpenGoBack = () => {
  navigate("/cso/loans-dashboard")
}
  return (
    <>
    <NewRap>
    <div className="first-div">
       <Icon onClick={handleOpenGoBack}
                                      className="notify"
                                      icon="solar:arrow-left-outline"
                                      width="24"
                                      height="24"
                                      style={{ color: "black" }}
                                    />
      <button className="btn" onClick={handleDownload} style={{ margin: "20px" }}>
         Download
      </button>
      <button
                   
                    onClick={handlePrev}
                    disabled={csoHomepage === 1}
                  >
                    Prev
                  </button>
                  <button
                   
                    onClick={handleNext}
                    disabled={csoHomepage === csoHometotalPages}
                  >
                    Next
                  </button>
      </div>
      </NewRap>

      <ReportRap ref={reportRef}>
        <h2>JK SOLUTN DAILY COLLECTION</h2>
        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table">
                <thead className="bg-gray-100">
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Wed</th>
                    <th>Thur</th>
                    <th>Fri</th>
                  </tr>
                </thead>
                <tbody>
                  {csoWeeklyReport?.loans?.map((loan, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        {loan.customerDetails?.lastName}{" "}
                        {loan.customerDetails?.firstName}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ReportRap>
    </>
  );
};

export default CsoCollectionReportCollection;
