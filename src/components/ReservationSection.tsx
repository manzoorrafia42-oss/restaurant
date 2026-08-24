import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, CheckCircle, Sparkles, User, MapPin, X, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    persons: '2',
    timing: '19:00',
    date: new Date().toISOString().split('T')[0],
    seatingArea: 'Garden Terrace' as 'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar',
    specialRequests: ''
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const reservation: ReservationData = {
        id: `EDM-${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.name,
        phone: formData.phone || '+380 96 123 4567',
        email: formData.email,
        persons: parseInt(formData.persons, 10),
        date: formData.date,
        time: formData.timing,
        seatingArea: formData.seatingArea,
        specialRequests: formData.specialRequests,
        createdAt: new Date().toLocaleDateString()
      };

      setConfirmedReservation(reservation);
      setIsSubmitting(false);

      // Trigger celebratory golden confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b5c99a', '#c6a869', '#ffffff', '#e3dac9']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 600);
  };

  return (
    <section
      id="reservation"
      className="relative py-28 sm:py-36 bg-[#090b0d] overflow-hidden"
    >
      {/* Dark Mood Background with ambient tables & chairs from video */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop"
          alt="Atmospheric dark dining background"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b0d] via-[#090b0d]/70 to-[#090b0d]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Block matching video */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-light block mb-2">
            Reservation
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl italic text-white font-normal">
            Book Your Table
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-light mt-3 max-w-md mx-auto">
            Experience exceptional dining in the serene natural ambiance of Edem.
          </p>
        </div>

        {/* 2x2 Form Container matching the video layout */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#121519]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl text-left max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            
            {/* 1. Name Input */}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5 font-light">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#181c21]/90 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#b5c99a] transition-colors"
                />
              </div>
            </div>

            {/* 2. Persons Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5 font-light">
                Persons
              </label>
              <select
                value={formData.persons}
                onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                className="w-full bg-[#181c21]/90 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5c99a] transition-colors appearance-none cursor-pointer"
              >
                <option value="1">1 Person (Solo Dining)</option>
                <option value="2">2 Persons (Romantic / Duo)</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons (Standard Table)</option>
                <option value="5">5 Persons</option>
                <option value="6">6 Persons (Family Table)</option>
                <option value="8">8+ Persons (Private Lounge)</option>
              </select>
            </div>

            {/* 3. Timing Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5 font-light">
                Timing
              </label>
              <select
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full bg-[#181c21]/90 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5c99a] transition-colors appearance-none cursor-pointer"
              >
                <option value="10:00">10:00 AM (Breakfast)</option>
                <option value="11:30">11:30 AM (Brunch)</option>
                <option value="13:00">01:00 PM (Lunch)</option>
                <option value="15:00">03:00 PM (Tea & Snacks)</option>
                <option value="18:00">06:00 PM (Sunset Dinner)</option>
                <option value="19:00">07:00 PM (Evening Prime)</option>
                <option value="20:00">08:00 PM (Chef's Special Hour)</option>
                <option value="21:30">09:30 PM (Late Dining & Wine)</option>
              </select>
            </div>

            {/* 4. Date Picker */}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5 font-light">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#181c21]/90 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b5c99a] transition-colors appearance-none cursor-pointer"
              />
            </div>

          </div>

          {/* Seating preference pill selector */}
          <div className="mb-8">
            <label className="block text-[11px] uppercase tracking-widest text-neutral-400 mb-2 font-light">
              Atmospheric Area Preference
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'Garden Terrace',
                'Main Botanical Hall',
                'Private Glasshouse',
                'Wine Cellar'
              ].map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => setFormData({ ...formData, seatingArea: area as any })}
                  className={`px-3 py-2 rounded-xl text-xs text-center border transition-all truncate ${
                    formData.seatingArea === area
                      ? 'bg-[#253020] border-[#b5c99a] text-[#b5c99a]'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Center Submit Button matching video */}
          <div className="text-center">
            <motion.button
              id="submit-book-table-btn"
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-3.5 rounded-full border border-white/40 text-white font-light text-sm sm:text-base tracking-widest uppercase hover:bg-white hover:text-[#0d0f11] hover:border-white transition-all duration-300 shadow-xl focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Your Table...' : 'Book A Table'}
            </motion.button>
          </div>
        </form>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#14171c] border border-[#b5c99a]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-left relative"
            >
              <button
                onClick={() => setConfirmedReservation(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#253020] border border-[#b5c99a]/50 flex items-center justify-center text-[#b5c99a]">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#b5c99a] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl italic text-white">
                    We Look Forward To Welcoming You
                  </h3>
                </div>
              </div>

              {/* VIP Reservation Ticket Summary */}
              <div className="bg-[#1a1e24] border border-white/10 rounded-2xl p-5 mb-6 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Reservation Reference</span>
                  <span className="font-mono text-[#e3dac9] font-bold tracking-wider">{confirmedReservation.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Guest Name</span>
                  <span className="text-white font-medium">{confirmedReservation.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Date & Time</span>
                  <span className="text-white font-medium">{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Guests & Atmosphere</span>
                  <span className="text-white font-medium">{confirmedReservation.persons} Guests • {confirmedReservation.seatingArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Location</span>
                  <span className="text-[#b5c99a]">Kostandi, 7, Odesa, Ukraine</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="flex-1 py-3 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs uppercase tracking-wider hover:bg-[#cde4b3] text-center"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
