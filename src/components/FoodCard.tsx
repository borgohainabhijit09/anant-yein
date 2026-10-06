'use client';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type FoodCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export function FoodCard({ id, name, description, price, image }: FoodCardProps) {
  const { addToCart, decreaseQuantity, getQuantity } = useCart();
  const quantity = getQuantity(id);

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden mb-6">
      <div className="relative w-full h-36 bg-stone-50">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="pt-3 pb-4 px-2 flex flex-col flex-1">
        <h3 className="font-serif text-sm font-bold text-stone-900 leading-tight mb-1">{name}</h3>
        <p className="text-[9px] text-stone-400 uppercase tracking-widest mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-stone-900 text-sm">₹{price}</span>
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-stone-50 rounded-full p-1 border border-stone-100">
              <button 
                onClick={() => decreaseQuantity(id)}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 bg-white rounded-full shadow-sm"
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <span className="text-xs font-bold w-4 text-center text-stone-900">{quantity}</span>
              <button 
                onClick={() => addToCart(id)}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 bg-white rounded-full shadow-sm"
              >
                <Plus size={14} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(id)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
            >
              <Plus size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
