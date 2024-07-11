import { ReactElement, useRef } from 'react';
import { ActionIcon, useMantineColorScheme, Center, Avatar, Text, Flex } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import DataGridLoader from '../data-grid/DataGridLoader';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../public/ddgs-logo.svg?react';
import UserWidgetMenu, { UserWidgetMenuRef } from './UserWidgetMenu.tsx';

export function Header(): ReactElement {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const username = 'IIILKA';

  //TODO: Fix
  const menuRef = useRef<UserWidgetMenuRef>(null);

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
          }}>
          DDGS
        </Text>
      </Flex>
      <div style={{ display: 'flex', gap: '4px' }}>
        <DataGridLoader isDarkTheme={isDarkTheme} />
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
        <UserWidgetMenu ref={menuRef}>
          <Avatar
            src={null}
            name={username}
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
