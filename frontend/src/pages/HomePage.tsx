import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div className="space-y-5">
        <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          Modern e-commerce starter with clean architecture
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          ShopSphere: fast shopping, clean UX, scalable backend.
        </h1>
        <p className="text-slate-300">
          Browse products, add to cart, checkout, and track orders — powered by Express + Postgres with JWT auth.
        </p>
        <div className="flex gap-3">
          <Link
            to="/products"
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
          >
            Browse products
          </Link>
          <Link to="/signup" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">
            Create account
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
        <div className="space-y-3">
          <div className="text-sm text-slate-300">What’s included</div>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>JWT auth + protected routes</li>
            <li>Products, cart, orders APIs</li>
            <li>Redux Toolkit + Axios service</li>
            <li>Docker Compose: frontend + backend + postgres</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

