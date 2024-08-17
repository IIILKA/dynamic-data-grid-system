import { Flex, Menu, rem, Text, useMantineColorScheme } from '@mantine/core';
import { IconUserFilled, IconLogout } from '@tabler/icons-react';
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  SetStateAction,
  useImperativeHandle,
  useState
} from 'react';
import { useClickOutside } from '@mantine/hooks';
import { logoutAsync, UserInfo } from '../auth/auth-service.ts';

interface UserWidgetMenuProps {
  children: ReactElement;
  userInfo: UserInfo;
}

interface MenuProps {
  isOpened: boolean;
}

export interface UserWidgetMenuRef {
  setMenu(value: SetStateAction<MenuProps>): void;
}

export default forwardRef(function UserWidgetMenu(
  { children, userInfo }: UserWidgetMenuProps,
  ref: ForwardedRef<UserWidgetMenuRef>
) {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const [menu, setMenu] = useState<MenuProps>({
    isOpened: false
  });

  useImperativeHandle<UserWidgetMenuRef, UserWidgetMenuRef>(ref, () => ({ setMenu }));

  const menuRef = useClickOutside(() => setMenu({ isOpened: false }));

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
          onClick={async () => await logoutAsync()}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
