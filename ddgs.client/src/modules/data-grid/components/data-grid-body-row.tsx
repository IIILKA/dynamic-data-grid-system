import { Table } from '@mantine/core';
import { useDataGridBodyRow } from '../hooks/data-grid-body-row-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DataGridRowModel from '../models/data-grid-row-model.ts';
import DataGridBodyCell from './data-grid-body-cell.tsx';

type DadaGridBodyRowProps = {
  dataGrid: DataGridModel;
  dataGridRow: DataGridRowModel;
  sortedColumnNames: string[];
};

export default function DadaGridBodyRow({
  dataGrid,
  dataGridRow,
  sortedColumnNames
}: DadaGridBodyRowProps) {
  const { sortedCells, isActiveRow } = useDataGridBodyRow({
    dataGridRow,
    sortedColumnNames
  });

  return (
    <Table.Tr bg={isActiveRow ? 'var(--mantine-color-default-hover)' : ''}>
      {sortedCells.map(({ colName, cellValue }) => (
        <DataGridBodyCell
          key={colName}
          dataGrid={dataGrid}
          rowId={dataGridRow.id}
          cellValue={cellValue}
          colName={colName}
        />
      ))}
    </Table.Tr>
  );
}
