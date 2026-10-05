import { Link } from 'react-router-dom'
import { House } from 'lucide-react'
import { useCartCount } from '@/lib/cart'

export default function BottomBar({ onOpenCart }) {
  const count = useCartCount()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#d8ef9c]/80 transition hover:bg-white/10 hover:text-[#d8ef9c]"
        >
          <House className="h-4 w-4" /> Home
        </Link>
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-full bg-[#d8ef9c] px-5 py-2.5 text-sm font-bold text-[#0A0A0A] transition hover:brightness-95"
        >
          <span>🛍 Cart</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0A0A0A] px-1.5 text-xs font-bold text-[#d8ef9c]">
            {count}
          </span>
        </button>
      </div>
    </div>
  )
}
