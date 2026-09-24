/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, MenuItem, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EdemSpaceSection } from './components/EdemSpaceSection';
import { StorySection } from './components/StorySection';
import { MenuShowcaseSection } from './components/MenuShowcaseSection';
import { PopularDishesSection } from './components/PopularDishesSection';
import { AtmosphereTourSection } from './components/AtmosphereTourSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { DishDetailModal } from './components/DishDetailModal';
import { TableOrderDrawer } from './components/TableOrderDrawer';
import { SommelierAdvisorModal } from './components/SommelierAdvisorModal';
import { ShoppingBag, Check, Wine } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [selectedSeatingArea, setSelectedSeatingArea] = useState<
    'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar'
  >('Garden Terrace');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    showToast(`Added ${dish.name} to your table order`);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenMenuModal = (category: string = 'all') => {
    setMenuInitialCategory(category);
    setIsMenuModalOpen(true);
  };

  const handleScrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectAreaAndReserve = (
    area: 'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar'
  ) => {
    setSelectedSeatingArea(area);
    handleScrollToReservation();
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0f11] text-[#e8e6e3] font-sans selection:bg-[#b5c99a]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenMenuModal={() => handleOpenMenuModal('all')}
        onOpenReservation={handleScrollToReservation}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section - Welcome to Edem restaurant with gourmet skillet */}
        <HeroSection
          onOpenReservation={handleScrollToReservation}
          onOpenMenu={() => handleOpenMenuModal('all')}
        />

        {/* 2. Edem Space Section - Ethereal cloud mist transition to paradise terrace */}
        <EdemSpaceSection />

        {/* 3. Story Section - Our Delicious Story with location, hours, reservation bar */}
        <StorySection onOpenReservation={handleScrollToReservation} />

        {/* 4. Menu Showcase - Breakfasts, Dinners, Snacks */}
        <MenuShowcaseSection
          onOpenCategoryMenu={(cat) => handleOpenMenuModal(cat)}
          onOpenFullMenu={() => handleOpenMenuModal('all')}
        />

        {/* 5. Popular Dishes - Bolognese, Green Carbonara, Rack of Lamb + Zinger & Shawarma */}
        <PopularDishesSection
          currentCurrency={currency}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
          onOpenSommelier={() => setIsSommelierOpen(true)}
        />

        {/* 6. Dining Atmosphere & Seating Area Visualizer */}
        <AtmosphereTourSection
          onSelectAreaForReservation={handleSelectAreaAndReserve}
        />

        {/* 7. Services & Events - Events, Special Menus, Delivery with Barbecue party preview */}
        <ServicesSection
          onOpenReservation={handleScrollToReservation}
          onOpenMenu={() => handleOpenMenuModal('all')}
        />

        {/* 8. Reviews Section - Visitors feedback & star ratings */}
        <ReviewsSection />

        {/* 9. Reservation Section - Book Your Table 2x2 form */}
        <ReservationSection selectedSeatingArea={selectedSeatingArea} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cart Pill (appears when items added or for fast access) */}
      {totalCartCount > 0 && (
        <aside aria-label="Floating table order cart" className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5">
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-3 bg-[#171b21] hover:bg-[#20262e] border border-[#b5c99a]/50 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-full bg-[#b5c99a] text-[#0d0f11] flex items-center justify-center font-bold text-xs">
              {totalCartCount}
            </div>
            <div className="text-left pr-2">
              <span className="block text-[10px] uppercase tracking-wider text-[#b5c99a] font-semibold">
                Table Order
              </span>
              <span className="text-xs font-mono text-white">
                View Bag →
              </span>
            </div>
          </button>
        </aside>
      )}

      {/* Micro Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#161a20]/95 backdrop-blur-md border border-[#b5c99a]/40 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="w-4 h-4 rounded-full bg-[#b5c99a] text-[#0d0f11] flex items-center justify-center">
            <Check size={10} />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals & Drawers */}
      <TableOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentCurrency={currency}
        onOpenReservation={() => {
          setIsCartOpen(false);
          handleScrollToReservation();
        }}
      />

      <SommelierAdvisorModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
        onAddToCart={handleAddToCart}
        currentCurrency={currency}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        initialCategory={menuInitialCategory}
        currentCurrency={currency}
        onSelectDish={(dish) => {
          setSelectedDish(dish);
        }}
        onOpenReservation={() => {
          setIsMenuModalOpen(false);
          handleScrollToReservation();
        }}
        onAddToCart={handleAddToCart}
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        currentCurrency={currency}
        onOpenReservation={() => {
          setSelectedDish(null);
          handleScrollToReservation();
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
