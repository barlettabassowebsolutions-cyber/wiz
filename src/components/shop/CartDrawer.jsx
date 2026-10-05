import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { client } from '@/api/client'
import { cart, useCartItems, useCartTotal } from '@/lib/cart'
import { SHOP } from '@/lib/shop-info'

const inputClass =
  'w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A0A0A]'

export default function CartDrawer({ open, onClose }) {
  const items = useCartItems()
  const total = useCartTotal()
  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ name: '', phone: '', pickup_date: '' })
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')
  const panelRef = useRef(null)
  const titleRef = useRef(null)
  const closeRef = useRef(null)

  // Behave like a modal dialog: Tab stays inside, Escape closes, and focus goes back to
  // whatever opened it.
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        closeRef.current?.()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement
      if (!panelRef.current.contains(current) || current === titleRef.current) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (opener?.isConnected) opener.focus()
    }
  }, [open])

  // Move focus to the title whenever the drawer opens or changes step, so screen readers
  // announce where the user is.
  useEffect(() => {
    if (open) titleRef.current?.focus()
  }, [open, step])

  if (!open) return null

  function close() {
    setStep('cart')
    setError('')
    onClose()
  }
  closeRef.current = close

  async function placeOrder(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.phone || !form.pickup_date) {
      setError('Please fill in your name, phone, and pickup day.')
      return
    }
    setPlacing(true)
    try {
      await client.entities.Order.create({
        customer_name: form.name,
        phone: form.phone,
        pickup_date: form.pickup_date,
        items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
        total,
        status: 'new',
      })
      cart.clear()
      setStep('done')
    } catch {
      setError(`Something went wrong placing your order. Please call us at ${SHOP.phone}.`)
    } finally {
      setPlacing(false)
    }
  }

  const title = step === 'done' ? 'Order Reserved' : step === 'checkout' ? 'Pickup Details' : 'Your Basket'

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col bg-[hsl(var(--background))] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4">
          <h2 id="cart-drawer-title" ref={titleRef} tabIndex={-1} className="font-heading text-xl font-bold outline-none">
            {title}
          </h2>
          <button onClick={close} aria-label="Close basket" className="rounded-full p-1 hover:bg-[hsl(var(--muted))]">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {step === 'done' && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 text-5xl">🎀</div>
            <h3 className="font-heading text-2xl font-bold">See you soon!</h3>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Your basket is reserved for pickup. We'll call to confirm your order.
            </p>
            <div className="mt-5 rounded-xl bg-[hsl(var(--muted))] p-4 text-sm">
              <p className="font-semibold">{SHOP.street}</p>
              <p>{SHOP.cityLine}</p>
              <a href={SHOP.tel} className="mt-2 inline-block font-bold text-[#0A0A0A] underline">
                Call {SHOP.phone}
              </a>
            </div>
            <button
              onClick={close}
              className="mt-6 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-semibold text-[#d8ef9c]"
            >
              Continue Browsing
            </button>
          </div>
        )}

        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]">
                  Your basket is empty. Add a treat to get started!
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 flex-shrink-0 rounded-lg object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <span className="font-medium leading-tight">{item.name}</span>
                          <button
                            onClick={() => cart.remove(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]"
                          >
                            <Trash2 aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">${item.price.toFixed(2)}</span>
                        <div className="mt-1 flex items-center gap-2">
                          <button
                            onClick={() => cart.setQty(item.id, item.qty - 1)}
                            aria-label={`One less ${item.name}`}
                            className="rounded-full bg-[hsl(var(--muted))] p-1 hover:bg-[hsl(var(--border))]"
                          >
                            <Minus aria-hidden="true" className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                          <button
                            onClick={() => cart.setQty(item.id, item.qty + 1)}
                            aria-label={`One more ${item.name}`}
                            className="rounded-full bg-[hsl(var(--muted))] p-1 hover:bg-[hsl(var(--border))]"
                          >
                            <Plus aria-hidden="true" className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-[hsl(var(--border))] px-5 py-4">
                <div className="flex justify-between font-heading text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Pay in store at pickup.</p>
                <button
                  onClick={() => setStep('checkout')}
                  className="mt-3 w-full rounded-full bg-[#d8ef9c] py-3 text-sm font-bold text-[#0A0A0A] transition hover:brightness-95"
                >
                  Confirm Pickup Details
                </button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && (
          <form onSubmit={placeOrder} className="flex flex-1 flex-col px-5 py-4">
            <div className="flex-1 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Your name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="(631) 555-0100"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Preferred pickup day</label>
                <input
                  type="date"
                  value={form.pickup_date}
                  onChange={(e) => setForm({ ...form, pickup_date: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="rounded-xl bg-[hsl(var(--muted))] p-3 text-xs text-[hsl(var(--muted-foreground))]">
                Pickup at <span className="font-semibold">{SHOP.shortAddress}</span>. We'll call to confirm and you
                pay when you pick up.
              </div>
              {error && <p className="text-sm font-medium text-[hsl(var(--destructive))]">{error}</p>}
            </div>
            <div className="space-y-2 border-t border-[hsl(var(--border))] pt-4">
              <div className="flex justify-between font-heading text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={placing}
                className="w-full rounded-full bg-[#d8ef9c] py-3 text-sm font-bold text-[#0A0A0A] transition hover:brightness-95 disabled:opacity-60"
              >
                {placing ? 'Placing order…' : 'Reserve for Pickup'}
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-full text-xs text-[hsl(var(--muted-foreground))] hover:underline"
              >
                Back to basket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
