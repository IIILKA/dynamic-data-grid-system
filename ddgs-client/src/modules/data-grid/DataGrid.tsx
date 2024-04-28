import { Table, Button } from '@mantine/core';
import TableEntity from '../seed-data/TableEntity';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';
import DataGridHead from './DataGridHead';
import DataGridBody from './DataGridBody';

interface DataGridProps<T extends TableEntity> {
    tableData: T[];

    onChangeCell(testInputChangedObject: TestInputChangedObject): void;

    onAddRow(): void;

    onDuplicateRow(rowId: string): void;

    onDeleteRow(rowId: string): void;
}

export default function DataGrid<T extends TableEntity>({
    tableData,
    onChangeCell,
    onAddRow,
    onDuplicateRow,
    onDeleteRow
}: DataGridProps<T>) {
    return (
        <>
            <Table highlightOnHover withColumnBorders withRowBorders withTableBorder style={{ marginBottom: '0.5rem' }}>
                <DataGridHead propNames={Object.getOwnPropertyNames(tableData[0])} />
                <DataGridBody tableData={tableData} onChangeCell={onChangeCell} onDuplicateRow={onDuplicateRow} onDeleteRow={onDeleteRow} />
            </Table>
            <Button
                variant='filled'
                color='teal'
                style={{ width: '100%' }}
                onClick={onAddRow}
                disabled={tableData.some((_) => _.id === '')}>
                Add test
            </Button>
        </>
    );
}
