import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

// const studentBaseUrl = 'http://localhost:8000/students';
const backendURL = import.meta.env.VITE_BACKENDURL;
const studentBaseUrl = `${backendURL}/students`;

const initialState = {
  loading: false,
  studentInfo: [{}],
  searchResults: {},
  error: '',
  status: 'idle',
  singleStudent: {},
};

// * Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    try {
      const request = await axios.get(`${studentBaseUrl}/`);
      const response = request.data;
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message:
          'An error has occured trying to get students from the database',
        color: 'red',
      });
      return err.response.data;
    }
  },
);

// * Create a student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const request = await axios.post(`${studentBaseUrl}/create`, student, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
      const response = request.data;
      notifications.show({
        title: 'Student Created',
        message: 'Student has been created',
        color: 'green',
      });
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err?.response?.data?.error || 'Error occured',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

// * Update a student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (info, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const { _id, updatedStudentData } = info; // Destructure the info object
      const request = await axios.put(
        `${studentBaseUrl}/update/${_id}`,
        updatedStudentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        },
      );
      const response = request.data;
      notifications.show({
        title: 'Student Updated',
        message: 'Student has been updated',
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

// * Delete a student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;

      const request = await axios.delete(`${studentBaseUrl}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
      const response = request.data;
      notifications.show({
        title: 'Student Deleted',
        message: 'Student has been deleted',
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

// * Get a student by ID
export const getStudentById = createAsyncThunk(
  'students/getStudentById',
  async (_id) => {
    try {
      const request = await axios.get(`${studentBaseUrl}/${_id}`);
      const response = request.data;
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err?.response?.data?.error || 'Error occured',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type === fetchStudents.pending.type ||
            action.type === createStudent.pending.type ||
            action.type === deleteStudent.pending.type ||
            action.type === updateStudent.pending.type
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
          return action.type === fetchStudents.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.studentInfo = action.payload;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === createStudent.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.studentInfo.push(action.payload);
        },
      )
      .addMatcher(
        (action) => {
          return action.type === getStudentById.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.singleStudent = action.payload;
        },
      )
      .addMatcher(
        (action) => {
          return action.type === deleteStudent.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.studentInfo = state.studentInfo.filter(
            (student) => student._id !== action.payload.student_id,
          );
        },
      )
      .addMatcher(
        (action) => {
          return action.type === updateStudent.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.status = 'fullfilled';
          state.studentInfo = state.studentInfo.map((student) =>
            student._id === action.payload._id ? action.payload : student,
          );
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchStudents.rejected.type ||
            action.type === createStudent.rejected.type ||
            action.type === deleteStudent.rejected.type ||
            action.type === updateStudent.rejected.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.status = 'error';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === getStudentById.rejected.type;
        },
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        },
      );
  },
});

export default studentSlice.reducer;
