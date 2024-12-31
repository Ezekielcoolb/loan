import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch data
export const fetchBranchLoanData = createAsyncThunk('branches/fetchBranchLoanData', async () => {
    try {

  
  const response = await axios.get('http://localhost:5000/api/loanBranch/branches-with-loans'); // Adjust API endpoint as necessary
  return response.data;
    } catch (err) {
        console.log(err);
      }
});

const branchLoanSlice = createSlice({
  name: 'loanBranches',
  initialState: {
    branchData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranchLoanData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBranchLoanData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.branchData = action.payload;
      })
      .addCase(fetchBranchLoanData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default branchLoanSlice.reducer;
