import DataGrid from './components/data-grid.tsx';
import { useGetTestsQuery } from '../api/resource-api-slice.ts';
import { Center, Loader } from '@mantine/core';

export default function TestPage() {
  const { data: normalizedTests, isLoading, isSuccess } = useGetTestsQuery();

  return (
    <>
      {isLoading && (
        <Center>
          <Loader color='teal' />
        </Center>
      )}
      {isSuccess && (
        <DataGrid sortedIds={normalizedTests.ids} dataGridRows={normalizedTests.entities} />
      )}
    </>
  );
}
