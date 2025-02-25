import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';


const API_URL = 'http://api.jksolutn.com/api/notification';

// const API_URL = "http://localhost:5000/api/notification"




// Async thunk for fetching notifications with pagination
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        params: { page, limit },
      });
      // Format timestamps to "x minutes/hours ago"
      const formattedNotifications = response.data.data.map((category) => {
        const formattedCategory = {};
        for (const key in category) {
          if (Array.isArray(category[key])) {
            formattedCategory[key] = category[key].map((item) => ({
              ...item,
              relativeTime: formatDistanceToNow(new Date(item.date), { addSuffix: true }),
            }));
          }
        }
        return formattedCategory;
      });

      return formattedNotifications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Async thunk to fetch notifications
export const fetchCsoNotifications = createAsyncThunk(
  "notifications/fetchCsoNotifications",
  async (workId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cso-notifications/${workId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    data: null,
    status: 'idle',
    error: null,
    page: 1,
    limit: 7,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

      builder
      .addCase(fetchCsoNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsoNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCsoNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = notificationSlice.actions;
export default notificationSlice.reducer;
