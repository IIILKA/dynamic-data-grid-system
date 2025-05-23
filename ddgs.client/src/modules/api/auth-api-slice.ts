import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { sendOAuthRequestAsync } from '../auth/auth-service.ts';
import { loadingSlice } from '../loading/loading-slice.ts';
import LoginRequestDto from './dto/login-request-dto.ts';
import SignupRequestDto from './dto/signup-request-dto.ts';
import { AppBaseQuery, getBaseQuery } from './api-utils.ts';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: getBaseQuery(import.meta.env.VITE_AUTH_AUTHORITY),
  endpoints: (builder: EndpointBuilder<AppBaseQuery, string, 'authApi'>) => ({
    logIn: builder.mutation<void, LoginRequestDto>({
      query: (loginRequestDto) => ({
        url: '/authenticate',
        method: 'POST',
        body: loginRequestDto,
        credentials: 'include'
      }),
      async onQueryStarted(loginRequestDto, { dispatch, queryFulfilled }) {
        dispatch(loadingSlice.actions.queryStarted());
        try {
          await queryFulfilled;
          await sendOAuthRequestAsync();
        } finally {
          dispatch(loadingSlice.actions.queryFinished());
        }
      }
    }),
    signUp: builder.mutation<void, SignupRequestDto>({
      query: (signupRequestDto) => ({
        url: '/user/register',
        method: 'POST',
        body: signupRequestDto
      }),
      async onQueryStarted(signupRequestDto, { dispatch, queryFulfilled }) {
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
