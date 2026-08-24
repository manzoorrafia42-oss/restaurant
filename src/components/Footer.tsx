import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, CheckCircle2, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#08090b] text-[#e8e6e3] pt-16 pb-12 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Layout exactly matching the video */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/5 items-start">
          
          {/* Left Column: Nav Links */}
          <div className="md:col-span-3">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-sm text-neutral-300 hover:text-[#b5c99a] transition-colors focus:outline-none"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('story')}
                className="text-left text-sm text-neutral-300 hover:text-[#b5c99a] transition-colors focus:outline-none"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left text-sm text-neutral-300 hover:text-[#b5c99a] transition-colors focus:outline-none"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="text-left text-sm text-neutral-300 hover:text-[#b5c99a] transition-colors focus:outline-none"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="text-left text-sm text-neutral-300 hover:text-[#b5c99a] transition-colors focus:outline-none"
              >
                Reservation
              </button>
            </div>
          </div>

          {/* Center Column: Newsletter Subscription matching video wording */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-xs text-neutral-400 font-light mb-1">
              Join our mailing list for updates.
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 font-normal mb-5">
              Get news & offers events.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#b5c99a] bg-[#1a2318] border border-[#b5c99a]/30 px-4 py-2.5 rounded-full">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing to Edem updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-sm gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#13161a] border border-white/15 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#b5c99a]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-[#0d0f11] hover:bg-[#b5c99a] transition-colors text-xs uppercase tracking-wider font-medium"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contacts & Socials matching video */}
          <div className="md:col-span-4 flex flex-col md:items-end text-left md:text-right">
            <h4 className="font-cormorant text-2xl italic text-white font-normal mb-3 underline decoration-[#b5c99a]/50 underline-offset-4">
              Contacts
            </h4>

            <div className="space-y-1.5 text-xs text-neutral-300 font-light mb-5">
              <p>
                <a href={`tel:${RESTAURANT_INFO.phoneSecondary}`} className="hover:text-[#b5c99a] transition-colors">
                  {RESTAURANT_INFO.phoneSecondary}
                </a>
              </p>
              <p>{RESTAURANT_INFO.address}</p>
              <p>
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#b5c99a] transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>

            {/* Social Icons matching video */}
            <div className="flex items-center gap-4 text-neutral-400">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright and scroll top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div className="flex items-center gap-2">
            <span className="font-cormorant italic text-lg text-[#b5c99a]">Edem</span>
            <span>© {new Date().getFullYear()} Edem Restaurant. All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};
