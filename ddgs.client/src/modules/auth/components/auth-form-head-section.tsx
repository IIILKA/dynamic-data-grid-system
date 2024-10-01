// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../../public/ddgs-logo.svg?react';
import { Flex, Text } from '@mantine/core';
import useTheme from '../../core/hooks/theme-hook.ts';

export default function AuthFormHeadSection() {
  const { isDarkTheme } = useTheme();

  return (
    <Flex justify='center' align='center' gap='xs' style={{ cursor: 'pointer' }}>
      <Logo style={{ height: '40px', width: '40px', color: 'teal' }} />
      <Text
        mt={10}
        mb={10}
        fz={28}
        fw={700}
        style={() => {
          isDarkTheme ? { color: 'var(--mantine-color-dark-6)' } : null;
        }}>
        DDGS
      </Text>
    </Flex>
  );
}
