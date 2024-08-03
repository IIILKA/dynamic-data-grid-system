import { ReactElement, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Flex, MantineProvider } from '@mantine/core';
import { theme } from '../../theme.ts';
import { getAccessTokenAsync, getUserInfoAsync } from '../auth/AuthService.ts';
import { Routes } from '../navigation/Routes.ts';

export default function LayoutWithRequiredAuth(): ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuth = async () => {
      const accessToken = await getAccessTokenAsync();
      if (!accessToken) {
        navigate(Routes.Unauthorized);
      }

      await getUserInfoAsync();
    };

    validateAuth();
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Flex direction='column' px='48px' py='0px' h='100%yarn '>
        <Header />
        <div style={{ flex: '1 0 auto' }}>
          <Outlet />
        </div>
        <Footer />
      </Flex>
    </MantineProvider>
  );
}
