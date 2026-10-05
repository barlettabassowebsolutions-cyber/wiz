import { SHOP } from '@/lib/shop-info'

export default function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[#0A0A0A] py-10 text-center text-sm text-[#d8ef9c]/80">
      <p className="font-heading text-lg font-bold text-[#d8ef9c]">{SHOP.name}</p>
      <p className="mt-1">
        {SHOP.street}, {SHOP.cityLine}
      </p>
      <a href={SHOP.tel} className="mt-1 inline-block font-semibold text-white hover:underline">
        {SHOP.phone}
      </a>
      <p className="mt-3 text-xs text-[#d8ef9c]/50">A warm thanks to you for visiting our site!</p>
    </footer>
  )
}
