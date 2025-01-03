import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Toaster, toast} from "react-hot-toast"
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/branches'; // Backend API URL

// Async thunk to fetch branches
export const fetchBranches = createAsyncThunk('branches/fetchBranches', async ({ page, limit }) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
        return response.data;
   
});

// Async thunk to create a new branch
export const createBranch = createAsyncThunk('branches/createBranch', async (branchData) => {
    try{
       
        
        const response = await axios.post(API_URL, branchData);
      
        toast.success(response.data.message)
        return response.data;
    }
    catch(e){
        console.log(e)
    }
});

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
            });
    },
});

export default branchSlice.reducer;
