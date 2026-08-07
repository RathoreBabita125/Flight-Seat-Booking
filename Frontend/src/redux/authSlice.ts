import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../datatypes/datatypes";

const initialState: AuthState = {
  userAuth: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {

    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      state.userAuth = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logoutFn: (state) => {
      state.userAuth = null;
    },

  }
});

export const { setUser, setLoading, logoutFn} = authSlice.actions;
export default authSlice.reducer;