import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleOAuthCallbackAsync } from '../auth-service.ts';
import { Routes } from '../../navigation/routes.ts';

export default function OauthCallbackPage() {
  //TODO: remove isProccess logic
  // rerendering the components does not change isProcessed, but remounting the component does change.
  const isProcessed = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function processOAuthResponse() {
      // this is needed, because React.StrictMode makes component to rerender
      // second time the auth code that is in req.url here is invalid,
      // so we want it to execute one time only.
      if (isProcessed.current) {
        return;
      }

      isProcessed.current = true;

      try {
        const currentUrl = window.location.href;
        await handleOAuthCallbackAsync(currentUrl);

        navigate(Routes.Home);
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
      }
    }

    processOAuthResponse();
  });

  return <></>;
}
