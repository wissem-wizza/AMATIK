import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
};

export const annonceSlice = createSlice({
  name: "annonce",
  initialState,
  reducers: {
    annoncePost: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
});

export const { annoncePost } = annonceSlice.actions;

export default annonceSlice.reducer;
