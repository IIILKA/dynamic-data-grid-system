import { Table, Button } from '@mantine/core';
import TableEntity from '../seed-data/TableEntity';
import DataGridHead from './DataGridHead';
import DataGridBody from './DataGridBody';
import { useCreateTestMutation } from '../api/apiSlice';
import { resetObject } from '../../utils/ResetObjectHelper';
import { useEffect, useState } from 'react';
import { TableCellType } from '../seed-data/TableCellType';
import { useDebounce } from '../hooks/debounce';

interface DataGridProps<T extends TableEntity> {
    sortedIds: string[];
    dataGridRows: { [key: string]: T };
}

export default function DataGrid<T extends TableEntity>({ sortedIds, dataGridRows }: DataGridProps<T>) {
    const [createRow] = useCreateTestMutation();

    async function handleAddEntityClicked() {
        const resetedRow = resetObject({ ...dataGridRows[sortedIds[0]] });
        const { id, ...entityCreatePayload } = resetedRow;
        entityCreatePayload.index = sortedIds.length + 1;
        await createRow(entityCreatePayload);
    }

    return (
        <>
            <Table highlightOnHover withColumnBorders withRowBorders withTableBorder style={{ marginBottom: '0.5rem' }}>
                <DataGridHead propNames={Object.getOwnPropertyNames(dataGridRows[sortedIds[0]])} />
                <DataGridBody sortedIds={sortedIds} dataGridRows={dataGridRows} />
            </Table>
            <Button variant='filled' color='teal' style={{ width: '100%' }} onClick={handleAddEntityClicked}>
                Add test
            </Button>
        </>
    );
}
