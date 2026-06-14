import { Target, Heart, Leaf, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="container section-padding text-center" style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.1), transparent 60%)' }}>
        <div className="badge badge-accent mb-4 inline-flex">About Revenio</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
          We believe in <span className="gradient-text">fewer, better things.</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
          Revenio started as a small project to bring together products that are designed to last —
          well-made, thoughtfully sourced, and built for everyday life. No gimmicks, no overconsumption,
          just things worth owning.
        </p>
      </section>

      {/* Image + Story */}
      <section className="container" style={{ paddingBottom: '5rem' }}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ height: '380px', border: '1px solid var(--border)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="Our workspace"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Our story</h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              It started with a frustrated search for a coffee dripper that wouldn't crack after a month.
              That small frustration turned into a bigger question: why is it so hard to find products that
              are simply built well?
            </p>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Today, Revenio curates a small but growing catalog of items across electronics, fashion, home
              goods, sports gear, books, and skincare — each one tested, reviewed, and chosen because it
              earns a place in your daily life.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              We're a small team, and we read every piece of feedback. If something doesn't meet our bar,
              it doesn't make the cut.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">What we stand for</h2>
            <p style={{ color: 'var(--muted)' }}>The principles behind every product we add.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Quality First', desc: 'Every product is tested for durability and function before it goes live.' },
              { icon: Leaf, title: 'Sustainable Sourcing', desc: 'We prioritize partners who use responsible materials and ethical labor.' },
              { icon: Heart, title: 'Customer Care', desc: 'Real support from real people — no chatbots, no runaround.' },
              { icon: Users, title: 'Community Driven', desc: 'Product decisions are shaped directly by customer feedback.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card-hover rounded-xl p-6"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(99,102,241,0.1)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent-light)' }} />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container section-padding">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '2,400+', label: 'Customers Served' },
            { value: '8', label: 'Product Categories' },
            { value: '4.8/5', label: 'Average Rating' },
            { value: '30-day', label: 'Return Policy' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{s.value}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
