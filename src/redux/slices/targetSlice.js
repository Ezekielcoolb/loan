import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://sever-qvw1.onrender.com/api/interest";

// const API_URL = "http://localhost:5000/api/interest"

// Async Thunks
export const fetchTarget = createAsyncThunk("target/fetchTarget", async () => {
  const response = await axios.get(`${API_URL}/get-interest`);

  return response.data.interest;
});

export const setTarget = createAsyncThunk("target/setTarget", async (targetData) => {
  const response = await axios.post(`${API_URL}/set-interest`, targetData);
  return response.data.target;
});

// Target Slice
const targetSlice = createSlice({
  name: "target",
  initialState: {
    target: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.target = action.payload;
      })
      .addCase(fetchTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setTarget.fulfilled, (state, action) => {
        state.target = action.payload;
      });
  },
});

export default targetSlice.reducer;
