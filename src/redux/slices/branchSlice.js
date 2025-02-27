import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Toaster, toast} from "react-hot-toast"
import axios from 'axios';

const API_URL = 'https://api.jksolutn.com/api/branches'; // Backend API URL
// const API_URL = "http://localhost:5000/api/branches"

// Async thunk to fetch branches
export const fetchBranches = createAsyncThunk('branches/fetchBranches', async ({ page, limit }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
   
});

// Async thunk to create a new branch
export const createBranch = createAsyncThunk('branches/createBranch', async (branchData) => {
    try{
       
        
        const response = await axios.post(`${API_URL}/createbranch`, branchData);
      
        toast.success(response.data.message)
        return response.data;
    }
    catch(e){
        console.log(e)
    }
});
export const fetchAllBranches = createAsyncThunk(
    'branches/fetchAllBranches',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/get-branches`);
         
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const setYearlyTargets = createAsyncThunk(
    'branches/setYearlyTargets',
    async ({ yearlyLoanTarget, yearlyDisbursementTarget }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/branches/targets/yearly`, {
                yearlyLoanTarget,
                yearlyDisbursementTarget,
            });
            console.log(response.data);
            toast.success(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const setBranchTargets = createAsyncThunk(
    'branches/setBranchTargets',
    async ({ name, loanTarget, disbursementTarget }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/branches/targets/${name}`, {
                loanTarget,
                disbursementTarget,
            });
            console.log(response.data);
            toast.success(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const branchSlice = createSlice({
    name: 'branches',
    initialState: {
        totalBranches: 0,
    totalPages: 1,
    currentPage: 1,
        branches: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchBranches
            .addCase(fetchBranches.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.branches = action.payload.branches;
                state.totalBranches = action.payload.totalBranches;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle createBranch
            .addCase(createBranch.fulfilled, (state, action) => {
                state.branches.push(action.payload);
            })

            builder
            .addCase(setYearlyTargets.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
            })
            .addCase(setYearlyTargets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(setBranchTargets.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
            })
            .addCase(setBranchTargets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            builder
            .addCase(fetchAllBranches.fulfilled, (state, action) => {
                state.branches = action.payload;
                state.status = 'success';
                state.error = null;
            })
            .addCase(fetchAllBranches.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default branchSlice.reducer;
