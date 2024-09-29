import { ActionIcon, Avatar, Center, Flex, Text } from '@mantine/core';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { ReactElement } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../../public/ddgs-logo.svg?react';
import { useHeader } from '../hooks/header-hook.ts';
import HeaderLoader from './header-loader.tsx';
import UserWidgetMenu from './user-widget-menu.tsx';

export function Header(): ReactElement {
  const { isDarkTheme, menuRef, userInfo, handleLogoClick, handleThemeClick, handleAvatarClick } =
    useHeader();

  return (
    <Flex justify='space-between' align='center'>
      <Flex justify='center' align='center' gap='xs' style={{ cursor: 'pointer' }}>
        <Logo style={{ height: '48px', width: '48px', color: 'teal' }} />
        <Text
          mt={10}
          mb={10}
          fz={36}
          fw={700}
          style={() => {
            isDarkTheme ? { color: 'var(--mantine-color-dark-6)' } : null;
          }}
          onClick={handleLogoClick}>
          DDGS
        </Text>
      </Flex>
      <Flex gap={4}>
        <HeaderLoader isDarkTheme={isDarkTheme} />
        <Center>
          <ActionIcon
            variant='subtle'
            size='lg'
            color={isDarkTheme ? 'yellow' : 'blue'}
            onClick={handleThemeClick}
            title='Toggle color scheme'>
            {isDarkTheme ? <IconSunFilled w='80%' h='80%' /> : <IconMoonFilled w='80%' h='80%' />}
          </ActionIcon>
        </Center>
        <UserWidgetMenu ref={menuRef} userInfo={userInfo!}>
          <Avatar
            src={null}
            name={userInfo?.name}
            color='initials'
            style={{ cursor: 'pointer' }}
            onClick={handleAvatarClick}
          />
        </UserWidgetMenu>
      </Flex>
    </Flex>
  );
}
