import { configureStore } from '@reduxjs/toolkit';
import { dataGridSlice } from '../modules/data-grid/data-grid-slice.ts';
import { errorSlice } from '../modules/error-handling/error-slice.ts';
import { loadingSlice } from '../modules/loading/loading-slice.ts';
import { resourceApiSlice } from '../modules/api/resource-api-slice.ts';
import { authApiSlice } from '../modules/api/auth-api-slice.ts';

const store = configureStore({
  reducer: {
    [loadingSlice.reducerPath]: loadingSlice.reducer,
    [errorSlice.reducerPath]: errorSlice.reducer,
    [dataGridSlice.reducerPath]: dataGridSlice.reducer,
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resourceApiSlice.middleware, authApiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
