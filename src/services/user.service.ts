import { User } from '../types/user.type';

const USER_DATA_KEY = '_user_data';

export default class UserService {
  static saveOnLocalStorage(user: User) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }

  static removeFromLocalStorage() {
    localStorage.removeItem(USER_DATA_KEY);
  }

  static getFromLocalStorage() {
    const userStringData = localStorage.getItem(USER_DATA_KEY);
    if (!userStringData) {
      return null;
    }
    return JSON.parse(userStringData);
  }
}