import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTarget, setTarget } from "../redux/slices/targetSlice";

const TargetForm = () => {
  const dispatch = useDispatch();
  const { target, loading } = useSelector((state) => state.target);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTarget());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTarget({ amount, description }));
  };

  return (
    <div style={styles.container}>
      <h2>Set Loan Interest</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          placeholder="Enter interest amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Set Interest</button>
      </form>

      {loading && <p>Loading...</p>}
      {target && (
        <div style={styles.targetInfo}>
          <h3>Current Interest:</h3>
          <p>Amount: <strong>{target.amount}</strong></p>
          <p>Description: <strong>{target.description}</strong></p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  targetInfo: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e9ecef",
  },
};

export default TargetForm;
