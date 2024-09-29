import { Table } from '@mantine/core';
import { useDataGridHeadCell } from '../hooks/data-grid-head-cell-hook.ts';
import DataGridColumnModel from '../models/data-grid-column-model.ts';
import DataGridModel from '../models/data-grid-model.ts';
import DaraGridHeadMenu from './data-grid-head-menu.tsx';

type DataGridHeadCellProps = {
  dataGrid: DataGridModel;
  dataGridColumn: DataGridColumnModel;
};

export default function DataGridHeadCell({ dataGrid, dataGridColumn }: DataGridHeadCellProps) {
  const { menuRef, handleContextMenu } = useDataGridHeadCell();

  return (
    <DaraGridHeadMenu ref={menuRef} dataGrid={dataGrid} dataGridColumn={dataGridColumn}>
      <Table.Th onContextMenu={handleContextMenu}>{dataGridColumn.name}</Table.Th>
    </DaraGridHeadMenu>
  );
}
