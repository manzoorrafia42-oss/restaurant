import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Wine, Clock, Flame, Leaf, Wheat, Heart, Calendar, Plus, Check, ShoppingBag } from 'lucide-react';
import { MenuItem, Currency } from '../types';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  currentCurrency: Currency;
  onOpenReservation: () => void;
  onAddToCart?: (dish: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  currentCurrency,
  onOpenReservation,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);
  if (!dish) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93 }}
        className="bg-[#121519] border border-white/15 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black transition-colors"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Hero Photo Aspect */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1a1f26]">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121519] via-transparent to-black/30" />

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            {dish.isChefSpecial && (
              <span className="px-3 py-1 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs flex items-center gap-1">
                <Sparkles size={12} />
                <span>Chef's Special</span>
              </span>
            )}
            {dish.isVegetarian && (
              <span className="px-3 py-1 rounded-full bg-[#203020] border border-[#b5c99a]/30 text-[#b5c99a] text-xs flex items-center gap-1">
                <Leaf size={12} />
                <span>Vegetarian</span>
              </span>
            )}
            {dish.isGlutenFree && (
              <span className="px-3 py-1 rounded-full bg-[#332b1a] border border-[#c6a869]/30 text-[#c6a869] text-xs flex items-center gap-1">
                <Wheat size={12} />
                <span>Gluten-Free</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Price */}
          <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                Category: {dish.category.toUpperCase()}
              </span>
              <h3 className="font-cormorant text-3xl sm:text-4xl italic text-white mt-0.5">
                {dish.name}
              </h3>
            </div>
            <span className="font-mono text-xl sm:text-2xl font-semibold text-[#e3dac9]">
              {formatPrice(dish)}
            </span>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-sm font-light leading-relaxed">
            {dish.description}
          </p>

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2.5">
              Fresh Ingredients & Artistry
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#181c21] border border-white/10 text-xs text-neutral-300"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Specs: Prep time, Calories, Wine pairing */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#181c21] border border-white/5 text-xs text-center">
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Preparation</span>
              <div className="flex items-center justify-center gap-1 text-white font-medium mt-1">
                <Clock size={13} className="text-[#b5c99a]" />
                <span>{dish.prepTime || '20 min'}</span>
              </div>
            </div>
            <div className="border-x border-white/10">
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Energy</span>
              <div className="flex items-center justify-center gap-1 text-white font-medium mt-1">
                <Flame size={13} className="text-amber-400" />
                <span>{dish.calories || '550'} kcal</span>
              </div>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Sommelier Pairing</span>
              <div className="flex items-center justify-center gap-1 text-[#c6a869] font-medium mt-1 truncate px-1">
                <Wine size={13} />
                <span className="truncate italic font-serif">{dish.winePairing || 'House Red'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {onAddToCart && (
              <button
                onClick={() => {
                  onAddToCart(dish);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`w-full sm:w-auto px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-[#b5c99a] text-[#0d0f11]'
                    : 'bg-[#c6a869] text-[#0d0f11] hover:bg-[#dec186]'
                }`}
              >
                {added ? (
                  <>
                    <Check size={15} />
                    <span>Added to Order</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    <span>Add to Table Order</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="w-full sm:flex-1 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={15} />
              <span>Book Table for this Dish</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-full border border-white/10 text-xs text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
