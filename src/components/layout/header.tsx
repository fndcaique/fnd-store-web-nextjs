import styled from 'styled-components';
import colors from './colors';

const { primary, light } = colors;

const HeaderStyled = styled.header`
  background-color: ${primary};
  color: ${light};
  height: 100px;
  padding: 12px;
  font-size: 38px;
  display: flex;
  align-items: center;
`;

export default function Header() {
  return <HeaderStyled>FND Store</HeaderStyled>;
}