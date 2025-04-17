import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://api.jksolutn.com/api/loan";
// const API_URL = "http://localhost:5000/api/loan";

// Helper to calculate the first Monday of a month
const getFirstMonday = (year, monthIndex) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const offset = (8 - dayOfWeek) % 7;
  const firstMonday = new Date(firstDayOfMonth);
  firstMonday.setDate(firstDayOfMonth.getDate() + offset);
  return firstMonday;
};

// Compute initial date values
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const firstMonday = getFirstMonday(currentYear, currentMonth - 1);

// Calculate currentWeek index based on today
let currentWeek = 0;
if (today >= firstMonday) {
  const diffInDays = Math.floor((today - firstMonday) / (1000 * 60 * 60 * 24));
  currentWeek = Math.floor(diffInDays / 7);
}

export const fetchDailyPayments = createAsyncThunk(
  'dailyPayments/fetchDailyPayments',
  async ({ year, month }, thunkAPI) => {
    const res = await axios.get(`${API_URL}/daily-payments/daily-collections?year=${year}&month=${month}`);
    return res.data;
  }
);

const OtherLoanslice = createSlice({
  name: 'dailyPayments',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    currentMonth,
    currentYear,
    currentWeek,
  },
  reducers: {
    nextWeek(state) {
      state.currentWeek += 1;
    },
    prevWeek(state) {
      if (state.currentWeek > 0) state.currentWeek -= 1;
    },
    nextMonth(state) {
      if (state.currentMonth === 12) {
        state.currentMonth = 1;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
      state.currentWeek = 0;
    },
    prevMonth(state) {
      if (state.currentMonth === 1) {
        state.currentMonth = 12;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
      state.currentWeek = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDailyPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  nextWeek,
  prevWeek,
  nextMonth,
  prevMonth,
} = OtherLoanslice.actions;

export default OtherLoanslice.reducer;
