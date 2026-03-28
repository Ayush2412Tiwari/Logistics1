import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Upload, X, Package } from 'lucide-react';
import { useState, useRef } from 'react';
import Topbar from '../components/layout/Topbar';
import useProductStore from '../store/productStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

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

export default function AddProductPage() {
  const navigate = useNavigate();
  const { createProduct } = useProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('description', data.description || '');
    formData.append('price', data.price);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const result = await createProduct(formData);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Product created successfully!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Topbar onAddProduct={() => {}} />

      <main className="flex-1 p-6 lg:p-10 max-w-4xl mx-auto w-full animate-fade-in">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-surface-400 hover:text-surface-100 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-surface-900 border border-surface-800 group-hover:border-surface-700">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Operations</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Info & Visuals */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-900 border border-surface-800 shadow-operational">
              <div className="p-3 w-fit rounded-xl bg-primary-500/10 border border-primary-500/20 mb-4">
                <Package className="text-primary-400" size={24} />
              </div>
              <h1 className="text-xl font-bold text-surface-100">Initialize Entity</h1>
              <p className="text-sm text-surface-400 mt-2 leading-relaxed">
                Create a new operational record in the logistics database. All entries are tracked in real-time.
              </p>
            </div>

            {/* Entity Status Card (Mock) */}
            <div className="p-5 rounded-xl bg-surface-900/50 border border-surface-800/50 border-dashed">
              <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-widest mb-3">Operational Status</h3>
              <div className="flex items-center gap-2 text-warning-400">
                <span className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse" />
                <span className="text-sm font-medium">Awaiting Submission</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8 shadow-operational">
              
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Documentation Avatar</label>
                <div className={`relative h-48 border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden
                                ${imagePreview ? 'border-primary-500/30 bg-surface-950' : 'border-surface-800 hover:border-surface-700 bg-surface-950/50'}`}>
                  {imagePreview ? (
                    <div className="relative h-full flex items-center justify-center p-4">
                      <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 p-2 bg-surface-900/80 hover:bg-danger-500 text-surface-200 hover:text-white rounded-lg transition-all shadow-lg z-10"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                      <div className="p-3 bg-surface-900 rounded-full mb-3 text-surface-500 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-all">
                        <Upload size={24} />
                      </div>
                      <p className="text-sm text-surface-300">
                        <span className="text-primary-400 font-medium tracking-wide">Upload Asset Image</span>
                      </p>
                      <p className="text-xs text-surface-500 mt-1">Maximum size 5MB (PNG, JPG, WEBP)</p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Input 
                  label="Product Identity (Name)" 
                  placeholder="e.g. Industrial Servo Motor"
                  {...register('name')}
                  error={errors.name?.message}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">Category Classification</label>
                    <select
                      {...register('category')}
                      className={`w-full h-10 rounded-lg border bg-surface-950 px-3 py-2 text-sm text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 appearance-none outline-none transition-all ${errors.category ? 'border-danger-500/50' : 'border-surface-800'}`}
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    {errors.category && <p className="mt-1.5 text-xs text-danger-400">{errors.category.message}</p>}
                  </div>

                  <Input 
                    label="Valuation (₹)" 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...register('price')}
                    error={errors.price?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">Operational Description</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full rounded-lg border border-surface-800 bg-surface-950 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all custom-scrollbar resize-none"
                    placeholder="Detailed logistics specifications..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-surface-800 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => navigate('/')} disabled={isSubmitting}>
                  Discard
                </Button>
                <Button type="submit" isLoading={isSubmitting} className="min-w-[140px]">
                  Confirm Entity
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
