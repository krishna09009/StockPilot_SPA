import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedLayout } from '@/layouts/ProtectedLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { SignInPage } from '@/pages/SignInPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: 'app',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
