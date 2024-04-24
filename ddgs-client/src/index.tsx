import './index.css';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './AppRouter';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <RouterProvider router={appRouter} />
    </StrictMode>
);
