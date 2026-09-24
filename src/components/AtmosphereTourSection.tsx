import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, Sparkles, Wind, GlassWater, ArrowRight } from 'lucide-react';

interface AtmosphereTourSectionProps {
  onSelectAreaForReservation: (area: 'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar') => void;
}

interface SeatingZone {
  id: 'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar';
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  vibe: string;
  temperature: string;
  lighting: string;
  image: string;
  features: string[];
}

export const AtmosphereTourSection: React.FC<AtmosphereTourSectionProps> = ({
  onSelectAreaForReservation,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar'>('Garden Terrace');

  const ZONES: SeatingZone[] = [
    {
      id: 'Garden Terrace',
      name: 'Sunlit & Starry Garden Terrace',
      tagline: 'Al fresco dining under coastal sea breezes and whispering olive trees',
      description: 'Our most sought-after outdoor sanctuary. During warm afternoons, dappled golden sunlight filters through the botanical canopy. At night, hand-poured beeswax candles and ambient fairy lights create an unforgettable open-air sanctuary.',
      capacity: '2 - 8 Guests per table',
      vibe: 'Romantic, Serene & Natural',
      temperature: 'Fresh Sea Air / Heated Pergola',
      lighting: 'Candlelight & Twilight Glow',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      features: ['Live acoustic guitar on weekends', 'Retractable heated glass roof', 'Panoramic botanical garden view']
    },
    {
      id: 'Main Botanical Hall',
      name: 'Grand Botanical Conservatory Hall',
      tagline: 'Lush living walls, grand brass chandeliers, and velvet intimacy',
      description: 'The architectural centerpiece of Edem. Towering 6-meter glass ceilings house ancient Kentia palms, climbing jasmine, and bespoke emerald velvet seating. Experience the culinary brigade at work through the open theatrical exhibition kitchen.',
      capacity: '2 - 12 Guests per table',
      vibe: 'Vibrant Haute Elegance',
      temperature: 'Comfortable 21°C Climate',
      lighting: 'Warm Brass Chandelier Hue',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      features: ['Live Chef’s exhibition counter', 'Acoustic grand piano centerpiece', 'Artisan brass cocktail bar']
    },
    {
      id: 'Private Glasshouse',
      name: 'Private Solarium Glasshouse',
      tagline: 'An exclusive 360° panoramic glass dome for intimate celebrations',
      description: 'Nestled in a secluded corner of the Edem orchards. The private glasshouse offers undisturbed seclusion with personal butler service, custom acoustic sound control, and personalized multi-course tasting menus.',
      capacity: 'Up to 10 Guests (Exclusive)',
      vibe: 'VIP Seclusion & Celebration',
      temperature: 'Tailored Climate System',
      lighting: 'Custom Dimmable Starlight',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
      features: ['Dedicated Sommelier & Butler', 'Custom curated background playlist', 'Bespoke floral centerpiece table']
    },
    {
      id: 'Wine Cellar',
      name: 'Historic Vaulted Wine Cellar',
      tagline: 'Aged stone arches, vintage oak barriques, and rare reserve vintages',
      description: 'Beneath the restaurant lies our temperature-controlled cellar preserving over 400 rare European and local Ukrainian wines. Guests seated here enjoy private sommelier tastings alongside charcuterie and prime aged steaks.',
      capacity: '4 - 14 Guests',
      vibe: 'Intimate, Aristocratic & Warm',
      temperature: 'Preserved 18°C Cellar',
      lighting: 'Amber Sconce Illumination',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
      features: ['Over 400 Grand Cru vintages', 'Sommelier decanting service', 'Artisan cheese aging display']
    }
  ];

  const currentZone = ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];

  return (
    <section id="atmosphere" className="py-24 sm:py-32 bg-[#0a0c0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#b5c99a] font-medium block mb-2">
            The Edem Experience
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl italic text-white font-normal">
            Choose Your Ambiance
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-light mt-3 max-w-xl mx-auto leading-relaxed">
            Every dining zone at Edem is crafted with dedicated acoustic design, ambient botanical lighting, and sensory atmosphere.
          </p>
        </div>

        {/* Zone Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {ZONES.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 font-medium ${
                  isSelected
                    ? 'bg-[#b5c99a] text-[#0d0f11] shadow-lg shadow-[#b5c99a]/20 font-semibold scale-105'
                    : 'bg-[#14181c] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                {zone.id}
              </button>
            );
          })}
        </div>

        {/* Visual Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentZone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
            className="bg-[#121519]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Photo */}
              <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[500px]">
                <img
                  src={currentZone.image}
                  alt={currentZone.name}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121519] via-transparent to-black/30 lg:hidden" />
                
                {/* Overlay Badge */}
                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs text-white flex items-center gap-2">
                  <Sparkles size={13} className="text-[#b5c99a]" />
                  <span>{currentZone.vibe}</span>
                </div>
              </div>

              {/* Right Zone Details */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#c6a869] font-medium block mb-2">
                    Atmospheric Zone
                  </span>
                  <h3 className="font-cormorant text-3xl sm:text-4xl italic text-white mb-2 leading-tight">
                    {currentZone.name}
                  </h3>
                  <p className="text-xs text-[#b5c99a] font-medium mb-4 italic">
                    "{currentZone.tagline}"
                  </p>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {currentZone.description}
                  </p>

                  {/* Micro Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-[#161a20] p-4 rounded-2xl border border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Capacity</span>
                      <span className="text-white font-medium">{currentZone.capacity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Climate</span>
                      <span className="text-white font-medium">{currentZone.temperature}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Ambiance</span>
                      <span className="text-white font-medium">{currentZone.lighting}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Setting</span>
                      <span className="text-white font-medium">Full Table Service</span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-8">
                    {currentZone.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b5c99a]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => onSelectAreaForReservation(currentZone.id)}
                  className="w-full py-3.5 rounded-full bg-[#b5c99a] hover:bg-[#cde4b3] text-[#0d0f11] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#b5c99a]/10"
                >
                  <span>Reserve Table in {currentZone.id}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
