import { ForwardedRef } from 'react';
import { logoutAsync } from '../../auth/auth-service.ts';
import { MenuRef, useMenu } from '../../core/hooks/menu-hook.ts';
import useTheme from '../../core/hooks/theme-hook.ts';

type UserWidgetMenuHookProps = {
  ref: ForwardedRef<MenuRef>;
};

export default function useUserWidgetMenu({ ref }: UserWidgetMenuHookProps) {
  const { isDarkTheme } = useTheme();
  const { menu, menuRef } = useMenu(ref);

  const handleLogoutButtonClickAsync = async () => {
    await logoutAsync();
  };

  return { isDarkTheme, menu, menuRef, handleLogoutButtonClickAsync };
}
