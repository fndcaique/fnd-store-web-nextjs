import styled from 'styled-components';

const ContainerStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px;
`;

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function Container({ className = 'container', children }: Props) {
  return <ContainerStyled className={className}>{children}</ContainerStyled>;
}
