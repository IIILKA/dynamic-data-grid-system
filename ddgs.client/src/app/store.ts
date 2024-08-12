import { configureStore } from '@reduxjs/toolkit';
import dataGridReducer from '../modules/data-grid/dataGridSlice';
import { apiSlice } from '../modules/api/apiSlice';
import { useDispatch } from 'react-redux';
import { authApiSlice } from '../modules/api/auth-api-slice.ts';

const store = configureStore({
  reducer: {
    dataGrid: dataGridReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
