import {createSlice} from '@reduxjs/toolkit';

type Avatar = {
  id: number;
  avatar_name: string | null;
  avatar_url: string | null;
  price: number;
};
type User = {
  id?: number;
  name?: string;
  email?: string;
  diamond?: string;
  avatar?: Avatar | null;
};

type DataUser = {
  user: User | null;
};

const initialState: DataUser | null = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
