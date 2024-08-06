import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { Routes } from './modules/navigation/Routes';
import BaseLayout from './modules/layout/BaseLayout';
import LayoutWithRequiredAuth from './modules/layout/LayoutWithRequiredAuth.tsx';
import TestPage from './pages/TestPage.tsx';
import LoginPage from './modules/auth/LoginPage.tsx';
import SignupPage from './modules/auth/SignupPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import OAuthCallbackPage from './modules/auth/OAuthCallbackPage.tsx';
import OAuthExternalProviderCallbackPage from './modules/auth/OAuthExternalProviderCallbackPage.tsx';

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
    element: <Navigate to={Routes.Test} />
  },
  {
    path: Routes.Test,
    element: <TestPage />
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
    element: <OAuthCallbackPage />
  },
  {
    path: Routes.OAuthExternalProviderCallback,
    element: <OAuthExternalProviderCallbackPage />
  }
]);
