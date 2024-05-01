import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetObject } from '../../utils/ResetObjectHelper';
import TableEntity from '../seed-data/TableEntity';
import { TableCellType } from '../seed-data/TableCellType';

interface CellChangedPayload {
    rowId: string;
    collName: string;
    newValue: TableCellType;
}

interface SelectedCell {
    rowId: string;
    colName: string;
}

interface DataGridState {
    selectedCell: SelectedCell | null;
    rows: TableEntity[];
}

const initialState: DataGridState = {
    selectedCell: null,
    rows: [
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
    ]
};

export const dataGridSlice = createSlice({
    name: 'dataGrid',
    initialState,
    reducers: {
        selectCell: (state, action: PayloadAction<SelectedCell | null>) => {
            state.selectedCell = action.payload;
        },
        changeCellValue: (state, action: PayloadAction<CellChangedPayload>) => {
            const changedCell = state.rows.find((_) => _.id === action.payload.rowId);
            if (changedCell) {
                changedCell[action.payload.collName] = action.payload.newValue;
            }
        },
        addRow: (state) => {
            const newRow = resetObject({ ...state.rows[0] });
            newRow.index = state.rows.length;
            state.rows.push(newRow);
        },
        duplicateRow: (state, action: PayloadAction<string>) => {
            const originalRow = state.rows.find((_) => _.id === action.payload);
            if (originalRow) {
                const duplicatedRow = { ...originalRow };
                duplicatedRow.id = '';
                duplicatedRow.index = originalRow.index + 1;

                state.rows.forEach((_) => {
                    _.index++;
                });

                state.rows.push(duplicatedRow);
            }
        },
        deleteRow: (state, action: PayloadAction<string>) => {
            const deletedRow = state.rows.find((_) => _.id === action.payload);

            if (deletedRow) {
                state.rows.forEach((_) => {
                    if (_.index > deletedRow.index) {
                        _.index--;
                    }
                });
            }

            state.rows = state.rows.filter((_) => _.id !== action.payload);
        }
    }
});

export const { selectCell, changeCellValue, addRow, duplicateRow, deleteRow } = dataGridSlice.actions;

export default dataGridSlice.reducer;
