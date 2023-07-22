import { createSlice } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';
import { User } from '../../types/user.type';

const initialState: User = {
  login: '',
  password: '',
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogin(state, action) {
      const { login, password } = action.payload;
      const newState = {
        login,
        password,
        isAuthenticated: true
      };
      UserService.saveOnLocalStorage(newState);
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
