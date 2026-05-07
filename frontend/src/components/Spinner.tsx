export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-200">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

