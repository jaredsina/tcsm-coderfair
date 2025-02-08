import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import judgeReducer from '../reducers/judgeSlice';

export const store = configureStore({
  reducer: {
    session: userReducer, // session information (user, accessToken, refreshToken)
    judges: judgeReducer, // judges information
  },
});
