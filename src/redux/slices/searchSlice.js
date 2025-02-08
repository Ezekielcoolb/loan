// // redux/customerSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const searchCustomer = createAsyncThunk(
//   'customer/searchCustomer',
//   async (query) => {
//     const response = await fetch(`/api/search?query=${query}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch customer');
//     }
//     const data = await response.json();
//     return data;
//   }
// );

// const searchSlice = createSlice({
//   name: 'customer',
//   initialState: {
//     customers: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(searchCustomer.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchCustomer.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload;
//       })
//       .addCase(searchCustomer.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default searchSlice.reducer;
