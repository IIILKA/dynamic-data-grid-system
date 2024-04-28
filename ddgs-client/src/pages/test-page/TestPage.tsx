import { useImmer } from 'use-immer';
import DataGrid from '../../modules/data-grid/DataGrid';
import { resetObject } from '../../utils/ResetObjectHelper';
import { TableCellType } from '../../modules/seed-data/TableCellType';
import TableEntity from '../../modules/seed-data/TableEntity';

export interface TestInputChangedObject {
    rowId: string;
    collName: string;
    newValue: TableCellType;
}

export function TestPage() {
    const [tableData, setTableData] = useImmer<TableEntity[]>([
        {
            id: '30558184-2def-4a67-8d84-78c2d31d9305',
            index: 1,
            login: 'First test',
            password: 'qwerty1',
            age: 23,
            isStudent: true
        },
        {
            id: '804b675f-2788-4aba-9b93-fdb6bfbcc6af',
            index: 2,
            login: 'Second test',
            password: 'qwerty2',
            age: 21,
            isStudent: true
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf70a',
            index: 5,
            login: 'Fifth test',
            password: 'qwerty5',
            age: 28,
            isStudent: false
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf701',
            index: 4,
            login: 'Forth test',
            password: 'qwerty4',
            age: 24,
            isStudent: true
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf702',
            index: 3,
            login: 'Third test',
            password: 'qwerty3',
            age: 31,
            isStudent: false
        }
    ]);

    function handleChangeCell(testInputChangedObject: TestInputChangedObject) {
        setTableData((draft) => {
            const cell = draft.find((_) => _.id === testInputChangedObject.rowId);
            cell![testInputChangedObject.collName] = testInputChangedObject.newValue;
        });
    }

    function handleDeleteRow(rowId: string) {
        setTableData((draft) => {
            const deletedRow = draft.find((_) => _.id === rowId);

            if (deletedRow) {
                draft.forEach((row) => {
                    if (row.index > deletedRow.index) {
                        row.index--;
                    }
                });
            }
        });
        setTableData((draft) => draft.filter((_) => _.id !== rowId));
    }

    function handleAddRow() {
        setTableData((draft) => {
            const newRow = resetObject({ ...draft[0] });
            newRow.index = draft.length;
            draft.push(newRow);
        });
    }

    function handleDuplicateRow(rowId: string) {
        setTableData((draft) => {
            const originalRow = draft.find((_) => _.id === rowId);
            if (originalRow) {
                const duplicatedRow = { ...originalRow };
                duplicatedRow.id = '';
                duplicatedRow.index = originalRow.index + 1;

                draft.forEach((row) => {
                    if (row.index > originalRow.index) {
                        row.index++;
                    }
                });

                draft.push(duplicatedRow);
            }
        });
    }

    return (
        <DataGrid
            tableData={tableData}
            onDeleteRow={handleDeleteRow}
            onChangeCell={handleChangeCell}
            onAddRow={handleAddRow}
            onDuplicateRow={handleDuplicateRow}
        />
    );
}
