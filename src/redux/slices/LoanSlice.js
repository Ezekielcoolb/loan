import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Toaster, toast} from "react-hot-toast"
import axios from "axios";

// Async Thunks for API Calls
const API_URL = "https://sever-qvw1.onrender.com/api/loan";

export const submitLoanApplication = createAsyncThunk(
  "loans/submitApplication",
  async (loanData) => {
    try {
     
      const response = await axios.post(`${API_URL}/apply`, loanData);
      console.log(response.data);
      toast.success(response.data.message)
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/loans?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch waiting loans 
export const fetchWaitingLoans = createAsyncThunk('loans/fetchWaitingLoans', async ({ page = 1, limit = 10 }) => {
  try{

    const response = await fetch(`${API_URL}/loans/pending-approval?page=${page}&limit=${limit}`);
    console.log(response);
    return response.json();
    
    
  }  catch (err) {
    console.log(err);
  }
});


export const fetchWaitingDisbursementLoans = createAsyncThunk(
  'loan/fetchWaitingDisbursementLoans',
  async () => {
    try {
    const response = await axios.get(`${API_URL}/loans/waiting-disbursement`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchActiveCustomers = createAsyncThunk(
  'loan/fetchActiveCustomers',
  async () => {
    try {
    const response = await axios.get(`${API_URL}/loans/active-customers`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);


export const fetchRepaymentSchedule = createAsyncThunk(
  'loan/fetchRepaymentSchedule',
  async (id) => {
    try {
    const response = await axios.get(`${API_URL}/loans/${id}/repayment-schedule`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchLoanById = createAsyncThunk('loans/fetchLoanById', async (id) => {
  try {
  const response = await axios.get(`${API_URL}/loans/${id}`);
  return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const makePayment = createAsyncThunk('loans/makePayment', async ({ id, amount, imageLink }) => {
  try  {
  const response = await axios.post(`${API_URL}/${id}/payment`, { amount, imageLink });
  console.log(response);
console.log(response.data);
  
  return response.data;
  }  catch (err) {
    console.log(err);
  }
});


export const disburseLoan = createAsyncThunk(
  'loan/disburseLoan',
  async (id) => {
    try {
    const response = await axios.post(`${API_URL}/loans/disburse/${id}`);
    console.log(response, response.data);
    
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);


// Approve loan
export const approveLoan = createAsyncThunk('loans/approveLoan', async ({ id, amountApproved }) => {
  try {

    const response = await fetch(`${API_URL}/loans/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountApproved }),
    });
    console.log(response.json());
    
    return response.json();
  }  catch (err) {
    console.log(err);
  }
});

// Reject loan
export const rejectLoan = createAsyncThunk('loans/rejectLoan', async ({ id, rejectionReason }) => {
  try {

    const response = await fetch(`${API_URL}/loans/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rejectionReason }),
    });
    console.log(response.json());
    
    return response.json();
  }  catch (err) {
    console.log(err);
  }
});


// Slice
const loanSlice = createSlice({
  name: "loans",
  initialState: {
    loans: [],
    total: 0,
    page: 1,
    totalPages: 0,
    activeCustomers: [],
    repaymentSchedule: [],
    selectedLoan: null,
    currentPage: 1,
    loading: 'idle',
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPages(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle loading and data fetching for submitting loan
    builder
      .addCase(submitLoanApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.push(action.payload); // Add the new loan to the loans array
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


      builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.loans = action.payload.loans;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });

      builder
    
      .addCase(fetchWaitingLoans.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchWaitingLoans.fulfilled, (state, action) => {
        state.loans = action.payload.loans;
        state.totalLoans = action.payload.totalLoans;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      })
      .addCase(fetchWaitingLoans.rejected, (state) => {
        state.loading = 'failed';
      })

      builder
      .addCase(fetchWaitingDisbursementLoans.fulfilled, (state, action) => {
        state.loans = action.payload;
      })
      .addCase(disburseLoan.fulfilled, (state, action) => {
        state.loans = state.loans.filter((loan) => loan._id !== action.payload.loan._id);
      })
      .addCase(fetchActiveCustomers.fulfilled, (state, action) => {
        state.activeCustomers = action.payload;
      })

      .addCase(fetchRepaymentSchedule.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchRepaymentSchedule.fulfilled, (state, action) => {
        state.repaymentSchedule = action.payload.repaymentSchedule || [];
        state.loading = 'idle';
      })

      .addCase(fetchLoanById.fulfilled, (state, action) => {
        state.selectedLoan = action.payload;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.selectedLoan = action.payload;
      })

      .addCase(approveLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex((loan) => loan._id === action.payload._id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex((loan) => loan._id === action.payload._id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      });
  },
});
export const { setPage, setPages} = loanSlice.actions;
export default loanSlice.reducer;
