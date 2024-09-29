import { EndpointDefinitions, QueryKeys } from '@reduxjs/toolkit/query';
import DataGridModel from '../../data-grid/models/data-grid-model.ts';
import DataGridLightModel from '../../data-grids/models/data-grid-light-model.ts';
import { loadingSlice } from '../../loading/loading-slice.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridAddColumnArgs from '../args/data-grid-add-column-args.ts';
import DataGridCreateArgs from '../args/data-grid-create-args.ts';
import DataGridDeleteArgs from '../args/data-grid-delete-args.ts';
import DataGridGetArgs from '../args/data-grid-get-args.ts';
import DataGridRemoveColumnArgs from '../args/data-grid-remove-column-args.ts';
import DataGridDto from '../dto/data-grid-dto.ts';
import DataGridLightDto from '../dto/data-grid-light-dto.ts';
import { resourceApiSlice } from '../resource-api-slice.ts';

export default function addDataGridEndpoints() {
  resourceApiSlice.injectEndpoints!({
    endpoints: (builder) => ({
      getDataGrids: builder.query<DataGridLightModel[], void>({
        query: () => '/data-grid',
        transformResponse: (dataGridItemDtos: DataGridLightDto[]): DataGridLightModel[] => {
          return dataGridItemDtos
            .map((dataGridItemDto) =>
              mapper.map<DataGridLightDto, DataGridLightModel>(
                dataGridItemDto,
                'DataGridLightDto',
                'DataGridLightModel'
              )
            )
            .reverse();
        },
        providesTags: ['DataGrids']
      }),
      getDataGrid: builder.query<DataGridModel, DataGridGetArgs>({
        query: (args: DataGridGetArgs) => `/data-grid/${args.id}`,
        transformResponse: (dataGridDto: DataGridDto): DataGridModel => {
          return mapper.map<DataGridDto, DataGridModel>(
            dataGridDto,
            'DataGridDto',
            'DataGridModel'
          );
        },
        providesTags: ['DataGrids']
      }),
      createDataGrid: builder.mutation<void, DataGridCreateArgs>({
        query: (args: DataGridCreateArgs) => ({
          url: '/data-grid',
          method: 'POST',
          body: args.body
        }),
        async onQueryStarted(args: DataGridCreateArgs, { dispatch, queryFulfilled }) {
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
      deleteDataGrid: builder.mutation<void, DataGridDeleteArgs>({
        query: (args: DataGridDeleteArgs) => ({
          url: `/data-grid/${args.id}`,
          method: 'DELETE'
        }),
        async onQueryStarted(args: DataGridDeleteArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.queryStarted());
          const deleteResult = dispatch(
            resourceApiSlice.util?.updateQueryData(
              'getDataGrids' as QueryKeys<EndpointDefinitions>,
              undefined,
              (draft) => {
                const draftDataGrids = draft as DataGridLightModel[];
                const index = draftDataGrids?.findIndex(
                  (dataGrid: DataGridLightModel) => dataGrid.id === args.id
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
      addColumnToDataGrid: builder.mutation<void, DataGridAddColumnArgs>({
        query: (args: DataGridAddColumnArgs) => ({
          url: `/data-grid/${args.id}/add-col`,
          method: 'PATCH',
          body: args.body
        }),
        async onQueryStarted(args: DataGridAddColumnArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.columnQueryStarted());
          try {
            await queryFulfilled;
            dispatch(loadingSlice.actions.columnQueryFinished());
          } catch {
            dispatch(loadingSlice.actions.columnQueryFinished());
          }
        },
        invalidatesTags: ['DataGrids', 'DataGridRows']
      }),
      removeColumnFromDataGrid: builder.mutation<void, DataGridRemoveColumnArgs>({
        query: (args: DataGridRemoveColumnArgs) => ({
          url: `/data-grid/${args.id}/remove-col/${args.colName}`,
          method: 'PATCH'
        }),
        async onQueryStarted(args: DataGridRemoveColumnArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.columnQueryStarted());
          try {
            await queryFulfilled;
            dispatch(loadingSlice.actions.columnQueryFinished());
          } catch {
            dispatch(loadingSlice.actions.columnQueryFinished());
          }
        },
        invalidatesTags: ['DataGrids', 'DataGridRows']
      })
    })
  });
}
