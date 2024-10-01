import { Center, Loader } from '@mantine/core';
import DataGrid from './components/data-grid.tsx';
import useDataGridPage from './hooks/data-grid-page-hook.ts';

export default function DataGridPage() {
  const {
    dataGrid,
    isDatGridLoading,
    isDataGridSuccess,
    normalizedDataGridRows,
    isDataGridRowsLoading,
    isDataGridRowsSuccess
  } = useDataGridPage();

  return (
    <>
      {isDatGridLoading && isDataGridRowsLoading && (
        <Center>
          <Loader color='teal' />
        </Center>
      )}
      {isDataGridSuccess && isDataGridRowsSuccess && (
        <DataGrid dataGrid={dataGrid} normalizedDataGridRows={normalizedDataGridRows} />
      )}
    </>
  );
}
