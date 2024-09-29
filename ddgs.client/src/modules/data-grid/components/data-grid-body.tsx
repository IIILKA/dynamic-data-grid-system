import { Table } from '@mantine/core';
import { useMemo } from 'react';
import useDataGridBody from '../hooks/data-grid-body-hook.ts';
import DataGridModel from '../models/data-grid-model.ts';
import NormalizedDataGridRowModels from '../models/normalized-data-grid-row-models.ts';
import DaraGridBodyMenu from './data-grid-body-menu.tsx';
import DadaGridBodyRow from './data-grid-body-row.tsx';

type DataGridBodyProps = {
  dataGrid: DataGridModel;
  normalizedDataGridRows: NormalizedDataGridRowModels;
};

export default function DataGridBody({ dataGrid, normalizedDataGridRows }: DataGridBodyProps) {
  const { tableRef, menuRef, handleContextMenu, sortedColumnNames } = useDataGridBody({ dataGrid });

  const rows = useMemo(
    () =>
      normalizedDataGridRows.ids.map((rowId) => (
        <DadaGridBodyRow
          key={rowId}
          dataGrid={dataGrid}
          dataGridRow={normalizedDataGridRows.entities[rowId]}
          sortedColumnNames={sortedColumnNames}
        />
      )),
    [normalizedDataGridRows] // eslint-disable-line
  );

  return (
    <DaraGridBodyMenu
      ref={menuRef}
      disableAddNewItemButtons={normalizedDataGridRows.ids.some((id) => id === '')}
      dataGrid={dataGrid}>
      <Table.Tbody ref={tableRef} onContextMenu={handleContextMenu}>
        {rows}
      </Table.Tbody>
    </DaraGridBodyMenu>
  );
}
