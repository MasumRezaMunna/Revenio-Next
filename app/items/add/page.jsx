'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminRoute from '@/components/AdminRoute';
import { useProducts } from '@/contexts/ProductsContext';
import { useAuth } from '@/contexts/AuthContext';
import { CATEGORIES } from '@/data/products';
import { Loader2, ImageIcon, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function AddItemForm() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    category: 'Electronics',
    rating: '4.5',
    imageUrl: '',
    inStock: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.shortDescription.trim()) errs.shortDescription = 'Short description is required';
    else if (form.shortDescription.length > 150) errs.shortDescription = 'Keep it under 150 characters';
    if (!form.fullDescription.trim()) errs.fullDescription = 'Full description is required';
    if (!form.price) errs.price = 'Price is required';
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Enter a valid price';
    if (form.rating && (isNaN(Number(form.rating)) || Number(form.rating) < 0 || Number(form.rating) > 5)) {
      errs.rating = 'Rating must be between 0 and 5';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    await new Promise((res) => setTimeout(res, 600)); // simulated loading

    addProduct({
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      price: Number(form.price),
      category: form.category,
      rating: Number(form.rating) || 4.5,
      imageUrl: form.imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      tags: [],
      inStock: form.inStock,
      userId: user?.uid,
    });

    setLoading(false);
    toast.success('Product added successfully!');
    router.push('/items/manage');
  };

  return (
    <div className="container section-padding" style={{ maxWidth: '720px' }}>
      <div className="mb-8">
        <div className="badge badge-accent mb-3 inline-flex">
          <Plus size={12} />
          New Product
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Add a product</h1>
        <p style={{ color: 'var(--muted)' }}>Fill in the details below to list a new product.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            className="input-field"
            style={{ borderColor: errors.title ? 'var(--danger)' : 'var(--border)' }}
          />
          {errors.title && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description *</label>
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
            placeholder="One or two sentences shown on the product card"
            className="input-field"
            style={{ borderColor: errors.shortDescription ? 'var(--danger)' : 'var(--border)' }}
          />
          <div className="flex justify-between mt-1">
            {errors.shortDescription ? (
              <p className="text-xs" style={{ color: 'var(--danger)' }}>{errors.shortDescription}</p>
            ) : <span />}
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{form.shortDescription.length}/150</p>
          </div>
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Description *</label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => handleChange('fullDescription', e.target.value)}
            placeholder="Detailed product description shown on the details page"
            className="input-field"
            rows={5}
            style={{ borderColor: errors.fullDescription ? 'var(--danger)' : 'var(--border)', resize: 'vertical' }}
          />
          {errors.fullDescription && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.fullDescription}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Price (USD) *</label>
            <div className="relative">
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '0.875rem' }}>$</span>
              <input
                type="text"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="99.99"
                className="input-field"
                style={{ paddingLeft: '1.5rem', borderColor: errors.price ? 'var(--danger)' : 'var(--border)' }}
              />
            </div>
            {errors.price && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="input-field"
              style={{ cursor: 'pointer' }}
            >
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Rating (0-5)</label>
            <input
              type="text"
              value={form.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              placeholder="4.5"
              className="input-field"
              style={{ borderColor: errors.rating ? 'var(--danger)' : 'var(--border)' }}
            />
            {errors.rating && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{errors.rating}</p>}
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Availability</label>
            <select
              value={form.inStock ? 'true' : 'false'}
              onChange={(e) => handleChange('inStock', e.target.value === 'true')}
              className="input-field"
              style={{ cursor: 'pointer' }}
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Image URL (optional)</label>
          <div className="relative">
            <ImageIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input-field"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Leave empty to use a default placeholder image.</p>
        </div>

        <div className="flex gap-3 mt-2">
          <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <button type="button" onClick={() => router.push('/')} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <AdminRoute>
      <AddItemForm />
    </AdminRoute>
  );
}
