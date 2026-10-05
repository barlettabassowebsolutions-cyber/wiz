import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  Cake,
  Cookie,
  Facebook,
  Gift,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  PartyPopper,
  Phone,
  Scissors,
  ShoppingBasket,
  Sparkles,
} from 'lucide-react'
import { client } from '@/api/client'
import { SHOP } from '@/lib/shop-info'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import ShopNav from '@/components/shop/ShopNav'
import OccasionSection from '@/components/shop/OccasionSection'
import ServiceSection from '@/components/shop/ServiceSection'
import BottomBar from '@/components/shop/BottomBar'
import CartDrawer from '@/components/shop/CartDrawer'

export const occasions = [
  { id: 'birthday', title: 'Birthday', tagline: 'Make their day extra sweet' },
  { id: 'holiday', title: 'Holiday', tagline: "Season's greetings, wrapped up" },
  { id: 'getwell', title: 'Get Well', tagline: 'A little comfort to speed recovery' },
  { id: 'sympathy', title: 'Sympathy', tagline: 'Thoughtful gestures, gently given' },
  { id: 'justbecause', title: 'Just Because', tagline: 'No reason needed — just kindness' },
]

const services = [
  {
    id: 'baskets',
    title: 'Baskets',
    tagline: 'Hand-wrapped, hand-picked',
    description:
      "From gourmet treats to themed keepsakes, our baskets are built by hand and wrapped with a signature lime ribbon. Tell us the occasion and we'll craft something perfect.",
    icon: ShoppingBasket,
    ctaLabel: 'Call to Order',
  },
  {
    id: 'candy',
    title: 'Candy',
    tagline: "Sweet tooth? You're home",
    description:
      'Bins and bins of nostalgic and gourmet candies — chocolates, gummies, hard candies, and seasonal favorites. Fill a bag or let us build a candy basket for you.',
    icon: Cookie,
    ctaLabel: 'Call to Order',
  },
  {
    id: 'dietary',
    title: 'Nut, Gluten & Dairy Free · Vegan',
    tagline: 'Everyone deserves a treat',
    description:
      'A growing selection of nut-free, gluten-free, dairy-free, and vegan sweets and gifts so no one is left out of the celebration. Ask us about safe options for any allergy.',
    icon: Leaf,
    ctaLabel: 'Ask About Options',
  },
  {
    id: 'brandname',
    title: 'Brand-Name Gift Items',
    tagline: 'Favorites, beautifully wrapped',
    description:
      'Godiva, Lindt, Jelly Belly, and other beloved brands — dressed up in our signature style for a gift that always impresses.',
    icon: Gift,
    ctaLabel: 'Call to Order',
  },
  {
    id: 'favors',
    title: 'Favors & Centerpieces',
    tagline: 'The finishing touch',
    description:
      'Custom party favors and table centerpieces for showers, birthdays, holidays, and milestones — coordinated to your colors and theme.',
    icon: PartyPopper,
    ctaLabel: 'Call to Inquire',
  },
  {
    id: 'weddings',
    title: 'Wedding Services',
    tagline: 'Tied with love',
    description:
      'Wedding favors, welcome bags, candy buffets, and centerpieces — designed to match your day and delivered ready to display.',
    icon: Heart,
    ctaLabel: 'Call to Inquire',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    tagline: 'Gifts that mean business',
    description:
      'Client gifts, employee appreciation, event favors, and branded baskets — we handle large orders with a personal touch and can deliver locally.',
    icon: Briefcase,
    ctaLabel: 'Call to Inquire',
  },
  {
    id: 'birthdayparties',
    title: 'Birthday Parties',
    tagline: 'Make it a celebration',
    description:
      "Candy buffets, favor bags, themed treats, and gift baskets for birthday parties of any age. Tell us the theme and we'll do the rest.",
    icon: Cake,
    ctaLabel: 'Call to Inquire',
  },
  {
    id: 'craftclasses',
    title: 'Craft Classes',
    tagline: 'Get hands-on',
    description:
      'Join us for seasonal craft and gift-wrapping classes at the shop. Bring a friend, learn something new, and leave with something sweet.',
    icon: Scissors,
    ctaLabel: 'Call to Sign Up',
  },
  {
    id: 'wrapping',
    title: 'Wrapping Service',
    tagline: 'We wrap anything',
    description:
      "Already have a gift? Bring it in and we'll wrap it beautifully — bows, ribbon, tags, and all. Quick turnaround, gorgeous results.",
    icon: Package,
    ctaLabel: 'Call to Inquire',
  },
  {
    id: 'specialevent',
    title: 'A Wrapping It Up Special Event',
    tagline: "Let's celebrate together",
    description:
      "Throughout the year we host seasonal open houses, holiday pop-ups, and community events at the shop. Follow along so you don't miss the next one.",
    icon: Sparkles,
    ctaLabel: 'Follow on Facebook',
    ctaHref: SHOP.facebook,
  },
]

