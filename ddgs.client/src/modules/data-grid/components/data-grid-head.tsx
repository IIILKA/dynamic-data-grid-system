import { Table } from '@mantine/core';
import { DataGridDto } from '../../api/resource-api-slice.ts';
import DataGridHeadCell from './data-grid-head-cell.tsx';

interface DataGridHeadProps {
  dataGrid: DataGridDto;
}

export default function DataGridHead({ dataGrid }: DataGridHeadProps) {
  const sortedColumns = [...dataGrid.columns].sort((a, b) => a.index - b.index);

  return (
    <Table.Thead>
      <Table.Tr bg={'var(--mantine-color-default-hover)'}>
        {sortedColumns.map((column) => (
          <DataGridHeadCell key={column.name} dataGrid={dataGrid} dataGridColumn={column} />
        ))}
      </Table.Tr>
    </Table.Thead>
  );
}
