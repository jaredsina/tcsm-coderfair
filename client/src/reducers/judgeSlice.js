import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const judgeSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJudges.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJudges.fulfilled, (state, action) => {
        state.loading = false;
        state.judges = action.payload;
      })
      .addCase(fetchJudges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default judgeSlice.reducer;
