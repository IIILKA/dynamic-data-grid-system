import { useEffect } from 'react';
import { sendOAuthRequestAsync } from './AuthService.ts';

export default function OAuthExternalProviderCallbackPage() {
  useEffect(() => {
    sendOAuthRequestAsync();
  });
}
