import { Table } from '@mantine/core';
import { ReactNode, useEffect } from 'react';
import { styled } from 'styled-components';
import { nameOf } from '../../../utils/name-of-helper.ts';
import { selectSelectedCell } from '../data-grid-slice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import { DataGridDto, DataGridRowDto } from '../../api/resource-api-slice.ts';
import DataGridBodyCell from './data-grid-body-cell.tsx';

interface DadaGridBodyRowProps {
  dataGrid: DataGridDto;
  rowData: DataGridRowDto;
}

export default function DadaGridBodyRow({ dataGrid, rowData }: DadaGridBodyRowProps) {
  const selectedCell = useAppSelector(selectSelectedCell);

  function getBodyCells(row: DataGridRowDto): ReactNode[] {
    const dtoPropertyNames = Object.getOwnPropertyNames(row);
    return dtoPropertyNames
      .filter(
        (propName) =>
          propName !== nameOf<DataGridRowDto>('id') && propName !== nameOf<DataGridRowDto>('index')
      )
      .sort((a, b) => {
        const colA = dataGrid.columns.find((col) => col.name === a);
        const colB = dataGrid.columns.find((col) => col.name === b);
        return (colA?.index ?? 0) - (colB?.index ?? 0); // Сортировка по index
      })
      .map((colName) => (
        <DataGridBodyCell
          key={colName}
          dataGrid={dataGrid}
          row={row}
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

const TableStyledTr = styled(Table.Tr)`
  &.active {
    background-color: var(--mantine-color-default-hover);
  }
`;
