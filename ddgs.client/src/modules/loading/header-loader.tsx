import { Center, Loader } from '@mantine/core';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { selectIsLoading } from './loading-slice.ts';
import { useAppSelector } from '../../app/hooks.ts';

const LoaderContainer = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const HeaderLoaderText = styled.p`
  font-size: 12px;
`;

interface HeaderLoaderProps {
  isDarkTheme: boolean;
}

export default function HeaderLoader({ isDarkTheme }: HeaderLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined;
    if (isLoading) {
      setIsVisible(true);
    } else {
      handler = setTimeout(() => setIsVisible(false), 5000);
    }

    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [isLoading]);

  const color = isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';

  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <Center>
            <Loader color={color} size='12' />
          </Center>
          <HeaderLoaderText style={{ color }}>Saving...</HeaderLoaderText>
        </LoaderContainer>
      )}
      {!isLoading && isVisible && (
        <HeaderLoaderText style={{ color }}>All changed saved</HeaderLoaderText>
      )}
    </>
  );
}
