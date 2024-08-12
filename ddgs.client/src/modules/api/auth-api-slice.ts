import { createApi, EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logoutAsync, sendOAuthRequestAsync } from '../auth/AuthService.ts';
import { Routes } from '../navigation/Routes.ts';
import { addErrors, dataGridSlice } from '../data-grid/dataGridSlice.ts';
import ErrorViewModels from '../error-handling/error-view-models.ts';

interface LoginRequestDto {
  email: string;
  password: string;
}

interface SignupRequestDto {
  username: string;
  email: string;
  password: string;
}

const baseQuery = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_AUTHORITY
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

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder: EndpointBuilder<unknown, unknown, unknown>) => ({
    logIn: builder.query<LoginRequestDto, void>({
      query: (loginRequestDto) => ({
        url: '/authenticate',
        method: 'POST',
        body: loginRequestDto,
        credentials: 'include'
      }),
      async onQueryStarted(loginRequestDto, { dispatch, queryFulfilled }) {
        dispatch(dataGridSlice.actions.queryStarted());
        try {
          await queryFulfilled;
          await sendOAuthRequestAsync();
        } finally {
          dispatch(dataGridSlice.actions.queryFinished());
        }
      }
    }),
    signUp: builder.query<SignupRequestDto, void>({
      query: (signupRequestDto) => ({
        url: '/user/register',
        method: 'POST',
        body: signupRequestDto
      }),
      async onQueryStarted(signupRequestDto, { dispatch, queryFulfilled }) {
        dispatch(dataGridSlice.actions.queryStarted());
        try {
          await queryFulfilled;
        } finally {
          dispatch(dataGridSlice.actions.queryFinished());
        }
      }
    })
  })
});

export const { useLazyLogInQuery, useLazySignUpQuery } = authApiSlice;
export const { endpoints } = authApiSlice; // Экспортируем endpoints
