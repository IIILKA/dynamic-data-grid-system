import { ReactElement } from 'react';
import { styled } from 'styled-components';

const StyledLogo = styled.h1`
    font-size: 22px;
`;
export function Header(): ReactElement {
    return <StyledLogo>DDGS</StyledLogo>;
}
