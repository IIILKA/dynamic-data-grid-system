import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { getAccessTokenAsync, logoutAsync } from '../auth/auth-service.ts';
import { addError } from '../error-handling/error-slice.ts';
import ErrorModels from '../error-handling/error-models.ts';
import ErrorModel from '../error-handling/models/error-model.ts';
import { Routes } from '../navigation/routes.ts';

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

    //TODO: refactor response type in back and front (and typing it)
    const { error } = baseResult as {
      error: { status: number | string; data?: { errors?: unknown } };
    };

    if (error) {
      if (error.status === 401) {
        await logoutAsync(Routes.Unauthorized);
      } else if (error.status === 403) {
        window.location.href = Routes.Forbidden;
      } else if (error.status === 'FETCH_ERROR') {
        api.dispatch(addError(ErrorModels.serverUnavailable));
      } else if (
        error.status === 400 &&
        error.data?.errors &&
        Array.isArray(error.data.errors) &&
        error.data.errors.every((_) => typeof _ === 'string')
      ) {
        const errorsViewModels: ErrorModel[] = error.data.errors.map((error) => ({
          id: 0,
          title: 'Validation error',
          description: error
        }));
        errorsViewModels.forEach((errorViewModel) => api.dispatch(addError(errorViewModel)));
      } else if (error.status === 400 || error.status === 500) {
        api.dispatch(addError(ErrorModels.unknownError));
      }
    }

    return baseResult;
  };
}
