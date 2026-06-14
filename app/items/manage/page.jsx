'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminRoute from '@/components/AdminRoute';
import { useProducts } from '@/contexts/ProductsContext';
import { Eye, Trash2, Package, Star, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function ManageItemsContent() {
  const { products, deleteProduct } = useProducts();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id, title) => {
    deleteProduct(id);
    toast.success(`"${title}" deleted successfully`);
    setDeleteId(null);
  };

  return (
    <div className="container section-padding">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="badge badge-accent mb-3 inline-flex">
            <Package size={12} />
            Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Manage Products</h1>
          <p style={{ color: 'var(--muted)' }}>{products.length} total products in the catalog</p>
        </div>
        <Link href="/items/add" className="btn-primary self-start sm:self-auto">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Product</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Category</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Price</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Rating</th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Status</th>
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: 'var(--muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: idx !== products.length - 1 ? '1px solid var(--border)' : 'none',
                  background: 'var(--background)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--background)'; }}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }}>
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-sm" style={{ maxWidth: '220px', display: 'block' }}>{p.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="badge badge-accent">{p.category}</span>
                </td>
                <td className="px-5 py-3 font-semibold text-sm" style={{ color: 'var(--accent-light)' }}>
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    {p.rating}
                  </div>
                </td>
                <td className="px-5 py-3">
                  {p.inStock ? (
                    <span className="badge badge-success">In Stock</span>
                  ) : (
                    <span className="badge badge-danger">Out of Stock</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/items/${p.id}`}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <Eye size={13} />
                      View
                    </Link>
                    {deleteId === p.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(p.id, p.title)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}>
                          Confirm
                        </button>
                        <button onClick={() => setDeleteId(null)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="btn-danger"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }}>
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">{p.title}</p>
                <div className="flex items-center gap-2">
                  <span className="badge badge-accent">{p.category}</span>
                  {p.inStock ? <span className="badge badge-success">In Stock</span> : <span className="badge badge-danger">Out</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold" style={{ color: 'var(--accent-light)' }}>${p.price.toFixed(2)}</span>
              <div className="flex items-center gap-1 text-sm">
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                {p.rating}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/items/${p.id}`} className="btn-secondary flex-1 justify-center" style={{ fontSize: '0.8125rem' }}>
                <Eye size={14} /> View
              </Link>
              {deleteId === p.id ? (
                <>
                  <button onClick={() => handleDelete(p.id, p.title)} className="btn-danger flex-1 justify-center" style={{ fontSize: '0.8125rem' }}>
                    Confirm
                  </button>
                  <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 justify-center" style={{ fontSize: '0.8125rem' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setDeleteId(p.id)} className="btn-danger flex-1 justify-center" style={{ fontSize: '0.8125rem' }}>
                  <Trash2 size={14} /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <AdminRoute>
      <ManageItemsContent />
    </AdminRoute>
  );
}
