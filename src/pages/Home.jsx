import { useState } from 'react'
import Hero from '@/components/home/Hero'
import Dashboard from '@/components/home/Dashboard'
import Pathways from '@/components/home/Pathways'
import About from '@/components/home/About'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/shop/CartDrawer'

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Hero onAbout={scrollToAbout} />
      <Dashboard onOpenCart={() => setCartOpen(true)} />
      <Pathways onAbout={scrollToAbout} />
      <About />
      <Testimonials />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
