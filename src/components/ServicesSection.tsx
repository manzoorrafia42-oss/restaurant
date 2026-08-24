import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, UtensilsCrossed, Truck, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { RESTAURANT_EVENTS } from '../data/restaurantData';

interface ServicesSectionProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenReservation,
  onOpenMenu,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'special-menus' | 'delivery'>('events');

  return (
    <section id="events" className="py-24 sm:py-32 bg-[#0c0e10] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          
          <div className="lg:col-span-6 relative">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-3">
              What we offer
            </span>

            {/* Ghost outline stacked typography effect from video */}
            <div className="relative">
              <div className="absolute -top-10 left-0 -z-10 opacity-20 pointer-events-none select-none hidden sm:block">
                <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-none">
                  Our Great Services
                </span>
                <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-none mt-1">
                  Our Great Services
                </span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl italic text-white font-normal">
                Our Great Services
              </h2>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mt-4 max-w-xl">
              The atmosphere set the stage. It's about more than just a dining room away from your home. Food takes the spotlight as guests.
            </p>
          </div>

          {/* 3 Interactive Service Tabs matching video icon designs */}
          <div className="lg:col-span-6 flex items-center justify-start lg:justify-end gap-3 sm:gap-6 pt-4">
            
            {/* Events Tab */}
            <button
              id="service-tab-events"
              onClick={() => setActiveTab('events')}
              className={`flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-3xl border transition-all duration-300 min-w-[90px] sm:min-w-[110px] ${
                activeTab === 'events'
                  ? 'bg-[#181d15] border-[#b5c99a] text-[#b5c99a] shadow-lg shadow-[#b5c99a]/10 scale-105'
                  : 'bg-[#121519]/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                activeTab === 'events' ? 'bg-[#253020] border-[#b5c99a]/40 text-[#b5c99a]' : 'bg-[#181c20] border-white/10 text-neutral-300'
              }`}>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Fri</span>
                  <Calendar size={14} className="mt-0.5" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-wide">Events</span>
            </button>

            {/* Special Menus Tab */}
            <button
              id="service-tab-menus"
              onClick={() => setActiveTab('special-menus')}
              className={`flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-3xl border transition-all duration-300 min-w-[90px] sm:min-w-[110px] ${
                activeTab === 'special-menus'
                  ? 'bg-[#1f1b13] border-[#c6a869] text-[#c6a869] shadow-lg shadow-[#c6a869]/10 scale-105'
                  : 'bg-[#121519]/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                activeTab === 'special-menus' ? 'bg-[#332b1a] border-[#c6a869]/40 text-[#c6a869]' : 'bg-[#181c20] border-white/10 text-neutral-300'
              }`}>
                <UtensilsCrossed size={18} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-wide">Special Menus</span>
            </button>

            {/* Delivery Tab */}
            <button
              id="service-tab-delivery"
              onClick={() => setActiveTab('delivery')}
              className={`flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-3xl border transition-all duration-300 min-w-[90px] sm:min-w-[110px] ${
                activeTab === 'delivery'
                  ? 'bg-[#161c22] border-[#709775] text-[#d8f3dc] shadow-lg shadow-[#709775]/10 scale-105'
                  : 'bg-[#121519]/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                activeTab === 'delivery' ? 'bg-[#1d2720] border-[#709775]/40 text-[#d8f3dc]' : 'bg-[#181c20] border-white/10 text-neutral-300'
              }`}>
                <Truck size={18} />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-wide">Delivery</span>
            </button>

          </div>

        </div>

        {/* Dynamic Service Content Showcase */}
        <AnimatePresence mode="wait">
          {activeTab === 'events' && (
            <motion.div
              key="events-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#121519]/90 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Event Details matching video */}
                <div className="lg:col-span-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-2">
                    Discover
                  </span>
                  <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl italic text-white font-normal mb-4">
                    Upcoming Events
                  </h3>
                  
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    You will meet interesting people under the atmosphere of live music and of course the accompaniment of incredible dishes at our barbecue party or tastings of new dishes from the chef
                  </p>

                  {/* Highlight event chip matching video: Barbecue party | 28 July | Tropical room */}
                  <div className="bg-[#181c21] border border-white/10 rounded-2xl p-4 sm:p-5 mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="font-cormorant text-2xl italic text-white font-normal">
                        Barbecue party
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        (Search for new events every weekend)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#253020] border border-[#b5c99a]/30 text-xs text-[#b5c99a] font-mono">
                        28 July
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                        Tropical room
                      </span>
                    </div>
                  </div>

                  {/* Event CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={onOpenReservation}
                      className="px-6 py-2.5 rounded-full bg-[#b5c99a] text-[#0d0f11] font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-[#cde4b3] transition-colors"
                    >
                      Reserve Event Table
                    </button>
                    <span className="text-xs text-neutral-400 italic">
                      • Limited to 20 guest seats
                    </span>
                  </div>
                </div>

                {/* Right Image: Evening atmospheric garden dining with glowing lamps */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-xl group">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                      alt="Upcoming events at Edem restaurant garden terrace"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                      <span className="font-cormorant italic text-sm text-white">Tropical Room & Patio</span>
                      <span className="text-[#b5c99a] font-medium">Live Saxophone & BBQ</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'special-menus' && (
            <motion.div
              key="special-menus-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#121519]/90 border border-[#c6a869]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#c6a869] font-light block mb-2">
                    Culinary Craft
                  </span>
                  <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl italic text-white font-normal mb-4">
                    Seasonal Chef's Tasting Menus
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Every season, our culinary artists curate an exclusive 5-course gastronomic journey using organic vegetables from the Edem greenhouse, prime aged meats, and rare Ukrainian truffles.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                      <span className="text-white font-medium">Summer Truffle & Dry-Aged Beef Flight</span>
                      <span className="text-[#c6a869] font-mono font-semibold">1,450 UAH</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                      <span className="text-white font-medium">Garden Botanics & Seafood Tasting</span>
                      <span className="text-[#c6a869] font-mono font-semibold">1,600 UAH</span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenMenu}
                    className="px-6 py-2.5 rounded-full bg-[#c6a869] text-[#0d0f11] font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-[#dfc58d] transition-colors"
                  >
                    View Special Menus
                  </button>
                </div>
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop"
                      alt="Special tasting menu preparation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'delivery' && (
            <motion.div
              key="delivery-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#121519]/90 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d8f3dc] font-light block mb-2">
                    At Your Home
                  </span>
                  <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl italic text-white font-normal mb-4">
                    Edem Gourmet Delivery & Catering
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    Enjoy haute cuisine in the comfort of your private residence. Packed with eco-friendly thermal preservation to ensure optimal plating temperature and taste integrity.
                  </p>
                  <div className="flex flex-col gap-2 text-xs text-neutral-300 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b5c99a]" />
                      <span>Complimentary delivery across Odesa on orders over 1,000 UAH</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b5c99a]" />
                      <span>Estimated delivery time: 35-45 minutes</span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenMenu}
                    className="px-6 py-2.5 rounded-full bg-white text-[#0d0f11] font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-neutral-200 transition-colors"
                  >
                    Order Online Delivery
                  </button>
                </div>
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
                      alt="Gourmet dining delivery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
