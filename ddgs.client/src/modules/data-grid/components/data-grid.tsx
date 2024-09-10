import { Button, Table } from '@mantine/core';
import {
  DataGridColumnDto,
  DataGridColumnType,
  DataGridDto,
  DataGridRowDto,
  useCreateDataGridRowMutation
} from '../../api/resource-api-slice.ts';
import DataGridHead from './data-grid-head.tsx';
import DataGridBody from './data-grid-body.tsx';
import { DataGridCellType } from '../../seed-data/data-grid-cell-type.ts';

interface DataGridProps {
  dataGrid: DataGridDto;
  sortedIds: string[];
  dataGridRows: { [key: string]: DataGridRowDto };
}

export default function DataGrid({ dataGrid, sortedIds, dataGridRows }: DataGridProps) {
  const [createDataGridRow] = useCreateDataGridRowMutation();

  async function handleAddEntityClicked() {
    const defaultRow = createDefaultRow(dataGrid.columns);
    await createDataGridRow({ dataGridId: dataGrid.id, payload: defaultRow });
  }

  return (
    <>
      <Table
        highlightOnHover
        withColumnBorders
        withRowBorders
        withTableBorder
        style={{ marginBottom: '0.5rem' }}>
        <DataGridHead
          propNames={[...dataGrid.columns]
            .sort((a, b) => a.index - b.index)
            .map(({ name }) => name)}
        />
        <DataGridBody dataGrid={dataGrid} sortedIds={sortedIds} dataGridRows={dataGridRows} />
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

function createDefaultRow(columns: DataGridColumnDto[]): { [key: string]: DataGridCellType } {
  const defaultRow: { [key: string]: DataGridCellType } = {};

  columns.forEach((column) => {
    switch (column.type) {
      case DataGridColumnType.Text:
        defaultRow[column.name] = '';
        break;
      case DataGridColumnType.Number:
        defaultRow[column.name] = 0;
        break;
      case DataGridColumnType.Boolean:
        defaultRow[column.name] = false;
        break;
    }
  });

  return defaultRow;
}
