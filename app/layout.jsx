import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Revenio – Curated Marketplace',
  description: 'Discover quality products, curated with care.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProductsProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                },
                success: { iconTheme: { primary: '#10b981', secondary: '#0a0a0f' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#0a0a0f' } },
              }}
            />
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
