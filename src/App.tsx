import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Contacts } from './pages/Contacts';
import { ErrorPage } from './pages/ErrorPage';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { AdminProducts } from './pages/AdminProducts';
import { AdminRecipes } from './pages/AdminRecipes';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/admin-login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin-products',
    element: <AdminProducts />,
  },
  {
    path: '/admin-recipes',
    element: <AdminRecipes />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
