import { createSelector } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from './api-utils.ts';
import addDataGridEndpoints from './endpoints/data-grid-endpoints.ts';
import { addDataGridRowEndpoints } from './endpoints/data-grid-row-endpoints.ts';

export const resourceApiSlice = createApi({
  reducerPath: 'resourceApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_API_URL, true),
  tagTypes: ['DataGrids', 'DataGridRows'],
  endpoints: () => ({})
});

//TODO: надо всё таки как-то типизировать ендпоинты апихи
addDataGridEndpoints();
addDataGridRowEndpoints();

//Проверка типизации, птом можно удалить
const selectDataGridsData = createSelector(
  resourceApiSlice.endpoints?.getDataGrids.select(),
  (dataGridResult) => dataGridResult.data ?? []
);

export const {
  useGetDataGridsQuery,
  useGetDataGridQuery,
  useCreateDataGridMutation,
  useDeleteDataGridMutation,
  useAddColumnToDataGridMutation,
  useRemoveColumnFromDataGridMutation,
  useGetDataGridRowsQuery,
  useCreateDataGridRowMutation,
  useUpdateDataGridRowMutation,
  useDeleteDataGridRowMutation
} = resourceApiSlice;
