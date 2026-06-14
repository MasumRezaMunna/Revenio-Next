'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

function ItemsContent() {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(350);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [products, search, category, maxPrice, minRating]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setMaxPrice(350);
    setMinRating(0);
  };

  return (
    <div className="container section-padding">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">All Products</h1>
        <p style={{ color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters Sidebar */}
        <aside>
          <div className="lg:hidden mb-4">
            <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary w-full justify-center">
              <SlidersHorizontal size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div
            className={`${showFilters ? 'block' : 'hidden'} lg:block rounded-xl p-5 sticky`}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', top: '88px' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filters
              </h3>
              <button onClick={resetFilters} className="text-xs font-medium" style={{ color: 'var(--accent-light)' }}>
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="input-field"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="text-left px-3 py-2 rounded-lg text-sm transition-all duration-200"
                    style={{
                      background: category === cat ? 'rgba(99,102,241,0.12)' : 'transparent',
                      color: category === cat ? 'var(--accent-light)' : 'var(--foreground)',
                      fontWeight: category === cat ? 600 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Max Price: <span style={{ color: 'var(--accent-light)' }}>${maxPrice}</span>
              </label>
              <input
                type="range"
                min="0"
                max="350"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--muted)' }}>
                <span>$0</span>
                <span>$350</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Rating</label>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className="flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      background: minRating === r ? 'rgba(99,102,241,0.12)' : 'var(--background)',
                      color: minRating === r ? 'var(--accent-light)' : 'var(--muted)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl p-12 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <X size={32} style={{ color: 'var(--muted)', margin: '0 auto 1rem' }} />
              <h3 className="font-semibold mb-1">No products found</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ItemsPage() {
  return (
    <Suspense fallback={<div className="container section-padding">Loading...</div>}>
      <ItemsContent />
    </Suspense>
  );
}
