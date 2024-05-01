import { Table } from '@mantine/core';
import DaraGridBodyMenu, { DaraGridBodyMenuRef } from './DataGridBodyMenu';
import DadaGridBodyRow from './DataGridBodyRow';
import { useRef } from 'react';
import { useClickOutside } from '@mantine/hooks';
import TableEntity from '../seed-data/TableEntity';
import { useDispatch, useSelector } from 'react-redux';
import { selectCell } from './dataGridSlice';
import { RootState } from '../../app/store';

interface DataGridBodyProps<T extends TableEntity> {
    tableData: T[];
}

export default function DataGridBody<T extends TableEntity>({ tableData }: DataGridBodyProps<T>) {
    const dispatch = useDispatch();
    const selectedCell = useSelector((_: RootState) => _.dataGrid.selectedCell);

    const tableRef = useClickOutside(() => dispatch(selectCell(null)), ['click']);

    const menuRef = useRef<DaraGridBodyMenuRef>(null);

    const rows = [...tableData]
        .sort((a, b) => a.index - b.index)
        .map((row) => <DadaGridBodyRow key={row.id} rowData={row} selectedCell={selectedCell} />);

    return (
        <DaraGridBodyMenu ref={menuRef} disableAddNewItemButtons={tableData.some((_) => _.id === '')}>
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
