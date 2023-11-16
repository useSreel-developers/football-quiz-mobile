import {createSlice} from '@reduxjs/toolkit';

type DataUser = {
  user: {
    name?: string;
    email?: string;
  };
};

const initialState: DataUser = {
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    check: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = {};
    },
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
