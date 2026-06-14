'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Tag, Calendar, CheckCircle, XCircle, ShoppingCart } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { products, getProduct } = useProducts();
  const product = getProduct(params.id);
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6" style={{ color: 'var(--muted)' }}>
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/items" className="btn-primary">
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container section-padding">
      {/* Back Button */}
      <button
        onClick={() => router.push('/items')}
        className="btn-secondary mb-8"
        style={{ padding: '0.5rem 1rem' }}
      >
        <ArrowLeft size={16} />
        Back to Products
      </button>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', height: '420px' }}
        >
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--muted)' }}>
              <Tag size={48} />
            </div>
          ) : (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge badge-accent">{product.category}</span>
            {product.inStock ? (
              <span className="badge badge-success">
                <CheckCircle size={12} /> In Stock
              </span>
            ) : (
              <span className="badge badge-danger">
                <XCircle size={12} /> Out of Stock
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{product.title}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                  color={i < Math.floor(product.rating) ? '#f59e0b' : 'var(--border)'}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>· {product.shortDescription}</span>
          </div>

          <p className="text-4xl font-bold mb-6" style={{ color: 'var(--accent-light)' }}>
            ${product.price.toFixed(2)}
          </p>

          <p className="leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
            {product.fullDescription}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => toast.success('Added to cart!')}
              disabled={!product.inStock}
              className="btn-primary"
              style={{ opacity: product.inStock ? 1 : 0.5, cursor: product.inStock ? 'pointer' : 'not-allowed' }}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>

          {/* Specifications */}
          <div className="rounded-xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-semibold mb-4">Key Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <Tag size={16} style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Category</p>
                  <p className="text-sm font-semibold">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <Calendar size={16} style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Added On</p>
                  <p className="text-sm font-semibold">{product.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <Star size={16} style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Rating</p>
                  <p className="text-sm font-semibold">{product.rating} / 5.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  {product.inStock ? (
                    <CheckCircle size={16} style={{ color: '#34d399' }} />
                  ) : (
                    <XCircle size={16} style={{ color: '#f87171' }} />
                  )}
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Availability</p>
                  <p className="text-sm font-semibold">{product.inStock ? 'Available' : 'Unavailable'}</p>
                </div>
              </div>
            </div>

            {product.tags.length > 0 && (
              <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Tags</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge" style={{ background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
