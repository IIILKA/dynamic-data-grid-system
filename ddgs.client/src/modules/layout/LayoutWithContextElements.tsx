import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Flex, MantineProvider } from '@mantine/core';
import { theme } from '../../theme.ts';

export default function LayoutWithContextElements(): ReactElement {
  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Flex direction='column' px='48px' py='0px' h='100%'>
        <Header />
        <div style={{ flex: '1 0 auto' }}>
          <Outlet />
        </div>
        <Footer />
      </Flex>
    </MantineProvider>
  );
}
