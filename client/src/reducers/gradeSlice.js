import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import { useStore } from 'react-redux';
const gradeBaseUrl = 'http://localhost:8000/grades';

const initialState = {
  loading: false,
  grades: [],
  error: '',
  status: 'idle',
};

// * Fetch all grades
export const fetchGrades = createAsyncThunk('grades/fetchGrades', async () => {
  try {
    const request = await axios.get(`${gradeBaseUrl}/`);
    const response = request.data;
    return response;
  } catch (err) {
    notifications.show({
      title: 'Error',
      message: 'An error has occured trying to get grades from the database',
      color: 'red',
    });
    return err.response.data;
  }
});

// * Fetch all grades
export const fetchJudgeGrades = createAsyncThunk(
  'grades/fetchJudgeGrades',
  async (user_id, { getState, rejectWithValue }) => {
    try {
      const request = await axios.get(`${gradeBaseUrl}/judge/${user_id}`);
      const response = request.data;
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'An error has occured trying to get grades from the database',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

// * Create a grade
export const createGrade = createAsyncThunk(
  'grades/createGrade',
  async (grade, { getState, rejectWithValue }) => {
    try {
      // Get the token from the Redux store
      const token = getState().auth.accessToken;
      const request = await axios.post(`${gradeBaseUrl}/create`, grade, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
      const response = request.data;
      notifications.show({
        title: 'Grade Created',
        message: 'Grade has been created',
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

// * Update a grade
export const updateGrade = createAsyncThunk(
  'grades/updateGrade',
  async (info, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const { _id, updatedGradeData } = info;
      const request = await axios.put(
        `${gradeBaseUrl}/update/${_id}`,
        updatedGradeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        },
      );
      const response = request.data;
      notifications.show({
        title: 'Grade Updated',
        message: 'Grade has been updated',
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

// * Delete a grade
export const deleteGrade = createAsyncThunk(
  'grades/deleteGrade',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const request = await axios.delete(`${gradeBaseUrl}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
      const response = request.data;
      notifications.show({
        title: 'Grade Deleted',
        message: 'Grade has been deleted',
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

const gradeSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    resetGrades: (state) => {
      state.status = 'idle';
      state.grades = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type === fetchGrades.pending.type ||
            action.type === createGrade.pending.type ||
            action.type === deleteGrade.pending.type ||
            action.type === updateGrade.pending.type ||
            action.type === fetchJudgeGrades.pending.type
          );
        },
        (state) => {
          state.loading = true;
          state.searchResults = null;
          state.status = 'pending';
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchGrades.fulfilled.type ||
            action.type === fetchJudgeGrades.fulfilled.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.grades = action.payload;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === createGrade.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.grades.push(action.payload);
        },
      )
      .addMatcher(
        (action) => {
          return action.type === deleteGrade.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.grades = state.grades.filter(
            (grade) => grade._id !== action.payload._id,
          );
        },
      )
      .addMatcher(
        (action) => {
          return action.type === updateGrade.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.grades = state.grades.map((grade) =>
            grade._id === action.payload._id ? action.payload : grade,
          );
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchGrades.rejected.type ||
            action.type === createGrade.rejected.type ||
            action.type === deleteGrade.rejected.type ||
            action.type === updateGrade.rejected.type ||
            action.type === fetchJudgeGrades.rejected.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.status = 'error';
        },
      );
  },
});

export const { resetGrades } = gradeSlice.actions;

export default gradeSlice.reducer;
