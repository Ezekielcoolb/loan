// src/redux/reportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.jksolutn.com/api/reports";
// const API_URL = "http://localhost:5000/api/reports";

// Submit a new expense
export const submitExpense = createAsyncThunk(
  "report/submitExpense",
  async (expenseData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/expense`, expenseData);
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.error("Error submitting expense:", error);
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

// Submit a new cash at hand
export const submitCash = createAsyncThunk(
  "report/submitCash",
  async (cashData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/cash`, cashData);
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.error("Error submitting cash:", error);
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const fetchReportMonthlySummary = createAsyncThunk(
  "fetchReportMonthlySummary/fetch",
  async ({ year, month }) => {
    try {
      const response = await axios.get(
        `${API_URL}/report-monthly-summary?year=${year}&month=${month}`
      );
      console.log("Monthly report summary response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly report summary:", error);
      throw error; // Propagate the error to be handled in the slice
    }
  }
);

// export const fetchReport = createAsyncThunk("report/fetch", async () => {
//   const res = await axios.get(`${`${API_URL}/report-cash-expense`}`);
//   return res.data;
// });


export const fetchReport = createAsyncThunk(
  "report/fetchReport",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/report-cash-expense?month=${month}&year=${year}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAllCashAtHand = createAsyncThunk(
  "report/fetchAllCashAtHand",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/all-reports/cash-at-hand`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const getCurrentMonthYear = () => {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
};

export const deleteExpense = createAsyncThunk(
  "report/deleteExpense",
  async (date) => {
    const res = await axios.delete(`${API_URL}/report/expense/${date}`);
    return { type: "expense", data: res.data.data };
  }
);

export const deleteCash = createAsyncThunk(
  "report/deleteCash",
  async (date) => {
    const res = await axios.delete(`${API_URL}/report/cash/${date}`);
    return { type: "cash", data: res.data.data };
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: null,
    status: "idle",
      ...getCurrentMonthYear(),
        month: new Date().getMonth(),
    year: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    report: null,
    loading: false,
    cashDeteleloading: false,
    deleteExploading: false,
    expenses: [],
    allCashAtHand: null,
    cashAtHand: [],
    expressDelete: null, // To store the message from the expense deletion response
    cashDelete: null, // To store the message from the cash deletion response
    expenseMessage: null, // To store the message from the expense submission response
    cashMessage: null, // To store the message from the cash submission response
    error: null,
  },
  reducers: {
    clearExpenseMessage: (state) => {
      state.expenseMessage = null;
    },
    clearCashMessage: (state) => {
      state.cashMessage = null;
    },
    setMonthYear(state, action) {
      state.currentMonth = action.payload.month;
      state.currentYear = action.payload.year;
      state.status = "idle";
    },

     setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },

    goToPreviousMonth: (state) => {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },
    goToNextMonth: (state) => {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        state.expenseMessage = action.payload.message; // Assuming the response contains a message
      })
      .addCase(submitExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(submitCash.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCash.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
        state.cashMessage = action.payload.message; // Assuming the response contains a message
      })
      .addCase(submitCash.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchReportMonthlySummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReportMonthlySummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReportMonthlySummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });


       builder
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.cashAtHand = action.payload.cashAtHand;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


             builder
      .addCase(fetchAllCashAtHand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCashAtHand.fulfilled, (state, action) => {
        state.loading = false;
        state.allCashAtHand = action.payload;
      })
      .addCase(fetchAllCashAtHand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


        builder
      .addCase(deleteExpense.pending, (state) => {
        state.deleteExploading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.deleteExploading = false;
        state.expenses = action.payload.data;
        state.expressDelete = action.payload.message;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deleteExploading = false;
        state.error = action.error.message;
      });

        builder
      .addCase(deleteCash.pending, (state) => {
        state.cashDeteleloading = true;
        state.error = null;
      })
      .addCase(deleteCash.fulfilled, (state, action) => {
        state.cashDeteleloading = false;
        state.cashAtHand = action.payload.data;
        state.cashDelete = action.payload.message;

      })
      .addCase(deleteCash.rejected, (state, action) => {
        state.cashDeteleloading = false;
        state.error = action.error.message;
      });
      
  },
});

export const {
  clearExpenseMessage, // Action to clear the expense message
  clearCashMessage, // Action to clear the cash message
  setMonthYear,
  setMonth, 
  setYear,
  goToNextMonth,
   goToPreviousMonth
} = reportSlice.actions;
export default reportSlice.reducer;
