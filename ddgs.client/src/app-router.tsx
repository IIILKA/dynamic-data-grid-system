import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { Routes } from './modules/navigation/routes.ts';
import BaseLayout from './modules/layout/base-layout.tsx';
import LayoutWithRequiredAuth from './modules/layout/layout-with-required-auth.tsx';
import LoginPage from './modules/auth/pages/login-page.tsx';
import SignupPage from './modules/auth/pages/signup-page.tsx';
import ErrorPage from './modules/error-handling/components/error-page.tsx';
import OauthCallbackPage from './modules/auth/pages/oauth-callback-page.tsx';
import OauthExternalProviderCallbackPage from './modules/auth/pages/oauth-external-provider-callback-page.tsx';
import DataGridsPage from './modules/data-grids/data-grids-page.tsx';
import DataGridPage from './modules/data-grid/data-grid-page.tsx';

const baseLayoutRoutes: RouteObject[] = [
  {
    path: Routes.Login,
    element: <LoginPage />
  },
  {
    path: Routes.Signup,
    element: <SignupPage />
  },
  {
    path: Routes.Unauthorized,
    element: (
      <ErrorPage
        httpCode={401}
        title='You are unauthorized'
        description='You are attempting to access a resource that requires authentication. Please log in with your credentials to continue and gain access to the requested resource.'
        buttonText='Log in'
        buttonHref={Routes.Login}
      />
    )
  },
  {
    path: Routes.Forbidden,
    element: (
      <ErrorPage
        httpCode={403}
        title='Access denied'
        description='You do not have the necessary permissions to access this page. This could be due to insufficient user privileges or restricted content.'
        buttonText='Home'
        buttonHref={Routes.Home}
      />
    )
  },
  {
    path: '*',
    element: (
      <ErrorPage
        httpCode={404}
        title='Page not found'
        description="Sorry, we can't find the page you are looking for. You may have typed the address incorrectly or you may have used an outdated link."
        buttonText='Home'
        buttonHref={Routes.Home}
      />
    )
  }
];

const layoutWithContextElementsRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={Routes.DataGrids} />
  },
  {
    path: Routes.DataGrids,
    element: <DataGridsPage />
  },
  {
    path: Routes.DataGrid,
    element: <DataGridPage />
  }
];

export const appRouter = createBrowserRouter([
  {
    path: '',
    element: <BaseLayout />,
    children: baseLayoutRoutes
  },
  {
    path: '',
    element: <LayoutWithRequiredAuth />,
    children: layoutWithContextElementsRoutes
  },
  {
    path: Routes.OAuthCallback,
    element: <OauthCallbackPage />
  },
  {
    path: Routes.OAuthExternalProviderCallback,
    element: <OauthExternalProviderCallbackPage />
  }
]);
