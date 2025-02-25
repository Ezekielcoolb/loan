import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Toaster, toast} from "react-hot-toast"
import axios from 'axios';
import { format } from "date-fns";

const API_URL = 'http://api.jksolutn.com/api/cso'; // Backend API URL
// const API_URL = "http://localhost:5000/api/cso"

// Async thunk to fetch cso
export const fetchCso = createAsyncThunk('cso/fetchCso', async ({ page, limit }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
   
});

// Async thunk to create a new branch
export const createCso = createAsyncThunk('cso/createCso', async (csoData) => {
    try{
       console.log("clicked");
       console.log(csoData);
       
        
        const response = await axios.post(API_URL, csoData);
      console.log(response.data)
        toast.success(response.data.message)
        return response.data;
    }
    catch(e){
        console.log(e)
    }
});

// Fetch CSO Transactions
export const fetchCsoTransactions = createAsyncThunk(
    'csoTransactions/fetchCsoTransactions',
    async ({ month, year }) => {
        const response = await axios.get(`${API_URL}/cso-transactions?month=${month}&year=${year}`);
        return response.data.csoTransactions;
    }
);

// Thunk to upload remittance with an image URL
export const uploadRemittance = createAsyncThunk(
    "remittance/uploadRemittance",
    async ({amount, workId, imageUrl }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/add-remittance/${workId}`, {amount, imageUrl });
        console.log(response, imageUrl);
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchallgetRemittances = createAsyncThunk(
    "remittance/fetchallgetRemittances",
    async ({ workId, date }) => {
        const response = await axios.get(`${API_URL}/get-all-remittance/${workId}?date=${date}`);
        return response.data;
    }
);


  export const fetchLoanProgress = createAsyncThunk(
    "loanProgress/fetchLoanProgress",
    async (workId) => {
      const response = await axios.get(`${API_URL}/loan-progress/${workId}`);
      console.log(response.data, workId);
      
      return response.data;
    }
  );
  export const fetchLoanProgressChart = createAsyncThunk(
    'loanProgress/fetchLoanProgressChart',
    async (workId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/loan-progress-chart/${workId}`);
        console.log(response.data);
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  // export const fetchRemittanceProgress = createAsyncThunk(
  //   'loans/fetchRemittanceProgress',
  //   async (workId) => {
  //     try {
  //     const response = await axios.get(`${API_URL}/remittance-progress/${workId}`);
  //     console.log(response.data.progress)
  //     return response.data.progress;
  //     }  catch (err) {
  //       console.error(err);
  //       throw err;
  //     }
  //   }
  // );
// Async action to fetch remittances
export const fetchRemittancesForAllcso = createAsyncThunk("remittance/fetchRemittancesForAllcso", async (date) => {
  const response = await axios.get(`${API_URL}/remittances-for-all-cso?date=${date}`);
  return response.data;
});

export const searchCso = createAsyncThunk(
  'cso/searchCso',
  async (query) => {
    const response = await fetch(`${API_URL}/search-cso?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cso');
    }
    const data = await response.json();
    return data;
  }
);

const csoSlice = createSlice({
    name: 'cso',
    initialState: {
        totalcso: 0,
    totalPages: 1,
    currentPage: 1,
        cso: [],
        transactions: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        isUploading: false,
        uploaded: false,
        progressData: null,
        monthlyTarget: 0,
        payments: [],
        monthlyLoanTarget: 0,
        monthlyLoanCounts: [],
        remmitdata: [],
       
        selectedCSO: null,
        remmitCsoData: [],
        selectedRemiteDate: format(new Date(), "yyyy-MM-dd"),
    },
    reducers: {
        resetUploadState: (state) => {
            state.isUploading = false;
            state.error = null;
            state.uploaded = false;
          },
          setSelectedRemmitDate: (state, action) => {
            state.selectedRemiteDate = action.payload;
        },
        setSelectedCSO: (state, action) => {
          state.selectedCSO = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchCso
            .addCase(fetchCso.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCso.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cso = action.payload.cso;
                state.totalcso = action.payload.totalcso;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchCso.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle createCso
            .addCase(createCso.fulfilled, (state, action) => {
                state.cso.push(action.payload);
            });
               builder
                  .addCase(searchCso.pending, (state) => {
                    state.loading = true;
                  })
                  .addCase(searchCso.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cso = action.payload;
                  })
                  .addCase(searchCso.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                  });

            builder
            .addCase(fetchRemittancesForAllcso.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRemittancesForAllcso.fulfilled, (state, action) => {
                state.loading = false;
                state.remmitCsoData = action.payload;
            })
            .addCase(fetchRemittancesForAllcso.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
      

            builder
            .addCase(fetchLoanProgressChart.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(fetchLoanProgressChart.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.monthlyLoanTarget = action.payload.monthlyLoanTarget;
              state.monthlyLoanCounts = action.payload.monthlyLoanCounts;
            })
            .addCase(fetchLoanProgressChart.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload;
            });


            builder
            .addCase(fetchLoanProgress.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchLoanProgress.fulfilled, (state, action) => {
              state.loading = false;
              state.progressData = action.payload;
            })
            .addCase(fetchLoanProgress.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });

            builder
            .addCase(uploadRemittance.pending, (state) => {
              state.isUploading = true;
            })
            .addCase(uploadRemittance.fulfilled, (state) => {
              state.isUploading = false;
              state.uploaded = true;
            })
            .addCase(uploadRemittance.rejected, (state, action) => {
              state.isUploading = false;
              state.error = action.payload;
            });

            builder
            .addCase(fetchallgetRemittances.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchallgetRemittances.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.remmitdata = action.payload;
            })
            .addCase(fetchallgetRemittances.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });




       builder
            .addCase(fetchCsoTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCsoTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchCsoTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { resetUploadState, setSelectedRemmitDate, setSelectedCSO } = csoSlice.actions;
export default csoSlice.reducer;
