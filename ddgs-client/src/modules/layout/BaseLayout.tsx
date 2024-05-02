import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { styled } from 'styled-components';
import { MantineProvider, createTheme } from '@mantine/core';

const StyledContainer = styled.div`
    padding: 0 3rem;
    min-height: 100%;

    display: flex;
    flex-direction: column;

    .content {
        flex: 1 0 auto;
    }
`;

const theme = createTheme({
    fontFamily: 'Roboto, sans-serif'
});

function AppLayout(): ReactElement {
    return (
        <MantineProvider theme={theme} defaultColorScheme='auto'>
            <StyledContainer>
                <Header />
                <div className='content'>
                    <Outlet />
                </div>
                <Footer />
            </StyledContainer>
        </MantineProvider>
    );
}

export function BaseLayout(): ReactElement {
    return <AppLayout />;
}
