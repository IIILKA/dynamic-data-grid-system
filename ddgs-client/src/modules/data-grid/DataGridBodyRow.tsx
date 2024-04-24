import TableEntity from '../seed-data/TableEntity';
import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import DataGridBodyCell from './DataGridBodyCell';
import { TestInputChangedObject } from '../../pages/test-page/TestPage';
import { styled } from 'styled-components';
import { nameOf } from '../../utils/NameOfHelper';

const TableStyledTr = styled(Table.Tr)`
    &.active {
        background-color: var(--mantine-color-default-hover);
    }
`;

interface DadaGridBodyRowProps<T> {
    rowData: T;
    selectedCell: { rowId: string; colName: string } | null;
    setSelectedCell: (args: { rowId: string; colName: string }) => void;
    onChangeCellInput: (arg: TestInputChangedObject) => void;
}

export default function DadaGridBodyRow<T extends TableEntity>({
    rowData,
    selectedCell,
    setSelectedCell,
    onChangeCellInput
}: DadaGridBodyRowProps<T>) {
    function getBodyCells<T extends TableEntity>(row: T): ReactNode[] {
        const dtoPropertyNames = Object.getOwnPropertyNames(row);
        return dtoPropertyNames
            .filter((propName) => propName !== nameOf<T>('id') && propName !== nameOf<T>('index'))
            .map((colName) => (
                <DataGridBodyCell
                    key={colName}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={row[colName]}
                    rowId={row.id}
                    colName={colName}
                    isActive={
                        rowData.id === selectedCell?.rowId && colName === selectedCell.colName
                    }
                    onChangeCellInput={onChangeCellInput}
                    setSelectedCell={setSelectedCell}
                />
            ));
    }

    return (
        <TableStyledTr className={rowData.id === selectedCell?.rowId ? 'active' : ''}>
            {getBodyCells(rowData)}
        </TableStyledTr>
    );
}
