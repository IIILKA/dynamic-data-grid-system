import { Table } from '@mantine/core';
import DaraGridBodyMenu, { DaraGridBodyMenuRef } from './data-grid-body-menu.tsx';
import DadaGridBodyRow from './data-grid-body-row.tsx';
import { useMemo, useRef } from 'react';
import { useClickOutside } from '@mantine/hooks';
import TableEntity from '../../seed-data/table-entity.ts';
import { selectCell } from '../data-grid-slice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';

interface DataGridBodyProps<T extends TableEntity> {
  sortedIds: string[];
  dataGridRows: { [key: string]: T };
}

export default function DataGridBody<T extends TableEntity>({
  sortedIds,
  dataGridRows
}: DataGridBodyProps<T>) {
  const dispatch = useAppDispatch();

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
