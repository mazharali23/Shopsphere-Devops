import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCartThunk, removeCartThunk } from "../redux/slices/cartSlice";
import { formatMoney } from "../utils/money";

export function CartPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.cart);
  const user = useAppSelector((s) => s.auth.user);

  useEffect(() => {
    if (user) dispatch(fetchCartThunk());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="text-white">Please login to view your cart.</div>
        <Link className="mt-4 inline-block rounded-xl bg-violet-600 px-4 py-2.5 text-sm text-white" to="/login">
          Go to login
        </Link>
      </div>
    );
  }

  if (status === "loading") return <Spinner label="Loading cart" />;

  const currency = items[0]?.currency || "USD";
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price_cents, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300">
          Your cart is empty.{" "}
          <Link to="/products" className="text-white hover:underline">
            Browse products
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-white">{item.name}</div>
                  <div className="text-sm text-slate-300">
                    {item.quantity} × {formatMoney(item.price_cents, item.currency)}
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeCartThunk(item.product_id))}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Subtotal</span>
              <span className="font-medium text-white">{formatMoney(subtotal, currency)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-4 block rounded-xl bg-violet-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-500"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

