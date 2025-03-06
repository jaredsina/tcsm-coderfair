import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const projectBaseUrl = 'http://localhost:8000/projects';

const initialState = {
  loading: false,
  projects: [{}],
  error: '',
  status: 'idle',
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
      notifications.show({
        title: 'Error',
        message:
          'An error has occured trying to get projects from the database',
        color: 'red',
      });
      return err.response.data;
    }
  },
);

// * Fetch coderfair projects

export const fetchCoderFairProjects = createAsyncThunk(
  'projects/fetchCoderFairProjects',
  async (coderfair_id, { rejectWithValue }) => {
    try {
      const request = await axios.get(
        `${projectBaseUrl}/coderfair/${coderfair_id}`,
      );
      const response = request.data;
      return response;
    } catch (err) {
      notifications.show({
        title: 'Error',
        message:
          'An error has occured trying to get coderfair projects from the database',
        color: 'red',
      });
      return rejectWithValue(err.response.data);
    }
  },
);

// * Create a project

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project, { rejectWithValue }) => {
    try {
      const request = await axios.post(`${projectBaseUrl}/create`, project, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      return rejectWithValue(err.response.data);
    }
  },
);

// * Update a project

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (info, { rejectWithValue }) => {
    try {
      const { _id, updatedProjectData } = info; // Destructure the info object
      const request = await axios.put(
        `${projectBaseUrl}/update/${_id}`,
        updatedProjectData,
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
      return rejectWithValue(err.response.data);
    }
  },
);

// * Delete a project

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (_id, { rejectWithValue }) => {
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
      return rejectWithValue(err.response.data);
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type === fetchProjects.pending.type ||
            action.type === createProject.pending.type ||
            action.type === updateProject.pending.type ||
            action.type === deleteProject.pending.type ||
            action.type === fetchCoderFairProjects.pending.type
          );
        },
        (state) => {
          state.loading = true;
          state.status = 'loading';
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchProjects.fulfilled.type ||
            action.type === fetchCoderFairProjects.fulfilled.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.projects = action.payload;
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === createProject.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.projects.push(action.payload);
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === updateProject.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.projects = state.projects.map((project) =>
            project._id === action.payload._id ? action.payload : project,
          );
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return action.type === deleteProject.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.projects = state.projects.filter(
            (project) => project._id !== action.payload.project_id,
          );
          state.status = 'fullfilled';
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type === fetchProjects.rejected.type ||
            action.type === createProject.rejected.type ||
            action.type === updateProject.rejected.type ||
            action.type === deleteProject.rejected.type ||
            action.type === fetchCoderFairProjects.rejected.type
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

export default projectSlice.reducer;
