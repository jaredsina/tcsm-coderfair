import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';

export const store = configureStore({
  reducer: {
    session: userReducer, // session information (user, accessToken, refreshToken)
  },
});
