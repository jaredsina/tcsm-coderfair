import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

// const judgeBaseURL = 'http://localhost:8000/judges';
const backendURL = import.meta.env.VITE_BACKENDURL;
const judgeBaseURL = `${backendURL}/judges`;

const initialState = {
  loading: false,
  judges: [],
  error: '',
  status: 'idle',
};

// * Fetch all judges
export const fetchJudges = createAsyncThunk('judges/fetchJudges', async () => {
  try {
    const request = await axios.get(`${judgeBaseURL}`);
    const response = request.data;
    return response;
  } catch (err) {
    return err.response.data;
  }
});

// * Create a judge
export const createJudge = createAsyncThunk(
  'judges/createJudge',
  async (judge, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const request = await axios.post(`${judgeBaseURL}/create`, judge, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const response = request.data;
      notifications.show({
        title: 'Judge Created',
        message: 'Judge has been created',
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

// * Update a judge
export const updateJudge = createAsyncThunk(
  'judges/updateJudge',
  async (info, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const { _id, updated_judge: judge } = info; // Destructure the info object
      const request = await axios.put(`${judgeBaseURL}/update/${_id}`, judge, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const response = request.data;
      notifications.show({
        title: 'Judge Updated',
        message: 'Judge has been updated',
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

// * Delete a judge
export const deleteJudge = createAsyncThunk(
  'judges/deleteJudge',
  async (_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const request = await axios.delete(`${judgeBaseURL}/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const response = request.data;
      notifications.show({
        title: 'Judge Deleted',
        message: 'Judge has been deleted',
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

// * Get a judge by ID
export const getJudgeById = createAsyncThunk(
  'judges/getJudgeById',
  async (_id) => {
    try {
      const request = await axios.get(`${judgeBaseURL}/${_id}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

const judgeSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type === fetchJudges.pending.type ||
            action.type === createJudge.pending.type ||
            action.type === updateJudge.pending.type ||
            action.type === deleteJudge.pending.type
          );
        },
        (state) => {
          state.loading = true;
          state.status = 'loading';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === fetchJudges.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.judges = action.payload;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === fetchJudges.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.judges.push(action.payload);
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === updateJudge.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.judges = state.judges.map((judge) =>
            judge._id === action.payload._id ? action.payload : judge,
          );
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === deleteJudge.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.judges = state.judges.filter(
            (judge) => judge._id !== action.payload.judge_id,
          );
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchJudges.rejected.type ||
            action.type === createJudge.rejected.type ||
            action.type === updateJudge.rejected.type ||
            action.type === deleteJudge.rejected.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.status = 'error';
          state.error = action.error.message;
        },
      );
  },
});

export default judgeSlice.reducer;
