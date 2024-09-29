import { Table } from '@mantine/core';
import { useDataGridHead } from '../hooks/data-grid-head-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DataGridHeadCell from './data-grid-head-cell.tsx';

type DataGridHeadProps = {
  dataGrid: DataGridModel;
};

export default function DataGridHead({ dataGrid }: DataGridHeadProps) {
  const { sortedCells } = useDataGridHead({ dataGrid });

  return (
    <Table.Thead>
      <Table.Tr bg={'var(--mantine-color-default-hover)'}>
        {sortedCells.map((column) => (
          <DataGridHeadCell key={column.name} dataGrid={dataGrid} dataGridColumn={column} />
        ))}
      </Table.Tr>
    </Table.Thead>
  );
}
