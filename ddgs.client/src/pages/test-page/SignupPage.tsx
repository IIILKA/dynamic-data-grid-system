import {
  Button,
  Card,
  Flex,
  Input,
  Divider,
  Text,
  useMantineColorScheme,
  PasswordInput
} from '@mantine/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../public/ddgs-logo.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from '../../modules/navigation/Routes.ts';
import { IconBrandGoogleFilled } from '@tabler/icons-react';

export default function SignupPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const navigate = useNavigate();

  return (
    <Flex justify='center' align='center' h='100%'>
      <Card shadow='sm' padding='lg' radius='md' withBorder w='30%'>
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
          <Flex direction='column' align='center' p='20px' pb='40px' pt='0'>
            <h1>Create your account</h1>
            <Input.Wrapper label='Username' size='md' w='100%' mb='10px'>
              <Input placeholder='Your username' />
            </Input.Wrapper>
            <Input.Wrapper label='Email' size='md' w='100%' mb='10px'>
              <Input placeholder='Your email adress' />
            </Input.Wrapper>
            <Input.Wrapper label='Password' size='md' w='100%' mb='10px'>
              <PasswordInput placeholder='Your password' />
            </Input.Wrapper>
            <Input.Wrapper label='Confirm password' size='md' w='100%' mb='10px'>
              <PasswordInput placeholder='Your password' />
            </Input.Wrapper>
            <Button
              fullWidth
              color='teal'
              mt='10px'
              onClick={() => {
                navigate(Routes.Test);
              }}>
              Continue
            </Button>
            <Divider my='sm' label='or' labelPosition='center' w='100%' />
            <Button leftSection={<IconBrandGoogleFilled size={18} />} color='gray' fullWidth>
              Log in with Google
            </Button>
            <Text size='14px' mt='40px'>
              Already have an account? <Link to={Routes.Login}>Log in</Link>
            </Text>
          </Flex>
        </Card.Section>
      </Card>
    </Flex>
  );
}
