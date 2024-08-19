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
import Logo from '../../../../public/ddgs-logo.svg?react';
import { Link } from 'react-router-dom';
import { Routes } from '../../navigation/routes.ts';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { logInWithExternalProvider } from '../auth-service.ts';
import { useEffect } from 'react';
import { AuthProvider } from '../auth-provider.ts';
import { useLogInMutation, useSignUpMutation } from '../../api/auth-api-slice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema, SignupFormSchema } from '../forms/signup-form-schema.ts';
import { selectIsLoading } from '../../loading/loading-slice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import LoginRequestDto from '../../api/dto/login-request-dto.ts';
import SignupRequestDto from '../../api/dto/signup-request-dto.ts';

export default function SignupPage() {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  //TODO: Разобраться почему при сборке (без ts-ignore) возникает ошибка error TS2339: Property 'isSuccess' does not exist on type 'UseMutationStateResult<MutationDefinition<SignupRequestDto, AppBaseQuery, string, void, "authApi">, SignupRequestDto>'.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [signUpAsync, { isSuccess }] = useSignUpMutation<SignupRequestDto>();
  const [logInAsync] = useLogInMutation<LoginRequestDto>();
  const isLoading = useAppSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignupFormSchema>({ resolver: zodResolver(signupFormSchema) });

  const onSubmit: SubmitHandler<SignupFormSchema> = async (data) => {
    await signUpAsync({ username: data.username, email: data.email, password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      logInAsync({ email: getValues().email, password: getValues().password });
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex justify='center' align='center' h='100%'>
      <Card shadow='sm' padding={0} radius='md' withBorder w='30%'>
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
            <Flex direction='column' align='center' p='20px' pb='40px' pt='0'>
              <h1>Create your account</h1>
              <Input.Wrapper
                label='Username'
                size='md'
                w='100%'
                mb='10px'
                error={errors.username?.message}>
                <Input
                  {...register('username')}
                  placeholder='Your username'
                  error={!!errors.username}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label='Email'
                size='md'
                w='100%'
                mb='10px'
                error={errors.email?.message}>
                <Input
                  {...register('email')}
                  placeholder='Your email adress'
                  error={!!errors.email}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label='Password'
                size='md'
                w='100%'
                mb='10px'
                error={errors.password?.message}>
                <Input
                  {...register('password')}
                  type='password'
                  placeholder='Your password'
                  error={!!errors.password}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label='Confirm password'
                size='md'
                w='100%'
                mb='10px'
                error={errors.confirmPassword?.message}>
                <Input
                  {...register('confirmPassword')}
                  type='password'
                  placeholder='Your password'
                  error={!!errors.confirmPassword}
                />
              </Input.Wrapper>
              <Button fullWidth color='teal' mt='10px' type='submit'>
                Continue
              </Button>
              <Divider my='sm' label='or' labelPosition='center' w='100%' />
              <Button
                leftSection={<IconBrandGoogleFilled size={18} />}
                color='gray'
                fullWidth
                onClick={() => logInWithExternalProvider(AuthProvider.Google)}>
                Continue with Google
              </Button>
              <Text size='14px' mt='40px'>
                Already have an account? <Link to={Routes.Login}>Log in</Link>
              </Text>
            </Flex>
          </form>
        </Card.Section>
      </Card>
    </Flex>
  );
}
