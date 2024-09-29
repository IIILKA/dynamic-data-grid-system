import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

type LoadingState = {
  fetchingQueriesCount: number;
  fetchingColumn: boolean;
};

const initialState: LoadingState = {
  fetchingQueriesCount: 0,
  fetchingColumn: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    queryStarted: (state) => {
      state.fetchingQueriesCount++;
    },
    queryFinished: (state) => {
      state.fetchingQueriesCount--;
    },
    columnQueryStarted: (state) => {
      state.fetchingQueriesCount++;
      state.fetchingAddColumn = true;
    },
    columnQueryFinished: (state) => {
      state.fetchingQueriesCount--;
      state.fetchingAddColumn = false;
    }
  }
});

export const selectIsLoading = createSelector(
  (state: RootState) => state.loading.fetchingQueriesCount,
  (fetchingQueriesCount) => fetchingQueriesCount > 0
);

export const selectDataGridColumnIsLoading = createSelector(
  (state: RootState) => state.loading.fetchingAddColumn,
  (fetchingAddColumn) => fetchingAddColumn
);

export const { queryStarted, queryFinished } = loadingSlice.actions;
