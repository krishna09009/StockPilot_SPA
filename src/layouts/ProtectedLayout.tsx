import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

import { authStorage } from '@/lib/auth';

export function ProtectedLayout() {
  const location = useLocation();

  if (!authStorage.isAuthenticated()) {
    return <Navigate replace state={{ from: location }} to="/sign-in" />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link className="text-xl font-bold text-brand-700" to="/app">
            StockPilot
          </Link>
          <nav aria-label="Primary navigation">
            <Link
              className="font-medium text-slate-600 hover:text-slate-950"
              to="/app"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
