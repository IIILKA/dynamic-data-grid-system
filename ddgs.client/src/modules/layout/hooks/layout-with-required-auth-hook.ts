import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenAsync, getUserInfoAsync } from '../../auth/auth-service.ts';
import { Routes } from '../../navigation/routes.ts';

export default function useLayoutWithRequiredAuth() {
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
}
