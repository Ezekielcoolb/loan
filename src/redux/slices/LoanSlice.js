import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Toaster, toast} from "react-hot-toast"
import axios from "axios";

// Async Thunks for API Calls

const API_URL = "https://api.jksolutn.com/api/loan";
// const API_URL = "http://localhost:5000/api/loan"

export const submitLoanApplication = createAsyncThunk(
  "loans/submitApplication",
  async (loanData) => {
    try {
     
      const response = await axios.post(`${API_URL}/apply`, loanData);
      console.log(response.data);
      toast.success(response.data.message)
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCustomersSummary = createAsyncThunk('customer/fetchSummaries', async () => {
  try {

    const response = await fetch(`${API_URL}/customers/summary`);
    console.log(response);
    
    return await response.json();
  } catch (err) {
    console.log(err);
  }
});


export const fetchCustomerDetails = createAsyncThunk('customer/fetchDetails', async (bvn) => {
  try {

    const response = await fetch(`${API_URL}/get-customers/details/${bvn}`);
    console.log(response);
    
    return await response.json();
  } catch (err) {
    console.log(err);
  }
});



export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/loans?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchAdminLoans = createAsyncThunk('loans/fetchAdminLoans', async () => {
  try {
  const response = await fetch(`${API_URL}/all-loans-for-admin`); // Adjust API endpoint as needed
  return response.json();
  } catch(error) {
    console.error(error);
  }
});

export const fetchWaitingLoans = createAsyncThunk('loans/fetchWaitingLoans', async ({ page = 1, limit = 10 }) => {
  try {
    const response = await fetch(`${API_URL}/loaner/pending-approval?page=${page}&limit=${limit}`);
    const data = await response.json();
    console.log('Fetched Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
});



export const fetchWaitingDisbursementLoans = createAsyncThunk(
  'loan/fetchWaitingDisbursementLoans',
  async () => {
    try {
    const response = await axios.get(`${API_URL}/loaner/waiting-disbursement`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchActiveCustomers = createAsyncThunk(
  'loan/fetchActiveCustomers',
  async () => {
    try {
    const response = await axios.get(`${API_URL}/loans/active-customers`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);


export const fetchRepaymentSchedule = createAsyncThunk(
  'loan/fetchRepaymentSchedule',
  async (id) => {
    try {
    const response = await axios.get(`${API_URL}/loans/${id}/repayment-schedule`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchLoanById = createAsyncThunk('loans/fetchLoanById', async (id) => {
  try {
  const response = await axios.get(`${API_URL}/loans/${id}`);
  return response.data;
  } catch (err) {
    console.log(err);
  }
});
export const fetchLoanByBvn = createAsyncThunk('loans/fetchLoanByBvn', async (bvn) => {
  try {
  const response = await axios.get(`${API_URL}/customers/loans/${bvn}`);
  console.log(response.data);
  
  return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchPendingLoans = createAsyncThunk(
  'loan/fetchPendingLoans',
  async () => {
      const response = await axios.get(`${API_URL}/customers/pending-loans`);
      return response.data;
  }
);

export const fetchRejectedCustomers = createAsyncThunk(
  'loans/fetchRejectedCustomers',
  async () => {
      const response = await axios.get(`${API_URL}/customers-loan/rejected`);
      return response.data;
  }
);

export const makePayment = createAsyncThunk('loans/makePayment', async ({ id, amount }) => {
  try  {
  const response = await axios.post(`${API_URL}/loans/${id}/payment`, { amount });
  console.log(response);
console.log(response.data);
  
  return response.data;
  }  catch (err) {
    console.log(err);
  }
});


export const disburseLoan = createAsyncThunk(
  'loan/disburseLoan',
  async (id) => {
    try {
    const response = await axios.post(`${API_URL}/loaner/disburse/${id}`);
    console.log(response, response.data);
    
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);


// Approve loan
export const approveLoan = createAsyncThunk('loans/approveLoan', async ({ id, amountApproved }) => {
  try {

    const response = await fetch(`${API_URL}/loaner/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountApproved }),
    });
    console.log(response.json());
    
    return response.json();
  }  catch (err) {
    console.log(err);
  }
});

// Reject loan
export const rejectLoan = createAsyncThunk('loans/rejectLoan', async ({ id, rejectionReason }) => {
  try {

    const response = await fetch(`${API_URL}/loans/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rejectionReason }),
    });
    console.log(response.json());
    
    return response.json();
  }  catch (err) {
    console.log(err);
  }
});

// Fetch active loans from backend
export const fetchCustomerActiveLoans = createAsyncThunk(
  'loans/fetchCustomersActiveLoans',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/allcustomers/loans/active-loans`);
      return response.data;
    }  catch (err) {
      console.log(err);
    }
  }
);
export const allLaonfTransactions = createAsyncThunk('loans/fetchallLoanTransactions', async () => {
  try  {
  const response = await axios.get(`${API_URL}/fetchallLoanTransactions`);
  console.log(response.data);
  
  return response.data;
  }  catch (err) {
    console.log(err);
  }
});

export const fetchLoansByMonth = createAsyncThunk(
  'loans/fetchLoansByMonth',
  async ({ year, month }) => {
    try {

    
    const response = await axios.get(`${API_URL}/allLoanTransactions/${year}/${month}`);
    return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);


export const fetchDisbursementDataChart = createAsyncThunk(
  'disbursement/fetchDisbursementDataChart',
  async () => {
      const response = await fetch(`${API_URL}/loans-chart/loans`);
      const data = await response.json();
      console.log(data);
      
      return data;
  }
);

export const fetchAllLoansByCsoId = createAsyncThunk(
  'loans/fetchAllLoansByCsoId',
  async ({ csoId }) => {
      const response = await axios.get(`${API_URL}/getLoansByCsoId?csoId=${csoId}`);
      return response.data;
  }
);

export const fetchCsoActiveLoans = createAsyncThunk(
  'loan/fetchCsoActiveLoans',
  async ({ csoId, date }) => {
    try {
      const response = await axios.get(
        `${API_URL}/fetchCsoActiveLoans/${csoId}`,
        { params: { date } } // Pass the date as a query parameter
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching active loans:', err);
      throw err;
    }
  }
);


export const fetchPieRepaymentData = createAsyncThunk('repayment/fetchPieRepaymentData', async ({csoId}) => {
  try {
  const response = await axios.get(`${API_URL}/repayment-pie-chart-data/${csoId}`); // Adjust API endpoint if necessary
  return response.data;
  }  catch (err) {
    console.error(err);
    throw err;
  }
});


// Async thunk to fetch loan counts
export const fetchLoanAllTimeCounts = createAsyncThunk('loans/fetchLoanAllTimeCounts', async ({csoId}) => {
  try {
    const response = await axios.get(`${API_URL}/today-yes-month-loans/${csoId}`);
    return response.data;  // returns { todayCount, yesterdayCount, monthCount }
  } catch (error) {
    throw new Error('Error fetching loan counts');
  }
});


// Async thunk to update call status
export const updateCallStatus = createAsyncThunk(
  'loan/updateCallStatus',
  async ({ loanId, field }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update-call-status`, { loanId, field });
      return { field, loan: response.data.loan };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchCustomer = createAsyncThunk(
  'customer/searchCustomer',
  async (query) => {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    const data = await response.json();
    return data;
  }
);
export const searchActiveCustomer = createAsyncThunk(
  'customer/searchActiveCustomer',
  async (query) => {
    const response = await fetch(`${API_URL}/search-customer-active?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    const data = await response.json();
    return data;
  }
);
export const searchPendingCustomer = createAsyncThunk(
  'customer/searchPendingCustomer',
  async (query) => {
    const response = await fetch(`${API_URL}/search-pending-loans?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }
    const data = await response.json();
    return data;
  }
);

export const updateGuarantorFormPic = createAsyncThunk(
  "loan/updateGuarantorFormPic",
  async ({ loanId, imageUrl }, { rejectWithValue }) => {
      try {
          const response = await axios.put(`${API_URL}/update-guarantor-form-pic/${loanId}`, { imageUrl });
          console.log(response.data.loan);
          
          return response.data.loan; // Return updated loan data
      } catch (error) {
          return rejectWithValue(error.response.data.message || "Failed to update");
      }
  }
);

// Fetch loans by csoId
export const fetchLoanDashboardLoans = createAsyncThunk("loans/fetchLoanDashboardLoans", async (csoId) => {
  const response = await axios.get(`${API_URL}/get-loan-dashboard-loans/${csoId}`);
  return response.data;
});

export const deleteLoan = createAsyncThunk('loans/deleteLoan', async (id, { rejectWithValue }) => {
  try {
      const response = await axios.delete(`${API_URL}/delete-loans/${id}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});

// Slice
const loanSlice = createSlice({
  name: "loans",
  initialState: {
    loans: [],
    total: 0,
    page: 1,
    totalPages: 0,
    activeCustomers: [],
    repaymentSchedule: [],
    summaries: [],
    details: [],
    pendingLoans: [],
    rejectedCustomers: [],
    selectedLoan: null,
    currentPage: 1, 
    currentWeekStart: new Date(),
    month: new Date().getMonth() + 1, // January is 1, not 0
    year: new Date().getFullYear(),
    totalDisbursed: 0,
    totalToBePaid: 0,
    totalPaid: 0,
    allLoans: [],
    monthlyData: [],
    totalLoans: 0,
    activeLoans: 0,
    pendingLoans: 0,
    rejectedLoans: 0,
    noPaymentYesterday: [],
    defaultingCustomers: [],
    customers: [],
    allDahboardLoans: [],
    activeDashboardLoans: [],
    pendingDashboardLoans: [],
    rejectedDashboardLoans: [],
    loading: 'idle',
    error: null,
    filter: 'all',
    promptPayments: 0,
    overduePayments: 0,
    todayCount: 0,
    yesterdayCount: 0,
    monthCount: 0,
    weekCount: 0,
    callCso: false,
    callGuarantor: false,
    callCustomer: false,
    verifyCustomer: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPages(state, action) {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLoans: (state, action) => {
      state.loans = action.payload;
  },

    nextWeek: (state) => {
      state.currentWeekStart = new Date(state.currentWeekStart);
      state.currentWeekStart.setDate(state.currentWeekStart.getDate() + 7);
  },
  previousWeek: (state) => {
      state.currentWeekStart = new Date(state.currentWeekStart);
      state.currentWeekStart.setDate(state.currentWeekStart.getDate() - 7);
  },
  setMonth: (state, action) => {
    state.month = action.payload;
  },
  setYear: (state, action) => {
    state.year = action.payload;
  },
  calculateLoanStats: (state) => {
    state.totalLoans = state.loans.length;
    state.activeLoans = state.loans.filter(loan => loan.status === 'active loan').length;
    state.pendingLoans = state.loans.filter(loan => 
        loan.status === 'waiting for approval' || loan.status === 'waiting for disbursement'
    ).length;
    state.rejectedLoans = state.loans.filter(loan => loan.status === 'rejected').length;
},
calculateDefaultingCustomers: (state) => {
  state.defaultingCustomers = state.loans.filter(loan => {
      // Check if repaymentSchedule exists and is not empty
      const repaymentSchedule = loan?.repaymentSchedule;
      if (!repaymentSchedule || repaymentSchedule.length === 0) {
          return false; // If no repayment schedule, skip this loan
      }

      // Get the last repayment date (ensure it's in the right format)
      const lastRepaymentDateStr = repaymentSchedule[repaymentSchedule.length - 1]?.date;
      console.log('Last Repayment Date:', lastRepaymentDateStr); // Debugging log

      // Convert it to Date if it's a string
      const lastRepaymentDate = new Date(lastRepaymentDateStr);

      if (isNaN(lastRepaymentDate)) {
          console.error('Invalid date format:', lastRepaymentDateStr); // Error logging for invalid date
          return false;
      }

      // Check if the loan is overdue and not fully paid
      const isOverdue = lastRepaymentDate < new Date();
      const isNotFullyPaid = loan.loanDetails.amountToBePaid > loan.loanDetails.amountPaidSoFar;

      return isOverdue && isNotFullyPaid;
  });
},
calculateNoPaymentYesterday: (state) => {
  state.noPaymentYesterday = state.loans
      .map(loan => {
          if (!loan.repaymentSchedule || loan.repaymentSchedule.length === 0) {
              return null; // Skip loans without a repayment schedule
          }

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayDateString = yesterday.toISOString().split('T')[0];

          const repaymentsDueUntilYesterday = loan.repaymentSchedule.filter(repayment => {
              const repaymentDate = new Date(repayment.date).toISOString().split('T')[0];
              return repaymentDate <= yesterdayDateString;
          });

          const totalDueUntilYesterday = repaymentsDueUntilYesterday.reduce(
              (total, repayment) => total + repayment.amountPaid, 0
          );

          const totalPaidUntilYesterday = repaymentsDueUntilYesterday
              .filter(repayment => repayment.status === 'paid')
              .reduce((total, repayment) => total + repayment.amountPaid, 0);

          const amountOwing = totalDueUntilYesterday - totalPaidUntilYesterday;

          if (amountOwing > 0) {
              return {
                  customerName: `${loan.customerDetails.firstName} ${loan.customerDetails.lastName}`,
                  amountOwingUntilYesterday: amountOwing
              };
          }
          return null; 
      })
      .filter(Boolean); // Remove null values
},
setLoan: (state, action) => {
  state.loanUpdate = action.payload;
}



  },
  extraReducers: (builder) => {
    // Handle loading and data fetching for submitting loan
    builder
      .addCase(submitLoanApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.push(action.payload); // Add the new loan to the loans array
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(searchCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(searchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


      builder
      .addCase(deleteLoan.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
          state.loading = false;
          state.loans = state.loans.filter((loan) => loan._id !== action.payload.loan._id);
      })
      .addCase(deleteLoan.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      });

      builder
      .addCase(fetchAdminLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchAdminLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(fetchLoanDashboardLoans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoanDashboardLoans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDahboardLoans = action.payload.allLoans;
        state.activeDashboardLoans = action.payload.activeLoans;
        state.pendingDashboardLoans = action.payload.pendingLoans;
        state.rejectedDashboardLoans = action.payload.rejectedLoans;
      })
      .addCase(fetchLoanDashboardLoans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });



      builder
      .addCase(searchActiveCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchActiveCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.summaries = action.payload;
      })
      .addCase(searchActiveCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(searchPendingCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPendingCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLoans = action.payload;
      })
      .addCase(searchPendingCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

          builder
            .addCase(updateGuarantorFormPic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGuarantorFormPic.fulfilled, (state, action) => {
                state.loading = false;
                // Update the specific loan in the state
                const index = state.loans.findIndex(loan => loan._id === action.payload._id);
                if (index !== -1) {
                    state.loans[index] = action.payload;
                }
            })
            .addCase(updateGuarantorFormPic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

      builder
      .addCase(updateCallStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCallStatus.fulfilled, (state, action) => {
        state.loading = false;
        state[action.payload.field] = true;
      })
      .addCase(updateCallStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

      builder
      .addCase(fetchLoanAllTimeCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoanAllTimeCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.todayCount = action.payload.todayCount;
        state.yesterdayCount = action.payload.yesterdayCount;
        state.monthCount = action.payload.monthCount;
        state.weekCount = action.payload.weekCount;
      })
      .addCase(fetchLoanAllTimeCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(fetchCsoActiveLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoActiveLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCsoActiveLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


      builder
      .addCase(fetchPieRepaymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPieRepaymentData.fulfilled, (state, action) => {
        state.promptPayments = action.payload.promptPayments;
        state.overduePayments = action.payload.overduePayments;
        state.loading = false;
      })
      .addCase(fetchPieRepaymentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      builder
      .addCase(fetchAllLoansByCsoId.pending, (state) => {
          state.loading = "loading";
          state.error = null;
      })
      .addCase(fetchAllLoansByCsoId.fulfilled, (state, action) => {
          state.loans = action.payload.loans;
          state.total = action.payload.total;
          loanSlice.caseReducers.calculateLoanStats(state);
          state.loading = "succeeded";
      })
      .addCase(fetchAllLoansByCsoId.rejected, (state, action) => {
          state.loading = "failed";
          state.error = action.error.message;
      });

      builder
      .addCase(fetchCustomersSummary.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(fetchCustomersSummary.fulfilled, (state, action) => {
          state.summaries = action.payload;
          state.loading = false;
      })
      .addCase(fetchCustomersSummary.rejected, (state) => { 
        state.loading = false;
       })
       .addCase(fetchCustomerDetails.pending, (state) => { 
        state.loading = true; 
      })

       .addCase(fetchCustomerDetails.fulfilled, (state, action) => { 
        state.details = action.payload; })

        .addCase(fetchCustomerDetails.rejected, (state) => { 
          state.loading = false;
         });

      builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.loans = action.payload.loans;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });

      builder
      .addCase(fetchPendingLoans.pending, (state) => {
          state.loading = true;
      })
      .addCase(fetchPendingLoans.fulfilled, (state, action) => {
          state.loading = false;
          state.pendingLoans = action.payload;
      })
      .addCase(fetchPendingLoans.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });

      builder
    
      .addCase(fetchWaitingLoans.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchWaitingLoans.fulfilled, (state, action) => {
        state.loans = action.payload.loans;
        state.totalLoans = action.payload.totalLoans;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      })
      .addCase(fetchWaitingLoans.rejected, (state) => {
        state.loading = 'failed';
      })

      builder
      .addCase(fetchWaitingDisbursementLoans.fulfilled, (state, action) => {
        state.loans = action.payload;
      })
      .addCase(disburseLoan.fulfilled, (state, action) => {
        state.loans = state.loans.filter((loan) => loan._id !== action.payload.loan._id);
      })
      .addCase(fetchActiveCustomers.fulfilled, (state, action) => {
        state.activeCustomers = action.payload;
      })

      .addCase(fetchRepaymentSchedule.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchRepaymentSchedule.fulfilled, (state, action) => {
        state.repaymentSchedule = action.payload.repaymentSchedule || [];
        state.loading = 'idle';
      })

      .addCase(fetchLoanById.fulfilled, (state, action) => {
        state.selectedLoan = action.payload;
      })
      .addCase(fetchLoanByBvn.fulfilled, (state, action) => {
        state.selectedLoan = action.payload;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.selectedLoan = action.payload;
      })

      .addCase(approveLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex((loan) => loan._id === action.payload._id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex((loan) => loan._id === action.payload._id);
        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      });
      builder
      .addCase(fetchRejectedCustomers.pending, (state) => {
          state.loading = true;
      })
      .addCase(fetchRejectedCustomers.fulfilled, (state, action) => {
          state.loading = false;
          state.rejectedCustomers = action.payload;
      })
      .addCase(fetchRejectedCustomers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });


      builder
      .addCase(fetchCustomerActiveLoans.pending, (state) => {
          state.loading = true;
      })
      .addCase(fetchCustomerActiveLoans.fulfilled, (state, action) => {
          state.loading = false;
          state.loans = action.payload;
      })
      .addCase(fetchCustomerActiveLoans.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
    
    builder
      .addCase(fetchLoansByMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoansByMonth.fulfilled, (state, action) => {
        state.loans = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoansByMonth.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(allLaonfTransactions.fulfilled, (state, action) => {
        state.allLoans = action.payload;
    });
    builder
    .addCase(fetchDisbursementDataChart.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchDisbursementDataChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.monthlyData = action.payload;
    })
    .addCase(fetchDisbursementDataChart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
  },
});
export const { setPage, setPages, setLoans , setFilter, nextWeek, previousWeek, setMonth, setYear, calculateLoanStats, calculateDefaultingCustomers, calculateNoPaymentYesterday, setLoan  } = loanSlice.actions;
export default loanSlice.reducer;
