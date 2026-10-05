import { useEffect, useState } from 'react'
import { client } from '@/api/client'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    client.entities.Product.list('-created_date', 100)
      .then((rows) => active && setProducts(Array.isArray(rows) ? rows : []))
      .catch(() => active && setProducts([]))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return { products, loading }
}
