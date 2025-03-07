import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const authBaseUrl = 'http://localhost:8000/auth';

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || {},
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  error: '',
  status: 'idle',
};

// * Log in

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (info, { rejectWithValue }) => {
    try {
      const request = await axios.post(`${authBaseUrl}/log_in/`, info);
      const response = request.data;
      notifications.show({
        title: 'Successful Login',
        message: 'You were logged in successfully',
        color: 'green',
      });
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err?.response?.data?.error || 'Error occured during login',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

// * Refresh Token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(`${authBaseUrl}/refresh`, {
        token: refreshToken,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.status = 'idle';
      state.token = {};
      state.loading = false;
      state.error = '';
      state.user = {};
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type === logIn.pending.type ||
            action.type === refreshToken.pending.type
          );
        },
        (state) => {
          state.loading = true;
          state.status = 'loading';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === logIn.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.accessToken = action.payload.access_token;
          state.refreshToken = action.payload.refresh_token;
          state.user = action.payload.user_database;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          action.type === refreshToken.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.accessToken = action.payload.access_token;
          localStorage.setItem('accessToken', action.payload.access_token);
          state.error = '';
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === logIn.rejected.type ||
            action.type === refreshToken.rejected.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.status = 'error';
          state.error = action.payload.error;
        },
      );
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
