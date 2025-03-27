import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
  currentUser: [],
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.MFA = false;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { 
  setCurrentUser, 
  logout, 
  setIsAuthenticated,
  updateUser
} = authSlice.actions;

export default authSlice.reducer;
