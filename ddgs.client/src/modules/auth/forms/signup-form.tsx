import { Button, Flex, Input } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { SignupFormSchema } from './signup-form-schema.ts';

type SignupFromProps = {
  formMethods: UseFormReturn<SignupFormSchema>;
  onSubmit: () => void;
};

export default function SignupFrom({
  formMethods: {
    register,
    formState: { errors }
  },
  onSubmit
}: SignupFromProps) {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Flex direction='column' align='center' w='100%'>
        <Input.Wrapper label='Username' size='md' w='100%' mb={10} error={errors.username?.message}>
          <Input {...register('username')} placeholder='Your username' error={!!errors.username} />
        </Input.Wrapper>
        <Input.Wrapper label='Email' size='md' w='100%' mb='10px' error={errors.email?.message}>
          <Input {...register('email')} placeholder='Your email adress' error={!!errors.email} />
        </Input.Wrapper>
        <Input.Wrapper label='Password' size='md' w='100%' mb={10} error={errors.password?.message}>
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
          mb={10}
          error={errors.confirmPassword?.message}>
          <Input
            {...register('confirmPassword')}
            type='password'
            placeholder='Your password'
            error={!!errors.confirmPassword}
          />
        </Input.Wrapper>
        <Button fullWidth color='teal' mt={10} type='submit'>
          Continue
        </Button>
      </Flex>
    </form>
  );
}
