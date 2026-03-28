import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Edit3, Trash2, Package } from 'lucide-react';
import Button from '../ui/Button';

export default function ProductTable({ products, selectedIds, onToggleSelect, selectAll, clearSelection, onEdit, onDelete }) {
  const allSelected = products.length > 0 && products.every(p => selectedIds.includes(p._id));

  return (
    <div className="bg-surface-900/50 border border-surface-800 rounded-xl overflow-hidden shadow-operational w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 text-center">
              <input 
                type="checkbox" 
                className="rounded border-surface-700 bg-surface-800/50 text-primary-500 focus:ring-primary-500/50 cursor-pointer w-4 h-4 appearance-none checked:bg-primary-500 checked:border-primary-500 relative before:content-['✓'] before:absolute before:text-white before:text-[10px] before:left-[3px] before:top-0 before:opacity-0 checked:before:opacity-100"
                checked={allSelected}
                onChange={allSelected ? clearSelection : selectAll}
              />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} data-state={selectedIds.includes(product._id) ? "selected" : undefined}>
              <TableCell className="text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-surface-700 bg-surface-800/50 text-primary-500 focus:ring-primary-500/50 cursor-pointer w-4 h-4 appearance-none checked:bg-primary-500 checked:border-primary-500 relative before:content-['✓'] before:absolute before:text-white before:text-[10px] before:left-[3px] before:top-0 before:opacity-0 checked:before:opacity-100"
                  checked={selectedIds.includes(product._id)}
                  onChange={() => onToggleSelect(product._id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center overflow-hidden shrink-0">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <Package size={20} className="text-surface-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-surface-100 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-surface-400 line-clamp-1">{product.description || 'No description'}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded bg-surface-800 border border-surface-700 text-xs font-medium text-surface-300">
                  {product.category}
                </span>
              </TableCell>
              <TableCell>
                 <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success-400">
                   <span className="h-1.5 w-1.5 rounded-full bg-success-500"></span>
                   In Warehouse
                 </span>
              </TableCell>
              <TableCell className="font-medium text-surface-100">
                ₹ {Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="text-surface-400 hover:text-primary-400">
                  <Edit3 size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(product._id)} className="text-surface-400 hover:text-danger-400">
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
