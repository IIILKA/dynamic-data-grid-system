import { Table, Button } from '@mantine/core';
import OldTableEntity from '../../seed-data/old-table-entity.ts';
import OldDataGridHead from './old-data-grid-head.tsx';
import OldDataGridBody from './old-data-grid-body.tsx';
import { useCreateTestMutation } from '../../api/resource-api-slice.ts';
import { resetObject } from '../../../utils/reset-object-helper.ts';

interface DataGridProps<T extends OldTableEntity> {
  sortedIds: string[];
  dataGridRows: { [key: string]: T };
}

export default function OldDataGrid<T extends OldTableEntity>({
  sortedIds,
  dataGridRows
}: DataGridProps<T>) {
  const [createRow] = useCreateTestMutation();

  async function handleAddEntityClicked() {
    const resetRow = resetObject({ ...dataGridRows[sortedIds[0]] });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...entityCreatePayload } = resetRow;
    //TODO: fix
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
        <OldDataGridHead propNames={Object.getOwnPropertyNames(dataGridRows[sortedIds[0]])} />
        <OldDataGridBody sortedIds={sortedIds} dataGridRows={dataGridRows} />
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
