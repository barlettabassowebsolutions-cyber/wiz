import { useState } from 'react'
import { cart } from '@/lib/cart'

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!product.available) return
    cart.add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[hsl(var(--card))] shadow-sm ring-1 ring-[hsl(var(--border))] transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(var(--muted))]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
            No image
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold uppercase tracking-widest text-white">
            Sold out
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={!product.available}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              added
                ? 'bg-[#d8ef9c] text-[#0A0A0A]'
                : 'bg-[#0A0A0A] text-[#d8ef9c] hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-40'
            }`}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
