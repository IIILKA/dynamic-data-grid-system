import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks.ts';
import LoginArgs from '../../api/args/login-args.ts';
import SignupArgs from '../../api/args/signup-args.ts';
import { useLogInMutation, useSignUpMutation } from '../../api/auth-api-slice.ts';
import { selectIsLoading } from '../../loading/loading-slice.ts';
import { signupFormSchema, SignupFormSchema } from '../forms/signup-form-schema.ts';

export default function useSignupPage() {
  //TODO: Разобраться почему при сборке (без ts-ignore) возникает ошибка error TS2339: Property 'isSuccess' does not exist on type 'UseMutationStateResult<MutationDefinition<SignupRequestDto, AppBaseQuery, string, void, "authApi">, SignupRequestDto>'.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [signUpAsync, { isSuccess }] = useSignUpMutation();
  const [logInAsync] = useLogInMutation();
  const isLoading = useAppSelector(selectIsLoading);

  const formMethods = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema)
  });
  const { handleSubmit, getValues } = formMethods;

  useEffect(() => {
    if (isSuccess) {
      logInAsync({
        body: { email: getValues().email, password: getValues().password }
      } satisfies LoginArgs);
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = handleSubmit(async () => {
    await signUpAsync({
      body: {
        username: getValues().username,
        email: getValues().email,
        password: getValues().password
      }
    } satisfies SignupArgs);
  });

  return { isLoading, submitForm, formMethods };
}
