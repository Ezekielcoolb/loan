import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCsoNotifications } from "../redux/slices/notificationSlice";

const CsoNotifications = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.notifications);
  const user = JSON.parse(localStorage.getItem("csoUser"));

  const workId = user.workId;

  useEffect(() => {
    if (workId) {
      dispatch(fetchCsoNotifications(workId));
    }
  }, [dispatch, workId]);

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Recent Notifications</h3>

      {loading && <p style={styles.message}>Loading notifications...</p>}
      {error && <p style={{ ...styles.message, color: "red" }}>Error: {error}</p>}
      
      {data && (
  <>
    {["loanSubmit", "approval", "rejection", "disbursement"].map((category) =>
      data[category]?.length > 0 && (
        <div key={category} style={styles.categoryContainer}>
          <h4 style={styles.categoryTitle}>{category}</h4>
          <ul style={styles.list}>
            {data[category].slice().reverse().map((item, index) => (
              <li key={index} style={styles.listItem}>
                {item.message} <br />
                <small style={styles.date}>
                  {new Date(item.date).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )
    )}
  </>
)}

    </div>
  );
};

// CSS Styles as JavaScript objects
const styles = {
  container: {
    maxHeight: "300px",
    maxWidth: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  },
  header: {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "10px",
    color: "black"
  },
  message: {
    textAlign: "center",
    fontSize: "14px",
  },
  categoryContainer: {
    marginBottom: "10px",
  },
  categoryTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "capitalize",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "13px",
    marginBottom: "5px",
    padding: "5px",
    borderRadius: "3px",
    backgroundColor: "#fff",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
  },
  date: {
    fontSize: "11px",
    color: "gray",
  },
};

export default CsoNotifications;
