import { createSlice } from '@reduxjs/toolkit';

interface UserCurrentSlice {
  userName: string;
  userId: string;
  name: string;
  email: string;
}

const userCurrentSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userId: '',
    name: '',
  } as UserCurrentSlice,
  reducers: {
    setDataUserLogin(state, action) {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.email = action.payload.email;
    },
    logOutUser(state) {
      state.userName = '';
      state.name = '';
      state.userId = '';
      state.email = '';
    },
  },
});

export const { setDataUserLogin, logOutUser } = userCurrentSlice.actions;

export default userCurrentSlice.reducer;
