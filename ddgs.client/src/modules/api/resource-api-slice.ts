import { BaseQueryFn, createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from './api-utils.ts';
import dataGridEndpoints from './endpoints/data-grid-endpoints.ts';
import dataGridRowEndpoints from './endpoints/data-grid-row-endpoints.ts';

export const resourceApiSlice = createApi({
  reducerPath: 'resourceApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_API_URL, true),
  tagTypes: ['DataGrids', 'DataGridRows'],
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, 'resourceApi'>) => ({
    ...dataGridEndpoints(builder),
    ...dataGridRowEndpoints(builder)
  })
});

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
