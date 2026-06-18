import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { authStorage } from '@/lib/auth';

interface SignInLocationState {
  from?: { pathname?: string };
}

export function SignInPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as SignInLocationState | null;

  if (authStorage.isAuthenticated()) {
    return <Navigate replace to="/app" />;
  }

  const handleDemoSignIn = (): void => {
    authStorage.setToken('demo-token');
    void navigate(state?.from?.pathname ?? '/app', { replace: true });
  };

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-slate-600">
          Authentication UI will connect to the API in a dedicated feature.
        </p>
        <button
          className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          onClick={handleDemoSignIn}
          type="button"
        >
          Enter demo workspace
        </button>
      </div>
    </section>
  );
}
