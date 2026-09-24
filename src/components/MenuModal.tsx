import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, Filter, Leaf, Wheat, Wine, Utensils, Heart, Plus, Check } from 'lucide-react';
import { MenuItem, Currency } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  currentCurrency: Currency;
  onSelectDish: (dish: MenuItem) => void;
  onOpenReservation: () => void;
  onAddToCart?: (dish: MenuItem) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  currentCurrency,
  onSelectDish,
  onOpenReservation,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [recentlyAddedIds, setRecentlyAddedIds] = useState<string[]>([]);

  // Update selected category when initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'burgers', label: 'Zinger & Burgers 🍔' },
    { id: 'shawarma', label: 'Shawarma & Wraps 🌯' },
    { id: 'street-food', label: 'Loaded Fries & Bites 🍟' },
    { id: 'pasta', label: 'Pastas' },
    { id: 'grill', label: 'Meat & Grill' },
    { id: 'breakfast', label: 'Breakfasts' },
    { id: 'dinner', label: 'Dinners' },
    { id: 'snacks', label: 'Heavenly Snacks' },
    { id: 'dessert', label: 'Desserts' },
    { id: 'drinks', label: 'Cocktails & Wine' },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    // Support common transliterations e.g., 'singer' -> 'zinger', 'suwarmy' / 'suwarma' -> 'shawarma'
    const normalizedQ = q.replace(/singer/g, 'zinger').replace(/suwarm[ay]/g, 'shawarma');

    return MENU_ITEMS.filter((item) => {
      const matchCat =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'drinks'
          ? item.category === 'drinks' || item.category === 'wine'
          : item.category === selectedCategory;

      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const itemCat = item.category.toLowerCase();
      const itemIngs = item.ingredients.map((ing) => ing.toLowerCase()).join(' ');

      const matchSearch =
        !q ||
        itemName.includes(q) ||
        itemName.includes(normalizedQ) ||
        itemDesc.includes(q) ||
        itemDesc.includes(normalizedQ) ||
        itemCat.includes(q) ||
        itemCat.includes(normalizedQ) ||
        itemIngs.includes(q) ||
        itemIngs.includes(normalizedQ);

      const matchVeg = vegetarianOnly ? item.isVegetarian : true;
      const matchGF = glutenFreeOnly ? item.isGlutenFree : true;

      return matchCat && matchSearch && matchVeg && matchGF;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly, glutenFreeOnly]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f1215] border border-white/15 rounded-3xl w-full max-w-5xl h-[92vh] max-h-[850px] flex flex-col overflow-hidden shadow-2xl relative"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#14181c]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#b5c99a] font-medium block">
              Edem Haute Gastronomy
            </span>
            <h2 className="font-cormorant text-2xl sm:text-3xl italic text-white">
              Complete Digital Menu & Cellar
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-white/5 bg-[#121519] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search dishes, truffles, pasta, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1b1f24] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#b5c99a]"
              />
            </div>

            {/* Dietary Filter Toggles */}
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                  vegetarianOnly
                    ? 'bg-[#203020] border-[#b5c99a] text-[#b5c99a]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <Leaf size={13} />
                <span>Vegetarian</span>
              </button>

              <button
                onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                  glutenFreeOnly
                    ? 'bg-[#332b1a] border-[#c6a869] text-[#c6a869]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <Wheat size={13} />
                <span>Gluten-Free</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#b5c99a] text-[#0d0f11] font-semibold'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <Utensils size={36} className="mx-auto mb-3 text-neutral-600" />
              <p className="text-base font-cormorant italic text-white">No dishes matched your criteria</p>
              <p className="text-xs mt-1">Try changing the category or dietary filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDish(item)}
                  className="bg-[#14181c] border border-white/10 hover:border-white/25 rounded-2xl p-4 flex gap-4 transition-all duration-300 group cursor-pointer"
                >
                  {/* Dish Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#1a1f26] relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.isChefSpecial && (
                      <div className="absolute top-1.5 left-1.5 bg-[#b5c99a] text-[#0d0f11] p-1 rounded-md">
                        <Sparkles size={10} />
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-cormorant text-xl italic text-white group-hover:text-[#b5c99a] transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-[#e3dac9] shrink-0">
                          {formatPrice(item)}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-400 font-light line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                      <span className="italic text-[#c6a869] flex items-center gap-1 min-w-0">
                        <Wine size={12} className="shrink-0" />
                        <span className="truncate max-w-[100px] sm:max-w-[130px]">{item.winePairing || 'Paired wine'}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {onAddToCart && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(item);
                              setRecentlyAddedIds((prev) => [...prev, item.id]);
                              setTimeout(() => {
                                setRecentlyAddedIds((prev) => prev.filter((id) => id !== item.id));
                              }, 1800);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all flex items-center gap-1 ${
                              recentlyAddedIds.includes(item.id)
                                ? 'bg-[#b5c99a] text-[#0d0f11]'
                                : 'bg-white/10 hover:bg-[#b5c99a] hover:text-[#0d0f11] text-white'
                            }`}
                          >
                            {recentlyAddedIds.includes(item.id) ? (
                              <>
                                <Check size={10} />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus size={10} />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        )}
                        <span className="text-[#b5c99a] group-hover:underline text-[11px]">Details →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with quick Reservation CTA */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#14181c] flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            <span>Showing {filteredItems.length} dishes</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="px-6 py-2.5 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs uppercase tracking-wider hover:bg-[#cde4b3] transition-colors"
            >
              Reserve Table For Tasting
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
