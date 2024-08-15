import DataGrid from '../modules/data-grid/DataGrid.tsx';
import { useGetTestsQuery } from '../modules/api/apiSlice.ts';
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
