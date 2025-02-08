import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 dropSuccessVisible: false,
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
    setDropSuccessVisible: (state) => {
      state.dropSuccessVisible = !state.dropSuccessVisible;
    },
  },
});
export const { setDropdownVisible, setOpenSideBar, setDropSuccessVisible} = appSlice.actions;
export default appSlice.reducer;

