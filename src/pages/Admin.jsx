import { useEffect, useState } from 'react'
import { client } from '@/api/client'
import { occasions } from '@/pages/Shop'

const fieldClass = 'w-full rounded-lg border border-[hsl(var(--input))] px-3 py-2'

function tabClass(active) {
  return `px-4 py-2 text-sm font-semibold ${
    active ? 'border-b-2 border-[#0A0A0A] text-[#0A0A0A]' : 'text-[hsl(var(--muted-foreground))]'
  }`
}

function statusClass(status) {
  if (status === 'new') return 'bg-[#d8ef9c] text-[#0A0A0A]'
  if (status === 'confirmed') return 'bg-[#0A0A0A] text-[#d8ef9c]'
  return 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
}

const nextStatus = { new: 'confirmed', confirmed: 'picked_up' }

function SignIn({ onSignedIn }) {
  const [passcode, setPasscode] = useState('')
  const [failed, setFailed] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (client.auth.signIn(passcode)) onSignedIn()
    else setFailed(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-heading text-2xl font-bold">Admin only</h1>
        <p className="mt-2 text-[hsl(var(--muted-foreground))]">
          You need to sign in as the shop owner to view orders and manage products.
        </p>
        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-xs gap-2">
          <input
            type="password"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value)
              setFailed(false)
            }}
            placeholder="Owner passcode"
            className={`${fieldClass} bg-[hsl(var(--card))] text-sm`}
          />
          <button
            type="submit"
            className="shrink-0 whitespace-nowrap rounded-full bg-[#0A0A0A] px-5 py-2 text-sm font-semibold text-[#d8ef9c]"
          >
            Sign in
          </button>
        </form>
        {failed && <p className="mt-2 text-sm text-[hsl(var(--destructive))]">That passcode didn't match.</p>}
      </div>
    </div>
  )
}

export default function Admin() {
  const [user, setUser] = useState(() => client.auth.me())
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const [o, p] = await Promise.all([
        client.entities.Order.list('-created_date', 100),
        client.entities.Product.list('-created_date', 100),
      ])
      setOrders(Array.isArray(o) ? o : [])
      setProducts(Array.isArray(p) ? p : [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  async function saveProduct(e) {
    e.preventDefault()
    const data = {
      name: editing.name,
      price: Number(editing.price),
      description: editing.description || '',
      image: editing.image || '',
      occasion: editing.occasion,
      available: editing.available !== false,
    }
    if (editing.id) await client.entities.Product.update(editing.id, data)
    else await client.entities.Product.create(data)
    setEditing(null)
    load()
  }

  async function cycleStatus(order) {
    await client.entities.Order.update(order.id, { status: nextStatus[order.status] || 'new' })
    load()
  }

  if (!user || user.role !== 'admin') return <SignIn onSignedIn={() => setUser(client.auth.me())} />

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold">Shop Owner</h1>
          <a href="/" className="text-sm text-[hsl(var(--muted-foreground))] hover:underline">
            ← back to shop
          </a>
        </div>
        <div className="mt-6 flex gap-2 border-b border-[hsl(var(--border))]">
          <button onClick={() => setTab('orders')} className={tabClass(tab === 'orders')}>
            Pickup Orders
          </button>
          <button onClick={() => setTab('products')} className={tabClass(tab === 'products')}>
            Products
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--muted))] border-t-[#0A0A0A]" />
          </div>
        ) : tab === 'orders' ? (
          <div className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <p className="py-10 text-center text-[hsl(var(--muted-foreground))]">No pickup orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-heading text-lg font-bold">{order.customer_name}</p>
                      <a
                        href={`tel:${order.phone}`}
                        className="text-sm text-[hsl(var(--muted-foreground))] hover:underline"
                      >
                        {order.phone}
                      </a>
                      <p className="text-sm">
                        Pickup: <span className="font-semibold">{order.pickup_date}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => cycleStatus(order)}
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClass(order.status)}`}
                    >
                      {order.status}
                    </button>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm">
                    {order.items?.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          {item.qty}× {item.name}
                        </span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-between border-t border-[hsl(var(--border))] pt-2 font-bold">
                    <span>Total</span>
                    <span>${order.total?.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={() =>
                setEditing({ name: '', price: '', description: '', image: '', occasion: 'Birthday', available: true })
              }
              className="rounded-full bg-[#0A0A0A] px-5 py-2 text-sm font-semibold text-[#d8ef9c]"
            >
              + Add Product
            </button>
            <div className="mt-4 space-y-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        {p.occasion} · ${p.price?.toFixed(2)} · {p.available ? 'In stock' : 'Sold out'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setEditing(p)} className="text-sm font-semibold hover:underline">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {editing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setEditing(null)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={saveProduct}
              className="w-full max-w-md space-y-3 rounded-2xl bg-[hsl(var(--card))] p-6"
            >
              <h2 className="font-heading text-xl font-bold">{editing.id ? 'Edit' : 'Add'} Product</h2>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="Name"
                className={fieldClass}
                required
              />
              <input
                value={editing.price}
                onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                placeholder="Price"
                type="number"
                step="0.01"
                className={fieldClass}
                required
              />
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                placeholder="Short description"
                className={fieldClass}
                rows={2}
              />
              <input
                value={editing.image}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                placeholder="Image URL"
                className={fieldClass}
              />
              <select
                value={editing.occasion}
                onChange={(e) => setEditing({ ...editing, occasion: e.target.value })}
                className={fieldClass}
              >
                {occasions.map((o) => (
                  <option key={o.title} value={o.title}>
                    {o.title}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.available !== false}
                  onChange={(e) => setEditing({ ...editing, available: e.target.checked })}
                />
                Available
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 rounded-full bg-[#d8ef9c] py-2 text-sm font-bold text-[#0A0A0A]">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full bg-[hsl(var(--muted))] px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
