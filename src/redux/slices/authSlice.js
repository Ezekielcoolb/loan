import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/loginauth';
const API_URLS = 'https://sever-qvw1.onrender.com/api/adminAuth';
// const API_URL = "http://localhost:5000/api/loginauth"
// const API_URLS = "http://localhost:5000/api/adminAuth"

// Login Thunk
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  console.log(response.data);
  return response.data;
 
  
});
// Login Thunk
export const superAdminLogin = createAsyncThunk('auth/superAdminLogin', async (credentials) => {
  try {
  const response = await axios.post(`${API_URLS}/login`, credentials);
  console.log(credentials);
  
  console.log(response.data);
  return response.data;
 
  } catch (err) {
    console.log(err);
  }
});

export const updateSupperAdminPassword = createAsyncThunk(
  'admin/updateSupperAdminPassword',
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URLS}/update-super-password/${id}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCsoPassword = createAsyncThunk(
  'admin/updateCsoPassword',
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update-cso-password/${id}`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Password Thunk
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData) => {
    const response = await axios.post(`${API_URL}/update-password`, passwordData);
    return response.data;
    
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    superUser: null,
    adminToken: null,
    success: null,
    csoSuccess: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
    resetState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.cso;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
      });

      builder
      .addCase(updateCsoPassword.pending, (state) => {
        state.loading = true;
        state.csoSuccess = null;
        state.error = null;
      })
      .addCase(updateCsoPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.csoSuccess = action.payload.message;
      })
      .addCase(updateCsoPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

      builder
      .addCase(updateSupperAdminPassword.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(updateSupperAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(updateSupperAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

      builder
      .addCase(superAdminLogin.fulfilled, (state, action) => {
        state.adminToken = action.payload.token;
        state.superUser = action.payload.user;
      })
      .addCase(superAdminLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
     
  },
});

export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;
