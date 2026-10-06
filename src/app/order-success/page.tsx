'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, MapPin, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart when arriving at success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col h-[100dvh] bg-orange-600 text-white relative overflow-hidden items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-yellow-400 blur-3xl"></div>
      </div>

      <div className="z-10 flex flex-col items-center text-center max-w-sm w-full">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm animate-bounce-slow">
          <CheckCircle2 size={56} className="text-white" />
        </div>
        
        <h1 className="text-3xl font-black mb-2 tracking-tight">Order Placed!</h1>
        <p className="text-orange-100 mb-10 text-sm font-medium">
          Your delicious food is being prepared and will be with you shortly.
        </p>

        <div className="bg-white rounded-3xl p-6 w-full text-gray-900 shadow-2xl relative mb-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Order #CRV-8492
          </div>
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Clock size={20} className="text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Estimated Delivery</p>
                <p className="font-bold">25 - 30 mins</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
             <div className="bg-gray-100 p-2 rounded-full">
                <MapPin size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Delivering to</p>
                <p className="font-bold text-sm">Indiranagar, Bangalore</p>
              </div>
          </div>
        </div>

        <Link 
          href="/" 
          className="bg-white text-orange-600 font-black py-4 px-8 rounded-2xl w-full shadow-xl shadow-orange-900/20 active:scale-95 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
