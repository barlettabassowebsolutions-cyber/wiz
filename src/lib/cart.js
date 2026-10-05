import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { seedProducts } from '@/data/products'

const STORAGE_KEY = 'wiu_cart'
const listeners = new Set()
const seedImages = new Map(seedProducts.map((p) => [p.id, p.image]))

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : []
    // Baskets added before the product photos changed still point at the old Wix photos.
    return saved.map((i) =>
      i.image?.includes('static.wixstatic.com') && seedImages.has(i.id) ? { ...i, image: seedImages.get(i.id) } : i,
    )
  } catch {
    return []
  }
}

let items = load()

function save(next) {
  items = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
  listeners.forEach((fn) => fn())
}

export const cart = {
  getItems: () => items,
  add(product) {
    if (items.find((i) => i.id === product.id)) {
      save(items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)))
    } else {
      const { id, name, price, image } = product
      save([...items, { id, name, price, image, qty: 1 }])
    }
  },
  setQty(id, qty) {
    save(qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i)))
  },
  remove(id) {
    save(items.filter((i) => i.id !== id))
  },
  clear() {
    save([])
  },
  getCount: () => items.reduce((sum, i) => sum + i.qty, 0),
  getTotal: () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

export const useCartItems = () => useSyncExternalStore(cart.subscribe, cart.getItems, () => [])
export const useCartCount = () => useSyncExternalStore(cart.subscribe, cart.getCount, () => 0)
export const useCartTotal = () => useSyncExternalStore(cart.subscribe, cart.getTotal, () => 0)

// Adds a product and flips `added` on for a moment so the button can say "Added ✓".
export function useAddToCart(product) {
  const [added, setAdded] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  function add() {
    if (!product.available) return
    cart.add(product)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1200)
  }

  return [added, add]
}
