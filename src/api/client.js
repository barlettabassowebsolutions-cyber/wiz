import { seedProducts } from '@/data/products'

// A small browser-side stand-in for the hosted backend. It mirrors the
// entity API the pages use (list/create/update), so swapping in a real
// backend only means replacing this file.

const PREFIX = 'wiu_db_'

function read(name, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + name)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(name, rows) {
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(rows))
  } catch {}
}

function newId() {
  return Date.now().toString(16) + Math.random().toString(16).slice(2, 10)
}

function sortRows(rows, sort) {
  if (!sort) return rows
  const desc = sort.startsWith('-')
  const key = desc ? sort.slice(1) : sort
  return [...rows].sort((a, b) => {
    if (a[key] === b[key]) return 0
    const order = a[key] > b[key] ? 1 : -1
    return desc ? -order : order
  })
}

function entity(name, seed = []) {
  const load = () => read(name, seed)
  return {
    async list(sort, limit) {
      const rows = sortRows(load(), sort)
      return limit ? rows.slice(0, limit) : rows
    },
    async create(data) {
      const now = new Date().toISOString()
      const row = { ...data, id: newId(), created_date: now, updated_date: now }
      write(name, [row, ...load()])
      return row
    },
    async update(id, data) {
      let updated = null
      const rows = load().map((row) => {
        if (row.id !== id) return row
        updated = { ...row, ...data, updated_date: new Date().toISOString() }
        return updated
      })
      write(name, rows)
      return updated
    },
  }
}

const SESSION_KEY = 'wiu_admin'
const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'wrapitup'

export const client = {
  entities: {
    Product: entity('Product', seedProducts),
    Order: entity('Order'),
  },
  auth: {
    me() {
      try {
        return sessionStorage.getItem(SESSION_KEY) ? { role: 'admin' } : null
      } catch {
        return null
      }
    },
    signIn(passcode) {
      if (passcode !== ADMIN_PASSCODE) return false
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {}
      return true
    },
  },
}
