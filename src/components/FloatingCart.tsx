'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function FloatingCart() {
  const { totalItems, subtotal } = useCart();
  const pathname = usePathname();

  if (totalItems === 0 || pathname === '/cart' || pathname === '/order-success') return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <div className="max-w-md w-full pointer-events-auto">
        <Link 
          href="/cart"
          className="flex items-center justify-between bg-stone-900 text-stone-50 px-6 py-4 rounded-full shadow-2xl shadow-stone-900/50 border border-stone-700 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#d96c2c] text-white w-8 h-8 rounded-full flex items-center justify-center">
              <ShoppingBag size={14} />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase">
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'} <span className="mx-1 text-stone-500">•</span> ₹{subtotal}
            </span>
          </div>
          <div className="flex items-center text-[#c5a059] text-[11px] font-bold tracking-widest uppercase">
            View Cart <ArrowRight size={14} className="ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
