import {
  Button,
  Card,
  Flex,
  Input,
  Divider,
  Text,
  useMantineColorScheme,
  PasswordInput,
  LoadingOverlay
} from '@mantine/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../public/ddgs-logo.svg?react';
import { Link } from 'react-router-dom';
import { Routes } from '../navigation/Routes.ts';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { logInAsync, logInWithGoogle, sendOAuthRequestAsync } from './AuthService.ts';
import { useDisclosure } from '@mantine/hooks';

export default function LoginPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const [visible, { toggle }] = useDisclosure(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function authenticate() {
    toggle();
    const logInResult = await logInAsync(email, password);
    toggle();
    if (logInResult.ok) {
      await sendOAuthRequestAsync();
    }
  }

  function authenticateWithGoogle() {
    toggle();
    logInWithGoogle();
  }

  return (
    <Flex justify='center' align='center' h='100%'>
      <Card
        shadow='sm'
        padding={0}
        radius='md'
        withBorder
        w='30%'
        style={{ justifySelf: 'center' }}
        pos='relative'>
        <LoadingOverlay visible={visible} overlayProps={{ radius: 'md', blur: 1 }} />
        <Card.Section withBorder>
          <Flex justify='center' align='center' gap='xs' style={{ cursor: 'pointer' }}>
            <Logo style={{ height: '40px', width: '40px', color: 'teal' }} />
            <Text
              mt='10px'
              mb='10px'
              fz='28px'
              fw={700}
              style={() => {
                isDarkTheme ? { color: 'var(--mantine-color-dark-6)' } : null;
              }}>
              DDGS
            </Text>
          </Flex>
        </Card.Section>
        <Card.Section>
          <Flex direction='column' align='center' p='20px' pb='60px'>
            <Flex direction='column' align='center' mb='20px'>
              <h1 style={{ margin: 0 }}>Log in</h1>
              <Text>
                or <Link to={Routes.Signup}>create account</Link>
              </Text>
            </Flex>
            <Input.Wrapper label='Email' size='md' w='100%' mb='10px'>
              <Input
                placeholder='Your email adress'
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Input.Wrapper>
            <Input.Wrapper label='Password' size='md' w='100%' mb='20px'>
              <PasswordInput
                placeholder='Your password'
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Input.Wrapper>
            <Button fullWidth color='teal' onClick={authenticate}>
              Continue
            </Button>
            <Divider my='sm' label='or' labelPosition='center' w='100%' />
            <Button
              leftSection={<IconBrandGoogleFilled size={18} />}
              color='gray'
              fullWidth
              onClick={authenticateWithGoogle}>
              Log in with Google
            </Button>
          </Flex>
        </Card.Section>
      </Card>
    </Flex>
  );
}
