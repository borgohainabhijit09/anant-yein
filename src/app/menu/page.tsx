'use client';
import { useState } from 'react';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mock';
import { FoodCard } from '@/components/FoodCard';
import { Search } from 'lucide-react';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const renderSection = (title: string, items: typeof FOOD_ITEMS, showViewAll: boolean = false) => {
    if (items.length === 0) return null;
    return (
      <div key={title} className="mb-10">
        <div className="flex justify-between items-end mb-5 px-5">
          <h2 className="font-serif text-base font-bold text-stone-900 tracking-wider uppercase">{title}</h2>
          {showViewAll && (
            <button className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#d96c2c] transition-colors">
              View all
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 px-5">
          {items.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="bg-stone-50 pt-6 pb-2 sticky top-0 z-20">
        <div className="px-5 mb-5">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">MENU</h1>
          <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-1">Explore our favourites</p>
        </div>
        
        {/* Search */}
        <div className="px-5 mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-100 placeholder-stone-400 text-stone-800 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 px-5 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-500 border border-stone-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
                activeCategory === category.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-500 border border-stone-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        {searchQuery ? (
           renderSection('Search Results', FOOD_ITEMS.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())))
        ) : activeCategory === 'all' ? (
           <>
             {renderSection('Signatures', FOOD_ITEMS.filter(item => item.popular))}
             {CATEGORIES.map(cat => renderSection(cat.name, FOOD_ITEMS.filter(item => item.categoryId === cat.id), true))}
           </>
        ) : (
           renderSection(
             CATEGORIES.find(c => c.id === activeCategory)?.name || '', 
             FOOD_ITEMS.filter(item => item.categoryId === activeCategory)
           )
        )}
      </div>
    </div>
  );
}
