import { Table, TextInput } from '@mantine/core';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';
import { styled } from 'styled-components';

const DataGridCellContainer = styled.div`
    cursor: default;
    border: 1px solid transparent;

    .mantine-TextInput-root {
        & {
            input {
                cursor: default;
                padding-left: 0.5rem;
            }
        }
    }

    &.active {
        cursor: pointer;
        border: 1px solid dodgerblue;
        background-color: var(--mantine-color-default);
    }
`;

const DataGridTd = styled(Table.Td)`
    padding: 0;
`;

interface DataGridBodyCellProps {
    value: string;
    rowId: string;
    colName: string;
    isActive: boolean;
    onChangeCellInput: (arg: TestInputChangedObject) => void;
    setSelectedCell: (args: { rowId: string; colName: string }) => void;
}

export default function DataGridBodyCell({
    value,
    rowId,
    colName,
    isActive,
    onChangeCellInput,
    setSelectedCell
}: DataGridBodyCellProps) {
    return (
        <DataGridTd
            onClick={() => setSelectedCell({ rowId: rowId, colName: colName })}
            onContextMenu={() => setSelectedCell({ rowId: rowId, colName: colName })}
        >
            <DataGridCellContainer className={isActive ? 'active' : ''}>
                <TextInput
                    variant='unstyled'
                    value={value}
                    onChange={(e) =>
                        onChangeCellInput({
                            rowId: rowId,
                            collName: colName,
                            newValue: e.currentTarget.value
                        })
                    }
                />
            </DataGridCellContainer>
        </DataGridTd>
    );
}
