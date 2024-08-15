import { Table } from '@mantine/core';
import DaraGridBodyMenu, { DaraGridBodyMenuRef } from './DataGridBodyMenu';
import DadaGridBodyRow from './DataGridBodyRow';
import { useMemo, useRef } from 'react';
import { useClickOutside } from '@mantine/hooks';
import TableEntity from '../seed-data/TableEntity';
import { useDispatch } from 'react-redux';
import { selectCell } from './dataGridSlice';

interface DataGridBodyProps<T extends TableEntity> {
  sortedIds: string[];
  dataGridRows: { [key: string]: T };
}

export default function DataGridBody<T extends TableEntity>({
  sortedIds,
  dataGridRows
}: DataGridBodyProps<T>) {
  const dispatch = useDispatch();

  const tableRef = useClickOutside(() => dispatch(selectCell(null)), ['click']);

  const menuRef = useRef<DaraGridBodyMenuRef | null>(null);

  const rows = useMemo(
    () => sortedIds.map((rowId) => <DadaGridBodyRow key={rowId} rowData={dataGridRows[rowId]} />),
    [dataGridRows, sortedIds]
  );

  return (
    <DaraGridBodyMenu ref={menuRef} disableAddNewItemButtons={sortedIds.some((id) => id === '')}>
      <Table.Tbody
        ref={tableRef}
        onContextMenu={(e) => {
          e.preventDefault();
          const offsetX = e.pageX + 5;
          const offsetY = e.pageY;
          menuRef.current!.setMenu({ isOpened: true, offsetX, offsetY });
        }}>
        {rows}
      </Table.Tbody>
    </DaraGridBodyMenu>
  );
}
