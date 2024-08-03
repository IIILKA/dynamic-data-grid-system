import { configureStore } from '@reduxjs/toolkit';
import dataGridReducer from '../modules/data-grid/dataGridSlice';
import { apiSlice } from '../modules/api/apiSlice';
import { useDispatch } from 'react-redux';

// const tokenMiddleware = (store) => (next) => (action) => {
//   if (action.type === 'dataGridSlice/setAccessToken') {
//     next(action); // Сначала обновите токен
//     const state = store.getState();
//     if (state.api.queries['getSomething(undefined)']) {
//       store.dispatch(apiSlice.util?.invalidateTags(['GetSomething'])); // Перезапуск запроса
//     }
//   } else {
//     return next(action);
//   }
// };

const store = configureStore({
  reducer: {
    dataGrid: dataGridReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
