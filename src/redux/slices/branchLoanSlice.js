import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/loanBranch'; // Base API URL
// const API_URL = "http://localhost:5000/api/loanBranch"
// Async Thunks
export const fetchLoanBranches = createAsyncThunk(
  'branches/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/getLoanbranches`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch branches'
      );
    }
  }
);

export const fetchLoanBranchData = createAsyncThunk(
  'branch/fetchBranchData',
  async (branchName) => {
      const response = await axios.get(`${API_URL}/branches/${branchName}`);
      return response.data;
  }
);

export const fetchCsoTransactions = createAsyncThunk(
  'cso/fetchCsoTransactions',
  async ({ branchName, month, year }) => {
      const response = await axios.get(`${API_URL}/branches/${branchName}/cso-transactions`, {
          params: { month, year }
      });
      return response.data;
  }
);

export const fetchCustomerBranchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async (branchName) => {
    const response = await fetch(`${API_URL}/branches/${branchName}/customers-loans`);
    if (!response.ok) {
      throw new Error('Failed to fetch loan data');
    }
    const data = await response.json();
    return data.customers;
  }
);

// Fetch data from backend
export const fetchLoanStatsChart = createAsyncThunk(
  'loan/fetchLoanStats',
  async () => {
      const response = await axios.get(`${API_URL}//chart-loans/loan-stats`);
      return response.data;
  }
);

const branchLoanSlice = createSlice({
  name: 'loanBranches',
  initialState: {
    branches: [],
    loans: [],
    csoTransactions: [],
    data: null,
    branchDetails: null,
    loading: false,
    error: null,
    totalLoanTarget: 0,
    totalActiveLoan: 0,
  },
  reducers: {
    resetBranchDetails: (state) => {
      state.branchDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoanBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchLoanBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      builder
      .addCase(fetchLoanBranchData.pending, (state) => { state.loading = true; })
      .addCase(fetchLoanBranchData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
      })
      .addCase(fetchLoanBranchData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })

      builder
      .addCase(fetchCsoTransactions.pending, (state) => {
          state.loading = true;
      })
      .addCase(fetchCsoTransactions.fulfilled, (state, action) => {
          state.loading = false;
          state.csoTransactions = action.payload.csoTransactions;
      })
      .addCase(fetchCsoTransactions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })

      builder
      .addCase(fetchCustomerBranchLoans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerBranchLoans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loans = action.payload;
      })
      .addCase(fetchCustomerBranchLoans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(fetchLoanStatsChart.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(fetchLoanStatsChart.fulfilled, (state, action) => {
          state.totalLoanTarget = action.payload.totalLoanTarget;
          state.totalActiveLoan = action.payload.totalActiveLoan;
          state.status = 'succeeded';
      })
      .addCase(fetchLoanStatsChart.rejected, (state) => {
          state.status = 'failed';
      });

  },
});

export const { resetBranchDetails } = branchLoanSlice.actions;
export default branchLoanSlice.reducer;
