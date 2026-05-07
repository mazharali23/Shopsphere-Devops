import { Link } from "react-router-dom";
import type { Product } from "../redux/slices/productsSlice";
import { formatMoney } from "../utils/money";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No image</div>
        )}
      </div>
      <div className="space-y-1 p-4">
        <div className="line-clamp-1 font-medium text-white">{product.name}</div>
        <div className="text-sm text-slate-300">{formatMoney(product.price_cents, product.currency)}</div>
        <div className="text-xs text-slate-400">{product.inventory_count} in stock</div>
      </div>
    </Link>
  );
}

