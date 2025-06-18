// src/redux/reportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.jksolutn.com/api/reports";
// const API_URL = "http://localhost:5000/api/reports";


// Submit a new expense
export const submitExpense = createAsyncThunk(
  "report/submitExpense",
  async (expenseData, thunkAPI) => {
    try {
    const res = await axios.post(`${API_URL}/expense`, expenseData);
    console.log(res.data);
    
    return res.data;
    } catch (error) {
      console.error("Error submitting expense:", error);
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

// Submit a new cash at hand
export const submitCash = createAsyncThunk(
  "report/submitCash",
  async (cashData, thunkAPI) => {
    try {
    const res = await axios.post(`${API_URL}/cash`, cashData);
        console.log(res.data);

    return res.data;
    } catch (error) {
      console.error("Error submitting cash:", error);
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const fetchReportMonthlySummary = createAsyncThunk(
  'fetchReportMonthlySummary/fetch',
  async ({ year, month }) => {
    try {
      const response = await axios.get(`${API_URL}/report-monthly-summary?year=${year}&month=${month}`);
      console.log("Monthly report summary response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly report summary:", error);
      throw error; // Propagate the error to be handled in the slice
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
data: null,
    status: 'idle',
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    report: null,
    loading: false,
    expenseMessage: null, // To store the message from the expense submission response
    cashMessage: null, // To store the message from the cash submission response
    error: null,
  },
  reducers: {

     clearExpenseMessage: (state) => {
          state.expenseMessage = null;
        },
        clearCashMessage: (state) => {
          state.cashMessage = null;
        },
            setMonthYear(state, action) {
      state.currentMonth = action.payload.month;
      state.currentYear = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        state.expenseMessage = action.payload.message; // Assuming the response contains a message
      })
      .addCase(submitExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(submitCash.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCash.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        state.cashMessage = action.payload.message; // Assuming the response contains a message
      })
      .addCase(submitCash.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
 builder
      .addCase(fetchReportMonthlySummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReportMonthlySummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchReportMonthlySummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});


export const {
  clearExpenseMessage, // Action to clear the expense message
  clearCashMessage, // Action to clear the cash message
  setMonthYear,
} = reportSlice.actions;
export default reportSlice.reducer;
