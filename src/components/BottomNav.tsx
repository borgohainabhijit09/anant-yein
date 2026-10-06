'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, ReceiptText, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Don't show bottom nav on success or cart screens
  if (pathname === '/order-success' || pathname === '/cart') return null;

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/menu', icon: Utensils, label: 'Menu' },
    { href: '/cart', icon: ShoppingBag, label: 'Cart', badge: totalItems },
    { href: '/profile', icon: ReceiptText, label: 'Orders' },
  ];

  return (
    <div className="border-t border-stone-100 bg-white pb-safe pt-2 px-2 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] relative z-50">
      <div className="flex justify-around items-center pb-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex flex-col items-center p-2 transition-colors w-16',
                isActive ? 'text-[#d96c2c]' : 'text-stone-400 hover:text-stone-600'
              )}
            >
              <div className="relative mb-1.5">
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {(link.badge ?? 0) > 0 ? (
                  <span className="absolute -right-2 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d96c2c] text-[8px] text-white font-bold ring-2 ring-stone-900">
                    {link.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
