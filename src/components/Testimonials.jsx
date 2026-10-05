import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/shop-info'

// Used on both pages: the home page animates the cards in and sits on the
// plain background; the shop page uses a lime band and static cards.
export default function Testimonials({ variant = 'home' }) {
  const onShop = variant === 'shop'
  const Card = onShop ? 'figure' : motion.figure

  return (
    <section
      id="testimonials"
      className={onShop ? 'scroll-mt-24 bg-[#d8ef9c]/30 py-16' : 'scroll-mt-20 py-20'}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-[#0A0A0A]/60">Kind Words</p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-4xl">Testimonials</h2>
        </div>
        <div className={`${onShop ? 'mt-8' : 'mt-10'} grid gap-6 md:grid-cols-3`}>
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              {...(onShop
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.5, delay: i * 0.1 },
                  })}
              className="flex flex-col rounded-2xl bg-[hsl(var(--card))] p-6 ring-1 ring-[hsl(var(--border))]"
            >
              <div className="flex gap-0.5 text-[#d8ef9c]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote
                className={`mt-3 flex-1 text-sm leading-relaxed ${onShop ? '' : 'text-[hsl(var(--foreground))]'}`}
              >
                "{t.text}"
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {t.name} · {t.place}
              </figcaption>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
