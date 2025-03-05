import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const projectBaseUrl = 'http://localhost:8000/projects';

const initialState = {
  loading: false,
  projects: [],
  error: '',
};

// * Fetch all projects

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    try {
      const request = await axios.get(`${projectBaseUrl}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

// * Create a project

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project) => {
    try {
      const request = await axios.post(`${projectBaseUrl}/create`, project);
      const response = request.data;
      notifications.show({
        title: 'Project Created',
        message: 'Project has been created',
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

// * Update a project

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (info) => {
    try {
      const { _id, updated_project: project } = info; // Destructure the info object
      const request = await axios.put(
        `${projectBaseUrl}/update/${_id}`,
        project,
      );
      const response = request.data;
      notifications.show({
        title: 'Project Updated',
        message: 'Project has been updated',
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

// * Delete a project

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (_id) => {
    try {
      const request = await axios.delete(`${projectBaseUrl}/delete/${_id}`);
      const response = request.data;
      notifications.show({
        title: 'Project Deleted',
        message: 'Project has been deleted',
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

// * Get a project by ID

export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  async (_id) => {
    try {
      const request = await axios.get(`${projectBaseUrl}/get/${_id}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.pending]: (state) => {
      state.loading = true;
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = '';
    },
    [fetchProjects.rejected]: (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.payload;
    },
    [createProject.pending]: (state) => {
      state.loading = true;
    },
    [createProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
      state.error = '';
    },
    [createProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProject.pending]: (state) => {
      state.loading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
    },
    [updateProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteProject.pending]: (state) => {
      state.loading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload._id,
      );
      state.error = '';
    },
    [deleteProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getProjectById.pending]: (state) => {
      state.loading = true;
    },
    [getProjectById.fulfilled]: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = '';
    },
    [getProjectById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default projectSlice.reducer;
