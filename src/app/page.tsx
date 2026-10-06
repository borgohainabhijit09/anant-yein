import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mock';
import { FoodCard } from '@/components/FoodCard';

export default function Home() {
  const popularItems = FOOD_ITEMS.filter((item) => item.popular);

  return (
    <div className="pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Delivering to</p>
          <div className="flex items-center text-orange-600 font-semibold text-sm mt-0.5">
            <MapPin size={16} className="mr-1" />
            <span className="text-gray-900">Indiranagar, Bangalore</span>
            <ChevronRight size={16} className="text-gray-400 ml-1" />
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
           <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-4 mt-2">
        <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-lg">
          <Image 
            src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=1200"
            alt="Indian Chinese Food"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-5">
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md w-fit mb-1.5 uppercase tracking-wide">Limited Time</span>
            <h1 className="text-white text-xl font-black leading-tight max-w-[70%]">
              Freshly Wok'd <br />For You
            </h1>
            <p className="text-gray-200 text-[11px] mt-1.5 font-medium">Get 20% off your first order!</p>
            <Link href="/menu" className="mt-3 bg-white text-gray-900 text-[11px] font-bold px-3 py-1.5 rounded-full w-fit shadow-md">
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-bold text-gray-900">Categories</h2>
          <Link href="/menu" className="text-orange-600 text-xs font-semibold">See All</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide px-4 pb-2 gap-3">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/menu?category=${category.id}`} className="flex flex-col items-center gap-1.5 min-w-[64px]">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Popular Now</h2>
        </div>
        <div className="flex flex-col">
          {popularItems.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
