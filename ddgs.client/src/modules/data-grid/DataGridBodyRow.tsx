import TableEntity from '../seed-data/TableEntity';
import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import DataGridBodyCell from './DataGridBodyCell';
import { styled } from 'styled-components';
import { nameOf } from '../../utils/NameOfHelper';
import { useSelector } from 'react-redux';
import { selectSelectedCell } from './dataGridSlice.ts';

const TableStyledTr = styled(Table.Tr)`
  &.active {
    background-color: var(--mantine-color-default-hover);
  }
`;

interface DadaGridBodyRowProps<T extends TableEntity> {
  rowData: T;
}

export default function DadaGridBodyRow<T extends TableEntity>({
  rowData
}: DadaGridBodyRowProps<T>) {
  const selectedCell = useSelector(selectSelectedCell);

  function getBodyCells<T extends TableEntity>(row: T): ReactNode[] {
    const dtoPropertyNames = Object.getOwnPropertyNames(row);
    return dtoPropertyNames
      .filter((propName) => propName !== nameOf<T>('id') && propName !== nameOf<T>('index'))
      .map((colName) => (
        <DataGridBodyCell
          key={colName}
          //value={row[colName]}
          rowId={row.id}
          colName={colName}
          isActive={rowData.id === selectedCell?.rowId && colName === selectedCell.colName}
        />
      ));
  }

  return (
    <TableStyledTr className={rowData.id === selectedCell?.rowId ? 'active' : ''}>
      {getBodyCells(rowData)}
    </TableStyledTr>
  );
}
