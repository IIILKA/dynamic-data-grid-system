import { configureStore } from '@reduxjs/toolkit';
import dataGridReducer from '../modules/data-grid/dataGridSlice';

const store = configureStore({
    reducer: {
        dataGrid: dataGridReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
