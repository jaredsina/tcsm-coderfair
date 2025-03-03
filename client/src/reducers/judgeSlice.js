import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

const judgeBaseURL = 'http://localhost:8000/judges';

const initialState = {
  loading: false,
  judges: [],
  error: '',
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
  async (judge) => {
    try {
      const request = await axios.post(`${judgeBaseURL}/create`, judge);
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
      return err.response.data;
    }
  },
);

// * Update a judge
export const updateJudge = createAsyncThunk(
  'judges/updateJudge',
  async (info) => {
    try {
      const { _id, updated_judge: judge } = info; // Destructure the info object
      const request = await axios.put(`${judgeBaseURL}/update/${_id}`, judge);
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
      return err.response.data;
    }
  },
);

// * Delete a judge
export const deleteJudge = createAsyncThunk(
  'judges/deleteJudge',
  async (_id) => {
    try {
      const request = await axios.delete(`${judgeBaseURL}/delete/${_id}`);
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
      return err.response.data;
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
      .addCase(fetchJudges.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJudge.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJudge.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJudge.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJudgeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJudges.fulfilled, (state, action) => {
        state.loading = false;
        state.judges = action.payload;
      })
      .addCase(createJudge.fulfilled, (state, action) => {
        state.loading = false;
        state.judges.push(action.payload);
      })
      .addCase(updateJudge.fulfilled, (state, action) => {
        state.loading = false;
        state.judges = state.judges.map((judge) =>
          judge._id === action.payload._id ? action.payload : judge,
        );
      })
      .addCase(deleteJudge.fulfilled, (state, action) => {
        state.loading = false;
        state.judges = state.judges.filter(
          (judge) => judge._id !== action.payload._id,
        );
      })
      .addCase(getJudgeById.fulfilled, (state, action) => {
        state.loading = false;
        state.judges = action.payload;
      })
      .addCase(fetchJudges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createJudge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateJudge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteJudge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getJudgeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default judgeSlice.reducer;
