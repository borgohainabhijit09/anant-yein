import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mock';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { FloatingCart } from '@/components/FloatingCart';

export default function Home() {
  const signatureDishes = FOOD_ITEMS.filter((item) => item.popular).slice(0, 3);
  const heroDish = FOOD_ITEMS.find((item) => item.name === 'Gobi Manchurian');

  return (
    <div className="bg-stone-50 min-h-screen pb-safe">
      <header className="bg-stone-900 text-stone-50 px-5 pt-8 pb-4 flex flex-col items-center justify-center relative">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white mb-1">CRAVE</h1>
          <p className="text-[#c5a059] text-[10px] font-medium tracking-[0.2em] uppercase">
            Indian • Chinese • Fast Food
          </p>
        </div>
        <div className="absolute right-5 top-10">
          <p className="text-stone-400 text-[9px] tracking-wider uppercase text-right leading-tight">
            Indiranagar<br/>Bangalore
          </p>
        </div>
      </header>

      {/* Cinematic Hero */}
      <div className="relative w-full h-[65vh] max-h-[600px] bg-stone-900">
        <Image 
          src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=1200"
          alt="Signature Chicken Fried Rice"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent flex flex-col justify-end p-6 pb-12">
          <div className="w-12 h-[1px] bg-[#c5a059] mb-4"></div>
          <h2 className="text-stone-50 font-serif text-4xl md:text-5xl font-bold leading-[1.1] mb-2 drop-shadow-md">
            WOK-FRESH.<br />MADE FOR YOU.
          </h2>
          <p className="text-stone-300 text-sm mb-6 font-medium tracking-wide">
            Experience authentic flavors, fire-tossed to perfection.
          </p>
          <Link 
            href="/menu" 
            className="bg-[#d96c2c] text-white text-xs font-bold px-8 py-3.5 uppercase tracking-widest w-fit shadow-lg shadow-orange-900/20 active:scale-95 transition-transform"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Explore Menu Categories */}
      <div className="py-10 bg-stone-50">
        <div className="px-5 mb-5 flex items-end justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Explore Menu</h3>
            <div className="w-8 h-[2px] bg-[#d96c2c] mt-2"></div>
          </div>
          <Link href="/menu" className="text-stone-500 text-xs font-semibold tracking-wider uppercase flex items-center">
            See All <ChevronRight size={14} className="ml-0.5" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide px-5 pb-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/menu?category=${category.id}`} className="flex flex-col items-center gap-3 min-w-[76px] group">
              <div className="w-18 h-24 rounded-full overflow-hidden relative shadow-md shadow-stone-200 border-2 border-transparent group-hover:border-[#d96c2c] transition-colors">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <span className="text-[11px] font-bold text-stone-700 tracking-wide uppercase text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* What's Cooking - Editorial Section */}
      <div className="px-5 py-8 bg-white border-y border-stone-100">
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">What's Cooking</h3>
        <p className="text-stone-500 text-xs tracking-wider uppercase mb-6">Our Signature Creations</p>
        
        <div className="space-y-6">
          {signatureDishes.map((item) => (
            <div key={item.id} className="group relative w-full h-64 rounded-none overflow-hidden bg-stone-100">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-5">
                <div className="flex justify-between items-end">
                  <div className="max-w-[75%]">
                    <h4 className="text-stone-50 font-serif text-xl font-bold mb-1">{item.name}</h4>
                    <p className="text-stone-300 text-[11px] line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  <span className="text-[#c5a059] font-bold text-lg">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* From The Wok */}
      {heroDish && (
        <div className="px-5 py-12 bg-stone-900 text-center border-b border-stone-800">
          <p className="text-[#c5a059] text-[10px] tracking-[0.2em] uppercase font-bold mb-3">From The Wok</p>
          <h3 className="font-serif text-3xl font-bold text-stone-50 mb-6">{heroDish.name}</h3>
          <div className="relative w-full h-72 rounded-none overflow-hidden mb-6 shadow-2xl">
            <Image src={heroDish.image} alt={heroDish.name} fill className="object-cover" />
          </div>
          <p className="text-stone-400 text-sm mb-6 max-w-[80%] mx-auto leading-relaxed">{heroDish.description}</p>
          <Link 
            href="/menu"
            className="inline-block border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-stone-900 transition-colors text-xs font-bold px-8 py-3 uppercase tracking-widest"
          >
            Taste It Now - ₹{heroDish.price}
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-center py-10 px-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-50 mb-4">CRAVE</h2>
        <p className="text-stone-400 text-xs leading-relaxed max-w-[200px] mx-auto mb-6">
          456 100ft Road, Apt 4B<br />
          Indiranagar, Bangalore 560038
        </p>
        <p className="text-[#c5a059] text-xs font-bold tracking-widest uppercase mb-8">
          +91 98765 43210
        </p>
        <div className="text-[10px] text-stone-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Crave Fast Food
        </div>
      </footer>

      {/* Floating Cart Pill */}
      <FloatingCart />
    </div>
  );
}
