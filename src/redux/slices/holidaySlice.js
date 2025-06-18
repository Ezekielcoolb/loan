import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'https://api.jksolutn.com/api/holiday';

// const API_URL = "http://localhost:5000/api/holiday";



// POST holiday
export const addHoliday = createAsyncThunk(
  'holiday/addHoliday',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchHolidays = createAsyncThunk(
  'holidays/fetchHolidays',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch holidays');
    }
  }
);

const holidaySlice = createSlice({
  name: 'holiday',
  initialState: {
    holidays: [],
    holidayloading: false,
    successHolidayMessage: null,
    error: null,
  },
  reducers: {
       setSuccessHolidayMessage: (state) => {
          state.successHolidayMessage = null;
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHoliday.pending, (state) => {
        state.holidayloading = true;
        state.error = null;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        state.holidayloading = false;
        state.holidays.push(action.payload);
        state.successHolidayMessage = action.payload.message
      })
      .addCase(addHoliday.rejected, (state, action) => {
        state.holidayloading = false;
        state.error = action.payload?.message || 'Failed to add holiday';
      });


         builder
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
setSuccessHolidayMessage,
} = holidaySlice.actions;
export default holidaySlice.reducer;
