import { Package } from 'lucide-react';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="p-6 rounded-2xl bg-surface-800/30 border border-surface-700/30 mb-6">
        <Package size={48} className="text-surface-500" />
      </div>
      <h3 className="text-xl font-semibold text-surface-200 mb-2">{title}</h3>
      <p className="text-surface-400 text-center max-w-md mb-6">{description}</p>
      {action && action}
    </div>
  );
}
