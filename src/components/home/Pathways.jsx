import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react'

export default function Pathways({ onAbout }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <Link
            to="/shop"
            className="group flex flex-col items-start rounded-3xl bg-[hsl(var(--card))] p-8 ring-1 ring-[hsl(var(--border))] transition hover:shadow-lg hover:ring-[#d8ef9c]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8ef9c]">
              <ShoppingBag className="h-7 w-7 text-[#0A0A0A]" />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-bold">Shop Gift Baskets &amp; Treats</h3>
            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Browse our full selection — occasion baskets, candy, dietary-friendly sweets, brand-name gifts, favors,
              and more. Add to your cart and reserve for pickup.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[#0A0A0A]">
              Enter the Shop <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
          <button
            onClick={onAbout}
            className="group flex flex-col items-start rounded-3xl bg-[#0A0A0A] p-8 text-left transition hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8ef9c]/20 ring-1 ring-[#d8ef9c]/40">
              <Heart className="h-7 w-7 text-[#d8ef9c]" />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-bold text-[#d8ef9c]">About Our Shop &amp; Services</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#d8ef9c]/70">
              Learn our story and everything we offer — wrapping, weddings, corporate gifts, parties, craft classes,
              and special events. There's more here than you might expect.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[#d8ef9c]">
              Our Story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
