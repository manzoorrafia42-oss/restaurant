import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle, Sparkles, Utensils, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency, OrderData } from '../types';

interface TableOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  currentCurrency: Currency;
  onOpenReservation: () => void;
}

export const TableOrderDrawer: React.FC<TableOrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentCurrency,
  onOpenReservation,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'delivery' | 'pickup'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4 (Terrace)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(null);

  // Price calculations
  const totalUAH = cartItems.reduce((acc, item) => acc + item.dish.priceUAH * item.quantity, 0);
  const totalUSD = cartItems.reduce((acc, item) => acc + item.dish.priceUSD * item.quantity, 0);
  const totalEUR = cartItems.reduce((acc, item) => acc + item.dish.priceEUR * item.quantity, 0);

  const formattedTotal = () => {
    if (currentCurrency === 'USD') return `$${totalUSD.toFixed(1)}`;
    if (currentCurrency === 'EUR') return `€${totalEUR.toFixed(1)}`;
    return `${totalUAH} UAH`;
  };

  const formatItemPrice = (priceUAH: number, priceUSD: number, priceEUR: number, qty: number) => {
    if (currentCurrency === 'USD') return `$${(priceUSD * qty).toFixed(1)}`;
    if (currentCurrency === 'EUR') return `€${(priceEUR * qty).toFixed(1)}`;
    return `${priceUAH * qty} UAH`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!guestName.trim() || !guestPhone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderData = {
        id: `EDM-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        items: [...cartItems],
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        customerName: guestName,
        customerPhone: guestPhone,
        totalUAH,
        totalUSD,
        totalEUR,
        status: 'confirmed',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      onClearCart();

      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#b5c99a', '#c6a869', '#ffffff', '#e3dac9'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer Container */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-md bg-[#111418] border-l border-white/10 h-full flex flex-col shadow-2xl z-10 overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#14181d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#253020] border border-[#b5c99a]/30 flex items-center justify-center text-[#b5c99a]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="font-cormorant text-2xl italic text-white font-normal">
                Your Table Order & Bag
              </h2>
              <span className="text-[11px] text-neutral-400 font-light">
                {cartItems.reduce((total, it) => total + it.quantity, 0)} {cartItems.reduce((total, it) => total + it.quantity, 0) === 1 ? 'delicacy' : 'delicacies'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Order Success Confirmation View */}
        {confirmedOrder ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-3xl bg-[#253020] border border-[#b5c99a]/50 flex items-center justify-center text-[#b5c99a] mb-4">
              <CheckCircle size={32} />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-[#b5c99a] font-semibold">
              Order Received By Chef
            </span>
            <h3 className="font-cormorant text-3xl italic text-white mt-1 mb-2">
              Bon Appétit!
            </h3>
            <p className="text-xs text-neutral-400 max-w-xs mb-6 font-light">
              Your gourmet selections are now being prepared with exceptional care by our kitchen brigade.
            </p>

            <div className="w-full bg-[#171b20] border border-white/10 rounded-2xl p-4 text-xs text-left space-y-2.5 mb-6">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Order Reference</span>
                <span className="font-mono text-[#e3dac9] font-bold">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Type</span>
                <span className="text-white capitalize">
                  {confirmedOrder.orderType === 'dine-in' ? `Dine-in (${confirmedOrder.tableNumber})` : confirmedOrder.orderType}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Guest</span>
                <span className="text-white">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Estimated Time</span>
                <span className="text-[#b5c99a] font-medium flex items-center gap-1">
                  <Clock size={12} />
                  15-25 minutes
                </span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-sm">
                <span className="text-white">Total Amount</span>
                <span className="text-[#e3dac9]">
                  {currentCurrency === 'USD' ? `$${confirmedOrder.totalUSD.toFixed(1)}` : currentCurrency === 'EUR' ? `€${confirmedOrder.totalEUR.toFixed(1)}` : `${confirmedOrder.totalUAH} UAH`}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                onClose();
              }}
              className="w-full py-3 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs uppercase tracking-wider hover:bg-[#cde4b3] transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty State */
          <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 mb-4">
              <Utensils size={26} />
            </div>
            <h3 className="font-cormorant text-2xl italic text-white mb-2">
              Your Gourmet Bag is Empty
            </h3>
            <p className="text-xs text-neutral-400 max-w-xs mb-6 font-light leading-relaxed">
              Explore our artisan Zinger burgers, Middle Eastern shawarmas, hand-made pasta, or grilled delicacies to begin.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white uppercase tracking-wider transition-colors"
            >
              Discover Menu
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Form */
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Items List */}
            <div className="p-4 sm:p-6 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.dish.id}
                  className="bg-[#15191e] border border-white/5 rounded-2xl p-3.5 flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-black/40"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-cormorant text-base italic text-white truncate font-medium">
                      {item.dish.name}
                    </h4>
                    <span className="text-xs text-[#c6a869] font-mono">
                      {formatItemPrice(item.dish.priceUAH, item.dish.priceUSD, item.dish.priceEUR, 1)} each
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-[#1b2027] border border-white/10 rounded-xl px-2 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, -1)}
                      className="p-1 text-neutral-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-mono text-white min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.dish.id, 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.dish.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Options & Details */}
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#13171c] space-y-4">
              {/* Order Type Toggle */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1.5 font-light">
                  Order Destination
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-[#1a1f26] p-1 rounded-xl border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-1.5 rounded-lg font-medium transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-[#b5c99a] text-[#0d0f11] font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-1.5 rounded-lg font-medium transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#b5c99a] text-[#0d0f11] font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-1.5 rounded-lg font-medium transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#b5c99a] text-[#0d0f11] font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Pick-up
                  </button>
                </div>
              </div>

              {/* Dynamic Inputs based on type */}
              <div className="space-y-2.5">
                {orderType === 'dine-in' ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Table # or Area (e.g. Table 4 / Terrace)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#181d24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b5c99a]"
                    />
                  </div>
                ) : orderType === 'delivery' ? (
                  <input
                    type="text"
                    required
                    placeholder="Delivery Address (e.g. Deribasivska St, Odesa)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#181d24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b5c99a]"
                  />
                ) : null}

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="bg-[#181d24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b5c99a]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="bg-[#181d24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b5c99a]"
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formattedTotal()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Service & Packaging</span>
                  <span className="text-[#b5c99a]">Complimentary</span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-white pt-1">
                  <span>Total Due</span>
                  <span className="text-[#c6a869] font-mono">{formattedTotal()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full py-3 rounded-full bg-[#b5c99a] text-[#0d0f11] font-semibold text-xs uppercase tracking-widest hover:bg-[#cde4b3] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending to Kitchen...</span>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Confirm Order ({formattedTotal()})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
