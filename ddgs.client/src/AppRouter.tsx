import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { Routes } from './modules/navigation/Routes';
import BaseLayout from './modules/layout/BaseLayout';
import LayoutWithContextElements from './modules/layout/LayoutWithContextElements.tsx';
import TestPage from './pages/test-page/TestPage';
import LoginPage from './pages/test-page/LoginPage.tsx';
import SignupPage from './pages/test-page/SignupPage.tsx';

const baseLayoutRoutes: RouteObject[] = [
  {
    path: Routes.Login,
    element: <LoginPage />
  },
  {
    path: Routes.Signup,
    element: <SignupPage />
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
    element: <LayoutWithContextElements />,
    children: layoutWithContextElementsRoutes
  }
]);
