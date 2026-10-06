'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowLeft, Receipt } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FOOD_ITEMS } from '@/data/mock';

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, subtotal } = useCart();
  const router = useRouter();
  
  const deliveryFee = 20;
  const serviceFee = 15;
  const total = subtotal + deliveryFee + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col h-full bg-gray-50 items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Receipt size={40} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any delicious food yet.</p>
        <Link 
          href="/menu" 
          className="bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-200 active:scale-95 transition-transform"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">My Order</h1>
      </header>

      <div className="flex-1 p-4 pb-4">
        <div className="flex flex-col gap-4">
          {cart.map((cartItem) => {
            const item = FOOD_ITEMS.find((f) => f.id === cartItem.id);
            if (!item) return null;
            return (
              <div key={item.id} className="flex bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 ml-2 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">₹{item.price * cartItem.quantity}</span>
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 active:scale-95 transition-transform"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{cartItem.quantity}</span>
                      <button 
                        onClick={() => addToCart(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-600 shadow-sm text-white active:scale-95 transition-transform"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-medium text-gray-900">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span className="font-medium text-gray-900">₹{serviceFee}</span>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between">
              <span className="font-bold text-gray-900 text-lg">Total</span>
              <span className="font-black text-orange-600 text-lg">₹{total}</span>
            </div>
          </div>
        </div>
        
        {/* Delivery Address Mock */}
        <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">Delivery Address</h3>
          <p className="text-sm text-gray-600 font-medium">John Doe</p>
          <p className="text-sm text-gray-500 mt-1">456 100ft Road, Apt 4B<br/>Indiranagar, Bangalore 560038<br/>+91 98765 43210</p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <Link 
          href="/order-success"
          className="flex items-center justify-between w-full bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-200 active:scale-95 transition-transform"
        >
          <span>Place Order</span>
          <span>₹{total}</span>
        </Link>
      </div>
    </div>
  );
}
