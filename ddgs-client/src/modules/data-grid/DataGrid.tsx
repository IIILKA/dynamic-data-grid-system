import { Menu, Table, Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { ReactNode, useState } from 'react';
import DadaGridBodyRow from './DataGridBodyRow';
import TableEntity from '../seed-data/TableEntity';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';
import { nameOf } from '../../utils/NameOfHelper';
import DaraGridBodyMenu from './DataGridBodyMenu';

interface DataGridProps<T> {
    tableData: T[];
    onDeleteRow: (rowId: string) => void;
    onChangeCellInput: (testInputChangedObject: TestInputChangedObject) => void;
    onAddRow: () => void;
    onDuplicateRow: (rowId: string) => void;
}

export default function DataGrid<T extends TableEntity>({
    tableData,
    onDeleteRow,
    onChangeCellInput,
    onAddRow,
    onDuplicateRow
}: DataGridProps<T>) {
    const [menu, setMenu] = useState<{ isOpened: boolean; offsetX?: number; offsetY?: number }>({
        isOpened: false
    });

    const [selectedCell, setSelectedCell] = useState<{ rowId: string; colName: string } | null>(
        null
    );
    const tableRef = useClickOutside(() => setSelectedCell(null), ['click']);

    function getHeadCells(row: any): ReactNode {
        const dtoPropertyNames = Object.getOwnPropertyNames(row);
        const cells = dtoPropertyNames
            .filter((propName) => propName !== nameOf<T>('id') && propName !== nameOf<T>('index'))
            .map((cellName) => <Table.Th key={cellName}>{cellName}</Table.Th>);
        return <>{cells}</>;
    }

    const rows = [...tableData]
        .sort((a, b) => a.index - b.index)
        .map((row) => (
            <DadaGridBodyRow
                key={row.id}
                rowData={row}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                onChangeCellInput={onChangeCellInput}
            />
        ));

    return (
        <>
            <Table
                highlightOnHover
                withColumnBorders
                withRowBorders
                withTableBorder
                style={{ marginBottom: '0.5rem' }}
            >
                <Table.Thead>
                    <Table.Tr>{getHeadCells(tableData[0])}</Table.Tr>
                </Table.Thead>
                <Menu opened={menu.isOpened}>
                    <Menu.Target>
                        <Table.Tbody
                            ref={tableRef}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                const offsetX = e.pageX + 5;
                                const offsetY = e.pageY;
                                setMenu({ isOpened: true, offsetX, offsetY });
                            }}
                        >
                            {rows}
                        </Table.Tbody>
                    </Menu.Target>
                    <DaraGridBodyMenu
                        offsetX={menu.offsetX}
                        offsetY={menu.offsetY}
                        onClickOutside={() => setMenu({ isOpened: false })}
                        onClickDeleteRow={() => {
                            setMenu({ isOpened: false });
                            onDeleteRow(selectedCell!.rowId);
                        }}
                        onClickDuplicateRow={() => {
                            setMenu({ isOpened: false });
                            onDuplicateRow(selectedCell!.rowId);
                        }}
                        disableAddNewItemButtons={!!tableData.find((_) => _.id === '')}
                    />
                </Menu>
            </Table>
            <Button
                variant='filled'
                color='teal'
                style={{ width: '100%' }}
                onClick={onAddRow}
                disabled={!!tableData.find((_) => _.id === '')}
            >
                Add test
            </Button>
        </>
    );
}
