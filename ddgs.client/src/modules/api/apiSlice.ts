import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TableEntity from '../seed-data/TableEntity';
import { addErrors, dataGridSlice } from '../data-grid/dataGridSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { TableCellType } from '../seed-data/TableCellType';
import { RootState } from '../../app/store';
import { getAccessTokenAsync, logoutAsync } from '../auth/AuthService.ts';
import { Routes } from '../navigation/Routes.ts';
import ErrorViewModels from '../error-handling/error-view-models.ts';

interface NormalizedDataGridEntitiesCache {
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

const dataGridInitialState = tableEntityAdapter.getInitialState();

const baseQuery = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers) => {
      const token = await getAccessTokenAsync();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
  })(args, api, extraOptions);

  if (baseResult?.error) {
    const error = baseResult.error;

    if (error.status === 401) {
      await logoutAsync(Routes.Unauthorized);
    } else if (error.status === 403) {
      window.location.href = Routes.Forbidden;
    } else if (error.status === 'FETCH_ERROR') {
      api.dispatch(addErrors(ErrorViewModels.serverUnavailable));
    } else {
      api.dispatch(addErrors(ErrorViewModels.unknownError));
    }
  }

  return baseResult;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Tests'],
  //TODO: refactor, remove unknown
  endpoints: (builder: EndpointBuilder<unknown, unknown, unknown>) => ({
    getTests: builder.query<NormalizedDataGridEntitiesCache, void>({
      query: () => '/test',
      transformResponse(baseQueryReturnValue: TableEntity[]) {
        return tableEntityAdapter.setAll(dataGridInitialState, baseQueryReturnValue);
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
          apiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(dataGridSlice.actions.queryStarted());

            tableEntityAdapter.addOne(draft, { ...entityCreatePayload, id: '' });
          })
        );
        try {
          await queryFulfilled;
          dispatch(dataGridSlice.actions.queryFinished());
        } catch {
          createResult.undo();
          dispatch(dataGridSlice.actions.queryFinished());
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
          apiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(dataGridSlice.actions.queryStarted());

            tableEntityAdapter.updateOne(draft, { id, changes: entityUpdatePayload });
          })
        );
        try {
          await queryFulfilled;
          dispatch(dataGridSlice.actions.queryFinished());
        } catch {
          updateResult.undo();
          dispatch(dataGridSlice.actions.queryFinished());
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
          apiSlice.util?.updateQueryData('getTests', undefined, (draft) => {
            dispatch(dataGridSlice.actions.queryStarted());
            tableEntityAdapter.removeOne(draft, testId);
          })
        );
        try {
          await queryFulfilled;
          dispatch(dataGridSlice.actions.queryFinished());
        } catch {
          deleteResult.undo();
          dispatch(dataGridSlice.actions.queryFinished());
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
  useDeleteTestMutation
} = apiSlice;

const selectTestsData = createSelector(
  apiSlice.endpoints?.getTests.select(),
  (testsResult) => testsResult.data
);

export const { selectAll: selectAllTests, selectById: selectTestById } =
  tableEntityAdapter.getSelectors<RootState>(
    (state) => selectTestsData(state) ?? dataGridInitialState
  );
