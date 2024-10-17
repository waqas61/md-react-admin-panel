import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setAsyncMenuList = createAsyncThunk('menuList/setMenuList', async (menu) => {
  return menu;
});



export const menuListSlice = createSlice({
  name: "mainMenuList",
  initialState: {
    menu: [], // for active default menu
  },
  reducers: {
    setMenuList: (state, action) => {
      state.menu = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAsyncMenuList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setAsyncMenuList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menu = action.payload;
      })
      .addCase(setAsyncMenuList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setMenuList
} = menuListSlice.actions;

export const selectMenuList = (state) => state.mainMenuList.menu;
export default menuListSlice.reducer;
