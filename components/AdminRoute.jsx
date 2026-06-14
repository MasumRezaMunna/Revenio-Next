'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Loader2, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--background)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={40}
            className="animate-spin"
            style={{ color: 'var(--accent)' }}
          />
          <p style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container section-padding text-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div
          className="max-w-md mx-auto rounded-2xl p-10"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(239,68,68,0.1)' }}
          >
            <ShieldAlert size={26} style={{ color: '#f87171' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admins only</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            This page is restricted to administrators. Your account doesn't have permission to add,
            edit, or delete products.
          </p>
          <Link href="/" className="btn-primary justify-center" style={{ display: 'inline-flex' }}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
