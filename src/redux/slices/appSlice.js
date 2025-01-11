import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  dropdowVisible: false,
  openSideBar: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
   
    setDropdownVisible: (state) => {
      state.dropdowVisible = !state.dropdowVisible
    },
   
    setOpenSideBar: (state) => {
      state.openSideBar = !state.openSideBar;
    },
  },
});
export const { setDropdownVisible, setOpenSideBar} = appSlice.actions;
export default appSlice.reducer;

