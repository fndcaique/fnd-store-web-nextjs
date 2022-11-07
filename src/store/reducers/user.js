import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: '',
  password: '',
  isAuthenticated: false,
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
        isAuthenticated: true, 
      };
      localStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogin } = userSlice.actions;

export default userSlice.reducer;
