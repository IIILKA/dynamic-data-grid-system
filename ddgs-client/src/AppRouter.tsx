import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { Routes } from './modules/navigation/Routes';
import { BaseLayout } from './modules/layout/BaseLayout';
import { TestPage } from "./pages/test-page/TestPage";

const routes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={Routes.Test} />
    },
    {
        path: '/test',
        element: <TestPage />
    }
];

export const appRouter = createBrowserRouter([
    {
        path: '',
        element: <BaseLayout />,
        children: routes
    }
]);
