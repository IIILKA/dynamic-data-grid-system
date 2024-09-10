import OldDataGrid from './components/old-data-grid.tsx';
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
        <OldDataGrid sortedIds={normalizedTests.ids} dataGridRows={normalizedTests.entities} />
      )}
    </>
  );
}
