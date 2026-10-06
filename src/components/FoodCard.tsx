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
    <div className="flex bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 mb-3 overflow-hidden">
      <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="ml-3 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{name}</h3>
          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900 text-sm">₹{price}</span>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-orange-50 rounded-full px-1.5 py-0.5">
              <button 
                onClick={() => decreaseQuantity(id)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-orange-600 active:scale-95 transition-transform"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="text-xs font-bold w-4 text-center">{quantity}</span>
              <button 
                onClick={() => addToCart(id)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-600 shadow-sm text-white active:scale-95 transition-transform"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(id)}
              className="flex items-center justify-center w-7 h-7 bg-orange-600 rounded-full text-white shadow-sm active:scale-95 transition-transform"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
