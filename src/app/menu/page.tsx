'use client';
import { useState } from 'react';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mock';
import { FoodCard } from '@/components/FoodCard';
import { Search } from 'lucide-react';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = FOOD_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white px-4 pt-4 pb-2 shadow-sm z-10 sticky top-0">
        <h1 className="text-2xl font-black text-gray-900 mb-4">Our Menu</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-gray-100 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap pb-2 gap-1.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
              activeCategory === 'all'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                activeCategory === category.id
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-200'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <span>{category.icon}</span> {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {filteredItems.length > 0 ? (
          <div className="flex flex-col">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p>No food items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
