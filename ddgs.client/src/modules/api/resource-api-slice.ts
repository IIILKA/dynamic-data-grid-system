import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import TableEntity from '../seed-data/table-entity.ts';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { TableCellType } from '../seed-data/table-cell-type.ts';
import { RootState } from '../../app/store';
import { loadingSlice } from '../loading/loading-slice.ts';
import { AppBaseQuery, getBaseQuery } from './api-utils.ts';

export interface DataGridEntity {
  id: string;
  name: string;
  ownerUsername: string;
}

export interface DataGridCreatePayload {
  name: string;
}

interface NormalizedTestEntitiesCache {
  ids: string[];
  entities: { [id: string]: TableEntity };
}

interface UpdateDataGridEntityArgs {
  id: string;
  entityUpdatePayload: DataGridEntityPayload;
}

interface DataGridEntityPayload {
  [key: string]: TableCellType;

  index: number;
}

export const tableEntityAdapter = createEntityAdapter<TableEntity>({
  sortComparer: (a, b) => a.index - b.index
});

const testInitialState = tableEntityAdapter.getInitialState();

export const resourceApiSlice = createApi({
  reducerPath: 'resourceApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_API_URL, true),
  tagTypes: ['Tests', 'DataGrids'],
  endpoints: (builder: EndpointBuilder<AppBaseQuery, string, 'resourceApi'>) => ({
    getDataGrids: builder.query<DataGridEntity[], void>({
      query: () => '/data-grid',
      providesTags: ['DataGrids']
    }),
    createDataGrid: builder.mutation<void, DataGridCreatePayload>({
      query: (entityCreatePayload) => ({
        url: '/data-grid',
        method: 'POST',
        body: entityCreatePayload
      }),
      invalidatesTags: ['DataGrids']
    }),
    deleteDataGrid: builder.mutation<void, string>({
      query: (dataGridId) => ({
        url: '/data-grid/' + dataGridId,
        method: 'DELETE'
      }),
      async onQueryStarted(dataGridId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          resourceApiSlice.util?.updateQueryData<DataGridEntity[], void>(
            'getDataGrids',
            undefined,
            (draft) => {
              dispatch(loadingSlice.actions.queryStarted());

              const draftDataGrids = draft as DataGridEntity[];

              const index = draftDataGrids?.findIndex(
                (dataGrid: DataGridEntity) => dataGrid.id === dataGridId
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
    getTests: builder.query<NormalizedTestEntitiesCache, void>({
      query: () => '/test',
      transformResponse(baseQueryReturnValue: TableEntity[]) {
        return tableEntityAdapter.setAll(testInitialState, baseQueryReturnValue);
      },
      providesTags: ['Tests']
    }),
    createTest: builder.mutation<void, DataGridEntityPayload>({
      query: (entityCreatePayload) => ({
        url: '/test',
        method: 'POST',
        body: entityCreatePayload
      }),
      async onQueryStarted(entityCreatePayload, { dispatch, queryFulfilled }) {
        const createResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());

            tableEntityAdapter.addOne(draft, { ...entityCreatePayload, id: '' });
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
      invalidatesTags: ['Tests']
    }),
    updateTest: builder.mutation<void, UpdateDataGridEntityArgs>({
      query: ({ id, entityUpdatePayload }) => ({
        url: '/test/' + id,
        method: 'PUT',
        body: entityUpdatePayload
      }),
      async onQueryStarted({ id, entityUpdatePayload }, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());

            tableEntityAdapter.updateOne(draft, { id, changes: entityUpdatePayload });
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
      invalidatesTags: ['Tests']
    }),
    deleteTest: builder.mutation({
      query: (testId) => ({
        url: '/test/' + testId,
        method: 'DELETE'
      }),
      async onQueryStarted(testId, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          resourceApiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(loadingSlice.actions.queryStarted());
            tableEntityAdapter.removeOne(draft, testId);
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
      invalidatesTags: ['Tests']
    })
  })
});

export const {
  useGetTestsQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useGetDataGridsQuery,
  useCreateDataGridMutation,
  useDeleteDataGridMutation
} = resourceApiSlice;

const selectTestsData = createSelector(
  resourceApiSlice.endpoints?.getTests.select(),
  (testsResult) => testsResult.data
);

export const { selectAll: selectAllTests, selectById: selectTestById } =
  tableEntityAdapter.getSelectors<RootState>((state) => selectTestsData(state) ?? testInitialState);

const selectDataGridsData = createSelector(
  resourceApiSlice.endpoints?.getDataGrids.select(),
  (dataGridResult) => dataGridResult.data ?? []
);

export const selectDataGridById = (id: string) =>
  createSelector(selectDataGridsData, (dataGrids: DataGridEntity[]) =>
    dataGrids.find((dataGrid) => dataGrid.id === id)
  );
