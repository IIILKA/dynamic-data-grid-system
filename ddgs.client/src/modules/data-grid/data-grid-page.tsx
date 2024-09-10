import { useParams } from 'react-router-dom';
import { useGetDataGridQuery, useGetDataGridRowsQuery } from '../api/resource-api-slice.ts';
import { Center, Loader } from '@mantine/core';
import DataGrid from './components/data-grid.tsx';

export default function DataGridPage() {
  const { id } = useParams();

  const {
    data: dataGrid,
    isLoading: isDatGridLoading,
    isSuccess: isDataGridSuccess
  } = useGetDataGridQuery(id)!;
  const {
    data: normalizedDataGridRows,
    isLoading: isDataGridRowsLoading,
    isSuccess: isDataGridRowsSuccess
  } = useGetDataGridRowsQuery(id)!;

  return (
    <>
      {isDatGridLoading && isDataGridRowsLoading && (
        <Center>
          <Loader color='teal' />
        </Center>
      )}
      {isDataGridSuccess && isDataGridRowsSuccess && (
        <DataGrid
          dataGrid={dataGrid!}
          sortedIds={normalizedDataGridRows.ids}
          dataGridRows={normalizedDataGridRows.entities}
        />
      )}
    </>
  );
}
