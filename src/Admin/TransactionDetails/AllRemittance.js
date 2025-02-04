import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar"; // Import the calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { FaCalendarAlt } from "react-icons/fa"; // Calendar icon
import styled from "styled-components";
import { fetchRemittancesForAllcso, setSelectedCSO } from "../../redux/slices/csoSlice";

// Styled Components
const Container = styled.div`
 background: white;
  margin: 20px;
  border-radius: 20px;
  padding-top: 30px;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const CalendarButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const CalendarIcon = styled(FaCalendarAlt)`
  margin-right: 10px;
  color: #555;
`;

const CalendarPopup = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  background: white;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 10;
`;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   border: 1px solid #ddd;
// `;

// const TableHeader = styled.th`
//   background: #f4f4f4;
//   padding: 10px;
//   border: 1px solid #ddd;
// `;

// const TableCell = styled.td`
//   padding: 10px;
//   border: 1px solid #ddd;
//   text-align: center;
//   cursor: pointer;

//   &:hover {
//     background-color: #f9f9f9;
//   }
// `;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RemittanceTable = () => {
    const dispatch = useDispatch();
    const { remmitCsoData, loading, selectedCSO } = useSelector(state => state.cso);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        dispatch(fetchRemittancesForAllcso(formattedDate));
    }, [dispatch, selectedDate]);

    return (
        <Container>
            {/* Date Picker */}
            <DatePickerWrapper>
                <CalendarButton onClick={() => setShowCalendar(!showCalendar)}>
                    <CalendarIcon />
                    {selectedDate.toISOString().split("T")[0]}
                </CalendarButton>
                {showCalendar && (
                    <CalendarPopup>
                        <Calendar 
                            onChange={(date) => { setSelectedDate(date); setShowCalendar(false); }} 
                            value={selectedDate} 
                        />
                    </CalendarPopup>
                )}
            </DatePickerWrapper>

            {/* Remittance Table */}
            {loading ? <p>Loading...</p> : (
             <div className="table-container">
             <div className="new-table-scroll">
               <div className="table-div-con">
                 <table className="custom-table">
                    <thead>
                        <tr>
                            <th>CSO Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {remmitCsoData.length > 0 ? remmitCsoData.map(cso => (
                            <tr key={cso.id} onClick={() => dispatch(setSelectedCSO(cso))}>
                                <td>{cso.name}</td>
                                <td>₦{cso.remittances.reduce((sum, remit) => sum + parseFloat(remit.amount), 0)}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="2">No remittances found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                </div>
                </div>
            )}

            {/* Remittance Image Modal */}
            {selectedCSO && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>{selectedCSO.name}'s Remittance</h2>
                        <div >
                            {selectedCSO.remittances.map((remit, index) => (
                                <div key={index} >
                                    <p><strong>₦{remit.amount}</strong></p>
                                    <img src={remit.image} alt="Remittance" style={{ width: "350px", height: "350px", objectFit: "cover", borderRadius: "5px" }} />
                                </div>
                            ))}
                        </div>
                        <CloseButton onClick={() => dispatch(setSelectedCSO(null))}>Close</CloseButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default RemittanceTable;
