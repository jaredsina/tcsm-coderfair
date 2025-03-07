import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const backendURL = import.meta.env.VITE_BACKENDURL;
const projectBaseUrl = `${backendURL}/projects`;

const initialState = {
  loading: false,
  projects: [{}],
  error: '',
  status: 'idle',
  singleProject: [{}],
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
  async (project, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const request = await axios.post(`${projectBaseUrl}/create/`, project, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
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
  async (info, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const { _id, updatedProjectData } = info; // Destructure the info object
      const request = await axios.put(
        `${projectBaseUrl}/update/${_id}`,
        updatedProjectData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        },
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
  async (_id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const request = await axios.delete(`${projectBaseUrl}/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });
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
      const request = await axios.get(`${projectBaseUrl}/${_id}`);
      const response = request.data;
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

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjectStatus: (state) => {
      state.status = 'idle';
    },
  },
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
          return action.type === getProjectById.fulfilled.type;
        },
        (state, action) => {
          state.loading = false;
          state.singleProject = action.payload;
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
      )
      .addMatcher(
        (action) => {
          return action.type === getProjectById.rejected.type;
        },
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        },
      );
  },
});

export const { resetProjectStatus } = projectSlice.actions;
export default projectSlice.reducer;
