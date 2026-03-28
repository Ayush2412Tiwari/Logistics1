import { Edit3, Trash2, Package } from 'lucide-react';
import Button from '../ui/Button';

export default function ProductCard({ product, isSelected, onToggleSelect, onEdit, onDelete }) {
  return (
    <div 
      className={`glass-card-hover relative group bg-surface-900 border transition-all duration-300 shadow-operational overflow-hidden flex flex-col rounded-xl
                  ${isSelected ? 'border-primary-500 bg-surface-800' : 'border-surface-800'}`}
    >
      <div className="p-4 flex-1">
        <label className="absolute top-4 right-4 z-10 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="peer sr-only"
          />
          <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center
                          ${isSelected ? 'bg-primary-500 border-primary-500' : 'bg-surface-800 border-surface-600'}`}>
            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
          </div>
        </label>

        <div className="flex gap-4 items-start">
          <div className="h-16 w-16 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center shrink-0 overflow-hidden shadow-inner flex-none">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <Package size={24} className="text-surface-500" />
            )}
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <h3 className="font-semibold text-surface-100 line-clamp-1" title={product.name}>{product.name}</h3>
            <p className="text-[11px] text-surface-400 mt-1 line-clamp-1">Category: <span className="text-surface-200">{product.category}</span></p>
            <p className="text-[11px] text-surface-400 mt-0.5 line-clamp-1 flex items-center gap-1.5">
              Status: <span className="text-success-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success-500" />In Warehouse</span>
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-surface-800 flex items-center justify-between">
          <p className="font-bold text-surface-100 tracking-wide text-lg">
            ₹ {Number(product.price).toLocaleString('en-US')}
          </p>
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="sm" onClick={onEdit} className="px-2 py-1.5 h-auto hover:text-primary-400">
              <Edit3 size={14} />
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete} className="px-2 py-1.5 h-auto">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
