import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    verify_token: "",
    signup_id: "",
    authToken: "",
    isloggedin: false,
  },
  reducers: {
    setVerifyToken: (state, action) => {
      state.verify_token = action.payload;
    },
    setSignupId: (state, action) => {
      state.signup_id = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setIsloggedin: (state, action) => {
      state.isloggedin = action.payload;
    },
  },
});

export const { setVerifyToken, setSignupId, setAuthToken, setIsloggedin } = authSlice.actions;
export const selectVerifyToken = (state) => state.auth.verify_token;
export const selectSignupId = (state) => state.auth.signup_id;
export const selectAuthToken = (state) => state.auth.authtoken;
export const selectIsloggedin = (state) => state.auth.isloggedin;

export default authSlice.reducer;
