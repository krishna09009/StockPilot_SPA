import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled application error', error, info);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center p-6">
          <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-slate-600">
              The application hit an unexpected error. Please refresh and try
              again.
            </p>
            <button
              className="mt-6 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700"
              onClick={() => window.location.reload()}
              type="button"
            >
              Refresh page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
