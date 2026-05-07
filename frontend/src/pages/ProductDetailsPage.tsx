import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProductThunk } from "../redux/slices/productsSlice";
import { formatMoney } from "../utils/money";
import { upsertCartThunk } from "../redux/slices/cartSlice";

export function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.products.selected);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) dispatch(fetchProductThunk(id));
  }, [dispatch, id]);

  const canAdd = useMemo(() => {
    if (!product) return false;
    return qty > 0 && qty <= product.inventory_count;
  }, [product, qty]);

  if (!product) return <Spinner label="Loading product" />;

  return (
    <div className="space-y-6">
      <Link to="/products" className="text-sm text-slate-300 hover:text-white">
        ← Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center text-slate-400">No image</div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{product.name}</h1>
          <div className="text-slate-300">{product.description}</div>
          <div className="text-lg font-medium text-white">{formatMoney(product.price_cents, product.currency)}</div>
          <div className="text-sm text-slate-400">{product.inventory_count} in stock</div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-300">Qty</label>
            <input
              className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
              type="number"
              min={1}
              max={Math.min(99, product.inventory_count)}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className="flex gap-3">
            <button
              disabled={!canAdd}
              onClick={() => dispatch(upsertCartThunk({ productId: product.id, quantity: qty }))}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to cart
            </button>
            <Link to="/cart" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">
              Go to cart
            </Link>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-300">
            Note: this starter uses a simplified “paid” order on checkout (no payment gateway).
          </div>
        </div>
      </div>
    </div>
  );
}

