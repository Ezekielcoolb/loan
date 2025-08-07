// src/redux/slices/uploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for uploading images
export const uploadImages = createAsyncThunk(
  'upload/uploadImages',
  async ({ files, folderName, target }, { rejectWithValue }) => {
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(
          `https://api.jksolutn.com/api/fileupload/${folderName}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        uploadedUrls.push(response.data.data);
      }

      return { urls: uploadedUrls, target }; // 👈 Return both
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Upload failed');
    }
  }
);


// Upload slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    urls: [],
    target: null, // 👈 Add this
    imageUploadloading: false,
    error: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.urls = [];
      state.target = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.imageUploadloading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.imageUploadloading = false;
        state.urls = action.payload.urls;
        state.target = action.payload.target; // 👈 Set target here
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.imageUploadloading = false;
        state.error = action.payload;
      });
  },
});


export const { resetUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
