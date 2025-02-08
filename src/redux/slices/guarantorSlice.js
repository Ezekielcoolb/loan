import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/guarantor';
// const API_URL = "http://localhost:5000/api/guarantor"

// Fetch guarantor response
export const fetchGuarantorResponse = createAsyncThunk('guarantor/fetchResponse', async (loanId) => {
  const response = await axios.get(`${API_URL}/get-guarantorInfo/${loanId}`);
  return response.data;
});

// Submit a guarantor response
export const submitGuarantorResponse = createAsyncThunk('guarantor/submitResponse', async (formData) => {
  const response = await axios.post(`${API_URL}/guarantorInfo`, formData);
  console.log(response.data);
  
  return response.data;
});

// Async thunk to fetch guarantor response by loanId
export const fetchGuarantor = createAsyncThunk(
  'guarantor/fetchGuarantor',
  async (loanId) => {
    const response = await fetch(`${API_URL}/fetch-guarantor/${loanId}`); // Adjust API endpoint if needed
    if (!response.ok) {
      throw new Error('Failed to fetch guarantor response');
    }
    return response.json();
  }
);


const guarantorSlice = createSlice({
  name: 'guarantor',
  initialState: {
    guarantorResponse: null,
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

      builder
      .addCase(fetchGuarantor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuarantor.fulfilled, (state, action) => {
        state.loading = false;
        state.guarantorResponse = action.payload;
      })
      .addCase(fetchGuarantor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default guarantorSlice.reducer;
