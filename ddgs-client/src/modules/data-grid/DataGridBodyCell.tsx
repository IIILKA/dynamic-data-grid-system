import { NumberInput, Table, TextInput, Checkbox, Center } from '@mantine/core';
import { styled } from 'styled-components';
import { changeCellValue, selectCell } from './dataGridSlice';
import { useDispatch } from 'react-redux';

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
    value: string | number | boolean;
    rowId: string;
    colName: string;
    isActive: boolean;
}

export default function DataGridBodyCell({ value, rowId, colName, isActive }: DataGridBodyCellProps) {
    const dispatch = useDispatch();

    function getCellControl() {
        switch (typeof value) {
            case 'string':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <TextInput
                            variant='unstyled'
                            value={value}
                            onChange={(e) =>
                                dispatch(
                                    changeCellValue({
                                        rowId: rowId,
                                        collName: colName,
                                        newValue: e.currentTarget.value
                                    })
                                )
                            }
                        />
                    </DataGridCellContainer>
                );
            case 'number':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <NumberInput
                            variant='unstyled'
                            value={value}
                            defaultValue={0}
                            onChange={(value) =>
                                dispatch(
                                    changeCellValue({
                                        rowId: rowId,
                                        collName: colName,
                                        newValue: typeof value === 'number' ? value : 0
                                    })
                                )
                            }
                        />
                    </DataGridCellContainer>
                );
            case 'boolean':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <Center style={{ padding: '0.5rem' }}>
                            <Checkbox
                                color='teal'
                                checked={value}
                                onChange={(e) =>
                                    dispatch(
                                        changeCellValue({
                                            rowId: rowId,
                                            collName: colName,
                                            newValue: e.currentTarget.checked
                                        })
                                    )
                                }
                            />
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
            {getCellControl()}
        </Table.Td>
    );
}
