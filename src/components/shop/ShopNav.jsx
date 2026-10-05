const links = [
  { id: 'giftbaskets', label: 'Gift Baskets' },
  { id: 'baskets', label: 'Baskets' },
  { id: 'candy', label: 'Candy' },
  { id: 'dietary', label: 'Dietary-Friendly' },
  { id: 'brandname', label: 'Brand-Name' },
  { id: 'favors', label: 'Favors' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'birthdayparties', label: 'Parties' },
  { id: 'craftclasses', label: 'Classes' },
  { id: 'wrapping', label: 'Wrapping' },
  { id: 'specialevent', label: 'Events' },
  { id: 'chatter', label: 'Chatter' },
  { id: 'contact', label: 'Contact' },
  { id: 'testimonials', label: 'Testimonials' },
]

export default function ShopNav() {
  function jumpTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-0 z-30 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => jumpTo(link.id)}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#0A0A0A]/70 transition hover:bg-[#d8ef9c]/50 hover:text-[#0A0A0A]"
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
