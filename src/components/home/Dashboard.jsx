import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Cookie,
  Facebook,
  Heart,
  Leaf,
  MapPin,
  Package,
  PartyPopper,
  Phone,
  Scissors,
  ShoppingBag,
  ShoppingBasket,
} from 'lucide-react'
import { occasions, SHOP } from '@/lib/shop-info'
import { useAddToCart, useCartCount, useCartTotal } from '@/lib/cart'
import { useProducts } from '@/lib/useProducts'

// Each tile jumps to the matching section id on the shop page.
const sections = [
  { id: 'giftbaskets', label: 'Gift Baskets', icon: ShoppingBasket },
  { id: 'candy', label: 'Candy', hint: 'Nostalgic & gourmet', icon: Cookie },
  { id: 'dietary', label: 'Dietary-Friendly', hint: 'Nut, gluten & dairy free', icon: Leaf },
  { id: 'weddings', label: 'Weddings', hint: 'Favors & centerpieces', icon: Heart },
  { id: 'corporate', label: 'Corporate', hint: 'Client & staff gifts', icon: Briefcase },
  { id: 'birthdayparties', label: 'Parties', hint: 'Candy buffets & favors', icon: PartyPopper },
  { id: 'craftclasses', label: 'Classes', hint: 'Craft & gift-wrapping', icon: Scissors },
  { id: 'wrapping', label: 'Wrapping', hint: 'We wrap anything', icon: Package },
]

const quickActions = [
  { label: 'Call', href: SHOP.tel, icon: Phone },
  { label: 'Directions', href: SHOP.directions, icon: MapPin, external: true },
  { label: 'Facebook', href: SHOP.facebook, icon: Facebook, external: true },
]

function SectionTile({ id, label, hint, icon: Icon }) {
  return (
    <Link
      to={`/shop#${id}`}
      className="group flex flex-col items-start gap-3 rounded-2xl bg-[hsl(var(--background))] p-4 ring-1 ring-[hsl(var(--border))] transition hover:bg-[#d8ef9c]/30 hover:ring-[#d8ef9c]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8ef9c]">
        <Icon className="h-5 w-5 text-[#0A0A0A]" />
      </span>
      <span>
        <span className="block text-sm font-semibold leading-tight">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-[hsl(var(--muted-foreground))]">{hint}</span>
      </span>
    </Link>
  )
}

function BasketSummary({ onOpenCart }) {
  const count = useCartCount()
  const total = useCartTotal()
  const button =
    'mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#d8ef9c] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] transition hover:brightness-95'

  return (
    <div className="rounded-2xl bg-[#0A0A0A] p-5 text-[#d8ef9c]">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d8ef9c]/70">
        <ShoppingBag className="h-4 w-4" /> Your basket
      </p>
      {count === 0 ? (
        <>
          <p className="mt-2 font-heading text-2xl font-bold">Empty for now</p>
          <p className="mt-1 text-sm text-[#d8ef9c]/70">Add a featured basket below, or browse the whole shop.</p>
          <Link to="/shop" className={button}>
            Start shopping <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </>
      ) : (
        <>
          <p className="mt-2 font-heading text-2xl font-bold">${total.toFixed(2)}</p>
          <p className="mt-1 text-sm text-[#d8ef9c]/70">
            {count} {count === 1 ? 'item' : 'items'} · reserve now, pay at pickup
          </p>
          <button onClick={onOpenCart} className={button}>
            View basket <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </>
      )}
    </div>
  )
}

function FeaturedItem({ product, occasionId }) {
  const [added, add] = useAddToCart(product)

  return (
    <div className="flex w-40 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[hsl(var(--background))] ring-1 ring-[hsl(var(--border))] lg:w-auto">
      <Link to={`/shop#${occasionId}`} className="group block" tabIndex={-1} aria-hidden="true">
        <div className="aspect-square overflow-hidden bg-[hsl(var(--muted))]">
          {product.image && (
            <img
              src={product.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
          {product.occasion}
        </span>
        <Link
          to={`/shop#${occasionId}`}
          className="mt-0.5 font-heading text-sm font-semibold leading-tight hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="font-heading text-base font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={add}
            aria-label={`Add ${product.name} to basket`}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
              added ? 'bg-[#d8ef9c] text-[#0A0A0A]' : 'bg-[#0A0A0A] text-[#d8ef9c] hover:bg-[#1a1a1a]'
            }`}
          >
            {added ? 'Added ✓' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onOpenCart }) {
  const { products, loading } = useProducts()
  const inStock = products.filter((p) => p.available)
  // One in-stock basket per occasion, in the same order as the shop.
  const featured = occasions
    .map((o) => ({ occasionId: o.id, product: inStock.find((p) => p.occasion === o.title) }))
    .filter((f) => f.product)

  const tiles = sections.map((s) =>
    s.id === 'giftbaskets'
      ? { ...s, hint: inStock.length ? `${inStock.length} ready to reserve` : 'Shop by occasion' }
      : s,
  )

  return (
    <section aria-labelledby="dashboard-title" className="relative z-10 -mt-24 px-4 sm:px-6 md:-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto max-w-5xl rounded-3xl bg-[hsl(var(--card))] p-6 shadow-xl ring-1 ring-[hsl(var(--border))] md:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-script text-xl text-[#0A0A0A]/60">Find just the right thing</p>
            <h2 id="dashboard-title" className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Shop at a Glance
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-[#0A0A0A]"
          >
            See everything <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2">
            {tiles.map((t) => (
              <SectionTile key={t.id} {...t} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <BasketSummary onOpenCart={onOpenCart} />
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-xs font-semibold ring-1 ring-[hsl(var(--border))] transition hover:bg-[#d8ef9c]/30 hover:ring-[#d8ef9c]"
                >
                  <Icon className="h-5 w-5 text-[#0A0A0A]/70" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {(loading || featured.length > 0) && (
          <div className="mt-8 border-t border-[hsl(var(--border))] pt-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Featured baskets
            </h3>
            <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {loading
                ? occasions.map((o) => (
                    <div
                      key={o.id}
                      className="h-60 w-40 shrink-0 animate-pulse rounded-2xl bg-[hsl(var(--muted))] lg:w-auto"
                    />
                  ))
                : featured.map(({ occasionId, product }) => (
                    <FeaturedItem key={product.id} product={product} occasionId={occasionId} />
                  ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
