import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const studentBaseUrl = 'http://localhost:8000/students';

const initialState = {
  loading: false,
  students: [],
  error: '',
};

// * Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    try {
      const request = await axios.get(`${studentBaseUrl}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

// * Create a student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student) => {
    try {
      const request = await axios.post(`${studentBaseUrl}/create`, student);
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
      const { _id, updated_student: student } = info; // Destructure the info object
      const request = await axios.put(
        `${studentBaseUrl}/update/${_id}`,
        student,
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
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.loading = true;
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createStudent.pending]: (state) => {
      state.loading = true;
    },
    [createStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students.push(action.payload);
    },
    [createStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateStudent.pending]: (state) => {
      state.loading = true;
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = state.students.map((student) =>
        student._id === action.payload._id ? action.payload : student,
      );
    },
    [updateStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteStudent.pending]: (state) => {
      state.loading = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = state.students.filter(
        (student) => student._id !== action.payload._id,
      );
    },
    [deleteStudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getStudentById.pending]: (state) => {
      state.loading = true;
    },
    [getStudentById.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    [getStudentById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default studentSlice.reducer;
