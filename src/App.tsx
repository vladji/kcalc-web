import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Contacts } from './pages/Contacts';
import { ErrorPage } from './pages/ErrorPage';
import { Login } from './Admin/pages/Login';
import { AdminHome } from './Admin/pages/AdminHome';
import { Products } from './Admin/pages/Products';
import { Recipes } from './Admin/pages/Recipes';
import { UserProducts } from './Admin/pages/UserProducts';

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
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/admin-products',
    element: <Products />,
  },
  {
    path: '/admin-recipes',
    element: <Recipes />,
  },
  {
    path: '/admin-user-products',
    element: <UserProducts />,
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
