import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  dropdowVisible: false,
 
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
   
    setDropdownVisible: (state) => {
      state.dropdowVisible = !state.dropdowVisible
    },
   

  },
});
export const { setDropdownVisible} = appSlice.actions;
export default appSlice.reducer;

