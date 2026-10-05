import { motion } from 'framer-motion'
import {
  Briefcase,
  Cookie,
  Gift,
  Heart,
  Leaf,
  Package,
  PartyPopper,
  Scissors,
  ShoppingBasket,
  Sparkles,
} from 'lucide-react'

const offerings = [
  { icon: ShoppingBasket, label: 'Hand-wrapped gift baskets' },
  { icon: Cookie, label: 'Sweets, candy & treats' },
  { icon: Leaf, label: 'Dietary-friendly options' },
  { icon: Gift, label: 'Brand-name gift items' },
  { icon: Heart, label: 'Wedding services & favors' },
  { icon: Briefcase, label: 'Corporate gifts' },
  { icon: PartyPopper, label: 'Party favors & centerpieces' },
  { icon: Scissors, label: 'Craft classes' },
  { icon: Package, label: 'Professional wrapping' },
  { icon: Sparkles, label: 'Special events' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#d8ef9c]/30 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-script text-2xl text-[#0A0A0A]/60">About Us</p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
            Wrapping It Up has been a sweet little corner of Amityville for years — a shop where every basket is
            wrapped by hand and every gift is made with care. From birthday treats to sympathy arrangements, wedding
            favors to corporate gifts, we put thought into every ribbon. Stop by 180 Park Avenue or give us a call —
            we'd love to help you wrap up something special.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
        >
          {offerings.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-[hsl(var(--card))] p-4 text-center ring-1 ring-[hsl(var(--border))]"
            >
              <Icon className="h-6 w-6 text-[#0A0A0A]/70" />
              <span className="text-xs font-medium leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
