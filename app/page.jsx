'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw, Star, Quote, Package, Headphones, Watch, Coffee } from 'lucide-react';
import { STATIC_PRODUCTS } from '@/data/products';

export default function Home() {
  const featured = STATIC_PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.15), transparent 60%), var(--background)' }}
      >
        <div className="container section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="badge badge-accent mb-6">
                <Sparkles size={12} />
                Curated for Quality
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Things worth
                <br />
                <span className="gradient-text">keeping around.</span>
              </h1>
              <p className="text-lg mb-8 max-w-md" style={{ color: 'var(--muted)' }}>
                Every product on Revenio is chosen for craft, durability, and design.
                No clutter, no filler — just things that earn their place in your life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/items" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                  Browse Products
                  <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold gradient-text">2,400+</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Happy Customers</p>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
                <div>
                  <p className="text-2xl font-bold gradient-text">98%</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Satisfaction Rate</p>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
                <div>
                  <p className="text-2xl font-bold gradient-text">4.8/5</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Average Rating</p>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:block">
              <div className="relative" style={{ height: '480px' }}>
                <div
                  className="absolute rounded-2xl overflow-hidden card-hover animate-float"
                  style={{ top: '0', right: '0', width: '280px', height: '340px', border: '1px solid var(--border)' }}
                >
                  <img src={STATIC_PRODUCTS[0].imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute rounded-2xl overflow-hidden card-hover"
                  style={{ bottom: '0', left: '0', width: '220px', height: '260px', border: '1px solid var(--border)', animation: 'float 3s ease-in-out infinite 1.5s' }}
                >
                  <img src={STATIC_PRODUCTS[2].imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute rounded-xl p-4 glass"
                  style={{ bottom: '40px', right: '20px', width: '180px' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground)' }}>"Best purchase I've made all year."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES / BANNER SECTION */}
      <section className="section-padding" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: ShieldCheck, title: '2-Year Warranty', desc: 'Full coverage included' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return window' },
              { icon: Sparkles, title: 'Quality Checked', desc: 'Every item inspected' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="badge badge-accent mb-3">Featured</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Today's selections</h2>
              <p className="mt-2" style={{ color: 'var(--muted)' }}>Hand-picked items our team can't stop using.</p>
            </div>
            <Link href="/items" className="btn-secondary self-start sm:self-auto">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <div
                key={product.id}
                className="card-hover rounded-xl overflow-hidden flex flex-col"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm mb-1">{product.title}</h3>
                  <p className="text-xs mb-3 flex-1" style={{ color: 'var(--muted)' }}>{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold" style={{ color: 'var(--accent-light)' }}>${product.price.toFixed(2)}</span>
                    <Link href={`/items/${product.id}`} className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--foreground)' }}>
                      Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section-padding" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge badge-accent mb-3 inline-flex">Browse</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Shop by category</h2>
            <p style={{ color: 'var(--muted)' }}>Find exactly what you're looking for.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Headphones, name: 'Electronics', count: '2 items' },
              { icon: Watch, name: 'Fashion', count: '1 item' },
              { icon: Coffee, name: 'Home & Living', count: '1 item' },
              { icon: Package, name: 'Sports', count: '2 items' },
            ].map(({ icon: Icon, name, count }) => (
              <Link
                key={name}
                href={`/items?category=${encodeURIComponent(name)}`}
                className="card-hover rounded-xl p-6 flex flex-col items-center text-center gap-3"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.15))' }}
                >
                  <Icon size={24} style={{ color: 'var(--accent-light)' }} />
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge badge-accent mb-3 inline-flex">Testimonials</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Loved by customers</h2>
            <p style={{ color: 'var(--muted)' }}>Real feedback from people who shop with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Amara Chen', role: 'Product Designer', quote: 'The quality is consistently excellent. Every item feels like it was made to last, not just to sell.' },
              { name: 'James Whitfield', role: 'Software Engineer', quote: 'Fast shipping, beautiful packaging, and the products genuinely match the photos. Rare these days.' },
              { name: 'Priya Nair', role: 'Marketing Lead', quote: 'I\'ve recommended Revenio to half my team. The curation makes shopping so much less overwhelming.' },
            ].map((t) => (
              <div
                key={t.name}
                className="card-hover rounded-xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <Quote size={24} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--foreground)' }}>{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER SECTION */}
      <section className="container" style={{ paddingBottom: '5rem' }}>
        <div
          className="rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)' }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white tracking-tight">
              Ready to find your next favorite thing?
            </h2>
            <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Join thousands of customers discovering products that make everyday life a little better.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ background: 'white', color: 'var(--accent-dark)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
          </div>
          <div
            className="absolute"
            style={{ top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}
          />
          <div
            className="absolute"
            style={{ bottom: '-80px', left: '-30px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}
          />
        </div>
      </section>
    </div>
  );
}
