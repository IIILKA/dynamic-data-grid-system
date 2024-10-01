import { Flex, Menu, rem, Text } from '@mantine/core';
import { IconUserFilled, IconLogout } from '@tabler/icons-react';
import { ForwardedRef, forwardRef, ReactElement } from 'react';
import UserInfoModel from '../../auth/models/user-info-model.ts';
import useUserWidgetMenu from '../hooks/user-widget-menu-hook.ts';
import { MenuRef } from '../../core/hooks/menu-hook.ts';

type UserWidgetMenuProps = {
  children: ReactElement;
  userInfo: UserInfoModel;
};

export default forwardRef(function UserWidgetMenu(
  { children, userInfo }: UserWidgetMenuProps,
  ref: ForwardedRef<MenuRef>
) {
  const { isDarkTheme, menu, menuRef, handleLogoutButtonClickAsync } = useUserWidgetMenu({ ref });

  return (
    <Menu opened={menu.isOpened} position='bottom-end'>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown ref={menuRef} w='15%' p='8px'>
        <Menu.Label>
          <Flex direction='column'>
            <Text
              fw={700}
              style={
                isDarkTheme
                  ? { color: 'var(--mantine-color-gray-4)' }
                  : { color: 'var(--mantine-color-dark-6)' }
              }>
              {userInfo?.name}
            </Text>
            <Text
              fz='14'
              style={
                isDarkTheme
                  ? { color: 'var(--mantine-color-gray-4)' }
                  : { color: 'var(--mantine-color-dark-6)' }
              }>
              {userInfo?.email}
            </Text>
          </Flex>
        </Menu.Label>

        <Menu.Divider />

        <Menu.Item leftSection={<IconUserFilled style={{ width: rem(14), height: rem(14) }} />}>
          Profile
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color='red'
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleLogoutButtonClickAsync}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
