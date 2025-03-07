// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// //import { authBaseURL, userBaseURL } from '../utils/baseUrl';

// const initialState = {
//   loading: false,
//   user: {},
//   accessToken: localStorage.getItem('accessToken') || null,
//   refreshToken: localStorage.getItem('refreshToken') || null,
//   error: '',
// };

// // * Login User
// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async (userCredentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${authBaseURL}/login`,
//         userCredentials,
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// // * Logout User
// export const logoutUser = createAsyncThunk(
//   'user/logoutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${authBaseURL}/logout`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// // * Register User
// export const registerUser = createAsyncThunk(
//   'user/registerUser',
//   async (userDetails, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${authBaseURL}/register`, userDetails);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// // * Fetch user by username
// export const fetchUserByUsername = createAsyncThunk(
//   'user/fetchUserByUsername',
//   async (username, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${userBaseURL}/${username}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// // * Fetch User
// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (_, { rejectWithValue }) => {
//     const accessToken = localStorage.getItem('accessToken');
//     try {
//       const response = await axios.get(`${authBaseURL}/user`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// // * Refresh Token
// export const refreshToken = createAsyncThunk(
//   'user/refreshToken',
//   async (_, { rejectWithValue }) => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     try {
//       const response = await axios.post(`${authBaseURL}/refresh-token`, {
//         token: refreshToken,
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         localStorage.setItem('accessToken', action.payload.accessToken);
//         state.refreshToken = action.payload.refreshToken;
//         localStorage.setItem('refreshToken', action.payload.refreshToken);
//         state.error = '';
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = {};
//         state.accessToken = null;
//         localStorage.removeItem('accessToken');
//         state.refreshToken = null;
//         localStorage.removeItem('refreshToken');
//         state.error = '';
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         localStorage.setItem('accessToken', action.payload.accessToken);
//         state.refreshToken = action.payload.refreshToken;
//         localStorage.setItem('refreshToken', action.payload.refreshToken);
//         state.error = '';
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(fetchUserByUsername.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(fetchUserByUsername.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = '';
//       })
//       .addCase(fetchUserByUsername.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.error = '';
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(refreshToken.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(refreshToken.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload.accessToken;
//         localStorage.setItem('accessToken', action.payload.accessToken);
//         state.error = '';
//       })
//       .addCase(refreshToken.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default userSlice.reducer;
