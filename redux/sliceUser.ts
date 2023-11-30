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
  isDiamond: boolean;
};

const initialState: DataUser | null = {
  user: null,
  isDiamond: false,
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
    setIsDiamond: (state, action) => {
      state.isDiamond = action.payload;
    },
  },
});

export const {login, logout, setIsDiamond} = userSlice.actions;
export default userSlice.reducer;
