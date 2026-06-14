import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div
      className="card-hover rounded-xl overflow-hidden flex flex-col"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 60%)' }} />
        <div className="absolute top-3 left-3">
          <span className="badge badge-accent">{product.category}</span>
        </div>
        {!product.inStock && (
          <div className="absolute top-3 right-3">
            <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-tight" style={{ color: 'var(--foreground)' }}>
            {product.title}
          </h3>
        </div>

        <p className="text-sm mb-4 flex-1" style={{ color: 'var(--muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                  color={i < Math.floor(product.rating) ? '#f59e0b' : 'var(--border)'}
                />
              ))}
              <span className="text-xs ml-1" style={{ color: 'var(--muted)' }}>{product.rating}</span>
            </div>
            <p className="font-bold text-lg" style={{ color: 'var(--accent-light)' }}>
              ${product.price.toFixed(2)}
            </p>
          </div>
          <Link
            href={`/items/${product.id}`}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
          >
            View Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
