import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { handleLogin } from '../store/reducers/user';

export default function RouterGuard({ children }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();


  useEffect(() => {
    const publicPaths = ['/login', '/404'];
    if (!isAuthenticated && !publicPaths.includes(router.pathname)) {
      const localStorageUser = localStorage.getItem('user');
      if (localStorageUser) {
        const user = JSON.parse(localStorageUser);
        dispatch(handleLogin(user));
      } else {
        router.push('/login', {
          returnPath: router.asPath,
        });
      }
    }
  });

  return (children);
}