import { Button, Center, Flex, Loader, Stack, Text } from '@mantine/core';
import { styled } from 'styled-components';
import useTheme from '../core/hooks/theme-hook.ts';
import DataGridsCreateModal from './components/data-grids-create-modal.tsx';
import DataGridsItem from './components/data-grids-item.tsx';
import DataGridsOwners from './components/data-grids-owners.tsx';
import useDataGridsPage from './hooks/data-grids-page-hook.ts';

export default function DataGridsPage() {
  const {
    modalOpened,
    handleCreateDataGridButtonClick,
    handleModalClose,
    dataGridItems,
    isLoading,
    isSuccess
  } = useDataGridsPage();

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
          <DataGridsCreateModal opened={modalOpened} onClose={handleModalClose} />
          <Flex gap={32}>
            <Stack flex='1 0 auto' maw='calc(85% - 32px)'>
              <PageTitle title={'Data grids'} />
              {dataGridItems.length > 0 ? (
                <DataGridContainer>
                  {dataGridItems.map((dataGridItem) => (
                    <div key={dataGridItem.id} className='data-grid-item'>
                      <DataGridsItem lightDataGrid={dataGridItem} />
                    </div>
                  ))}
                </DataGridContainer>
              ) : (
                <Text>No data grids yet</Text>
              )}
            </Stack>
            <Stack flex='0 0 15%'>
              <Button fullWidth color='teal' onClick={handleCreateDataGridButtonClick}>
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

function PageTitle({ title }: { title: string }) {
  const { isDarkTheme } = useTheme();

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
}

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
