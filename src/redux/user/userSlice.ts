import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  currentUser: any;
}

const initialState: IUserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStatus: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    editProfileStatus: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStatus, logout, editProfileStatus } = userSlice.actions;

export default userSlice.reducer;
