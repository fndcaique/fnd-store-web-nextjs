import { configureStore } from '@reduxjs/toolkit';
import { User } from '../types/user.type';
import UserReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    user: UserReducer
  },
  devTools: true
});

export interface RootState {
  user: User;
}
