'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
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

  return <>{children}</>;
}
