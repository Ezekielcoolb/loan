import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://sever-qvw1.onrender.com/api/loan'; // Backend API URL

// const API_URL = "http://localhost:5000/api/loan"

// Async thunk to fetch active loans
export const fetchCsoPageActiveLoans = createAsyncThunk(
  "loans/fetchActiveLoans",
  async ({ csoId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/fetchcsoloans/active?csoId=${csoId}&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const csoLoanSlice = createSlice({
  name: "loans",
  initialState: {
    loans: [],
    totalPages: 1,
    currentPage: 1,
    totalLoans: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetLoans: (state) => {
      state.loans = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalLoans = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsoPageActiveLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoPageActiveLoans.fulfilled, (state, action) => {
        state.loans = action.payload.loans;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalLoans = action.payload.totalLoans;
        state.loading = false;
      })
      .addCase(fetchCsoPageActiveLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLoans } = csoLoanSlice.actions;
export default csoLoanSlice.reducer;
