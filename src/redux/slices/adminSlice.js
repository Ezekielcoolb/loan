import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'https://api.jksolutn.com/api/admin-members';

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

export const managerAdminLogin = createAsyncThunk('auth/managerAdminLogin', async (credentials) => {
  try {
  const response = await axios.post(`${API_URL}/login`, credentials);
  
  return response.data;
 
  } catch (err) {
    console.log(err);
  }
});


export const updateAdminPassword = createAsyncThunk(
  'admin/updateAdminPassword',
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update-admin-password/${id}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    loading: false,
    error: null,
    user: null,
    token: null,
    success: null,
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

      builder
      .addCase(updateAdminPassword.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(updateAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

      builder
      .addCase(managerAdminLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.admin;
      })
      .addCase(managerAdminLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default adminSlice.reducer;
