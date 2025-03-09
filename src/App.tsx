import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import React from 'react';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Watch } from './pages/Watch';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <h2>ERROR</h2>,
    children: [

      {
        path: '/',
        element: <Home />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/watch/:id',
        element: <Watch />
      }
    ]
  }
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
