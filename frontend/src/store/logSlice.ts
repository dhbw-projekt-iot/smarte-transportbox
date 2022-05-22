import { createSlice } from '@reduxjs/toolkit';

interface LogState {
  logged: boolean;
  email: string;
}
const initialState: LogState = {
  logged: false,
  email: '',
};

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    logoff: (state) => {
      state.logged = false;
      state.email = '';
    },
    logon: (state) => {
      state.logged = true;
      state.email = '';
    },
  },
});

export const { logoff, logon } = logSlice.actions;

export default logSlice.reducer;
