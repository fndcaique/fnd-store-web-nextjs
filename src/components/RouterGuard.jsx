import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/user.service';
import { handleLogin } from '../store/reducers/user';
export default function RouterGuard({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();


  useEffect(() => {
    const publicPaths = ['/login', '/404'];
    if (!isAuthenticated && !publicPaths.includes(router.pathname)) {
      const localStorageUser = UserService.getFromLocalStorage();
      if (localStorageUser) {
        dispatch(handleLogin(localStorageUser));
      } else {
        router.push('/login', router.asPath);
      }
    }
  });

  return (children);
}