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

const remittanceSlice = createSlice({
  name: "remittance",
  initialState: {
    loading: false,
    remittanceProgress: {
      progress: 0,
      yesterdayProgress: 0,
      weekProgress: 0,
      monthProgress: 0,
    },
    error: null,
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
  },
});

export default remittanceSlice.reducer;
