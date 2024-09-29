import { Card, Divider, Flex, LoadingOverlay, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Routes } from '../../navigation/routes.ts';
import AuthFormHeadSection from '../components/auth-form-head-section.tsx';
import LoginWithGoogleButton from '../components/login-with-google-button.tsx';
import SignupFrom from '../forms/signup-form.tsx';
import useSignupPage from '../hooks/signup-page-hook.ts';

export default function SignupPage() {
  const { isLoading, submitForm, formMethods } = useSignupPage();

  return (
    <Flex justify='center' align='center' h='100%'>
      <Card shadow='sm' padding={0} radius='md' withBorder w='30%'>
        <LoadingOverlay visible={isLoading} overlayProps={{ radius: 'md', blur: 1 }} />
        <Card.Section withBorder>
          <AuthFormHeadSection />
        </Card.Section>
        <Card.Section>
          <Flex direction='column' align='center' p={20} pb={40} pt={0}>
            <h1>Create your account</h1>
            <SignupFrom formMethods={formMethods} onSubmit={submitForm} />
            <Divider my='sm' label='or' labelPosition='center' w='100%' />
            <LoginWithGoogleButton />
            <Text size='14px' mt={40}>
              Already have an account? <Link to={Routes.Login}>Log in</Link>
            </Text>
          </Flex>
        </Card.Section>
      </Card>
    </Flex>
  );
}
