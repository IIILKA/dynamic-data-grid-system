import { ReactElement, useEffect, useRef, useState } from 'react';
import { ActionIcon, useMantineColorScheme, Center, Avatar, Text, Flex } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import HeaderLoader from '../loading/header-loader.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../public/ddgs-logo.svg?react';
import UserWidgetMenu, { UserWidgetMenuRef } from './user-widget-menu.tsx';
import { getUserInfoAsync, UserInfo } from '../auth/auth-service.ts';
import { Routes } from '../navigation/routes.ts';
import { useNavigate } from 'react-router-dom';

export function Header(): ReactElement {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    const loadUserInfo = async () => {
      setUserInfo(await getUserInfoAsync());
    };

    loadUserInfo();
  }, []);

  const menuRef = useRef<UserWidgetMenuRef | null>(null);

  return (
    <Flex justify='space-between' align='center'>
      <Flex justify='center' align='center' gap='xs' style={{ cursor: 'pointer' }}>
        <Logo style={{ height: '48px', width: '48px', color: 'teal' }} />
        <Text
          mt='10px'
          mb='10px'
          fz='36px'
          fw='700'
          style={() => {
            isDarkTheme ? { color: 'var(--mantine-color-dark-6)' } : null;
          }}
          onClick={() => navigate(Routes.Home)}>
          DDGS
        </Text>
      </Flex>
      <div style={{ display: 'flex', gap: '4px' }}>
        <HeaderLoader isDarkTheme={isDarkTheme} />
        <Center>
          <ActionIcon
            variant='subtle'
            size='lg'
            color={isDarkTheme ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'>
            {isDarkTheme ? (
              <IconSunFilled style={{ width: '80%', height: '80%' }} />
            ) : (
              <IconMoonFilled style={{ width: '80%', height: '80%' }} />
            )}
          </ActionIcon>
        </Center>
        <UserWidgetMenu ref={menuRef} userInfo={userInfo!}>
          <Avatar
            src={null}
            name={userInfo?.name}
            color='initials'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              menuRef.current!.setMenu({ isOpened: true });
            }}
          />
        </UserWidgetMenu>
      </div>
    </Flex>
  );
}
