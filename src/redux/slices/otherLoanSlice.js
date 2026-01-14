import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://api.jksolutn.com/api/loan";
const API_URL = "http://localhost:5000/api/loan";

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
  "dailyPayments/fetchDailyPayments",
  async ({ year, month }, thunkAPI) => {
    const res = await axios.get(
      `${API_URL}/daily-payments/daily-collections?year=${year}&month=${month}`
    );
    return res.data;
  }
);

export const fetchOutstandingLoans = createAsyncThunk(
  "loans/fetchOutstanding",
  async (csoId) => {
    try {
      const res = await axios.get(`${API_URL}/fetch-loan-outstanding/${csoId}`);
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchOutstandingProgressChart = createAsyncThunk(
  "loanStats/fetchOutstandingProgressChart",
  async (csoId) => {
    try {
      const res = await axios.get(
        `${API_URL}/loan-outstanding-progress-chartbar/${csoId}`
      );
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchLoanBalancePaymentDisbursedSummary = createAsyncThunk(
  "loanSummary/fetchLoanBalancePaymentDisbursedSummary",
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payment-disbursed-loanbalance-summary`
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchDebugLoanBalance = createAsyncThunk(
  "loanSummary/fetchDebugLoanBalance",
  async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payment-disbursed-loanbalance-summary`
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCsoOverdueLoans = createAsyncThunk(
  "csoLoans/fetchOverdue",
  async ({ csoId, min = 23 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/cso-loans-overdue/${csoId}/?min=${min}`
      );

      return res.data.data; // as returned by backend above
    } catch (err) {
      console.error(err);
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch" }
      );
    }
  }
);

export const fetchCsoRecoveryLoaner = createAsyncThunk(
  "fetchCsoRecoveryLoanser/fetchCsoRecoveryLoans",
  async ({ csoId, min = 23 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/cso-loans-recovery-loans/${csoId}/?min=${min}`
      );

      return res.data.data; // as returned by backend above
    } catch (err) {
      console.error(err);
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch" }
      );
    }
  }
);
export const fetchOverdueLoans = createAsyncThunk(
  "overdueLoans/fetchOverdueLoans",
  async ({ page = 1, limit = 20, search = "" }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/loans-overdue-for-admin`, {
        params: { page, limit, search },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const payOverDuePenalty = createAsyncThunk(
  "penalty/payOverDuePenalty",
  async ({ loanId, amount }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/pay-customer-penalty/${loanId}`,
        { amount }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error paying penalty"
      );
    }
  }
);

export const fetchCsoReportsSummary = createAsyncThunk(
  "csoSummary/fetchCsoReportsSummary",
  async ({ month, year }) => {
    const params = {};
    if (month) params.month = month;
    if (year) params.year = year;
    const response = await axios.get(`${API_URL}/cso-reports/cso-summary`, {
      params,
    });
    return response.data.csos;
  }
);

export const fetchCsoReportsSummarySingle = createAsyncThunk(
  "csoSummary/fetchCsoReportsSummarySingle",
  async ({ month, year, csoId }) => {
    const params = {};
    if (month) params.month = month;
    if (year) params.year = year;
    const response = await axios.get(
      `${API_URL}/cso-reports/cso-summary-single/${csoId}`,
      { params }
    );
    return response.data;
  }
);

const OtherLoanslice = createSlice({
  name: "dailyPayments",
  initialState: {
    data: [],
    csosReport: [],
    totalOutstandingChart: 0,
    defaultingTargetChart: 0,
    percentageChart: 0,
    dashPayLoan: null,
    payOverloading: false,
    items: null,
    recoveryLoans: null,
    debugdashPayLoan: null,
    csosSingleReport: null,
    outstandingLoans: [],
    totalOutstandingLoans: 0,
    pagination: { total: 0, page: 1, limit: 20 },
    status: "idle",
    error: null,
    currentMonth,
    paidOverdueLoan: null,
    overDueItems: null,
    currentYear,
    currentWeek,
  },
  reducers: {
    nextWeek(state) {
      state.currentWeek += 1;
    },

    clearOverDuePay: (state) => {
      state.paidOverdueLoan = null;
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
        state.status = "loading";
      })
      .addCase(fetchDailyPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDailyPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCsoReportsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoReportsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.csosReport = action.payload;
      })
      .addCase(fetchCsoReportsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCsoReportsSummarySingle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoReportsSummarySingle.fulfilled, (state, action) => {
        state.loading = false;
        state.csosSingleReport = action.payload;
      })
      .addCase(fetchCsoReportsSummarySingle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOutstandingProgressChart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOutstandingProgressChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalOutstandingChart = action?.payload?.totalOutstanding;
        state.defaultingTargetChart = action?.payload?.defaultingTarget;
        state.percentageChart = action?.payload?.percentage;
      })
      .addCase(fetchOutstandingProgressChart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLoanBalancePaymentDisbursedSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLoanBalancePaymentDisbursedSummary.fulfilled,
        (state, action) => {
          state.loading = false;
          state.dashPayLoan = action.payload;
        }
      )
      .addCase(
        fetchLoanBalancePaymentDisbursedSummary.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );

    builder
      .addCase(fetchDebugLoanBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDebugLoanBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.debugdashPayLoan = action.payload;
      })
      .addCase(fetchDebugLoanBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOutstandingLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutstandingLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.outstandingLoans = action?.payload?.loans;
        state.totalOutstandingLoans = action?.payload?.totalOutstanding;
      })
      .addCase(fetchOutstandingLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCsoOverdueLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoOverdueLoans.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCsoOverdueLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load";
      });

    builder
      .addCase(fetchCsoRecoveryLoaner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoRecoveryLoaner.fulfilled, (state, action) => {
        state.recoveryLoans = action.payload;
        state.loading = false;
      })
      .addCase(fetchCsoRecoveryLoaner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load";
      });

    builder
      .addCase(fetchOverdueLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverdueLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.overDueItems = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOverdueLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch overdue loans";
      });

    builder
      .addCase(payOverDuePenalty.pending, (state) => {
        state.payOverloading = true;

        state.error = null;
      })
      .addCase(payOverDuePenalty.fulfilled, (state, action) => {
        state.payOverloading = false;

        state.paidOverdueLoan = action.payload;
      })
      .addCase(payOverDuePenalty.rejected, (state, action) => {
        state.payOverloading = false;
        state.error = action.payload;
      });
  },
});

export const { nextWeek, prevWeek, nextMonth, prevMonth, clearOverDuePay } =
  OtherLoanslice.actions;

export default OtherLoanslice.reducer;
