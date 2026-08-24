/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EdemSpaceSection } from './components/EdemSpaceSection';
import { StorySection } from './components/StorySection';
import { MenuShowcaseSection } from './components/MenuShowcaseSection';
import { PopularDishesSection } from './components/PopularDishesSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { DishDetailModal } from './components/DishDetailModal';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

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

  return (
    <div className="min-h-screen bg-[#0d0f11] text-[#e8e6e3] font-sans selection:bg-[#b5c99a]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenMenuModal={() => handleOpenMenuModal('all')}
        onOpenReservation={handleScrollToReservation}
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

        {/* 5. Popular Dishes - Bolognese, Green Carbonara, Rack of Lamb */}
        <PopularDishesSection
          currentCurrency={currency}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* 6. Services & Events - Events, Special Menus, Delivery with Barbecue party preview */}
        <ServicesSection
          onOpenReservation={handleScrollToReservation}
          onOpenMenu={() => handleOpenMenuModal('all')}
        />

        {/* 7. Reviews Section - Visitors feedback & star ratings */}
        <ReviewsSection />

        {/* 8. Reservation Section - Book Your Table 2x2 form */}
        <ReservationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
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
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        currentCurrency={currency}
        onOpenReservation={() => {
          setSelectedDish(null);
          handleScrollToReservation();
        }}
      />
    </div>
  );
}
