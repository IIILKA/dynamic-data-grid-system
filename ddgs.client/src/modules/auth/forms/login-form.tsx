import { Button, Flex, Input, Text } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Routes } from '../../navigation/routes.ts';
import { LoginFormSchema } from './login-form-schema.ts';

type LoginFormProps = {
  formMethods: UseFormReturn<LoginFormSchema>;
  onSubmit: () => void;
};

export default function LoginForm({
  formMethods: {
    register,
    formState: { errors }
  },
  onSubmit
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Flex direction='column' align='center'>
        <Flex direction='column' align='center' mb={20}>
          <h1 style={{ margin: 0 }}>Log in</h1>
          <Text>
            or <Link to={Routes.Signup}>create account</Link>
          </Text>
        </Flex>
        <Input.Wrapper
          label='Email'
          size='md'
          w='100%'
          mb={10}
          error={errors.email ? errors.email.message : null}>
          <Input {...register('email')} placeholder='Your email adress' />
        </Input.Wrapper>
        <Input.Wrapper
          label='Password'
          size='md'
          w='100%'
          mb={20}
          error={errors.password ? errors.password.message : null}>
          <Input {...register('password')} type='password' placeholder='Your password' />
        </Input.Wrapper>
        <Button fullWidth color='teal' type='submit'>
          Continue
        </Button>
      </Flex>
    </form>
  );
}
