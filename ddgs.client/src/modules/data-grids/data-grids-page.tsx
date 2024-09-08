import { useGetDataGridsQuery } from '../api/resource-api-slice.ts';
import { Button, Center, Flex, Loader, Stack, Text, useMantineColorScheme } from '@mantine/core';
import DataGridsItem from './components/data-grids-item.tsx';
import { styled } from 'styled-components';
import { useDisclosure } from '@mantine/hooks';
import DataGridsCreateModal from './components/data-grids-create-modal.tsx';
import DataGridsOwners from './components/data-grids-owners.tsx';

export default function DataGridsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: dataGrids, isLoading, isSuccess } = useGetDataGridsQuery();

  return (
    <>
      {isLoading && (
        <>
          <PageTitle title={'Data grids'} />
          <Center>
            <Loader color='teal' />
          </Center>
        </>
      )}
      {isSuccess && (
        <>
          <DataGridsCreateModal opened={opened} onClose={close} />
          <Flex gap='32px'>
            <Stack flex='1 0 auto' maw='calc(85% - 32px)'>
              <PageTitle title={'Data grids'} />
              {dataGrids.length > 0 ? (
                <DataGridContainer>
                  {dataGrids.map((dataGrid) => (
                    <div key={dataGrid.id} className='data-grid-item'>
                      <DataGridsItem dataGridId={dataGrid.id} />
                    </div>
                  ))}
                </DataGridContainer>
              ) : (
                <Text>No data grids yet</Text>
              )}
            </Stack>
            <Stack flex='0 0 15%'>
              <Button fullWidth color='teal' onClick={open}>
                Create data grid
              </Button>
              <DataGridsOwners />
            </Stack>
          </Flex>
        </>
      )}
    </>
  );
}

const PageTitle = ({ title }: { title: string }) => {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <h1 style={{ margin: 0 }}>
      <Text
        fz={24}
        fw={700}
        style={() => {
          isDarkTheme ? { color: 'var(--mantine-color-dark-6)' } : null;
        }}>
        {title}
      </Text>
    </h1>
  );
};

const DataGridContainer = styled.div`
  --gap: 8px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: var(--gap);

  .data-grid-item {
    width: calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)));
  }

  @media (min-width: 1700px) {
    --columns: 4;
  }

  @media (max-width: 1699px) {
    --columns: 3;
  }

  @media (max-width: 1300px) {
    --columns: 2;
  }

  @media (max-width: 950px) {
    --columns: 1;
  }
`;
