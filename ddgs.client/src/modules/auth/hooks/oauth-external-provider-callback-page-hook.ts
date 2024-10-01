import { useEffect } from 'react';
import { sendOAuthRequestAsync } from '../auth-service.ts';

export default function useOauthExternalProviderCallbackPage() {
  useEffect(() => {
    sendOAuthRequestAsync();
  });
}
