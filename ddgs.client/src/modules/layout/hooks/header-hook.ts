import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfoAsync } from '../../auth/auth-service.ts';
import UserInfoModel from '../../auth/models/user-info-model.ts';
import { MenuRef } from '../../core/hooks/menu-hook.ts';
import useTheme from '../../core/hooks/theme-hook.ts';
import { Routes } from '../../navigation/routes.ts';

export function useHeader() {
  const { isDarkTheme, toggleColorScheme } = useTheme();
  const menuRef = useRef<MenuRef | null>(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoModel>();

  useEffect(() => {
    const loadUserInfo = async () => {
      setUserInfo(await getUserInfoAsync());
    };

    loadUserInfo();
  }, []);

  const handleLogoClick = () => {
    return navigate(Routes.Home);
  };

  const handleThemeClick = () => {
    toggleColorScheme();
  };

  const handleAvatarClick = () => {
    menuRef.current!.setMenu({ isOpened: true });
  };

  return { isDarkTheme, menuRef, userInfo, handleLogoClick, handleThemeClick, handleAvatarClick };
}
