import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { sendOAuthRequestAsync } from '../auth/auth-service.ts';
import { loadingSlice } from '../loading/loading-slice.ts';
import { AppBaseQuery, getBaseQuery } from './api-utils.ts';
import LoginArgs from './args/login-args.ts';
import SignupArgs from './args/signup-args.ts';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_AUTH_AUTHORITY),
  endpoints: (builder: EndpointBuilder<AppBaseQuery, string, 'authApi'>) => ({
    logIn: builder.mutation<void, LoginArgs>({
      query: (args: LoginArgs) => ({
        url: '/authenticate',
        method: 'POST',
        body: args.body,
        credentials: 'include'
      }),
      async onQueryStarted(args: LoginArgs, { dispatch, queryFulfilled }) {
        dispatch(loadingSlice.actions.queryStarted());
        try {
          await queryFulfilled;
          await sendOAuthRequestAsync();
        } finally {
          dispatch(loadingSlice.actions.queryFinished());
        }
      }
    }),
    signUp: builder.mutation<void, SignupArgs>({
      query: (args: SignupArgs) => ({
        url: '/user/register',
        method: 'POST',
        body: args.body
      }),
      async onQueryStarted(args: SignupArgs, { dispatch, queryFulfilled }) {
        dispatch(loadingSlice.actions.queryStarted());
        try {
          await queryFulfilled;
        } finally {
          dispatch(loadingSlice.actions.queryFinished());
        }
      }
    })
  })
});

export const { useLogInMutation, useSignUpMutation } = authApiSlice;
