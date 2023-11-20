import {createSlice} from '@reduxjs/toolkit';

type DataUser = {
  user?: {
    id?: number;
    name?: string;
    email?: string;
    diamond?: string;
    avatar?: string | null;
  };
};

const initialState: DataUser | null = {
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = {};
    },
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
