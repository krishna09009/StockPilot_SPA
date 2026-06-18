import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <section>
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <Link className="mt-6 inline-block font-semibold text-brand-700" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
