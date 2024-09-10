import { Table } from '@mantine/core';
import DaraGridBodyMenu, { DaraGridBodyMenuRef } from './data-grid-body-menu.tsx';
import { useMemo, useRef } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { selectCell } from '../data-grid-slice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';
import { DataGridDto, DataGridRowDto } from '../../api/resource-api-slice.ts';
import DadaGridBodyRow from './data-grid-body-row.tsx';

interface DataGridBodyProps {
  dataGrid: DataGridDto;
  sortedIds: string[];
  dataGridRows: { [key: string]: DataGridRowDto };
}

export default function DataGridBody({ dataGrid, sortedIds, dataGridRows }: DataGridBodyProps) {
  const dispatch = useAppDispatch();

  const tableRef = useClickOutside(() => dispatch(selectCell(null)), ['click']);

  const menuRef = useRef<DaraGridBodyMenuRef | null>(null);

  const rows = useMemo(
    () =>
      sortedIds.map((rowId) => (
        <DadaGridBodyRow key={rowId} dataGrid={dataGrid} rowData={dataGridRows[rowId]} />
      )),
    [dataGridRows, sortedIds] // eslint-disable-line
  );

  return (
    <DaraGridBodyMenu
      ref={menuRef}
      disableAddNewItemButtons={sortedIds.some((id) => id === '')}
      dataGrid={dataGrid}>
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
