import './index.css';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app-router.tsx';
import { Provider } from 'react-redux';
import store from './app/store';
import addMapperProfiles from './modules/mapper/mapper-profiles-configuration.ts';

const root = createRoot(document.getElementById('root') as HTMLElement);

addMapperProfiles();

root.render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={appRouter} />
    </StrictMode>
  </Provider>
);
