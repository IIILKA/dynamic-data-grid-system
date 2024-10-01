import { Notification, Stack } from '@mantine/core';
import { ReactElement } from 'react';
import useErrorNotification from '../hooks/error-notification-hook.ts';

export default function ErrorNotification(): ReactElement {
  const { errors, handleClose } = useErrorNotification();

  function getNotifications() {
    return (
      <Stack pos='absolute' bottom={0} right={0}>
        {errors.map((error) => (
          <Notification
            key={error.id}
            color='red'
            title={error.title}
            onClose={() => handleClose(error.id)}
            closeButtonProps={{ 'aria-label': 'Hide notification' }}>
            {error.description}
          </Notification>
        ))}
      </Stack>
    );
  }

  return <>{errors && getNotifications()}</>;
}
