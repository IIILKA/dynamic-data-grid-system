import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notification, Stack } from '@mantine/core';
import { removeError, selectErrors } from '../error-slice.ts';

export default function ErrorNotification(): ReactElement {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);

  function getNotifications() {
    return (
      <Stack pos='absolute' bottom={0} right={0}>
        {errors.map((error) => (
          <Notification
            key={error.id}
            color='red'
            title={error.title}
            onClose={() => dispatch(removeError(error.id))}
            closeButtonProps={{ 'aria-label': 'Hide notification' }}>
            {error.description}
          </Notification>
        ))}
      </Stack>
    );
  }

  return <>{errors && getNotifications()}</>;
}
