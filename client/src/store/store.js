import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import judgeReducer from '../reducers/judgeSlice';
import studentReducer from '../reducers/studentSlice';
import projectReducer from '../reducers/projectSlice';
import gradeReducer from '../reducers/gradeSlice';
import authReducer from '../reducers/authSlice';

export const store = configureStore({
  reducer: {
    session: userReducer, // session information (user, accessToken, refreshToken)
    judges: judgeReducer, // judges information
    students: studentReducer,
    projects: projectReducer,
    grades: gradeReducer,
    auth: authReducer,
  },
});
