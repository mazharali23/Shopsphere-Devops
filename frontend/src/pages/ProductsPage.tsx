import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { ProductCard } from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProductsThunk } from "../redux/slices/productsSlice";

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  if (status === "loading") return <Spinner label="Loading products" />;
  if (status === "failed") return <div className="text-red-300">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Products</h2>
          <p className="text-sm text-slate-300">Curated essentials from ShopSphere.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

