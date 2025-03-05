import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const studentBaseUrl = 'http://localhost:8000/students';

const initialState = {
  loading: false,
  studentInfo: [{}],
  searchResults: {},
  error: '',
  status: 'idle',
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
  async (student) => {
    try {
      const request = await axios.post(`${studentBaseUrl}/create`, student, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
        message: 'An error has occured',
        color: 'red',
      });
      return err.response.data;
    }
  },
);

// * Update a student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (info) => {
    try {
      const { _id, updatedStudentData } = info; // Destructure the info object
      const request = await axios.put(
        `${studentBaseUrl}/update/${_id}`,
        updatedStudentData,
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
      return err.response.data;
    }
  },
);

// * Delete a student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id) => {
    try {
      const request = await axios.delete(`${studentBaseUrl}/delete/${id}`);
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
      return err.response.data;
    }
  },
);

// * Get a student by ID
export const getStudentById = createAsyncThunk(
  'students/getStudentById',
  async (id) => {
    try {
      const request = await axios.get(`${studentBaseUrl}/${id}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
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
      );
  },
});

export default studentSlice.reducer;
