import ProductCard from './ProductCard'

export default function OccasionSection({ id, title, tagline, products }) {
  const items = products.filter((p) => p.occasion === title)
  if (items.length === 0) return null

  return (
    <section id={id} className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between border-b border-[hsl(var(--border))] pb-4">
          <div>
            <p className="font-script text-xl text-[#0A0A0A]/60">{tagline}</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          </div>
          <span className="hidden text-sm uppercase tracking-widest text-[hsl(var(--muted-foreground))] sm:block">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
