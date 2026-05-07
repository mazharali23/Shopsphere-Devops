import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchOrdersThunk } from "../redux/slices/ordersSlice";
import { formatMoney } from "../utils/money";

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (status === "loading") return <Spinner label="Loading orders" />;
  if (status === "failed") return <div className="text-red-300">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Orders</h1>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((o) => (
            <div key={o.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-300">
                  <span className="text-white">Order</span> {o.id}
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {o.status}
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-300">
                Total:{" "}
                <span className="font-medium text-white">{formatMoney(o.total_cents, o.currency)}</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {new Date(o.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

