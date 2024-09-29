import { Flex, MantineProvider } from '@mantine/core';
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { theme } from '../../../theme.ts';
import ErrorNotification from '../../error-handling/components/error-notification.tsx';
import useLayoutWithRequiredAuth from '../hooks/layout-with-required-auth-hook.ts';
import { Footer } from './footer.tsx';
import { Header } from './header.tsx';

export default function LayoutWithRequiredAuth(): ReactElement {
  useLayoutWithRequiredAuth();

  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Flex direction='column' px={48} py={0} mih='100%'>
        <Header />
        <div style={{ flex: '1 0 auto', position: 'relative' }}>
          <Outlet />
          <ErrorNotification />
        </div>
        <Footer />
      </Flex>
    </MantineProvider>
  );
}
