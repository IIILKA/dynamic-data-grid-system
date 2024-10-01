import { Button } from '@mantine/core';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { AuthProvider } from '../auth-provider.ts';
import { logInWithExternalProvider } from '../auth-service.ts';

export default function LoginWithGoogleButton() {
  return (
    <Button
      leftSection={<IconBrandGoogleFilled size={18} />}
      color='gray'
      fullWidth
      onClick={() => logInWithExternalProvider(AuthProvider.Google)}>
      Log in with Google
    </Button>
  );
}
