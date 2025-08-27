import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface userState {
  value: number;
}

const initialState: userState = {
  value: 0,
};

const userSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    signout: (state) => {
      state.value = 0;
    },
  },
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
