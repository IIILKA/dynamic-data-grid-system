import './index.scss';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from "primereact/api";
import { appRouter } from './AppRouter';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <PrimeReactProvider>
            <RouterProvider router={appRouter} />
        </PrimeReactProvider>
    </StrictMode>
);
