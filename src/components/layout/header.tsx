import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { handleLogout } from '../../store/reducers/user';
import Container from './container';

export default function Header() {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.user.isAuthenticated
  );

  const dispatch = useDispatch();

  return (
    <header className='h-[100px] bg-primary text-dark'>
      <Container className='h-full flex items-center justify-between'>
        <h1 className='text-4xl'>
          <Link href='/'>FND Store</Link>
        </h1>
        <div>
          {isAuthenticated ? (
            <Link href='/login' onClick={() => dispatch(handleLogout())}>
              Sair
            </Link>
          ) : (
            <Link href='/login'>Entrar</Link>
          )}
        </div>
      </Container>
    </header>
  );
}
