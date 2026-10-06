'use client';
import { useCart } from '@/context/CartContext';
import { FOOD_ITEMS } from '@/data/mock';
import { ArrowLeft, Minus, Plus, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const router = useRouter();

  const deliveryFee = 20;
  const serviceFee = 15;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = () => {
    // Navigates to success without clearing the cart instantly to allow transition, 
    // clearCart can be handled by the success page or a timeout.
    router.push('/order-success');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 p-6 text-center">
        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">🍽️</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 text-sm mb-8">Let's find some delicious food for you.</p>
        <Link 
          href="/menu" 
          className="bg-[#d96c2c] text-white text-xs font-bold px-8 py-4 rounded-xl uppercase tracking-widest w-full max-w-[250px] active:scale-95 transition-transform"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-[120px] relative">
      {/* Header */}
      <header className="bg-stone-50 px-5 pt-8 pb-4 flex items-center border-b border-stone-200 sticky top-0 z-10">
        <Link href="/menu" className="w-10 h-10 flex items-center justify-start text-stone-900 -ml-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </Link>
        <div className="ml-2">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900">Your Order</h1>
          <p className="text-stone-500 text-[11px] font-medium uppercase tracking-widest mt-0.5">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6">
        
        {/* SECTION 1 — YOUR ITEMS */}
        <section>
          <div className="space-y-4">
            {cart.map((cartItem) => {
              const item = FOOD_ITEMS.find((f) => f.id === cartItem.id);
              if (!item) return null;

              return (
                <div key={cartItem.id} className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 flex gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-1 py-1">
                    <div className="mb-1">
                      <h3 className="font-serif text-sm font-bold text-stone-900 leading-tight">{item.name}</h3>
                      <p className="text-[10px] text-stone-500 line-clamp-1 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">₹{item.price}</span>
                      
                      <div className="flex items-center gap-3 bg-stone-50 rounded-full p-1 border border-stone-100">
                        <button 
                          onClick={() => decreaseQuantity(cartItem.id)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 bg-white rounded-full shadow-sm transition-colors"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="text-xs font-bold w-3 text-center text-stone-900">{cartItem.quantity}</span>
                        <button 
                          onClick={() => addToCart(cartItem.id)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 bg-white rounded-full shadow-sm transition-colors"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 — DELIVERY */}
        <section>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Delivering To</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-serif font-bold text-stone-900 text-base mb-1">John Doe</p>
                <p className="text-xs text-stone-500 leading-relaxed max-w-[200px]">
                  456 100ft Road, Apt 4B<br />
                  Indiranagar, Bangalore
                </p>
              </div>
              <button className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#d96c2c] transition-colors mt-1">
                Change →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3 — PAYMENT */}
        <section>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Payment Method</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                  <span className="text-xs font-bold font-serif">₹</span>
                </div>
                <p className="font-serif font-bold text-stone-900 text-sm">Cash on Delivery</p>
              </div>
              <button className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#d96c2c] transition-colors">
                Change →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4 — ORDER SUMMARY */}
        <section>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Food subtotal</span>
                <span className="font-medium text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span className="font-medium text-stone-900">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Service fee</span>
                <span className="font-medium text-stone-900">₹{serviceFee}</span>
              </div>
              
              <div className="pt-4 mt-2 border-t border-stone-100 flex justify-between items-center">
                <span className="font-serif font-bold text-lg text-stone-900">TOTAL</span>
                <span className="font-serif font-bold text-xl text-[#d96c2c]">₹{total}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-[11px] font-medium text-stone-500 uppercase tracking-widest">✨ You're all set for a delicious meal.</p>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-100 p-5 pb-safe pt-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-50">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <Lock size={10} className="text-stone-400" />
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Secure checkout</span>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full bg-[#d96c2c] text-white rounded-xl py-4 px-6 font-bold flex items-center justify-between active:scale-[0.98] transition-transform shadow-lg shadow-orange-900/20"
        >
          <span className="text-sm tracking-widest uppercase">Place Order</span>
          <div className="flex items-center gap-2">
            <span className="text-base">₹{total}</span>
            <ArrowRight size={18} className="opacity-80" />
          </div>
        </button>
      </div>
    </div>
  );
}
