import { Table } from '@mantine/core';
import DaraGridBodyMenu, { DaraGridBodyMenuRef } from './DataGridBodyMenu';
import DadaGridBodyRow from './DataGridBodyRow';
import { useRef, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import TableEntity from '../seed-data/TableEntity';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';

interface DataGridBodyProps<T extends TableEntity> {
    tableData: T[];

    onChangeCell(testInputChangedObject: TestInputChangedObject): void;

    onDuplicateRow(rowId: string): void;

    onDeleteRow(rowId: string): void;
}

export interface SelectedRow {
    rowId: string;
    colName: string;
}

export default function DataGridBody<T extends TableEntity>({
    tableData,
    onChangeCell,
    onDuplicateRow,
    onDeleteRow
}: DataGridBodyProps<T>) {
    const [selectedCell, setSelectedCell] = useState<SelectedRow | null>(null);
    const tableRef = useClickOutside(() => setSelectedCell(null), ['click']);

    const menuRef = useRef<DaraGridBodyMenuRef>(null);

    const rows = [...tableData]
        .sort((a, b) => a.index - b.index)
        .map((row) => (
            <DadaGridBodyRow
                key={row.id}
                rowData={row}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                onChangeCell={onChangeCell}
            />
        ));

    return (
        <DaraGridBodyMenu
            ref={menuRef}
            onClickDeleteRow={() => {
                onDeleteRow(selectedCell!.rowId);
            }}
            onClickDuplicateRow={() => {
                onDuplicateRow(selectedCell!.rowId);
            }}
            disableAddNewItemButtons={tableData.some((_) => _.id === '')}>
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
