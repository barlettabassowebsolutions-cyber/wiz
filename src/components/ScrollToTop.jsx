import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function scrollToHash(hash, behavior) {
  let id = hash.slice(1)
  try {
    id = decodeURIComponent(id)
  } catch {}
  const el = id && document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior })
  return true
}

// Jump to the top on navigation, or to the #hash target when one is given.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (!hash) {
      if (navType !== 'POP') window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    // A fresh page load (new tab, refresh, shared link) is also a POP; only skip when
    // Back/Forward is restoring an earlier scroll position.
    if (navType === 'POP' && window.scrollY > 0) return
    // Sections can render a moment after the route does, so keep looking for up to 2s.
    let tries = 0
    let timer
    const attempt = () => {
      if (scrollToHash(hash, navType === 'POP' ? 'auto' : 'smooth')) return
      if (tries++ < 40) timer = window.setTimeout(attempt, 50)
    }
    timer = window.setTimeout(attempt, 50)
    return () => window.clearTimeout(timer)
  }, [pathname, hash, navType])

  return null
}
