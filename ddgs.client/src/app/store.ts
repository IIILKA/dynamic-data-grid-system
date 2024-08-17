import { configureStore } from '@reduxjs/toolkit';
import dataGridReducer from '../modules/data-grid/dataGridSlice';
import errorReducer from '../modules/error-handling/error-slice.ts';
import loadingReducer from '../modules/loading/loading-slice.ts';
import { resourceApiSlice } from '../modules/api/resource-api-slice.ts';
import { useDispatch } from 'react-redux';
import { authApiSlice } from '../modules/api/auth-api-slice.ts';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    errors: errorReducer,
    dataGrid: dataGridReducer,
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resourceApiSlice.middleware, authApiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
