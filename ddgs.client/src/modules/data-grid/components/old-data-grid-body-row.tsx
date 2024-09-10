import OldTableEntity from '../../seed-data/old-table-entity.ts';
import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import OldDataGridBodyCell from './old-data-grid-body-cell.tsx';
import { styled } from 'styled-components';
import { nameOf } from '../../../utils/name-of-helper.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';
import { useAppSelector } from '../../../app/hooks.ts';

const TableStyledTr = styled(Table.Tr)`
  &.active {
    background-color: var(--mantine-color-default-hover);
  }
`;

interface DadaGridBodyRowProps<T extends OldTableEntity> {
  rowData: T;
}

export default function OldDadaGridBodyRow<T extends OldTableEntity>({
  rowData
}: DadaGridBodyRowProps<T>) {
  const selectedCell = useAppSelector(selectSelectedCell);

  function getBodyCells<T extends OldTableEntity>(row: T): ReactNode[] {
    const dtoPropertyNames = Object.getOwnPropertyNames(row);
    return dtoPropertyNames
      .filter((propName) => propName !== nameOf<T>('id') && propName !== nameOf<T>('index'))
      .map((colName) => (
        <OldDataGridBodyCell
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
