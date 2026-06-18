import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <p className="font-semibold text-brand-600">Inventory, under control</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-950">
        Make confident stock decisions.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        StockPilot gives your team a clear view of inventory and the signals to
        act before stock becomes a problem.
      </p>
      <Link
        className="mt-8 inline-block rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
        to="/sign-in"
      >
        Sign in
      </Link>
    </section>
  );
}
