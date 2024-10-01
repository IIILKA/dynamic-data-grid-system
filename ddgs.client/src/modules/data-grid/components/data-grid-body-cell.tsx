import { Table } from '@mantine/core';
import { styled } from 'styled-components';
import { useDataGridBodyCell } from '../hooks/data-grid-body-cell-hook.ts';
import DataGridCellValueType from '../models/data-grid-cell-value-type.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DataGridRowIdType from '../models/data-grid-row-id-type.ts';
import DataGridBodyBooleanCell from './data-grid-body-boolean-cell.tsx';
import DataGridBodyNumberCell from './data-grid-body-number-cell.tsx';
import DataGridBodyTextCell from './data-grid-body-text-cell.tsx';

type DataGridBodyCellProps = {
  dataGrid: DataGridModel;
  rowId: DataGridRowIdType;
  cellValue: DataGridCellValueType;
  colName: string;
};

export default function DataGridBodyCell({
  dataGrid,
  rowId,
  cellValue,
  colName
}: DataGridBodyCellProps) {
  const { value, isActive, handleChangeValue, handleSelectCell } = useDataGridBodyCell({
    dataGrid,
    rowId,
    cellValue,
    colName
  });

  function getCellComponent() {
    switch (typeof value) {
      case 'string':
        return <DataGridBodyTextCell value={value} onChange={handleChangeValue} />;
      case 'number':
        return <DataGridBodyNumberCell value={value} onChange={handleChangeValue} />;
      case 'boolean':
        return <DataGridBodyBooleanCell value={value} onChange={handleChangeValue} />;
    }
  }

  return (
    <Table.Td p={0} onClick={handleSelectCell} onContextMenu={handleSelectCell}>
      <DataGridCellContainer className={isActive ? 'active' : ''}>
        {getCellComponent()}
      </DataGridCellContainer>
    </Table.Td>
  );
}

const DataGridCellContainer = styled.div`
  cursor: default;
  border: 1px solid transparent;

  & {
    input {
      cursor: default;
      padding-left: 0.5rem;

      &[type='checkbox'] {
        cursor: pointer;
      }
    }
  }

  &.active {
    input {
      cursor: text;

      &[type='checkbox'] {
        cursor: pointer;
      }
    }

    border: 1px solid dodgerblue;
    background-color: var(--mantine-color-default);
  }
`;
