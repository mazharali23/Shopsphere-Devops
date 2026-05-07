import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../redux/slices/authSlice";

export function Navbar() {
  const user = useAppSelector((s) => s.auth.user);
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          ShopSphere
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-200">
          <NavLink to="/products" className={({ isActive }) => (isActive ? "text-white" : "hover:text-white")}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "text-white" : "hover:text-white")}>
            Cart
            {cartCount > 0 ? (
              <span className="ml-2 rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">{cartCount}</span>
            ) : null}
          </NavLink>

          {user ? (
            <>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? "text-white" : "hover:text-white")}>
                Orders
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-white" : "hover:text-white")}>
                Profile
              </NavLink>
              <button
                onClick={() => dispatch(logout())}
                className="rounded-lg border border-white/10 px-3 py-1.5 hover:bg-white/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "text-white" : "hover:text-white")}>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-lg bg-violet-600 px-3 py-1.5 font-medium text-white hover:bg-violet-500"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

