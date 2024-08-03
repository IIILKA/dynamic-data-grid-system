import { useNavigate } from 'react-router-dom';
import { Button, Card, Divider, Flex, Text } from '@mantine/core';

interface ErrorPageProps {
  httpCode: number;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function ErrorPage({
  httpCode,
  title,
  description,
  buttonText,
  buttonHref
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <Flex direction='column' justify='center' align='center' h='100%'>
      <Card
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
        w='40%'
        style={{ justifySelf: 'center' }}>
        <Flex direction='column' align='center' p='48px'>
          <Text fz='160px' fw={900} lh={1} mb={28}>
            {httpCode}
          </Text>
          <Text fz='20px' fw={600} lh={1} mb={16}>
            {title}
          </Text>
          <Divider my='sm' labelPosition='center' w='100%' />
          <Text fz='16px' mb={16} ta='center'>
            {description}
          </Text>
          <Button mt={16} color='teal' onClick={() => navigate(buttonHref)}>
            {buttonText}
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
