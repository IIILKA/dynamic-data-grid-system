import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TableEntity from '../seed-data/TableEntity';
import { TableCellType } from '../seed-data/TableCellType';
import ErrorViewModel from '../error-handling/error-view-model.ts';
import { getUniqueId } from '../../utils/unique-id.ts';

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
  fetchingQueriesCount: number;
  selectedCell: SelectedCell | null;
  rows: TableEntity[];
  errors: ErrorViewModel[];
}

const initialState: DataGridState = {
  fetchingQueriesCount: 0,
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
  ],
  errors: []
};

//TODO: create multiply skices
export const dataGridSlice = createSlice({
  name: 'dataGrid',
  initialState,
  reducers: {
    queryStarted: (state) => {
      state.fetchingQueriesCount++;
    },
    queryFinished: (state) => {
      state.fetchingQueriesCount--;
    },
    selectCell: (state, action: PayloadAction<SelectedCell | null>) => {
      state.selectedCell = action.payload;
    },
    changeCellValue: (state, action: PayloadAction<CellChangedPayload>) => {
      const changedCell = state.rows.find((_) => _.id === action.payload.rowId);
      if (changedCell) {
        changedCell[action.payload.collName] = action.payload.newValue;
      }
    },
    addError: (state, action: PayloadAction<ErrorViewModel>) => {
      const error = { ...action.payload, id: getUniqueId() };
      state.errors.push(error);
    },
    removeError: (state, action: PayloadAction<number>) => {
      const index = state.errors.findIndex((error) => error.id === action.payload);
      if (index > -1) {
        state.errors.splice(index, 1);
      }
    }
  }
});

export const { queryStarted, queryFinished, selectCell, changeCellValue, addError, removeError } =
  dataGridSlice.actions;

export default dataGridSlice.reducer;