const chatter = [
  {
    title: 'Holiday Baskets Are Here',
    excerpt:
      'Our seasonal collection has landed — peppermint bark, hot cocoa kits, and winter-warmth baskets wrapped and ready.',
  },
  {
    title: 'New Vegan Treats In Stock',
    excerpt:
      "We've expanded our dairy-free and vegan shelf with locally made chocolates and gummies. Come taste the difference.",
  },
  {
    title: 'Craft Class Schedule',
    excerpt:
      "This season's gift-wrapping and craft classes are open for sign-up. Spaces are small, so call the shop to reserve a seat.",
  },
]

const contactCard =
  'flex flex-col items-center gap-2 rounded-2xl bg-[hsl(var(--card))] p-6 ring-1 ring-[hsl(var(--border))]'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    client.entities.Product.list('-created_date', 100)
      .then((rows) => setProducts(Array.isArray(rows) ? rows : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pb-20">
      <div className="bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-[#d8ef9c]">
              <img src={SHOP.logo} alt="Wrapping It Up" className="h-full w-full object-cover" />
            </div>
            <span className="font-heading text-lg font-bold text-[#d8ef9c]">Wrapping It Up</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d8ef9c]/70 transition hover:text-[#d8ef9c]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>

      <ShopNav />

      <section id="giftbaskets" className="scroll-mt-24 bg-[#d8ef9c]/30 py-14 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-script text-2xl text-[#0A0A0A]/60">Gift Baskets ~ Shop Now</p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-4xl">Shop Gift Baskets</h2>
          <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            Browse by occasion, add to your cart, and reserve for pickup at the shop. Every basket is wrapped by hand
            with our signature lime ribbon.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--muted))] border-t-[#0A0A0A]" />
        </div>
      ) : products.length === 0 ? (
        <p className="py-24 text-center text-[hsl(var(--muted-foreground))]">
          Our shop is being stocked. Please call {SHOP.phone} to order.
        </p>
      ) : (
        occasions.map((o) => <OccasionSection key={o.id} {...o} products={products} />)
      )}

      {services.map((s, i) => (
        <ServiceSection key={s.id} {...s} reverse={i % 2 === 1} />
      ))}

      <section id="chatter" className="scroll-mt-24 bg-[#0A0A0A] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-script text-2xl text-[#d8ef9c]/70">Wrapping It Up Chatter</p>
            <h2 className="mt-1 font-heading text-3xl font-bold text-[#d8ef9c]">From the Shop</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {chatter.map((post) => (
              <article key={post.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <MessageCircle className="h-6 w-6 text-[#d8ef9c]" />
                <h3 className="mt-3 font-heading text-lg font-bold text-[#d8ef9c]">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d8ef9c]/70">{post.excerpt}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[#d8ef9c]/60">
            Want the latest? Follow us on{' '}
            <a
              href={SHOP.facebook}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#d8ef9c] hover:underline"
            >
              Facebook
            </a>{' '}
            or call to join our chatter list.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-script text-2xl text-[#0A0A0A]/60">Contact Us</p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-4xl">Come Say Hello</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className={contactCard}>
              <MapPin className="h-6 w-6 text-[#0A0A0A]/60" />
              <p className="text-sm font-semibold">Visit the Shop</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {SHOP.street}
                <br />
                {SHOP.cityLine}
              </p>
            </div>
            <div className={contactCard}>
              <Phone className="h-6 w-6 text-[#0A0A0A]/60" />
              <p className="text-sm font-semibold">Call Us</p>
              <a href={SHOP.tel} className="text-sm text-[hsl(var(--muted-foreground))] hover:underline">
                {SHOP.phone}
              </a>
            </div>
            <div className={contactCard}>
              <Facebook className="h-6 w-6 text-[#0A0A0A]/60" />
              <p className="text-sm font-semibold">Follow Along</p>
              <a
                href={SHOP.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[hsl(var(--muted-foreground))] hover:underline"
              >
                facebook.com/wrappingitup
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials variant="shop" />
      <Footer />
      <BottomBar onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
