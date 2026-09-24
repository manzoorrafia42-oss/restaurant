import React, { useState, useEffect } from 'react';
import { Currency } from '../types';
import { Menu, X, CalendarCheck, Clock, MapPin, Phone, ShoppingBag, Volume2, VolumeX, Wine, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/audioAmbiance';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenMenuModal: () => void;
  onOpenReservation: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSommelier?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenMenuModal,
  onOpenReservation,
  cartCount = 0,
  onOpenCart,
  onOpenSommelier,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleSound = () => {
    const playing = ambientSound.toggle();
    setIsAudioPlaying(playing);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0f11]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Styled exactly as Edem */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group flex items-center gap-2 focus:outline-none"
        >
          <span className="font-cormorant text-3xl sm:text-4xl italic font-normal tracking-wide text-[#b5c99a] group-hover:text-[#d8f3dc] transition-colors">
            Edem
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#b5c99a] inline-block opacity-80 group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <button
            id="nav-link-home"
            onClick={() => scrollToSection('home')}
            className="text-sm tracking-wide text-[#e8e6e3] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            Home
          </button>
          <button
            id="nav-link-about"
            onClick={() => scrollToSection('story')}
            className="text-sm tracking-wide text-[#a0a5ad] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            About Us
          </button>
          <button
            id="nav-link-menu"
            onClick={() => scrollToSection('menu')}
            className="text-sm tracking-wide text-[#a0a5ad] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            Menu
          </button>
          <button
            id="nav-link-atmosphere"
            onClick={() => scrollToSection('atmosphere')}
            className="text-sm tracking-wide text-[#a0a5ad] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            Ambiance
          </button>
          <button
            id="nav-link-events"
            onClick={() => scrollToSection('events')}
            className="text-sm tracking-wide text-[#a0a5ad] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            Events
          </button>
          <button
            id="nav-link-reservation"
            onClick={() => scrollToSection('reservation')}
            className="text-sm tracking-wide text-[#a0a5ad] hover:text-[#b5c99a] transition-colors focus:outline-none font-normal"
          >
            Reservation
          </button>
        </nav>

        {/* Currency Selector, Ambiance Audio, Cart & Quick Reservation CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Ambient Garden Soundscape Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioPlaying ? 'Mute Garden Ambiance' : 'Play Gentle Garden Soundscape'}
            className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs ${
              isAudioPlaying
                ? 'bg-[#253020] border-[#b5c99a] text-[#b5c99a]'
                : 'bg-[#181b1f] border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {isAudioPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="hidden lg:inline text-[11px] font-medium">
              {isAudioPlaying ? 'Sound On' : 'Ambiance'}
            </span>
            {isAudioPlaying && (
              <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
                <span className="w-0.5 h-1.5 bg-[#b5c99a] animate-pulse" />
                <span className="w-0.5 h-2.5 bg-[#b5c99a] animate-pulse delay-75" />
                <span className="w-0.5 h-1 bg-[#b5c99a] animate-pulse delay-150" />
              </span>
            )}
          </button>

          {/* Sommelier Quick Button */}
          {onOpenSommelier && (
            <button
              onClick={onOpenSommelier}
              title="Edem Sommelier Wine & Drink Guide"
              className="p-2 rounded-full bg-[#181b1f] border border-white/10 text-neutral-400 hover:text-[#c6a869] hover:border-[#c6a869]/40 transition-colors"
            >
              <Wine size={16} />
            </button>
          )}

          {/* Currency Toggle */}
          <div className="flex items-center rounded-full bg-[#181b1f] border border-white/10 p-0.5 text-xs">
            {(['UAH', 'USD', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  currentCurrency === curr
                    ? 'bg-[#2b3327] text-[#b5c99a] border border-[#b5c99a]/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Table Order Bag Button */}
          {onOpenCart && (
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-full bg-[#181b1f] border border-white/10 hover:border-[#b5c99a] text-neutral-300 hover:text-white transition-colors"
              aria-label="View table order bag"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b5c99a] text-[#0d0f11] font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Book Button */}
          <button
            id="nav-book-btn"
            onClick={onOpenReservation}
            className="px-4 lg:px-5 py-2 rounded-full border border-white/20 text-xs tracking-wider font-light uppercase hover:bg-[#b5c99a] hover:text-[#0d0f11] hover:border-[#b5c99a] transition-all duration-300 focus:outline-none"
          >
            Reservation
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex rounded-full bg-[#181b1f] border border-white/10 p-0.5 text-[10px]">
            {(['UAH', 'USD'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currentCurrency === curr
                    ? 'bg-[#2b3327] text-[#b5c99a]'
                    : 'text-neutral-400'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111417]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-lg font-cormorant text-[#e8e6e3] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-left text-lg font-cormorant text-[#a0a5ad] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-left text-lg font-cormorant text-[#a0a5ad] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              Discover Menu
            </button>
            <button
              onClick={() => scrollToSection('atmosphere')}
              className="text-left text-lg font-cormorant text-[#a0a5ad] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              Dining Ambiance Tour
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-left text-lg font-cormorant text-[#a0a5ad] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              Services & Events
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-left text-lg font-cormorant text-[#a0a5ad] hover:text-[#b5c99a] py-1 border-b border-white/5"
            >
              Book Table
            </button>

            {/* Quick Mobile Action Pills */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={toggleSound}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs flex items-center justify-center gap-1.5 ${
                  isAudioPlaying
                    ? 'bg-[#253020] border-[#b5c99a] text-[#b5c99a]'
                    : 'bg-white/5 border-white/10 text-neutral-300'
                }`}
              >
                {isAudioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{isAudioPlaying ? 'Mute Music' : 'Garden Audio'}</span>
              </button>

              {onOpenSommelier && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSommelier();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#c6a869] flex items-center justify-center gap-1.5"
                >
                  <Wine size={14} />
                  <span>Sommelier</span>
                </button>
              )}
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              {onOpenCart && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 rounded-full bg-[#181d24] border border-[#b5c99a]/40 text-[#b5c99a] font-medium text-xs text-center uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  <span>View Table Order Bag ({cartCount})</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs text-center uppercase tracking-wider"
              >
                Reserve a Table
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMenuModal();
                }}
                className="w-full py-2.5 rounded-full border border-white/20 text-neutral-300 text-xs text-center"
              >
                View Full Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
