import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Trash2, CheckSquare, XSquare, Package, Grid as GridIcon, List as ListIcon } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import ProductCard from '../components/product/ProductCard';
import ProductTable from '../components/product/ProductTable';
import ProductForm from '../components/product/ProductForm';
import ConfirmModal from '../components/ui/ConfirmModal';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import useProductStore from '../store/productStore';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Food & Beverages',
  'Furniture',
  'Automotive',
  'Pharmaceuticals',
  'Raw Materials',
  'Machinery',
  'Packaging',
  'Other',
];

export default function DashboardPage() {
  const {
    products,
    pagination,
    isLoading,
    selectedIds,
    filters,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkDelete,
    toggleSelect,
    selectAll,
    clearSelection,
    setSearch,
    setCategory,
    setPage,
  } = useProductStore();

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  useEffect(() => {
    fetchProducts();
  }, [filters.search, filters.category, filters.page, fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleSubmitProduct = async (formData) => {
    setIsSubmitting(true);
    let result;

    if (editingProduct) {
      result = await updateProduct(editingProduct._id, formData);
    } else {
      result = await createProduct(formData);
    }

    setIsSubmitting(false);

    if (result.success) {
      toast.success(editingProduct ? 'Product updated!' : 'Product created!');
      setShowProductModal(false);
      setEditingProduct(null);
    } else {
      toast.error(result.message);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    const result = await deleteProduct(deletingId);
    setIsSubmitting(false);
    setShowDeleteConfirm(false);
    setDeletingId(null);

    if (result.success) {
      toast.success('Product deleted!');
    } else {
      toast.error(result.message);
    }
  };

  const handleBulkDeleteClick = () => {
    if (selectedIds.length === 0) {
      toast.error('No products selected');
      return;
    }
    setShowBulkDeleteConfirm(true);
  };

  const handleConfirmBulkDelete = async () => {
    setIsSubmitting(true);
    const result = await bulkDelete(selectedIds);
    setIsSubmitting(false);
    setShowBulkDeleteConfirm(false);

    if (result.success) {
      toast.success('Selected products deleted!');
    } else {
      toast.error(result.message);
    }
  };

  const allSelected = products.length > 0 && products.every((p) => selectedIds.includes(p._id));

  return (
    <>
      <Topbar onAddProduct={handleAddProduct} />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {[
            { label: 'Total Products', value: pagination.total, icon: Package },
            { label: 'Categories', value: new Set(products.map((p) => p.category)).size, icon: Filter },
            { label: 'Selected', value: selectedIds.length, icon: CheckSquare },
            { label: 'Current Page', value: `${pagination.page}/${pagination.pages || 1}`, icon: Package },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-surface-900 border border-surface-800 rounded-xl p-5 flex items-center gap-4 shadow-operational hover:border-surface-700 transition-colors">
              <div className="p-3 rounded-lg bg-surface-950 border border-surface-800 shadow-inner">
                <Icon size={20} className="text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-100">{value}</p>
                <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 shadow-operational animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full xl:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Filter inventory..."
                  className="w-full bg-surface-950 border border-surface-800 rounded-lg pl-10 pr-4 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative shrink-0">
                <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
                <select
                  value={filters.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-[180px] bg-surface-950 border border-surface-800 rounded-lg pl-10 pr-8 py-2 text-sm text-surface-100 appearance-none focus:outline-none focus:border-primary-500 cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-surface-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-between w-full xl:w-auto">
              
              {/* Desktop View Toggle */}
              <div className="hidden sm:flex bg-surface-950 border border-surface-800 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-surface-800 text-primary-400 shadow-sm' : 'text-surface-500 hover:text-surface-300'}`}
                  title="Grid View"
                >
                  <GridIcon size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-surface-800 text-primary-400 shadow-sm' : 'text-surface-500 hover:text-surface-300'}`}
                  title="Table View"
                >
                  <ListIcon size={16} />
                </button>
              </div>

              <div className="h-6 w-px bg-surface-800 hidden sm:block mx-1" />

              {/* Bulk Actions */}
              <div className="flex gap-2">
                {selectedIds.length > 0 && (
                  <div className="flex gap-2 animate-fade-in">
                    <button onClick={clearSelection} className="px-3 py-1.5 rounded-lg border border-surface-700 text-surface-300 hover:bg-surface-800 hover:text-surface-100 text-sm flex items-center gap-1.5 transition-colors">
                      <XSquare size={16} />
                      <span className="hidden sm:inline">Clear ({selectedIds.length})</span>
                    </button>
                    <button onClick={handleBulkDeleteClick} className="px-3 py-1.5 rounded-lg bg-danger-500/10 text-danger-400 border border-danger-500/20 hover:bg-danger-500/20 hover:border-danger-500/30 text-sm flex items-center gap-1.5 transition-colors">
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                )}
                
                <button onClick={selectAll} className="px-3 py-1.5 rounded-lg border border-surface-700 bg-surface-800/50 text-surface-200 hover:bg-surface-800 hover:text-surface-100 text-sm flex items-center gap-1.5 transition-colors">
                  <CheckSquare size={16} />
                  <span className="hidden sm:inline">{allSelected ? 'Deselect All' : 'Select All'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Product List */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title={filters.search || filters.category !== 'All' ? 'No records found' : 'Inventory empty'}
            description={
              filters.search || filters.category !== 'All'
                ? 'Adjust search or filter criteria to view operations.'
                : 'Initialize your database by adding the first product entity.'
            }
            action={
              !(filters.search || filters.category !== 'All') && (
                <button onClick={handleAddProduct} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center gap-2 font-medium shadow-operational transition-colors">
                  <Plus size={18} />
                  Add First Record
                </button>
              )
            }
          />
        ) : (
          <div className="animate-fade-in">
            {/* View Mode Router */}
            {viewMode === 'table' ? (
              <div className="hidden sm:block">
                <ProductTable 
                  products={products}
                  selectedIds={selectedIds}
                  onToggleSelect={toggleSelect}
                  selectAll={selectAll}
                  clearSelection={clearSelection}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteClick}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isSelected={selectedIds.includes(product._id)}
                    onToggleSelect={() => toggleSelect(product._id)}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteClick(product._id)}
                  />
                ))}
              </div>
            )}
            
            {/* Mobile Fallback (Always grid) */}
            {viewMode === 'table' && (
              <div className="sm:hidden grid grid-cols-1 gap-5">
                {products.map((product) => (
                   <ProductCard
                   key={product._id}
                   product={product}
                   isSelected={selectedIds.includes(product._id)}
                   onToggleSelect={() => toggleSelect(product._id)}
                   onEdit={() => handleEditProduct(product)}
                   onDelete={() => handleDeleteClick(product._id)}
                 />
                ))}
              </div>
            )}

            {/* Pagination Layer */}
            <div className="mt-6 bg-surface-900 border border-surface-800 rounded-xl p-4 shadow-operational">
              <Pagination pagination={pagination} onPageChange={setPage} />
            </div>
          </div>
        )}
      </div>

      <ProductForm
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmitProduct}
        product={editingProduct}
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeletingId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Operation"
        message="Are you sure you want to delete this specific product record? This operation is permanent."
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Bulk Delete Operation"
        message={`Are you sure you want to permanently delete ${selectedIds.length} operational records? This action cannot be reversed.`}
        isLoading={isSubmitting}
      />
    </>
  );
}
