import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", espece: "CAPRINS" }, //ماعز
  { id: "2", espece: "OVINS" }, //اغنام
  { id: "3", espece: "BOVINS" }, //ابقار
  { id: "4", espece: "VIANDE" },
  { id: "5", espece: "LAINE" }, //صوف
  { id: "6", espece: "DIVERS" },
];

const especeSlice = createSlice({
  name: "especes",
  initialState,
  reducers: {},
});

export const selectAllEspeces = (state) => state.especes;

export default especeSlice.reducer;
