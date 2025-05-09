import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

const API_URL = 'https://api.jksolutn.com/api/cso'; // Backend API URL
const CSO_URL = "https://api.jksolutn.com/api/loginauth";

// const API_URL = "http://localhost:5000/api/cso";
// const CSO_URL = "http://localhost:5000/api/loginauth";

// Async thunk to fetch cso
export const fetchCso = createAsyncThunk(
  "cso/fetchCso",
  async ({ page, limit }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  }
);




// Async thunk to create a new branch
export const createCso = createAsyncThunk("cso/createCso", async (csoData) => {
  try {
    console.log("clicked");
    console.log(csoData);

    const response = await axios.post(API_URL, csoData);
    console.log(response.data);
    toast.success(response.data.message);
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

// Fetch CSO Transactions
export const fetchCsoTransactions = createAsyncThunk(
  "csoTransactions/fetchCsoTransactions",
  async ({ month, year }) => {
    const response = await axios.get(
      `${API_URL}/cso-transactions?month=${month}&year=${year}`
    );
    return response.data.csoTransactions;
  }
);

// Thunk to upload remittance with an image URL
export const uploadRemittance = createAsyncThunk(
  "remittance/uploadRemittance",
  async ({ amount, workId, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add-remittance/${workId}`, {
        amount,
        imageUrl,
      });
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
    const response = await axios.get(
      `${API_URL}/get-all-remittance/${workId}?date=${date}`
    );
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
  "loanProgress/fetchLoanProgressChart",
  async (workId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/loan-progress-chart/${workId}`
      );
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
export const fetchRemittancesForAllcso = createAsyncThunk(
  "remittance/fetchRemittancesForAllcso",
  async (date) => {
    const response = await axios.get(
      `${API_URL}/remittances-for-all-cso?date=${date}`
    );
    return response.data;
  }
);

export const updateCSODetails = createAsyncThunk(
  "cso/updateDetails",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${CSO_URL}/update-cso/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deactivateCSO = createAsyncThunk("cso/deactivate", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/deactivate/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error deactivating CSO");
  }
});

// Async thunk for activating a CSO
export const activateCSO = createAsyncThunk("cso/activate", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/activate/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error activating CSO");
  }
});

export const searchCso = createAsyncThunk("cso/searchCso", async (query) => {
  const response = await fetch(`${API_URL}/search-cso?query=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cso");
  }
  const data = await response.json();
  return data;
});


// Update only the defaultingTarget
export const updateDefaultingTarget = createAsyncThunk(
  'csos/updateDefaultingTarget',
  async ({ id, defaultingTarget }) => {
    const res = await axios.put(`${API_URL}/csos-defaultTarget-set/${id}`, { defaultingTarget });
    console.log(res.data);
    toast.success(res.data.message);
    return res.data;
  }
);

export const fetchAllTheCsos = createAsyncThunk('csos/fetchAllTheCsos', async () => {
  const res = await axios.get(`${API_URL}/fetct-all-csos`);
  return res.data;
});

export const fetchCsoByWorkId = createAsyncThunk(
  "cso/fetchByWorkId",
  async (workId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/fecth-specific-cso/${workId}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch CSO"
      );
    }
  }
);

export const fetchForAdminUpdateCSO = createAsyncThunk(
  'cso/fetchForAdminUpdateCSO',
  async (workId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-cso-for-admin-editing/${workId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const updateByAdminCSO = createAsyncThunk(
  'cso/updateByAdminCSO',
  async ({ workId, updateFields }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/update-cso-by-the-admin/${workId}`, updateFields);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);



const csoSlice = createSlice({
  name: "cso",
  initialState: {
    totalcso: 0,
    totalPages: 1,
    isLoading: false,
    loading: false,
    updatingCsoloading: false,
    currentPage: 1,
    cso: [],
    specifiedCso: null,
    specificCso: null,
    specifiedCsoTwo: null,
    transactions: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isUploading: false,
    uploaded: false,
    progressData: null,
    monthlyTarget: 0,
    payments: [],
    list: [],
    monthlyLoanTarget: 0,
    monthlyLoanCounts: [],
    remmitdata: [],
    targetMessage: null,
    successMessage: null,
    updateCsoSuccessMessage: "",
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
    },
    
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearTargetMessageMessages: (state) => {
      state.targetMessage = null;
    },
    clearUpdateSuccessMessages: (state) => {
      state.updateCsoSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCso
      .addCase(fetchCso.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCso.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cso = action.payload.cso;
        state.totalcso = action.payload.totalcso;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCso.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle createCso
      .addCase(createCso.fulfilled, (state, action) => {
        state.cso.push(action.payload);
      });

      builder
  .addCase(fetchForAdminUpdateCSO.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchForAdminUpdateCSO.fulfilled, (state, action) => {
    state.loading = false;
    state.specifiedCso = action.payload;
  })
  .addCase(fetchForAdminUpdateCSO.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder
  .addCase(updateByAdminCSO.pending, (state) => {
    state.updatingCsoloading = true;
    state.error = null;
    state.success = false;
  })
  .addCase(updateByAdminCSO.fulfilled, (state, action) => {
    state.updatingCsoloading = false;
    state.specifiedCso = action.payload.cso;
    state.updateCsoSuccessMessage = action.payload.message
    state.success = true;
  })
  .addCase(updateByAdminCSO.rejected, (state, action) => {
    state.updatingCsoloading = false;
    state.error = action.payload;
    state.success = false;
  });


      builder
      .addCase(fetchCsoByWorkId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoByWorkId.fulfilled, (state, action) => {
        state.loading = false;
        state.specificCso = action.payload;
      })
      .addCase(fetchCsoByWorkId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(fetchAllTheCsos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllTheCsos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTheCsos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDefaultingTarget.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex(cso => cso._id === updated._id);
        if (index !== -1) {
          state.list[index] = updated;
        }
        state.targetMessage = action.payload.message;

      });

      builder
      .addCase(deactivateCSO.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deactivateCSO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deactivateCSO.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(activateCSO.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateCSO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(activateCSO.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
      .addCase(updateCSODetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCSODetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cso = action.payload.cso; // Update state with new CSO data
      })
      .addCase(updateCSODetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.status = "loading";
      })
      .addCase(fetchLoanProgressChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthlyLoanTarget = action.payload.monthlyLoanTarget;
        state.monthlyLoanCounts = action.payload.monthlyLoanCounts;
      })
      .addCase(fetchLoanProgressChart.rejected, (state, action) => {
        state.status = "failed";
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
export const {clearTargetMessageMessages, clearUpdateSuccessMessages, resetUploadState, setSelectedRemmitDate, setSelectedCSO, clearMessages } = csoSlice.actions;
export default csoSlice.reducer;
