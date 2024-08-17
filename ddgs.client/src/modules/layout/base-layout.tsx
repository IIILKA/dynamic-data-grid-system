import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, MantineProvider } from '@mantine/core';
import { theme } from '../../theme.ts';
import ErrorNotification from '../error-handling/components/error-notification.tsx';

export default function BaseLayout(): ReactElement {
  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Flex direction='column' px='24px' py='24px' mih='100%'>
        <div style={{ flex: '1 0 auto', position: 'relative' }}>
          <Outlet />
          <ErrorNotification />
        </div>
      </Flex>
    </MantineProvider>
  );
}
