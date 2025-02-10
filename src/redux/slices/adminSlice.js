import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'https://sever-qvw1.onrender.com/api/admin-members';

// const API_URL = "http://localhost:5000/api/admin-members";

// Async Thunks
export const fetchAdmins = createAsyncThunk("admin/fetchAdmins", async () => {
    try {
  const response = await axios.get(API_URL);
  
  return response.data;
    } catch(e){
        console.log(e)
    }
});

export const addAdmin = createAsyncThunk("admin/addAdmin", async (formData) => {
    try {
  const response = await axios.post(API_URL, formData);
  console.log(response.data);
  
  return response.data;
    } catch(e){
        console.log(e)
    }
});

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      });
  },
});

export default adminSlice.reducer;
