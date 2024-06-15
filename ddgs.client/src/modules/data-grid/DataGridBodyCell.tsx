import { NumberInput, Table, TextInput, Checkbox, Center } from '@mantine/core';
import { styled } from 'styled-components';
import { changeCellValue, dataGridSlice, selectCell } from './dataGridSlice';
import { useDispatch, useSelector } from 'react-redux';
import { apiSlice, selectTestById, tableEntityAdapter, useGetTestsQuery, useUpdateTestMutation } from '../api/apiSlice';
import { TableCellType } from '../seed-data/TableCellType';
import { RootState, useAppDispatch } from '../../app/store';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDebounce } from '../hooks/debounce';

const DataGridCellContainer = styled.div`
    cursor: default;
    border: 1px solid transparent;

    & {
        input {
            cursor: default;
            padding-left: 0.5rem;

            &[type='checkbox'] {
                cursor: pointer;
            }
        }
    }

    &.active {
        input {
            cursor: text;

            &[type='checkbox'] {
                cursor: pointer;
            }
        }

        border: 1px solid dodgerblue;
        background-color: var(--mantine-color-default);
    }
`;

interface DataGridBodyCellProps {
    rowId: string;
    colName: string;
    isActive: boolean;
}

export default function DataGridBodyCell({ rowId, colName, isActive }: DataGridBodyCellProps) {
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const [updateRow] = useUpdateTestMutation();
    const entity = useSelector((state: RootState) => selectTestById(state, rowId));
    const debounce = useDebounce(entity[colName]);
    const [changeValueServerHandled, setChangeValueServerHandled] = useState(true);

    useEffect(() => {
        if (!changeValueServerHandled) {
            const { id, ...entityUpdatePayload } = entity;
            updateRow({ id: rowId, entityUpdatePayload }).then(() => setChangeValueServerHandled(true));
        }
    }, [debounce]);

    async function handleChangeValue(newValue: TableCellType) {
        setChangeValueServerHandled(false);
        const { id, ...entityUpdatePayload } = entity;
        entityUpdatePayload[colName] = newValue;
        appDispatch(
            apiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
                tableEntityAdapter.updateOne(draft, { id, changes: entityUpdatePayload });
            })
        );
    }

    function getCellControl(value: TableCellType) {
        switch (typeof value) {
            case 'string':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <TextInput variant='unstyled' value={value} onChange={(e) => handleChangeValue(e.currentTarget.value)} />
                    </DataGridCellContainer>
                );
            case 'number':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <NumberInput
                            variant='unstyled'
                            value={value}
                            defaultValue={0}
                            onChange={(value) => handleChangeValue(typeof value === 'number' ? value : 0)}
                        />
                    </DataGridCellContainer>
                );
            case 'boolean':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <Center style={{ padding: '0.5rem' }}>
                            <Checkbox color='teal' checked={value} onChange={(e) => handleChangeValue(e.currentTarget.checked)} />
                        </Center>
                    </DataGridCellContainer>
                );
        }
    }

    return (
        <Table.Td
            style={{ padding: 0 }}
            onClick={() => dispatch(selectCell({ rowId: rowId, colName: colName }))}
            onContextMenu={() => dispatch(selectCell({ rowId: rowId, colName: colName }))}>
            {getCellControl(entity[colName])}
        </Table.Td>
    );
}
