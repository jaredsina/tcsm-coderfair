import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const authBaseUrl = 'http://localhost:8000/auth';

const initialState = {
  loading: false,
  token: {},
  error: '',
  status: 'idle',
};

// * Log in

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (info, { rejectWithValue }) => {
    try {
      const request = await axios.post(`${authBaseUrl}/create`, info);
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
        message: 'An error has occured',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type === logIn.pending.type;
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
          state.token = action.payload;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === logIn.rejected.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'error';
          state.error = action.error.message;
        },
      );
  },
});
