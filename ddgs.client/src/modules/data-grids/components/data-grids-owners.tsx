import { Avatar, Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getUserInfoAsync, UserInfo } from '../../auth/auth-service.ts';

export default function DataGridsOwners() {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    const loadUserInfo = async () => {
      setUserInfo(await getUserInfoAsync());
    };

    loadUserInfo();
  }, []);

  return (
    <Stack gap='xs'>
      <Text fw={700} fz='lg'>
        Owners
      </Text>
      <Stack gap='xs'>
        <Flex direction='row' align='center' gap={8} style={{ cursor: 'pointer' }}>
          <Avatar src={null} name={userInfo?.name} color='initials' />
          <Text>{userInfo?.name}</Text>
        </Flex>
      </Stack>
    </Stack>
  );
}
