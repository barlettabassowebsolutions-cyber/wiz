import { Link } from 'react-router-dom'
import { ArrowRight, Facebook, MapPin, Phone } from 'lucide-react'
import { SHOP } from '@/lib/shop-info'

export default function Hero({ onAbout }) {
  return (
    <header className="relative overflow-hidden bg-[hsl(var(--background))]">
      <div className="h-3 w-full bg-[#d8ef9c]" />
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
        <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full ring-4 ring-[#d8ef9c] shadow-sm">
          <img src={SHOP.logo} alt="Wrapping It Up" className="h-full w-full object-cover" />
        </div>
        <p className="font-script text-2xl text-[#0A0A0A]/70 md:text-3xl">It is so sweet of you to stop by!</p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-6xl">Wrapping It Up</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          A cozy little shop in Amityville filled with hand-wrapped gift baskets, sweets, treats, and thoughtful gifts
          for every occasion. Take a look around — we're so glad you're here.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3 text-sm font-semibold uppercase tracking-widest text-[#d8ef9c] transition hover:bg-[#1a1a1a]"
          >
            Browse Our Shop <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onAbout}
            className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A]/20 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-[#0A0A0A] transition hover:bg-[#d8ef9c]/40"
          >
            About Us
          </button>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {SHOP.shortAddress}
          </span>
          <a href={SHOP.tel} className="inline-flex items-center gap-1.5 font-semibold text-[#0A0A0A] hover:underline">
            <Phone className="h-4 w-4" /> {SHOP.phone}
          </a>
          <a
            href={SHOP.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:underline"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
        </div>
      </div>
      <div className="h-3 w-full bg-[#d8ef9c]" />
    </header>
  )
}
