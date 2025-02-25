import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'http://api.jksolutn.com/api/dashboard'; // Backend API URL
// const API_URL = "http://localhost:5000/api/dashboard"

// Async thunk to fetch loan statistics
export const fetchLoanStats = createAsyncThunk("loans/fetchStats", async () => {
  const response = await axios.get(`${API_URL}/loan-stats`); // Update with your backend URL
  return response.data;
});

const dashboardLoanSlice = createSlice({
  name: "loans",
  initialState: {
    stats: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoanStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchLoanStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardLoanSlice.reducer;
