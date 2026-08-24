import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, Currency } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import { Info, Sparkles, Heart, Wine, Flame } from 'lucide-react';

interface PopularDishesSectionProps {
  currentCurrency: Currency;
  onSelectDish: (dish: MenuItem) => void;
}

export const PopularDishesSection: React.FC<PopularDishesSectionProps> = ({
  currentCurrency,
  onSelectDish,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'classic' | 'modern' | 'all'>('classic');

  const classicDishes = MENU_ITEMS.filter((item) =>
    ['bolognese', 'green-carbonara', 'rack-of-lamb'].includes(item.id)
  );

  const modernDishes = MENU_ITEMS.filter((item) =>
    ['edem-zinger-supreme', 'damascus-chicken-shawarma', 'wagyu-truffle-smash-burger', 'royal-lamb-beef-shawarma-platter', 'parmesan-truffle-fries'].includes(item.id)
  );

  const displayedDishes =
    activeTab === 'classic'
      ? classicDishes
      : activeTab === 'modern'
      ? modernDishes
      : [...classicDishes, ...modernDishes];

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatPrice = (item: MenuItem) => {
    switch (currentCurrency) {
      case 'USD':
        return `$${item.priceUSD.toFixed(1)}`;
      case 'EUR':
        return `€${item.priceEUR.toFixed(1)}`;
      case 'UAH':
      default:
        return `${item.priceUAH} UAH`;
    }
  };

  return (
    <section id="popular-dishes" className="py-24 bg-[#0d0f11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow, Title & Filter Tabs */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#b5c99a] font-medium block mb-2">
              Discover Our Creations
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl italic text-white font-normal">
              Our Popular Dishes
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#14181c] p-1.5 rounded-full border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('classic')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'classic'
                  ? 'bg-[#b5c99a] text-[#0d0f11] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Haute Classics
            </button>
            <button
              onClick={() => setActiveTab('modern')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'modern'
                  ? 'bg-[#c6a869] text-[#0d0f11] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Flame size={13} />
              <span>Modern Zinger & Shawarma</span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              View All ({displayedDishes.length})
            </button>
          </div>
        </div>

        {/* Dynamic Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {displayedDishes.map((dish, idx) => {
              const isFav = favorites.includes(dish.id);

              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => onSelectDish(dish)}
                  className="group flex flex-col bg-[#121519]/90 rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-500 shadow-xl cursor-pointer"
                >
                  {/* Dish Photo Aspect Frame */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1f26]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Subtle Top Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121519] via-transparent to-black/30" />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, dish.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors z-10"
                      aria-label="Save dish"
                    >
                      <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                    </button>

                    {/* Chef badge or Modern icon */}
                    {dish.category === 'burgers' || dish.category === 'shawarma' ? (
                      <div className="absolute top-4 left-4 bg-[#c6a869] px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider text-[#0d0f11] uppercase flex items-center gap-1 shadow">
                        <Flame size={11} />
                        <span>Modern Gourmet</span>
                      </div>
                    ) : dish.isChefSpecial ? (
                      <div className="absolute top-4 left-4 bg-[#b5c99a]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider text-[#0d0f11] uppercase flex items-center gap-1 shadow">
                        <Sparkles size={11} />
                        <span>Chef's Choice</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Card Content matching video layout */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Header: Title and Price aligned on top */}
                      <div className="flex items-baseline justify-between gap-4 mb-3 border-b border-white/5 pb-3">
                        <h3 className="font-cormorant text-2xl italic text-white font-normal group-hover:text-[#b5c99a] transition-colors leading-tight">
                          {dish.name}
                        </h3>
                        <span className="font-mono text-sm sm:text-base font-medium text-[#e3dac9] shrink-0">
                          {formatPrice(dish)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Dish Footer */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Wine size={14} className="text-[#c6a869]" />
                        <span className="truncate max-w-[140px] italic text-[11px] text-neutral-300 font-serif">
                          {dish.winePairing || 'Craft Pairing'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#b5c99a] group-hover:underline flex items-center gap-1 font-light">
                        <Info size={13} />
                        <span>Details</span>
                      </span>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
