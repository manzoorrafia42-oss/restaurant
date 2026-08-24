import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Wind, Sparkles } from 'lucide-react';

export const EdemSpaceSection: React.FC = () => {
  const [cloudsParted, setCloudsParted] = useState(false);

  return (
    <section
      id="edem-space"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#0c0e10] border-y border-white/5"
      onMouseEnter={() => setCloudsParted(true)}
      onClick={() => setCloudsParted(!cloudsParted)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#b5c99a] font-medium block mb-2">
          Sanctuary of Taste & Nature
        </span>
        <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl italic text-white">
          Edem space
        </h2>
        <p className="max-w-xl mx-auto text-sm text-neutral-400 mt-3 font-light">
          An ethereal garden terrace where golden sunlight filters through vine pergolas, inviting you into peaceful harmony.
        </p>
      </div>

      {/* Cinematic Viewport Container */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
          
          {/* Background Garden Space (Sunny outdoor dining terrace with lush ivy & tables) */}
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
            alt="Edem space outdoor garden dining terrace with sun rays"
            className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Golden Sun Flare in top right matching the video */}
          <div className="absolute top-4 right-12 w-48 h-48 bg-amber-400/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-300/20 via-transparent to-transparent pointer-events-none" />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

          {/* Centered "Edem space" typographic title matching video */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="text-center px-4">
              <span className="font-cormorant text-4xl sm:text-6xl md:text-7xl italic font-light text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] tracking-wider">
                Edem space
              </span>
              <span className="block text-xs uppercase tracking-[0.4em] text-[#d8f3dc] mt-2 font-medium opacity-90">
                Where culinary art meets serenity
              </span>
            </div>
          </div>

          {/* Cloud Mist Layers Recreating the Clouds in the video */}
          {/* Cloud Layer 1 - Left */}
          <motion.div
            animate={{
              x: cloudsParted ? -120 : [-20, 20, -20],
              y: cloudsParted ? -30 : [0, -10, 0],
              opacity: cloudsParted ? 0.35 : 0.85
            }}
            transition={{
              x: cloudsParted ? { duration: 1.2 } : { repeat: Infinity, duration: 14, ease: 'easeInOut' },
              y: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
              opacity: { duration: 1 }
            }}
            className="absolute -bottom-10 -left-16 w-80 sm:w-[28rem] h-60 pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-white/90 via-white/80 to-transparent rounded-full filter blur-2xl opacity-60 transform rotate-6" />
          </motion.div>

          {/* Cloud Layer 2 - Right */}
          <motion.div
            animate={{
              x: cloudsParted ? 120 : [20, -20, 20],
              y: cloudsParted ? 30 : [0, 10, 0],
              opacity: cloudsParted ? 0.35 : 0.85
            }}
            transition={{
              x: cloudsParted ? { duration: 1.2 } : { repeat: Infinity, duration: 16, ease: 'easeInOut' },
              y: { repeat: Infinity, duration: 9, ease: 'easeInOut' },
              opacity: { duration: 1 }
            }}
            className="absolute -top-10 -right-16 w-80 sm:w-[32rem] h-64 pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-l from-white/90 via-white/70 to-transparent rounded-full filter blur-2xl opacity-50 transform -rotate-12" />
          </motion.div>

          {/* Cloud Layer 3 - Center Bottom Drift */}
          <motion.div
            animate={{
              y: cloudsParted ? 80 : [0, -8, 0],
              opacity: cloudsParted ? 0.2 : 0.65
            }}
            transition={{
              y: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
              opacity: { duration: 0.8 }
            }}
            className="absolute -bottom-8 left-1/4 w-96 h-40 pointer-events-none z-20"
          >
            <div className="w-full h-full bg-white/80 rounded-full filter blur-3xl opacity-40" />
          </motion.div>

          {/* Interactive Hint Pill */}
          <div className="absolute bottom-4 right-4 z-40 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] text-neutral-300 flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#b5c99a]" />
            <span>{cloudsParted ? 'Garden revealed' : 'Hover / Tap to clear the mist'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
