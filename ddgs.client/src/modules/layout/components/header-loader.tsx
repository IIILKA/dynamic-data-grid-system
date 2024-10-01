import { Center, Loader, MantineColor } from '@mantine/core';
import { styled } from 'styled-components';
import useHeaderLoader from '../hooks/header-loader-hook.ts';

export default function HeaderLoader() {
  const { isDarkTheme, isVisible, isLoading } = useHeaderLoader();

  const color = isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <Center>
            <Loader color={color as MantineColor} size={12} />
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

const LoaderContainer = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const HeaderLoaderText = styled.p`
  font-size: 12px;
`;
