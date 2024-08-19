import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface LoadingState {
  fetchingQueriesCount: number;
}

const initialState: LoadingState = {
  fetchingQueriesCount: 0
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
    }
  }
});

export const selectIsLoading = createSelector(
  (state: RootState) => state.loading.fetchingQueriesCount,
  (fetchingQueriesCount) => fetchingQueriesCount > 0
);

export const { queryStarted, queryFinished } = loadingSlice.actions;
