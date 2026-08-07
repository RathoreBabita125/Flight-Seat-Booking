import {configureStore} from "@reduxjs/toolkit";
import authUserReducer from './authSlice';

export const store = configureStore({
  reducer:{
    userData: authUserReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;