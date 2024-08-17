import { Table, Button } from '@mantine/core';
import TableEntity from '../seed-data/TableEntity';
import DataGridHead from './DataGridHead';
import DataGridBody from './DataGridBody';
import { useCreateTestMutation } from '../api/resource-api-slice.ts';
import { resetObject } from '../../utils/ResetObjectHelper';

interface DataGridProps<T extends TableEntity> {
  sortedIds: string[];
  dataGridRows: { [key: string]: T };
}

export default function DataGrid<T extends TableEntity>({
  sortedIds,
  dataGridRows
}: DataGridProps<T>) {
  const [createRow] = useCreateTestMutation();

  async function handleAddEntityClicked() {
    const resetRow = resetObject({ ...dataGridRows[sortedIds[0]] });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...entityCreatePayload } = resetRow;
    entityCreatePayload.index = sortedIds.length + 1;
    await createRow(entityCreatePayload);
  }

  return (
    <>
      <Table
        highlightOnHover
        withColumnBorders
        withRowBorders
        withTableBorder
        style={{ marginBottom: '0.5rem' }}>
        <DataGridHead propNames={Object.getOwnPropertyNames(dataGridRows[sortedIds[0]])} />
        <DataGridBody sortedIds={sortedIds} dataGridRows={dataGridRows} />
      </Table>
      <Button
        variant='filled'
        color='teal'
        style={{ width: '100%' }}
        onClick={handleAddEntityClicked}>
        Add test
      </Button>
    </>
  );
}
