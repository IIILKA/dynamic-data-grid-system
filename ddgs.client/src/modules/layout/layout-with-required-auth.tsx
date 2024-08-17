import { ReactElement, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './footer.tsx';
import { Header } from './header.tsx';
import { getAccessTokenAsync, getUserInfoAsync } from '../auth/auth-service.ts';
import { Routes } from '../navigation/routes.ts';
import { theme } from '../../theme.ts';
import { Flex, MantineProvider } from '@mantine/core';
import ErrorNotification from '../error-handling/components/error-notification.tsx';

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
      <Flex direction='column' px='48px' py='0px' mih='100%'>
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
