import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, X, Sparkles, GlassWater, Plus, Check } from 'lucide-react';
import { MenuItem, Currency } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';

interface SommelierAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
  currentCurrency: Currency;
}

export const SommelierAdvisorModal: React.FC<SommelierAdvisorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currentCurrency,
}) => {
  const [selectedPairingTheme, setSelectedPairingTheme] = useState<'burgers' | 'shawarma' | 'pasta' | 'lamb' | 'dessert'>('burgers');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const PAIRINGS = {
    burgers: {
      dishName: 'Crispy Zinger & Wagyu Truffle Smash',
      notes: 'The rich umami of aged beef and crispy spice of buttermilk chicken pairs magnificently with refreshing crisp acidity and malt depth to cleanse the palate between decadent bites.',
      recommendations: [
        {
          name: 'Estate Riesling Reserve 2021',
          type: 'White Wine (Dry & Crisp)',
          region: 'Shabo Terroir, Odesa',
          temp: '8°C - 10°C',
          taste: 'Green apple, lime zest, subtle mineral petrol complexity',
          priceUAH: 210,
          priceUSD: 5.5,
          priceEUR: 5.1,
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop'
        },
        {
          name: 'Botanical Juniper & Citrus Fizz',
          type: 'Craft Non-Alcoholic Elixir',
          region: 'House-Infused at Edem',
          temp: 'Served on hand-cut ice',
          taste: 'Crushed rosemary, pink grapefruit oils, sparkling spring water',
          priceUAH: 145,
          priceUSD: 3.8,
          priceEUR: 3.5,
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop'
        }
      ]
    },
    shawarma: {
      dishName: 'Damascus Chicken & Royal Lamb Shawarma',
      notes: 'Warm Middle Eastern spices such as cardamom, cumin, sumac, and garlic toum call for expressive, fruit-forward reds or savory rosés with gentle tannins that complement the garlic and pomegranate reduction.',
      recommendations: [
        {
          name: 'Odesa Saperavi Reserve 2019',
          type: 'Full-Bodied Red Wine',
          region: 'Bessarabia Hills, Black Sea',
          temp: '16°C - 18°C',
          taste: 'Black currant, roasted spices, dark cocoa, smoky oak finish',
          priceUAH: 240,
          priceUSD: 6.3,
          priceEUR: 5.8,
          image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&auto=format&fit=crop'
        },
        {
          name: 'Wild Pomegranate & Mint Spritzer',
          type: 'Artisan Mocktail',
          region: 'Edem Garden Bar',
          temp: 'Chilled with wild mint sprig',
          taste: 'Tart mountain pomegranate, cold-pressed mint, crushed ice',
          priceUAH: 135,
          priceUSD: 3.5,
          priceEUR: 3.3,
          image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop'
        }
      ]
    },
    pasta: {
      dishName: 'Bolognese & Green Carbonara Tagliatelle',
      notes: 'Velvety egg yolk emulsion and slow-simmered San Marzano beef demand structured Sangiovese acidity or herbal minerality to harmoniously cut through Parmigiano Reggiano.',
      recommendations: [
        {
          name: 'Barolo DOCG Tradizionale 2018',
          type: 'Piedmont Fine Red',
          region: 'Piedmont, Italy',
          temp: '17°C',
          taste: 'Dried rose petals, wild cherry, leather, velvety firm tannins',
          priceUAH: 390,
          priceUSD: 10.2,
          priceEUR: 9.5,
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop'
        },
        {
          name: 'Chilled Valdobbiadene Prosecco DOCG',
          type: 'Sparkling Wine',
          region: 'Veneto, Italy',
          temp: '6°C - 8°C',
          taste: 'Crisp pear, white peach, acacia blossoms, fine creamy mousse',
          priceUAH: 220,
          priceUSD: 5.8,
          priceEUR: 5.4,
          image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=400&auto=format&fit=crop'
        }
      ]
    },
    lamb: {
      dishName: 'Rack of Lamb with Eggplant & Pomegranate',
      notes: 'Rich succulent roasted lamb accompanied by smoked eggplant requires profound depth, cedar aromatics, and savory earthiness found in aged Cabernet and Syrah.',
      recommendations: [
        {
          name: 'Château Heritage Cabernet-Merlot 2017',
          type: 'Barrel-Aged Reserve',
          region: 'Odesa Coastal Vineyard',
          temp: '18°C',
          taste: 'Cassis, graphite, dried herbs, vanilla pod, silky finish',
          priceUAH: 295,
          priceUSD: 7.7,
          priceEUR: 7.2,
          image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=400&auto=format&fit=crop'
        }
      ]
    },
    dessert: {
      dishName: 'Velvet Pistachio Cake & Gourmet Pastries',
      notes: 'Delicate nutty sweetness and velvety mascarpone pair like poetry with floral Muscat or amber fortified dessert wine.',
      recommendations: [
        {
          name: 'Late Harvest Muscat Ottonel',
          type: 'Sweet Dessert Wine',
          region: 'Transcarpathian Terroir',
          temp: '10°C',
          taste: 'Candied orange blossom, honeysuckle, dried apricot nectar',
          priceUAH: 185,
          priceUSD: 4.8,
          priceEUR: 4.5,
          image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=400&auto=format&fit=crop'
        }
      ]
    }
  };

  const currentPairing = PAIRINGS[selectedPairingTheme];

  const handleQuickAdd = (rec: any) => {
    // Check if item exists in MENU_ITEMS or create a virtual drink item
    const existing = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(rec.name.toLowerCase()));
    const itemToAdd: MenuItem = existing || {
      id: `drink-${rec.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: rec.name,
      category: 'wine',
      priceUAH: rec.priceUAH,
      priceUSD: rec.priceUSD,
      priceEUR: rec.priceEUR,
      description: `${rec.type} • ${rec.taste}`,
      ingredients: [rec.type, rec.region, rec.temp],
      image: rec.image,
      calories: 120,
      prepTime: '5 min'
    };

    onAddToCart(itemToAdd);
    setAddedItemIds((prev) => [...prev, rec.name]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== rec.name));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="bg-[#121519] border border-[#c6a869]/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#2e2617] border border-[#c6a869]/50 flex items-center justify-center text-[#c6a869]">
            <Wine size={22} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#c6a869] font-semibold">
              Edem Sommelier Guide
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl italic text-white">
              Curated Pairings For Your Palate
            </h3>
          </div>
        </div>

        {/* Cuisine Categories Pills */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
          {[
            { id: 'burgers', label: '🍔 Zinger & Wagyu' },
            { id: 'shawarma', label: '🌯 Spiced Shawarma' },
            { id: 'pasta', label: '🍝 Italian Pastas' },
            { id: 'lamb', label: '🥩 Rack of Lamb' },
            { id: 'dessert', label: '🍰 Velvet Desserts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedPairingTheme(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedPairingTheme === cat.id
                  ? 'bg-[#c6a869] text-[#0d0f11] font-semibold shadow'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pairing Narrative */}
        <div className="bg-[#171b21] rounded-2xl p-4 border border-white/5 mb-6">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">
            Pairing Harmony for: <strong className="text-white font-normal">{currentPairing.dishName}</strong>
          </span>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            {currentPairing.notes}
          </p>
        </div>

        {/* Recommendation Cards */}
        <div className="space-y-4 mb-6">
          {currentPairing.recommendations.map((rec, i) => {
            const isAdded = addedItemIds.includes(rec.name);
            const priceStr =
              currentCurrency === 'USD'
                ? `$${rec.priceUSD.toFixed(1)}`
                : currentCurrency === 'EUR'
                ? `€${rec.priceEUR.toFixed(1)}`
                : `${rec.priceUAH} UAH`;

            return (
              <div
                key={i}
                className="bg-[#15181d] border border-white/10 hover:border-[#c6a869]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-black/40"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#c6a869] uppercase tracking-wider block">
                      {rec.type} • {rec.region}
                    </span>
                    <h4 className="font-cormorant text-xl italic text-white">
                      {rec.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                      {rec.taste} • Serve at {rec.temp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <span className="font-mono text-sm font-semibold text-[#e3dac9]">
                    {priceStr}
                  </span>
                  <button
                    onClick={() => handleQuickAdd(rec)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                      isAdded
                        ? 'bg-[#b5c99a] text-[#0d0f11]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={13} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={13} />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs text-neutral-200 uppercase tracking-wider transition-colors"
        >
          Close Sommelier Guide
        </button>
      </motion.div>
    </div>
  );
};
