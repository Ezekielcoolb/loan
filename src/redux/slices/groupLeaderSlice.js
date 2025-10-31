import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.jksolutn.com/api/loan';
// const API_URL = 'http://localhost:5000/api/loan';

export const fetchGroupLeaders = createAsyncThunk(
  'groupLeader/fetchGroupLeaders',
  async ({ page = 1, limit = 20, csoId } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (csoId) {
        params.csoId = csoId;
      }
      const response = await axios.get(`${API_URL}/group-leaders`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch group leaders');
    }
  }
);

export const deleteGroupLeader = createAsyncThunk(
  'groupLeader/deleteGroupLeader',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/group-leaders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete group leader');
    }
  }
);

export const addGroupLeader = createAsyncThunk(
  'groupLeader/addGroupLeader',
  async (leaderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/group-leaders`, leaderData);
      return response.data.groupLeader;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to add group leader');
    }
  }
);

export const approveGroupLeader = createAsyncThunk(
  'groupLeader/approveGroupLeader',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/group-leaders/${id}/approve`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to approve group leader');
    }
  }
);

export const rejectGroupLeader = createAsyncThunk(
  'groupLeader/rejectGroupLeader',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/group-leaders/${id}/reject`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to reject group leader');
    }
  }
);

export const updateGroupLeader = createAsyncThunk(
  'groupLeader/updateGroupLeader',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/group-leaders/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update group leader');
    }
  }
);

export const fetchGroupLeadersByCso = createAsyncThunk(
  'groupLeader/fetchGroupLeadersByCso',
  async (csoId, { rejectWithValue }) => {
    try {
      if (!csoId) {
        throw new Error('CSO ID is required');
      }
      const response = await axios.get(`${API_URL}/group-leaders/options/${csoId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch group leaders'
      );
    }
  }
);

const groupLeaderSlice = createSlice({
  name: 'groupLeader',
  initialState: {
    leaders: [],
    loading: false,
    submitting: false,
    errorMessage: null,
    error: null,
    successMessage: null,
    actionLoadingId: null,
    options: [],
    optionsLoading: false,
    optionsError: null,
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1,
      limit: 20,
    },
  },
  reducers: {
    clearGroupLeaderMessages: (state) => {
      state.error = null;
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupLeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupLeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.leaders = action.payload?.data || [];
        if (action.payload?.pagination) {
          state.pagination = {
            total: action.payload.pagination.total ?? 0,
            page: action.payload.pagination.page ?? 1,
            totalPages: action.payload.pagination.totalPages ?? 1,
            limit: action.payload.pagination.limit ?? 20,
          };
        }
      })
      .addCase(fetchGroupLeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupLeadersByCso.pending, (state) => {
        state.optionsLoading = true;
        state.optionsError = null;
      })
      .addCase(fetchGroupLeadersByCso.fulfilled, (state, action) => {
        state.optionsLoading = false;
        state.options = action.payload;
      })
      .addCase(fetchGroupLeadersByCso.rejected, (state, action) => {
        state.optionsLoading = false;
        state.optionsError = action.payload;
      })
      .addCase(addGroupLeader.pending, (state) => {
        state.submitting = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(addGroupLeader.fulfilled, (state, action) => {
        state.submitting = false;
        state.leaders.unshift(action.payload);
        state.successMessage = 'Group created successfully. Wait for admin approval.';
      })
      .addCase(addGroupLeader.rejected, (state, action) => {
        state.submitting = false;
        state.errorMessage = action.payload;
      })
      .addCase(approveGroupLeader.pending, (state, action) => {
        state.actionLoadingId = action.meta.arg;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(approveGroupLeader.fulfilled, (state, action) => {
        state.actionLoadingId = null;
        const updated = action.payload.groupLeader;
        const index = state.leaders.findIndex((item) => item._id === updated._id);
        if (index !== -1) {
          state.leaders[index] = updated;
        }
        state.successMessage = action.payload.message || 'Group leader approved successfully';
      })
      .addCase(approveGroupLeader.rejected, (state, action) => {
        state.actionLoadingId = null;
        state.errorMessage = action.payload;
      })
      .addCase(rejectGroupLeader.pending, (state, action) => {
        state.actionLoadingId = action.meta.arg;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(rejectGroupLeader.fulfilled, (state, action) => {
        state.actionLoadingId = null;
        const rejectedId = action.payload.groupLeader?._id;
        if (rejectedId) {
          state.leaders = state.leaders.filter((item) => item._id !== rejectedId);
        }
        state.successMessage = action.payload.message || 'Group leader rejected successfully';
      })
      .addCase(rejectGroupLeader.rejected, (state, action) => {
        state.actionLoadingId = null;
        state.errorMessage = action.payload;
      })
      .addCase(updateGroupLeader.pending, (state) => {
        state.submitting = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateGroupLeader.fulfilled, (state, action) => {
        state.submitting = false;
        const updated = action.payload.groupLeader;
        const index = state.leaders.findIndex((item) => item._id === updated._id);
        if (index !== -1) {
          state.leaders[index] = updated;
        }
        state.successMessage = action.payload.message || 'Group leader updated successfully';
      })
      .addCase(updateGroupLeader.rejected, (state, action) => {
        state.submitting = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteGroupLeader.pending, (state, action) => {
        state.actionLoadingId = action.meta.arg;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(deleteGroupLeader.fulfilled, (state, action) => {
        state.actionLoadingId = null;
        const deletedId = action.payload.groupLeader?._id;
        if (deletedId) {
          state.leaders = state.leaders.filter((item) => item._id !== deletedId);
        }
        state.successMessage = action.payload.message || 'Group leader deleted successfully';
      })
      .addCase(deleteGroupLeader.rejected, (state, action) => {
        state.actionLoadingId = null;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearGroupLeaderMessages } = groupLeaderSlice.actions;
export default groupLeaderSlice.reducer;
