import Hero from '@/components/home/Hero'
import Pathways from '@/components/home/Pathways'
import About from '@/components/home/About'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Hero onAbout={scrollToAbout} />
      <Pathways onAbout={scrollToAbout} />
      <About />
      <Testimonials />
      <Footer />
    </div>
  )
}
