import { Table, Button } from '@mantine/core';
import TableEntity from '../seed-data/TableEntity';
import DataGridHead from './DataGridHead';
import DataGridBody from './DataGridBody';
import { useDispatch } from 'react-redux';
import { addRow } from './dataGridSlice';

interface DataGridProps<T extends TableEntity> {
    dataGridRows: T[];
}

export default function DataGrid<T extends TableEntity>({ dataGridRows }: DataGridProps<T>) {
    const dispatch = useDispatch();

    return (
        <>
            <Table highlightOnHover withColumnBorders withRowBorders withTableBorder style={{ marginBottom: '0.5rem' }}>
                <DataGridHead propNames={Object.getOwnPropertyNames(dataGridRows[0])} />
                <DataGridBody tableData={dataGridRows} />
            </Table>
            <Button
                variant='filled'
                color='teal'
                style={{ width: '100%' }}
                onClick={() => dispatch(addRow())}
                disabled={dataGridRows.some((_) => _.id === '')}>
                Add test
            </Button>
        </>
    );
}
