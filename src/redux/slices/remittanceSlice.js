import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'https://api.jksolutn.com/api/cso';

// const API_URL = "http://localhost:5000/api/cso"

// Async thunk for fetching remittance progress
export const fetchRemittanceNewProgress = createAsyncThunk(
  "remittance/fetchProgress",
  async (workId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/remittance-progress/${workId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchMonthlyRemittances = createAsyncThunk(
  "remittance/fetch",
  async ({ month, year } = {}) => {
    try {
      const response = await axios.get(
        `${API_URL}/get-monthly-remittances`,
        { params: { month, year } }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// Resolve issue
export const resolveIssue = createAsyncThunk(
  "remittance/resolve",
  async ({ csoId, remitId, resolution }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/resolve-issue/${csoId}/${remitId}`, { resolution });

      // Ensure the success message from the server is returned
      console.log(response.data);
      
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);


export const updateRemittance = createAsyncThunk(
  "remittance/updateRemittance",
  async ({ csoId, remitId, amountRemitted, amountOnTeller }) => {
    try {
    const response = await axios.post(`${API_URL}/update-monthly-remittance`, {
      csoId,
      remitId,
      amountRemitted,
      amountOnTeller
    });
    console.log(response.data);
    
    return response.data;
  } catch (err) {
    console.log(err);
  }
  }
);

const remittanceSlice = createSlice({
  name: "remittance",
  initialState: {
    loading: false,
    remittances: [],
     status: "idle",
    remittanceProgress: {
      progress: 0,
      yesterdayProgress: 0,
      weekProgress: 0,
      monthProgress: 0,
    },
    error: null,
    updateSuccess: "",
    resolveSuccess: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemittanceNewProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRemittanceNewProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.remittanceProgress = action.payload;
        
      })
      .addCase(fetchRemittanceNewProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      });

       builder
      .addCase(fetchMonthlyRemittances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonthlyRemittances.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.remittances = action.payload;
      
      })
      .addCase(fetchMonthlyRemittances.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resolveIssue.fulfilled, (state, action) => {
        const { csoId, remitId, resolution } = action.payload;
        const remit = state.remittances.find(r => r.csoId === csoId && r.remitId === remitId);
        if (remit) {
          remit.issueResolution = resolution;
          remit.manuallyCleared = true;
        }
        state.resolveSuccess = action.payload.message
      })
      .addCase(updateRemittance.fulfilled, (state, action) => {
        state.remittances = state.remittances.map((remit) =>
          remit.remitId === action.payload.remitId ? { ...remit, ...action.payload } : remit
        );
        state.updateSuccess = action.payload.message
      });

  },
});

export default remittanceSlice.reducer;
