import { createEntityAdapter } from '@reduxjs/toolkit';
import { EndpointDefinitions, QueryKeys } from '@reduxjs/toolkit/query';
import DataGridRowModel from '../../data-grid/models/data-grid-row-model.ts';
import NormalizedDataGridRowModels from '../../data-grid/models/normalized-data-grid-row-models.ts';
import { loadingSlice } from '../../loading/loading-slice.ts';
import mapper from '../../mapper/mapper.ts';
import DataGridRowCreateArgs from '../args/data-grid-row-create-args.ts';
import DataGridRowDeleteArgs from '../args/data-grid-row-delete-args.ts';
import DataGridRowGetArgs from '../args/data-grid-row-get-args.ts';
import DataGridRowUpdateArgs from '../args/data-grid-row-update-args.ts';
import { resourceApiSlice } from '../resource-api-slice.ts';
import DataGridRowDto from './../dto/data-grid-row-dto.ts';

export function addDataGridRowEndpoints() {
  const dataGridRowAdapter = createEntityAdapter<DataGridRowModel>();
  resourceApiSlice.injectEndpoints!({
    endpoints: (builder) => ({
      getDataGridRows: builder.query<NormalizedDataGridRowModels, DataGridRowGetArgs>({
        query: (args: DataGridRowGetArgs) => `/data-grid/${args.dataGridId}/row`,
        transformResponse(dataGridRowDtos: DataGridRowDto[]) {
          const dataGridRows = dataGridRowDtos.map((dataGridRowDto) =>
            mapper.map<DataGridRowDto, DataGridRowModel>(
              dataGridRowDto,
              'DataGridRowDto',
              'DataGridRowModel'
            )
          );
          return dataGridRowAdapter.setAll(dataGridRowAdapter.getInitialState(), dataGridRows);
        },
        providesTags: ['DataGridRows']
      }),
      createDataGridRow: builder.mutation<void, DataGridRowCreateArgs>({
        query: (args: DataGridRowCreateArgs) => ({
          url: `/data-grid/${args.dataGridId}/row`,
          method: 'POST',
          body: args.body
        }),
        async onQueryStarted(args: DataGridRowCreateArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.queryStarted());
          const createResult = dispatch(
            resourceApiSlice.util!.updateQueryData(
              'getDataGridRows' as QueryKeys<EndpointDefinitions>,
              { dataGridId: args.dataGridId },
              (draft) => {
                dataGridRowAdapter.addOne(draft, { id: '', rowData: args.body.rowData });
              }
            )
          );
          try {
            await queryFulfilled;
            dispatch(loadingSlice.actions.queryFinished());
          } catch {
            createResult.undo();
            dispatch(loadingSlice.actions.queryFinished());
          }
        },
        invalidatesTags: ['DataGridRows']
      }),
      updateDataGridRow: builder.mutation<void, DataGridRowUpdateArgs>({
        query: (args: DataGridRowUpdateArgs) => ({
          url: `/data-grid/${args.dataGridId}/row/${args.id}`,
          method: 'PUT',
          body: args.body
        }),
        async onQueryStarted(args: DataGridRowUpdateArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.queryStarted());
          const updateResult = dispatch(
            resourceApiSlice.util?.updateQueryData(
              'getDataGridRows' as QueryKeys<EndpointDefinitions>,
              { dataGridId: args.dataGridId },
              (draft) => {
                const normalizedDataGridRowEntities = draft as NormalizedDataGridRowModels;
                dataGridRowAdapter.updateOne(normalizedDataGridRowEntities, {
                  id: args.id,
                  changes: {
                    rowData: {
                      ...normalizedDataGridRowEntities.entities[args.id]?.rowData,
                      ...args.body.rowData
                    }
                  }
                });
              }
            )
          );
          try {
            await queryFulfilled;
            dispatch(loadingSlice.actions.queryFinished());
          } catch {
            updateResult.undo();
            dispatch(loadingSlice.actions.queryFinished());
          }
        },
        invalidatesTags: ['DataGridRows']
      }),
      deleteDataGridRow: builder.mutation<void, DataGridRowDeleteArgs>({
        query: (args: DataGridRowDeleteArgs) => ({
          url: `data-grid/${args.dataGridId}/row/${args.id}`,
          method: 'DELETE'
        }),
        async onQueryStarted(args: DataGridRowDeleteArgs, { dispatch, queryFulfilled }) {
          dispatch(loadingSlice.actions.queryStarted());
          const deleteResult = dispatch(
            resourceApiSlice.util?.updateQueryData(
              'getDataGridRows' as QueryKeys<EndpointDefinitions>,
              { dataGridId: args.dataGridId },
              (draft) => {
                dataGridRowAdapter.removeOne(draft, args.id);
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
        invalidatesTags: ['DataGridRows']
      })
    })
  });
}
