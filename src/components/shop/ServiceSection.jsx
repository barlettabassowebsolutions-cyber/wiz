import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { SHOP } from '@/lib/shop-info'

export default function ServiceSection({ id, title, tagline, description, icon: Icon, ctaLabel, ctaHref, reverse }) {
  const href = ctaHref || SHOP.tel

  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center gap-8 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="flex flex-1 items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#d8ef9c]/40 ring-1 ring-[#d8ef9c]/60">
              {Icon && <Icon className="h-16 w-16 text-[#0A0A0A]/70" />}
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="font-script text-xl text-[#0A0A0A]/60">{tagline}</p>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{description}</p>
            <a
              href={href}
              target={ctaHref ? '_blank' : undefined}
              rel={ctaHref ? 'noreferrer' : undefined}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#d8ef9c] transition hover:bg-[#1a1a1a]"
            >
              {!ctaHref && <Phone className="h-3.5 w-3.5" />}
              {ctaLabel || 'Call to Order'} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
