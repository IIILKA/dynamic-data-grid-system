import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks.ts';
import LoginArgs from '../../api/args/login-args.ts';
import { useLogInMutation } from '../../api/auth-api-slice.ts';
import { selectIsLoading } from '../../loading/loading-slice.ts';
import { AuthProvider } from '../auth-provider.ts';
import { logInWithExternalProvider } from '../auth-service.ts';
import { loginFormSchema, LoginFormSchema } from '../forms/login-form-schema.ts';

export default function useLoginPage() {
  const [logInAsync] = useLogInMutation();
  const isLoading = useAppSelector(selectIsLoading);

  const formMethods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  });
  const { handleSubmit, getValues } = formMethods;

  const submitForm = handleSubmit(async () => {
    await logInAsync({
      body: { email: getValues().email, password: getValues().password }
    } satisfies LoginArgs);
  });

  const handleLoginWithGoogleClick = () => {
    logInWithExternalProvider(AuthProvider.Google);
  };

  return { isLoading, submitForm, formMethods, handleLoginWithGoogleClick };
}
