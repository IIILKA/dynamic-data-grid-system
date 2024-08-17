import {
  Button,
  Card,
  Divider,
  Flex,
  Input,
  LoadingOverlay,
  Text,
  useMantineColorScheme
} from '@mantine/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../public/ddgs-logo.svg?react';
import { Link } from 'react-router-dom';
import { Routes } from '../navigation/Routes.ts';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { logInWithExternalProvider } from './AuthService.ts';
import { useSelector } from 'react-redux';
import { AuthProvider } from './auth-provider.ts';
import { useLazyLogInQuery } from '../api/auth-api-slice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormSchema } from './login-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectIsLoading } from '../loading/loading-slice.ts';

export default function LoginPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const [logInAsync] = useLazyLogInQuery();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    await logInAsync({ email: data.email, password: data.password });
  };

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
        <LoadingOverlay visible={isLoading} overlayProps={{ radius: 'md', blur: 1 }} />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='column' align='center' p='20px' pb='60px'>
              <Flex direction='column' align='center' mb='20px'>
                <h1 style={{ margin: 0 }}>Log in</h1>
                <Text>
                  or <Link to={Routes.Signup}>create account</Link>
                </Text>
              </Flex>
              <Input.Wrapper
                label='Email'
                size='md'
                w='100%'
                mb='10px'
                error={errors.email ? errors.email.message : null}>
                <Input {...register('email')} placeholder='Your email adress' />
              </Input.Wrapper>
              <Input.Wrapper
                label='Password'
                size='md'
                w='100%'
                mb='20px'
                error={errors.password ? errors.password.message : null}>
                <Input {...register('password')} type='password' placeholder='Your password' />
              </Input.Wrapper>
              <Button fullWidth color='teal' type='submit'>
                Continue
              </Button>
              <Divider my='sm' label='or' labelPosition='center' w='100%' />
              <Button
                leftSection={<IconBrandGoogleFilled size={18} />}
                color='gray'
                fullWidth
                onClick={() => logInWithExternalProvider(AuthProvider.Google)}>
                Log in with Google
              </Button>
            </Flex>
          </form>
        </Card.Section>
      </Card>
    </Flex>
  );
}
