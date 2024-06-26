import { Center, Loader } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

const LoaderContainer = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const DataGridLoaderText = styled.p`
  font-size: 12px;
`;

interface DataGridLoaderProps {
  isDarkTheme: boolean;
}

export default function DataGridLoader({ isDarkTheme }: DataGridLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fetchingQueriesCount = useSelector(
    (state: RootState) => state.dataGrid.fetchingQueriesCount
  );

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined;
    if (fetchingQueriesCount === 0) {
      handler = setTimeout(() => setIsVisible(false), 5000);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };
  }, [fetchingQueriesCount]);

  const color = isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';

  return (
    <>
      {fetchingQueriesCount > 0 && (
        <LoaderContainer>
          <Center>
            <Loader color={color} size='12' />
          </Center>
          <DataGridLoaderText style={{ color }}>Saving...</DataGridLoaderText>
        </LoaderContainer>
      )}
      {fetchingQueriesCount === 0 && isVisible && (
        <DataGridLoaderText style={{ color }}>All changed saved</DataGridLoaderText>
      )}
    </>
  );
}
