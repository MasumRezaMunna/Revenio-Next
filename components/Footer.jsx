'use client';

import Link from 'next/link';
import { Package, AtSign, Camera, Link2, Code2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Shop: [
      { label: 'All Products', href: '/items' },
      { label: 'Electronics', href: '/items?category=Electronics' },
      { label: 'Fashion', href: '/items?category=Fashion' },
      { label: 'Home & Living', href: '/items?category=Home+%26+Living' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Shipping', href: '#' },
    ],
  };

  const socials = [
    { icon: AtSign, href: '#', label: 'Twitter' },
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Code2, href: '#', label: 'GitHub' },
    { icon: Link2, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
              >
                <Package size={16} color="white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Revenio</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              A curated marketplace for products that elevate your everyday. Built with care for people who appreciate quality.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-light)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--muted)' }}
                      onMouseEnter={(e) => { e.target.style.color = 'var(--foreground)'; }}
                      onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            © {currentYear} Revenio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => { e.target.style.color = 'var(--foreground)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
