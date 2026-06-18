import { createBrowserRouter } from 'react-router-dom';

import { ProtectedLayout } from '@/layouts/ProtectedLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SignInPage } from '@/pages/SignInPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignInPage /> },
    ],
  },
  {
    path: 'app',
    element: <ProtectedLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  { path: '*', element: <NotFoundPage /> },
]);
