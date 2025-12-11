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

export const managerAdminLogin = createAsyncThunk(
  'auth/managerAdminLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);


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

export const suspendAdmin = createAsyncThunk(
  'admin/suspendAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/suspend`);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const activateAdmin = createAsyncThunk(
  'admin/activateAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/activate`);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
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
    actionLoading: false,
    loginLoading: false,
  },
  reducers: {

    logoutAdmin: (state) => {
          state.user = null;
          state.token = null;
        },
  },
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
      .addCase(managerAdminLogin.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(managerAdminLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.admin;
      })
      .addCase(managerAdminLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload || action.error.message;
      })
      .addCase(suspendAdmin.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(suspendAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins = state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        );
      })
      .addCase(suspendAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(activateAdmin.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(activateAdmin.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.admins = state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        );
      })
      .addCase(activateAdmin.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});
export const { logoutAdmin  } = adminSlice.actions;
export default adminSlice.reducer;
