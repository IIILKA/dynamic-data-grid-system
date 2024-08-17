import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface SelectedCell {
  rowId: string;
  colName: string;
}

interface DataGridState {
  selectedCell: SelectedCell | null;
}

const initialState: DataGridState = {
  selectedCell: null
};

export const dataGridSlice = createSlice({
  name: 'dataGrid',
  initialState,
  reducers: {
    selectCell: (state, action: PayloadAction<SelectedCell | null>) => {
      state.selectedCell = action.payload;
    }
  }
});

export const selectSelectedCell = (state: RootState) => state.dataGrid.selectedCell;

export const { selectCell } = dataGridSlice.actions;
export default dataGridSlice.reducer;
