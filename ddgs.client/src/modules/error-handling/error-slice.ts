import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ErrorViewModel from '../error-handling/error-view-model.ts';
import { getUniqueId } from '../../utils/unique-id.ts';
import { RootState } from '../../app/store.ts';

interface ErrorState {
  errors: ErrorViewModel[];
}

const initialState: ErrorState = {
  errors: []
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
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

export const selectErrors = (state: RootState) => state.errors.errors;
export const { addError, removeError } = errorSlice.actions;
export default errorSlice.reducer;
