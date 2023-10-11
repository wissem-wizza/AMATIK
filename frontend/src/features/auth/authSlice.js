import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const tokenName = "jwt"
const cookie = Cookies.get(tokenName);

function decodeJWT() {
  try {
    return jwtDecode(cookie);
  } catch (_) {
    return {};
  }
}

const decoded = decodeJWT();
const { nom, type, email, eleveur_id, cle } = decoded;

const authSilce = createSlice({
  name: "auth",
  initialState: { user: { nom, type, email, eleveur_id, cle }, token: cookie },
  reducers: {
    setCredentials: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;
      Cookies.set(tokenName, token, { expires: 1 })
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove(tokenName);
    },
  },
});

export const { setCredentials, logOut } = authSilce.actions;

export default authSilce.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => {
  if(state.auth.token) {
    return state.auth.token
  }
};
