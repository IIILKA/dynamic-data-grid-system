import { useImmer } from 'use-immer';
import DataGrid from '../../modules/data-grid/DataGrid';
import { resetObject } from '../../utils/ResetObjectHelper';

export interface TestInputChangedObject {
    rowId: string;
    collName: string;
    newValue: string;
}

export function TestPage() {
    const [tableData, setTableData] = useImmer([
        {
            id: '30558184-2def-4a67-8d84-78c2d31d9305',
            index: 1,
            name: 'First test',
            password: 'qwerty1'
        },
        {
            id: '804b675f-2788-4aba-9b93-fdb6bfbcc6af',
            index: 2,
            name: 'Second test',
            password: 'qwerty2'
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf70a',
            index: 5,
            name: 'Fifth test',
            password: 'qwerty5'
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf701',
            index: 4,
            name: 'Forth test',
            password: 'qwerty4'
        },
        {
            id: 'ec6e04a4-d314-45c1-a564-1d0985abf702',
            index: 3,
            name: 'Third test',
            password: 'qwerty3'
        }
    ]);

    function handleChangeCellInput(testInputChangedObject: TestInputChangedObject) {
        setTableData((draft) => {
            const cell = draft.find((_) => _.id === testInputChangedObject.rowId);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
            onChangeCellInput={handleChangeCellInput}
            onAddRow={handleAddRow}
            onDuplicateRow={handleDuplicateRow}
        />
    );
}
