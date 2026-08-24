import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, PhoneCall, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface StorySectionProps {
  onOpenReservation: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#0d0f11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 relative">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light block mb-3">
              Discover
            </span>

            {/* Ghost outline stacked typography effect from video */}
            <div className="relative mb-6">
              <div className="absolute -top-10 left-0 -z-10 opacity-20 pointer-events-none select-none hidden sm:block">
                <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-tight">
                  Our Delicious Story
                </span>
                <span className="font-cormorant text-5xl sm:text-6xl lg:text-7xl italic block text-outline-layered tracking-tight leading-tight">
                  Our Delicious Story
                </span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl italic text-white font-normal leading-tight">
                Our Delicious Story
              </h2>
            </div>

            {/* Paragraph matching video verbatim */}
            <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
              {RESTAURANT_INFO.story}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <motion.button
                id="story-reserve-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenReservation}
                className="px-7 py-3 rounded-full border border-white/30 text-white font-light text-sm tracking-wider uppercase hover:bg-[#b5c99a] hover:text-[#0d0f11] hover:border-[#b5c99a] transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Reserve your table</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Right Image: Cozy botanical dining room overlooking lush nature */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Edem restaurant cozy dining room with round wooden tables overlooking forest garden"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Ambient overlay and caption badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                <span className="font-cormorant italic text-sm text-white">Botanical Greenhouse Lounge</span>
                <span className="text-neutral-400">Seats up to 40 guests</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Info Bar - Exactly as in the video (Locate Us, Open Hours, Reservation) */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-[#13161a]/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/5">
            
            {/* Locate Us */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1b1f24] border border-white/10 flex items-center justify-center text-[#b5c99a] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-white font-normal mb-1">
                  Locate Us
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  {RESTAURANT_INFO.address}
                </p>
              </div>
            </div>

            {/* Open Hours */}
            <div className="flex items-start gap-4 md:border-x md:border-white/5 md:px-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1b1f24] border border-white/10 flex items-center justify-center text-[#c6a869] shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-white font-normal mb-1">
                  Open Hours
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  {RESTAURANT_INFO.hours}
                </p>
              </div>
            </div>

            {/* Reservation Contact */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1b1f24] border border-white/10 flex items-center justify-center text-[#b5c99a] shrink-0">
                <PhoneCall size={22} />
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-white font-normal mb-1">
                  Reservation
                </h3>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-xs sm:text-sm text-neutral-300 font-light hover:text-[#b5c99a] transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
