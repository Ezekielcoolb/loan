// src/redux/slices/uploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for uploading images
export const uploadImages = createAsyncThunk(
  'upload/uploadImages',
  async ({ files, folderName }, { rejectWithValue }) => {
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file); // Use 'file', not 'images[]'

        const response = await axios.post(
          `https://api.jksolutn.com/api/fileupload/${folderName}`, // adjust domain if needed
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        uploadedUrls.push(response.data.data); // Push returned file path (e.g., "/uploads/folderName/filename.jpg")
      }

      return uploadedUrls; // Return array of uploaded image URLs
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
    loading: false,
    error: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.urls = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
