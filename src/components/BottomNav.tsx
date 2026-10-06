'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Don't show bottom nav on success screen
  if (pathname === '/order-success') return null;

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/menu', icon: Utensils, label: 'Menu' },
    { href: '/cart', icon: ShoppingBag, label: 'Cart', badge: totalItems },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="border-t border-gray-100 bg-white pb-safe pt-2">
      <div className="flex justify-around items-center px-4 pb-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex flex-col items-center p-1 text-[10px] font-medium transition-colors',
                isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-900'
              )}
            >
              <div className="relative mb-0.5">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {link.badge && link.badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white font-bold ring-1 ring-white">
                    {link.badge}
                  </span>
                )}
              </div>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
