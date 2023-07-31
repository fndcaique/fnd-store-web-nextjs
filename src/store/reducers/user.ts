import { createSlice } from '@reduxjs/toolkit';
import Router from 'next/router';
import UserService from '../../services/user.service';
import { User } from '../../types/user.type';

const initialState: User = {
  username: '',
  password: '',
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogin(state, action) {
      const { username, password } = action.payload;
      const newState = {
        ...state,
        username,
        password,
        isAuthenticated: true
      };
      UserService.saveOnLocalStorage(newState);
      Router.router?.push('/');
      return newState;
    },
    handleLogout() {
      UserService.removeFromLocalStorage();
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout } = userSlice.actions;

const UserReducer = userSlice.reducer;
export default UserReducer;
