'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ChevronDown, Plus, Settings, LogOut, Package, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/items', label: 'Shop' },
    { href: '/about', label: 'About' },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    router.push('/');
    setDropdownOpen(false);
  };

  const avatarLetter = user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
            >
              <Package size={16} color="white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="gradient-text">Revenio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: pathname === link.href ? 'var(--accent-light)' : 'var(--muted)',
                  background: pathname === link.href ? 'rgba(99,102,241,0.1)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    e.target.style.color = 'var(--foreground)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    e.target.style.color = 'var(--muted)';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
                  style={{ border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                  >
                    {avatarLetter}
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)', maxWidth: '120px' }}>
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    style={{
                      color: 'var(--muted)',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    }}
                  >
                    <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Signed in as</p>
                        {isAdmin && (
                          <span className="badge badge-accent" style={{ padding: '0.125rem 0.5rem' }}>
                            <ShieldCheck size={10} />
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      {isAdmin && (
                        <>
                          <Link
                            href="/items/add"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                            style={{ color: 'var(--foreground)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                              e.currentTarget.style.color = 'var(--accent-light)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--foreground)';
                            }}
                          >
                            <Plus size={15} />
                            Add Product
                          </Link>
                          <Link
                            href="/items/manage"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                            style={{ color: 'var(--foreground)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                              e.currentTarget.style.color = 'var(--accent-light)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--foreground)';
                            }}
                          >
                            <Settings size={15} />
                            Manage Products
                          </Link>
                          <div className="my-1" style={{ height: '1px', background: 'var(--border)' }} />
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-all duration-200"
                        style={{ color: 'var(--danger)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--foreground)' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium"
                style={{
                  color: pathname === link.href ? 'var(--accent-light)' : 'var(--foreground)',
                  background: pathname === link.href ? 'rgba(99,102,241,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="divider" />
            {user ? (
              <>
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Signed in as</p>
                    {isAdmin && (
                      <span className="badge badge-accent" style={{ padding: '0.125rem 0.5rem' }}>
                        <ShieldCheck size={10} />
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold">{user.email}</p>
                </div>
                {isAdmin && (
                  <>
                    <Link href="/items/add" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                      <Plus size={15} /> Add Product
                    </Link>
                    <Link href="/items/manage" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                      <Settings size={15} /> Manage Products
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="px-4 py-3 rounded-lg text-sm flex items-center gap-2 text-left" style={{ color: 'var(--danger)' }}>
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary justify-center">Sign In</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary justify-center">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
