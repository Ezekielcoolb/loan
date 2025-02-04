import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/guarantor';

// Fetch guarantor response
export const fetchGuarantorResponse = createAsyncThunk('guarantor/fetchResponse', async (loanId) => {
  const response = await axios.get(`${API_URL}/get-guarantorInfo/${loanId}`);
  return response.data;
});

// Submit a guarantor response
export const submitGuarantorResponse = createAsyncThunk('guarantor/submitResponse', async (formData) => {
  const response = await axios.post(`${API_URL}/guarantorInfo`, formData);
  return response.data;
});

const guarantorSlice = createSlice({
  name: 'guarantor',
  initialState: {
    response: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuarantorResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGuarantorResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(fetchGuarantorResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitGuarantorResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      });
  },
});

export default guarantorSlice.reducer;
