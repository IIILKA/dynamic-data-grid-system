import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { getAccessTokenAsync, logoutAsync } from '../auth/auth-service.ts';
import { Routes } from '../navigation/routes.ts';
import { addError } from '../error-handling/error-slice.ts';
import ErrorViewModels from '../error-handling/error-view-models.ts';
import ErrorViewModel from '../error-handling/error-view-model.ts';

export type AppBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

export function getBaseQuery(baseUrl: string, includeAuthHeaders: boolean = false): AppBaseQuery {
  return async (args, api, extraOptions) => {
    const baseResult = await fetchBaseQuery({
      baseUrl: baseUrl,
      ...(includeAuthHeaders && {
        prepareHeaders: async (headers) => {
          const token = await getAccessTokenAsync();
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        }
      })
    })(args, api, extraOptions);

    if (baseResult?.error) {
      //TODO: Refactor
      const error = baseResult.error as { status: number | string; data?: { errors?: unknown } };

      if (error.status === 401) {
        await logoutAsync(Routes.Unauthorized);
      } else if (error.status === 403) {
        window.location.href = Routes.Forbidden;
      } else if (error.status === 'FETCH_ERROR') {
        api.dispatch(addError(ErrorViewModels.serverUnavailable));
      } else if (
        error.status === 400 &&
        error.data?.errors &&
        Array.isArray(error.data.errors) &&
        error.data.errors.every((_) => typeof _ === 'string')
      ) {
        const errorsViewModels: ErrorViewModel[] = error.data.errors.map((error) => ({
          id: 0,
          title: 'Validation error',
          description: error
        }));
        errorsViewModels.forEach((errorViewModel) => api.dispatch(addError(errorViewModel)));
      } else if (error.status === 400 || error.status === 500) {
        api.dispatch(addError(ErrorViewModels.unknownError));
      }
    }

    return baseResult;
  };
}
