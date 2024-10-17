import { createSlice } from "@reduxjs/toolkit";
import config from '../../config';
const localuser = localStorage.getItem("user");
const userObj = (localuser != "undefined" && localuser) ? JSON.parse(localuser) : null;

export const customizationSlice = createSlice({
  name: "customization",
  initialState: {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 12,
    opened: true
  },
  reducers: {
    setOpened: (state, action) => {
      state.opened = action.payload
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload
    },
    setDefaultId: (state, action) => {
      state.defaultId = action.payload
    },
    setIsOpen: (state, action) => {
      // state.isOpen = action.payload
      let id;
      id = action.payload;
      state.isOpen = [id]
    }
  }
});

export const {
  setOpened,
  setDefaultId,
  setIsOpen,
  setFontFamily,
  setBorderRadius
} = customizationSlice.actions;


export const selectOpened = (state) => state.customization.opened;
export const selectDefaultId = (state) => state.customization.defaultId;
export const selectIsOpen = (state) => state.customization.isOpen;

export const selectFontFamily = (state) => state.customization.fontFamily;
export const selectBorderRadius = (state) => state.customization.borderRadius;


export default customizationSlice.reducer;
