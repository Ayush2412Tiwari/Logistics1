import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

const CATEGORIES = [
  'Electronics', 'Clothing', 'Food & Beverages', 'Furniture',
  'Automotive', 'Pharmaceuticals', 'Raw Materials', 'Machinery', 'Packaging', 'Other'
];

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
});

export default function ProductForm({ isOpen, onClose, onSubmit, product, isLoading }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: 'Electronics',
      description: '',
      price: '',
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          name: product.name,
          category: product.category,
          description: product.description || '',
          price: product.price,
        });
        setImagePreview(product.imageUrl || null);
      } else {
        reset({ name: '', category: 'Electronics', description: '', price: '' });
        setImagePreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, product, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('description', data.description || '');
    formData.append('price', data.price);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
        
        {/* Image Upload Area */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Product Image <span className="text-surface-500">(Optional)</span></label>
          <div className="relative border-2 border-dashed border-surface-700 rounded-xl bg-surface-900/50 hover:bg-surface-800 transition-colors group overflow-hidden h-40">
            {imagePreview ? (
              <div className="relative w-full h-full group-hover:opacity-80 transition-opacity flex items-center justify-center p-2">
                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-danger-500/90 text-surface-200 hover:text-white rounded-md transition-all shadow-md z-10"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                <div className="p-3 bg-surface-800 rounded-full mb-3 text-surface-400 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-colors">
                  <Upload size={24} />
                </div>
                <p className="text-sm text-surface-200">
                  <span className="text-primary-400 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-surface-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Upload product image"
                />
              </div>
            )}
            {/* Make sure input covers the wrapper even when image is populated if we want click-to-replace, but X is better */}
          </div>
        </div>

        <Input 
          label="Product Name" 
          placeholder="e.g. Cisco C9200L Router"
          {...register('name')}
          error={errors.name?.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">Category</label>
            <select
              {...register('category')}
              className={`w-full h-10 rounded-lg border bg-surface-900/50 px-3 py-2 text-sm text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 appearance-none outline-none transition-all ${errors.category ? 'border-danger-500/50 focus:border-danger-500/50 focus:ring-danger-500/50' : 'border-surface-700'}`}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="mt-1.5 text-xs text-danger-400">{errors.category.message}</p>}
          </div>

          <Input 
            label="Price (₹)" 
            type="number" 
            step="0.01"
            placeholder="0.00"
            {...register('price')}
            error={errors.price?.message}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-surface-300 mb-1.5">Description <span className="text-surface-500">(Optional)</span></label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full rounded-lg border border-surface-700 bg-surface-900/50 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all custom-scrollbar resize-none"
            placeholder="Add operational details..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-800">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {product ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
