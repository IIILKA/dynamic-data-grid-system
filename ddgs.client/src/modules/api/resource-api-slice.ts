import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { DataGridCellType } from '../seed-data/data-grid-cell-type.ts';
import { loadingSlice } from '../loading/loading-slice.ts';
import { AppBaseQuery, getBaseQuery } from './api-utils.ts';

export interface DataGridItemDto {
  id: string;
  name: string;
  ownerUsername: string;
}

export interface DataGridDto {
  id: string;
  name: string;
  ownerUsername: string;
  dateCreated: string;
  columns: DataGridColumnDto[];
}

export interface DataGridColumnDto {
  index: number;
  name: string;
  type: DataGridColumnType;
}

export enum DataGridColumnType {
  Text,
  Number,
  Boolean
}

export interface DataGridCreatePayload {
  name: string;
}

export interface DataGridRowDto {
  id: string;
  [key: string]: DataGridCellType;
}

interface NormalizedDataGridRowsCache {
  ids: string[];
  entities: { [id: string]: DataGridRowDto };
}

interface DataGridRowCreateArgs {
  dataGridId: string;
  payload: DataGridRowPayload;
}

interface DataGridRowUpdateArgs {
  id: string;
  dataGridId: string;
  payload: DataGridRowPayload;
}

interface DataGridRowPayload {
  [key: string]: DataGridCellType;
  //index: number;
}

export const dataGridRowAdapter = createEntityAdapter<DataGridRowDto>();

export const resourceApiSlice = createApi({
  reducerPath: 'resourceApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_API_URL, true),
  tagTypes: ['DataGrids'],
  endpoints: (builder: EndpointBuilder<AppBaseQuery, string, 'resourceApi'>) => ({
    getDataGrids: builder.query<DataGridItemDto[], void>({
      query: () => '/data-grid',
      transformResponse: (baseQueryReturnValue: DataGridItemDto[]) => {
        return [...baseQueryReturnValue].reverse();
      },
      providesTags: ['DataGrids']
    }),
    getDataGrid: builder.query<DataGridDto, string>({
      query: (id: string) => `/data-grid/${id}`,
      providesTags: ['DataGrids']
    }),
    createDataGrid: builder.mutation<void, DataGridCreatePayload>({
      query: (entityCreatePayload) => ({
        url: '/data-grid',
        method: 'POST',
        body: entityCreatePayload
      }),
      async onQueryStarted(entityCreatePayload, { dispatch, queryFulfilled }) {
        dispatch(loadingSlice.actions.queryStarted());
        try {
          await queryFulfilled;
          dispatch(loadingSlice.actions.queryFinished());
        } catch {
          dispatch(loadingSlice.actions.queryFinished());
        }
      },
      invalidatesTags: ['DataGrids']
    }),
    deleteDataGrid: builder.mutation<void, string>({
      query: (dataGridId) => ({
        url: '/data-grid/' + dataGridId,
        method: 'DELETE'
      }),
      async onQueryStarted(dataGridId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          resourceApiSlice.util?.updateQueryData<DataGridItemDto[], void>(
            'getDataGrids',
            undefined,
            (draft) => {
              dispatch(loadingSlice.actions.queryStarted());

              const draftDataGrids = draft as DataGridItemDto[];

              const index = draftDataGrids?.findIndex(
                (dataGrid: DataGridItemDto) => dataGrid.id === dataGridId
              );
              if (index && index !== -1) {
                draftDataGrids.splice(index, 1);
              } else {
                console.error('DataGrid not found or draft is undefined');
              }
            }
          )
        );
        try {
          await queryFulfilled;
          dispatch(loadingSlice.actions.queryFinished());
        } catch {
          deleteResult.undo();
          dispatch(loadingSlice.actions.queryFinished());
        }
      },
      invalidatesTags: ['DataGrids']
    }),
    getDataGridRows: builder.query<NormalizedDataGridRowsCache, string>({
      query: (dataGridId: string) => `/data-grid/${dataGridId}/row`,
      transformResponse(baseQueryReturnValue: DataGridRowDto[]) {
        return dataGridRowAdapter.setAll(
          dataGridRowAdapter.getInitialState(),
          baseQueryReturnValue
        );
      },
      providesTags: ['DataGrids']
    }),
    createDataGridRow: builder.mutation<void, DataGridRowCreateArgs>({
      query: ({ dataGridId, payload }) => ({
        url: `/data-grid/${dataGridId}/row`,
        method: 'POST',
        body: { rowData: payload }
      }),
      async onQueryStarted({ dataGridId, payload }, { dispatch, queryFulfilled }) {
        const createResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getDataGridRows', dataGridId, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());

            dataGridRowAdapter.addOne(draft, { ...payload, id: '' });
          })
        );
        try {
          await queryFulfilled;
          dispatch(loadingSlice.actions.queryFinished());
        } catch {
          createResult.undo();
          dispatch(loadingSlice.actions.queryFinished());
        }
      },
      invalidatesTags: ['DataGrids']
    }),
    updateDataGridRow: builder.mutation<void, DataGridRowUpdateArgs>({
      query: ({ id, dataGridId, payload }) => ({
        url: `/data-grid/${dataGridId}/row/${id}`,
        method: 'PUT',
        body: { rowData: payload }
      }),
      async onQueryStarted({ id, dataGridId, payload }, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getDataGridRows', dataGridId, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());
            dataGridRowAdapter.updateOne(draft, { id, changes: payload });
          })
        );
        try {
          await queryFulfilled;
          dispatch(loadingSlice.actions.queryFinished());
        } catch {
          updateResult.undo();
          dispatch(loadingSlice.actions.queryFinished());
        }
      },
      invalidatesTags: ['DataGrids']
    }),
    deleteDataGridRow: builder.mutation({
      query: ({ id, dataGridId }) => ({
        url: `data-grid/${dataGridId}/row/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted({ id, dataGridId }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getDataGridRows', dataGridId, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());
            dataGridRowAdapter.removeOne(draft, id);
          })
        );
        try {
          await queryFulfilled;
          dispatch(loadingSlice.actions.queryFinished());
        } catch {
          deleteResult.undo();
          dispatch(loadingSlice.actions.queryFinished());
        }
      },
      invalidatesTags: ['DataGrids']
    })
  })
});

export const {
  useGetDataGridsQuery,
  useGetDataGridQuery,
  useCreateDataGridMutation,
  useDeleteDataGridMutation,
  useGetDataGridRowsQuery,
  useCreateDataGridRowMutation,
  useUpdateDataGridRowMutation,
  useDeleteDataGridRowMutation
} = resourceApiSlice;

const selectDataGridsData = createSelector(
  resourceApiSlice.endpoints?.getDataGrids.select(),
  (dataGridResult) => dataGridResult.data ?? []
);

export const selectDataGridById = (id: string) =>
  createSelector(selectDataGridsData, (dataGrids: DataGridItemDto[]) =>
    dataGrids.find((dataGrid) => dataGrid.id === id)
  );
