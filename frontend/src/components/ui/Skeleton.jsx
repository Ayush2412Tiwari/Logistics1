export default function Skeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton rounded-xl ${className}`} />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-6 w-20 rounded-lg" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-8 rounded-lg" />
            <div className="skeleton h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
