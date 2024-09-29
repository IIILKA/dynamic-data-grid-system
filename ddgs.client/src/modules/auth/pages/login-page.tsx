import { Card, Divider, Flex, LoadingOverlay } from '@mantine/core';
import AuthFormHeadSection from '../components/auth-form-head-section.tsx';
import LoginWithGoogleButton from '../components/login-with-google-button.tsx';
import LoginForm from '../forms/login-form.tsx';
import useLoginPage from '../hooks/login-page-hook.ts';

export default function LoginPage() {
  const { isLoading, submitForm, formMethods } = useLoginPage();

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
          <AuthFormHeadSection />
        </Card.Section>
        <Card.Section>
          <Flex direction='column' align='center' p={20} pb={60}>
            <LoginForm formMethods={formMethods} onSubmit={submitForm} />
            <Divider my='sm' label='or' labelPosition='center' w='100%' />
            <LoginWithGoogleButton />
          </Flex>
        </Card.Section>
      </Card>
    </Flex>
  );
}
