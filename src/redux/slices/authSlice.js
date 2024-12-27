import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/loginauth';

// Login Thunk
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  console.log(response.data);
  return response.data;
 
  
});

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
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
