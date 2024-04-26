import { NumberInput, Table, TextInput, Checkbox, Center } from '@mantine/core';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';
import { styled } from 'styled-components';
import { SelectedRow } from './DataGridBody';

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

    onChangeCell(testInputChangedObject: TestInputChangedObject): void;

    setSelectedCell(selectedRow: SelectedRow): void;
}

export default function DataGridBodyCell({ value, rowId, colName, isActive, onChangeCell, setSelectedCell }: DataGridBodyCellProps) {
    function getCellControl() {
        switch (typeof value) {
            case 'string':
                return (
                    <DataGridCellContainer className={isActive ? 'active' : ''}>
                        <TextInput
                            variant='unstyled'
                            value={value}
                            onChange={(e) =>
                                onChangeCell({
                                    rowId: rowId,
                                    collName: colName,
                                    newValue: e.currentTarget.value
                                })
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
                                onChangeCell({
                                    rowId: rowId,
                                    collName: colName,
                                    newValue: typeof value === 'number' ? value : 0
                                })
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
                                    onChangeCell({
                                        rowId: rowId,
                                        collName: colName,
                                        newValue: e.currentTarget.checked
                                    })
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
            onClick={() => setSelectedCell({ rowId: rowId, colName: colName })}
            onContextMenu={() => setSelectedCell({ rowId: rowId, colName: colName })}>
            {getCellControl()}
        </Table.Td>
    );
}
