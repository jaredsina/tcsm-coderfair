import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

// const coderfairBaseUrl = 'http://localhost:8000/coderfair';
const backendURL = import.meta.env.VITE_BACKENDURL;
const coderfairBaseUrl = `${backendURL}/coderfair`;

const initialState = {
  loading: false,
  coderfairs: [],
  error: '',
};

// * Fetch all coderfairs
export const fetchCoderfairs = createAsyncThunk(
  'coderfairs/fetchCoderfairs',
  async () => {
    try {
      const request = await axios.get(`${coderfairBaseUrl}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

// * Create a coderfair
export const createCoderfair = createAsyncThunk(
  'coderfairs/createCoderfair',
  async (coderfair) => {
    try {
      const request = await axios.post(`${coderfairBaseUrl}/create`, coderfair);
      const response = request.data;
      notifications.show({
        title: 'Coderfair Created',
        message: 'Coderfair has been created',
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

// * Update a coderfair
export const updateCoderfair = createAsyncThunk(
  'coderfairs/updateCoderfair',
  async (info) => {
    try {
      const { _id, updated_coderfair: coderfair } = info; // Destructure the info object
      const request = await axios.put(
        `${coderfairBaseUrl}/update/${_id}`,
        coderfair,
      );
      const response = request.data;
      notifications.show({
        title: 'Coderfair Updated',
        message: 'Coderfair has been updated',
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

// * Delete a coderfair

export const deleteCoderfair = createAsyncThunk(
  'coderfairs/deleteCoderfair',
  async (_id) => {
    try {
      const request = await axios.delete(`${coderfairBaseUrl}/delete/${_id}`);
      const response = request.data;
      notifications.show({
        title: 'Coderfair Deleted',
        message: 'Coderfair has been deleted',
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

// * Get a coderfair by ID

export const fetchCoderfairById = createAsyncThunk(
  'coderfairs/fetchCoderfairById',
  async (_id) => {
    try {
      const request = await axios.get(`${coderfairBaseUrl}/get/${_id}`);
      const response = request.data;
      return response;
    } catch (err) {
      return err.response.data;
    }
  },
);

const coderfairSlice = createSlice({
  name: 'coderfairs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCoderfairs.pending]: (state) => {
      state.loading = true;
    },
    [fetchCoderfairs.fulfilled]: (state, action) => {
      state.loading = false;
      state.coderfairs = action.payload;
    },
    [fetchCoderfairs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createCoderfair.pending]: (state) => {
      state.loading = true;
    },
    [createCoderfair.fulfilled]: (state, action) => {
      state.loading = false;
      state.coderfairs.push(action.payload);
    },
    [createCoderfair.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateCoderfair.pending]: (state) => {
      state.loading = true;
    },
    [updateCoderfair.fulfilled]: (state, action) => {
      state.loading = false;
      state.coderfairs = state.coderfairs.map((coderfair) =>
        coderfair._id === action.payload._id ? action.payload : coderfair,
      );
    },
    [updateCoderfair.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCoderfair.pending]: (state) => {
      state.loading = true;
    },
    [deleteCoderfair.fulfilled]: (state, action) => {
      state.loading = false;
      state.coderfairs = state.coderfairs.filter(
        (coderfair) => coderfair._id !== action.payload._id,
      );
    },
    [deleteCoderfair.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchCoderfairById.pending]: (state) => {
      state.loading = true;
    },
    [fetchCoderfairById.fulfilled]: (state, action) => {
      state.loading = false;
      state.coderfairs = action.payload;
    },
    [fetchCoderfairById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default coderfairSlice.reducer;
