import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { getUniqueId } from '../core/utils/unique-id.ts';
import ErrorModel from './models/error-model.ts';

type ErrorState = {
  errors: ErrorModel[];
};

const initialState: ErrorState = {
  errors: []
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<ErrorModel>) => {
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

export const selectErrors = (state: RootState): ErrorModel[] => state.errors.errors;
export const { addError, removeError } = errorSlice.actions;
