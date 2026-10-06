'use client';
import { FOOD_ITEMS } from '@/data/mock';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  Package,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleReorder = (id: string) => {
    addToCart(id);
    router.push('/cart');
  };

  const handleReorderMultiple = (items: typeof FOOD_ITEMS) => {
    items.forEach(i => addToCart(i.id));
    router.push('/cart');
  };

  const activeOrder = {
    id: '1048',
    status: 'PREPARING',
    items: [FOOD_ITEMS[1], FOOD_ITEMS[6], FOOD_ITEMS[8]],
    total: 495,
    eta: '30–40 min'
  };

  const orderAgainItems = [FOOD_ITEMS[1], FOOD_ITEMS[6], FOOD_ITEMS[7]]; 

  const pastOrders = [
    {
      id: '1032',
      date: '12 Sep 2026',
      status: 'Delivered',
      items: [FOOD_ITEMS[1], FOOD_ITEMS[6], FOOD_ITEMS[9]], 
      total: 460
    },
    {
      id: '1015',
      date: '04 Sep 2026',
      status: 'Delivered',
      items: [FOOD_ITEMS[4], FOOD_ITEMS[5]], 
      total: 250
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-24 relative">
      {/* Header */}
      <div className="bg-stone-50 px-5 pt-8 pb-4 sticky top-0 z-10">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-900">Your Orders</h1>
        <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-1">Good food is worth repeating.</p>
      </div>

      <div className="px-5">
        
        {/* SECTION 1 — ACTIVE ORDER */}
        <section className="mb-10 mt-2">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden relative">
            {/* Top color bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#d96c2c]"></div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Order #{activeOrder.id}</p>
                  <h3 className="font-serif text-lg font-bold text-[#d96c2c]">Preparing your order</h3>
                </div>
                <span className="font-bold text-stone-900 text-lg">₹{activeOrder.total}</span>
              </div>

              {/* Progress Tracker */}
              <div className="flex items-center justify-between relative mb-6">
                <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-stone-100 -z-10"></div>
                <div className="absolute left-[10%] right-[50%] top-1/2 -translate-y-1/2 h-[2px] bg-[#d96c2c] -z-10"></div>
                
                <div className="flex flex-col items-center bg-white px-1">
                  <div className="w-6 h-6 rounded-full bg-[#d96c2c] text-white flex items-center justify-center mb-1">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white px-1">
                  <div className="w-8 h-8 rounded-full bg-[#d96c2c] text-white flex items-center justify-center mb-1 shadow-md shadow-orange-900/20">
                    <ChefHat size={16} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white px-1">
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mb-1">
                    <Bike size={12} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white px-1">
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mb-1">
                    <Package size={12} strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Food Info */}
              <div className="flex gap-4 items-center bg-stone-50 rounded-xl p-3 mb-5 border border-stone-100">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={activeOrder.items[0].image} alt="Food" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-stone-900 mb-0.5">{activeOrder.items[0].name}</p>
                  <p className="text-xs text-stone-600 mb-0.5">{activeOrder.items[1].name}</p>
                  <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest">+ {activeOrder.items.length - 2} more</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest mb-0.5">Estimated Delivery</p>
                  <p className="text-sm font-bold text-stone-900">{activeOrder.eta}</p>
                </div>
                <button className="flex items-center gap-2 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors shadow-sm">
                  Track Order <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — ORDER AGAIN */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-serif text-base font-bold text-stone-900 tracking-wider uppercase">Order Again</h2>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-5 px-5">
            {orderAgainItems.map((item) => (
              <div key={item.id} className="min-w-[140px] bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex flex-col">
                <div className="relative w-full h-24 bg-stone-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-serif text-xs font-bold text-stone-900 leading-tight mb-2 line-clamp-2">{item.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">₹{item.price}</span>
                    <button 
                      onClick={() => handleReorder(item.id)}
                      className="bg-stone-50 text-[#d96c2c] border border-stone-100 w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#d96c2c] hover:text-white hover:border-[#d96c2c] transition-colors"
                    >
                      <RefreshCw size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — PREVIOUS ORDERS */}
        <section>
          <h2 className="font-serif text-base font-bold text-stone-900 tracking-wider uppercase mb-4">Previous Orders</h2>
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-3 border-b border-stone-50 pb-3">
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Order #{order.id}</p>
                    <p className="text-xs font-bold text-stone-900">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-full border border-stone-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400"></div>
                    <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest">{order.status}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {order.items.map(i => i.name).join(', ')}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-stone-900 text-sm">₹{order.total}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-[9px] font-bold text-stone-500 uppercase tracking-widest px-4 py-2 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors">
                      View Details
                    </button>
                    <button 
                      onClick={() => handleReorderMultiple(order.items)}
                      className="text-[9px] font-bold text-[#d96c2c] uppercase tracking-widest px-5 py-2 border border-[#d96c2c]/30 bg-orange-50/50 rounded-full hover:bg-[#d96c2c] hover:text-white transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
