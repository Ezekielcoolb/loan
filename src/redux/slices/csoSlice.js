import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Toaster, toast} from "react-hot-toast"
import axios from 'axios';

const API_URL = 'https://sever-qvw1.onrender.com/api/cso'; // Backend API URL

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

const csoSlice = createSlice({
    name: 'cso',
    initialState: {
        totalcso: 0,
    totalPages: 1,
    currentPage: 1,
        cso: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
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
    },
});

export default csoSlice.reducer;
