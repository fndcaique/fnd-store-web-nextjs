import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { handleLogout } from '../../store/reducers/user';
import colors from '../../styles/colors';
import Container from './container';

const { primary, light } = colors;

const HeaderStyled = styled.header`
  background-color: ${primary};
  color: ${light};
  height: 100px;
  padding: 12px;

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .app-title {
    font-size: 38px;
  }
`;

export default function Header() {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.user.isAuthenticated,
  );

  const dispatch = useDispatch();

  return (
    <HeaderStyled>
      <Container>
        <div className="app-title">
          <Link href="/">FND Store</Link>
        </div>
        <div>{ isAuthenticated ? <Link href="/login" onClick={ () => dispatch(handleLogout()) }>Sair</Link> : <Link href="/login">Entrar</Link> }</div>
      </Container>
    </HeaderStyled>
  );
}