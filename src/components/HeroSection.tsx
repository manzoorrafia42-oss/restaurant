import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Utensils, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onOpenMenu
}) => {
  const scrollToNext = () => {
    const el = document.getElementById('edem-space');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#0d0f11] via-[#0f1215] to-[#0d0f11]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#b5c99a]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#c6a869]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic composition matching video */}
          <div className="lg:col-span-6 flex flex-col justify-center relative select-none">
            
            {/* Ghost outline stacked typography effect from video */}
            <div className="absolute -top-14 left-0 -z-10 opacity-30 select-none pointer-events-none hidden sm:block">
              <span className="font-cormorant text-6xl sm:text-7xl lg:text-8xl italic block text-outline-layered tracking-tight leading-none">
                Welcome
              </span>
              <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-none mt-1">
                to Edem
              </span>
              <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-none mt-1">
                restaurant
              </span>
            </div>

            {/* Main Foreground Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.08] tracking-tight text-white mb-8">
                <span className="block italic">Welcome</span>
                <span className="block italic">to Edem</span>
                <span className="block italic text-[#e3dac9]">restaurant</span>
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.button
                  id="hero-reservation-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenReservation}
                  className="px-8 py-3 rounded-full border border-white/40 text-white font-light text-sm sm:text-base tracking-widest uppercase hover:bg-white hover:text-[#0d0f11] hover:border-white transition-all duration-300 shadow-lg shadow-black/40 focus:outline-none"
                >
                  Reservation
                </motion.button>

                <motion.button
                  id="hero-viewmenu-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenMenu}
                  className="px-7 py-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-light text-sm sm:text-base tracking-wider hover:bg-white/10 hover:text-white transition-all duration-300 focus:outline-none flex items-center gap-2"
                >
                  <Utensils size={15} className="text-[#b5c99a]" />
                  <span>Explore Menu</span>
                </motion.button>
              </div>

              {/* Fine Dining Credential Pills */}
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-6 text-xs text-neutral-400 font-light">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5c99a]" />
                  <span>Farm-to-Table Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a869]" />
                  <span>Botanical Garden Terrace</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Gourmet Cast Iron Sizzling Pan Presentation */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="relative w-full max-w-lg"
            >
              {/* Soft glow behind plate */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#b5c99a]/15 via-transparent to-[#c6a869]/10 rounded-full filter blur-2xl transform scale-90 pointer-events-none" />

              {/* Main Sizzling Skillet Image Container */}
              <div className="relative group cursor-pointer" onClick={onOpenMenu}>
                <div className="relative aspect-square rounded-full overflow-hidden p-2 sm:p-4 transition-transform duration-700 group-hover:scale-[1.02]">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
                    alt="Sizzling Gourmet Rack of Lamb in Cast Iron Skillet with fresh herbs"
                    className="w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-105 brightness-95"
                  />
                  {/* Subtle rim highlight */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 pointer-events-none" />
                </div>

                {/* Floating Dish Badge */}
                <div className="absolute -bottom-2 sm:bottom-4 left-4 sm:left-8 bg-[#15181c]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#b5c99a]/20 flex items-center justify-center text-[#b5c99a]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Chef's Signature</p>
                    <p className="text-xs sm:text-sm font-cormorant font-semibold text-white">Rack of Lamb & Rosemary</p>
                  </div>
                </div>

                {/* Seasoning / spice sprinkle particles simulation */}
                <div className="absolute top-10 right-8 bg-[#15181c]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] text-[#b5c99a] hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Woodfired & Fresh</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Down Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <button
            onClick={scrollToNext}
            className="text-neutral-500 hover:text-[#b5c99a] transition-colors p-2 focus:outline-none flex flex-col items-center gap-1"
            aria-label="Scroll to atmosphere"
          >
            <span className="text-[10px] tracking-widest uppercase opacity-60">Discover</span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
