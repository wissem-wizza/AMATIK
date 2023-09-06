import { createSlice } from "@reduxjs/toolkit";

const authSilce = createSlice({
  name: "auth",
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSilce.actions;

export default authSilce.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
