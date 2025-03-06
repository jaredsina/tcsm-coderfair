import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const authBaseUrl = 'http://localhost:8000/auth';

const initialState = {
  loading: false,
  token: [],
  error: '',
};

// * Log in

export const logIn = createAsyncThunk('auth/logIn', async (info) => {
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
    return err.response.data;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});
