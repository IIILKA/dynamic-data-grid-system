import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
    padding: 0 3rem;
    min-height: 100%;

    display: flex;
    flex-direction: column;

    .content {
        flex: 1 0 auto;
    }
`;

function AppLayout(): ReactElement {
    return (
        <StyledContainer>
            <Header />
            <div className='content'>
                <Outlet />
            </div>
            <Footer />
        </StyledContainer>
    );
}

export function BaseLayout(): ReactElement {
    return <AppLayout />;
}
