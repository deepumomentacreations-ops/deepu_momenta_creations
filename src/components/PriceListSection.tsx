import React, { useState } from 'react';
import { Search, ArrowUpDown, Sparkles, Filter, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { 
  pipeCleanerFlowerPrices, 
  pipeCleanerKeychainPrices, 
  crochetKeychainPrices,
  singleFlowerPotPrices,
  doubleFlowerPotPrices,
  PriceListItem
} from '../data/businessData';

interface PriceListSectionProps {
  onOrderClick: (item: { name: string; price: string }) => void;
  activeTab: 'flowers' | 'pipe_keychains' | 'crochet_keychains' | 'flower_pots';
  setActiveTab: (tab: 'flowers' | 'pipe_keychains' | 'crochet_keychains' | 'flower_pots') => void;
}

type TabType = 'flowers' | 'pipe_keychains' | 'crochet_keychains' | 'flower_pots';

const getItemImage = (name: string, tab: TabType): string => {
  const norm = name.toLowerCase();
  
  if (tab === 'pipe_keychains' || tab === 'crochet_keychains') {
    if (norm.includes('bear')) return "/images/bear.jpg";
    if (norm.includes('blue lily')) return "/images/lily.jpg";
    if (norm.includes('pink lily')) return "/images/lily.jpg";
    if (norm.includes('lily')) return "/images/lily.jpg";
    if (norm.includes('bow')) return "/images/bow.jpg";
    if (norm.includes('bunny')) return "/images/bunny.jpg";
    if (norm.includes('butterfly')) return "/images/butterfly.jpg";
    if (norm.includes('cherry')) return "/images/cherry.jpg";
    if (norm.includes('cloud')) return "/images/cloud.jpg";
    if (norm.includes('daisy')) return "/images/daisy.jpg";
    if (norm.includes('evil eye')) return "/images/evil_eye.jpg";
    if (norm.includes('heart chain')) return "/images/heart_chain.jpg";
    if (norm.includes('heart')) return "/images/heart.jpg";
    if (norm.includes('lavender')) return "/images/lavender_bunch.jpg";
    if (norm.includes('lettering')) return "/images/lettering.jpg";
    if (norm.includes('octopus')) return "/images/octopus.jpg";
    if (norm.includes('panda')) return "/images/panda.jpg";
    if (norm.includes('rainbow')) return "/images/rainbow.jpg";
    if (norm.includes('rose')) return "/images/rose.jpg";
    if (norm.includes('smiley')) return "/images/smiley.jpg";
    if (norm.includes('star')) return "/images/star.jpg";
    if (norm.includes('strawberry')) return "/images/strawberry.jpg";
    if (norm.includes('sunflower')) return "/images/sunflower.jpg";
    if (norm.includes('tulip bunch')) return "/images/flower_bouquets_1790604561485.jpg";
    if (norm.includes('tulip')) return "/images/tulip.jpg";
    
    return "/images/handmade_keychains_1790604595375.jpg";
  }

  if (tab === 'flower_pots') {
    if (norm.includes('daisy')) return "/images/daisy_pot.jpg";
    if (norm.includes('sunflower')) return "/images/sunflower_pot.jpg";
    if (norm.includes('tulip')) return "/images/tulip_pot.jpg";
    if (norm.includes('lavender')) return "/images/lavender_pot.jpg";
    if (norm.includes('rose')) return "/images/rose_pot.jpg";
    if (norm.includes('lily')) return "/images/lily_pot.jpg";
    return "/images/flower_pots.jpg";
  }
  
  if (tab === 'flowers') {
    if (norm.includes('daisy')) {
      return "/images/daisy.jpg";
    }
    if (norm.includes('hibiscus')) {
      return "/images/hibiscus.jpg";
    }
    if (norm.includes('tulip')) {
      return "/images/tulip.jpg";
    }
    if (norm.includes('sunflower')) {
      return "/images/sunflower.jpg";
    }
    if (norm.includes('rose')) {
      return "/images/rose.jpg";
    }
    if (norm.includes('lavender')) {
      return "/images/lavender_bunch.jpg";
    }
    if (norm.includes('lily')) {
      return "/images/lily.jpg";
    }
    if (norm.includes('bouquet') || norm.includes('wrapped') || norm.includes('bunch')) {
      return "/images/flower_bouquets_1790604561485.jpg";
    }
    return "/images/pipe_cleaner_flowers_1790604545525.jpg";
  }
  
  return "/images/pipe_cleaner_flowers_1790604545525.jpg";
};

export default function PriceListSection({ onOrderClick, activeTab, setActiveTab }: PriceListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');

  // Interactive custom bouquet builder state
  const [selectedFlowers, setSelectedFlowers] = useState<Record<string, number>>({});

  const updateFlowerQty = (name: string, delta: number) => {
    setSelectedFlowers(prev => {
      const current = prev[name] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: next };
    });
  };

  const clearFlowers = () => {
    setSelectedFlowers({});
  };

  // Calculations
  const totalFlowerCount = Object.values(selectedFlowers).reduce((sum, q) => sum + q, 0);
  const flowersCost = Object.entries(selectedFlowers).reduce((sum, [name, qty]) => {
    const fl = pipeCleanerFlowerPrices.find(f => f.name === name);
    return sum + (fl ? fl.numericPrice * qty : 0);
  }, 0);

  let wrappingCost = 0;
  let wrappingLabel = "None";
  if (totalFlowerCount === 1) {
    wrappingCost = 60;
    wrappingLabel = "1 Flower Wrapping";
  } else if (totalFlowerCount === 2 || totalFlowerCount === 3) {
    wrappingCost = 100;
    wrappingLabel = "2 & 3 Flowers Wrapping";
  } else if (totalFlowerCount === 4 || totalFlowerCount === 5) {
    wrappingCost = 150;
    wrappingLabel = "4 & 5 Flowers Wrapping";
  } else if (totalFlowerCount === 6) {
    wrappingCost = 200;
    wrappingLabel = "5 & 6 Flowers Wrapping";
  } else if (totalFlowerCount === 7 || totalFlowerCount === 8) {
    wrappingCost = 250;
    wrappingLabel = "7 & 8 Flowers Wrapping";
  } else if (totalFlowerCount === 9 || totalFlowerCount === 10) {
    wrappingCost = 350;
    wrappingLabel = "9 & 10 Flowers Wrapping";
  } else if (totalFlowerCount === 11 || totalFlowerCount === 12) {
    wrappingCost = 400;
    wrappingLabel = "11 & 12 Flowers Wrapping";
  } else if (totalFlowerCount === 13 || totalFlowerCount === 14) {
    wrappingCost = 450;
    wrappingLabel = "13 & 14 Flowers Wrapping";
  } else if (totalFlowerCount >= 15) {
    wrappingCost = 500;
    wrappingLabel = "More than 15 Flowers Wrapping";
  }

  const finalTotal = flowersCost + wrappingCost;

  // Map active tab to correct datasets
  const getDataset = (): PriceListItem[] => {
    switch (activeTab) {
      case 'flowers':
        return pipeCleanerFlowerPrices;
      case 'pipe_keychains':
        return pipeCleanerKeychainPrices;
      case 'crochet_keychains':
        return crochetKeychainPrices;
      case 'flower_pots':
        return [...singleFlowerPotPrices, ...doubleFlowerPotPrices];
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'flowers':
        return 'Pipe-Cleaner Flower Price List';
      case 'pipe_keychains':
        return 'Pipe-Cleaner Keychain Price List';
      case 'crochet_keychains':
        return 'Crochet Keychain Price List';
      case 'flower_pots':
        return 'Handcrafted Flower Pot Price List';
    }
  };

  // Filter and Sort dataset
  const filteredAndSortedData = getDataset()
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'priceAsc') {
        return a.numericPrice - b.numericPrice;
      } else if (sortBy === 'priceDesc') {
        return b.numericPrice - a.numericPrice;
      }
      return 0;
    });

  return (
    <section id="price-list" className="py-20 bg-[#F8F4E9]/40 border-y border-[#935073]/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Transparent Pricing</p>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#502D55] leading-tight">
            Our Interactive Price Directory
          </h2>
          <p className="mt-3 text-sm text-[#502D55]/70">
            Choose your favorites from our diverse collections of handcrafted flowers and cute keychains. Every item can be fully customized!
          </p>
        </div>

        {/* Tab Selection Segments (Horizontal smooth scroll on mobile, flex-wrap on tablet/laptop) */}
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth justify-start sm:justify-center gap-2 mb-8 max-w-2xl mx-auto p-1.5 bg-[#502D55]/5 rounded-2xl border border-[#935073]/5">
          <button
            onClick={() => { setActiveTab('flowers'); setSearchQuery(''); }}
            className={`flex-1 min-w-[110px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shrink-0 text-center cursor-pointer ${
              activeTab === 'flowers'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🌸 Flowers
          </button>
          <button
            onClick={() => { setActiveTab('flower_pots'); setSearchQuery(''); }}
            className={`flex-1 min-w-[110px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shrink-0 text-center cursor-pointer ${
              activeTab === 'flower_pots'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🪴 Flower Pots
          </button>
          <button
            onClick={() => { setActiveTab('pipe_keychains'); setSearchQuery(''); }}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shrink-0 text-center cursor-pointer ${
              activeTab === 'pipe_keychains'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🔑 Pipe Keychains
          </button>
          <button
            onClick={() => { setActiveTab('crochet_keychains'); setSearchQuery(''); }}
            className={`flex-1 min-w-[130px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 shrink-0 text-center cursor-pointer ${
              activeTab === 'crochet_keychains'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🧶 Crochet Keychains
          </button>
        </div>

        {/* Search and Sort Filter Bar */}
        <div className="bg-white rounded-xl border border-[#935073]/10 p-3 sm:p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#502D55]/40" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-[#F8F4E9]/30 border border-[#935073]/10 text-xs text-[#502D55] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#935073] focus:bg-white"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown size={14} className="text-[#935073]" />
              <span className="text-xs text-[#502D55]/60 font-medium whitespace-nowrap">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#935073]/15 text-xs text-[#502D55] py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#935073]"
            >
              <option value="name">Alphabetical (A-Z)</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Prices Area (Mobile card list + Tablet/Desktop table) */}
        <div className="bg-white rounded-2xl border border-[#935073]/10 shadow-md overflow-hidden">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[#502D55]/5 to-[#935073]/5 border-b border-[#935073]/10 flex justify-between items-center">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#502D55]">{getTabTitle()}</h3>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#935073] bg-[#935073]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {filteredAndSortedData.length} items
            </span>
          </div>

          {filteredAndSortedData.length > 0 ? (
            <>
              {/* Mobile Phone Card List (<640px) */}
              <div className="block sm:hidden divide-y divide-[#502D55]/5">
                {filteredAndSortedData.map((item) => (
                  <div key={item.name} className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#F8F4E9]/20 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#F8F4E9]/50 border border-[#935073]/10 overflow-hidden relative shrink-0">
                        <img 
                          src={getItemImage(item.name, activeTab)} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-bold text-xs text-[#502D55] leading-snug truncate">{item.name}</p>
                        <p className="text-[11px] font-mono font-extrabold text-[#935073] mt-0.5">{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOrderClick({ name: item.name, price: item.price })}
                      className="shrink-0 px-3 py-1.5 text-[11px] font-bold bg-[#502D55] text-white hover:bg-[#935073] transition-colors rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag size={11} />
                      Order
                    </button>
                  </div>
                ))}
              </div>

              {/* Tablet & Desktop Table View (>=640px) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#935073]/10 text-[#502D55]/60 text-xs font-semibold bg-[#F8F4E9]/20">
                      <th className="py-3 px-6">Product / Design Name</th>
                      <th className="py-3 px-6 text-right">Standard Price</th>
                      <th className="py-3 px-6 text-center w-40">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#502D55]/5">
                    {filteredAndSortedData.map((item) => (
                      <tr 
                        key={item.name} 
                        className="text-sm text-[#502D55] hover:bg-[#F8F4E9]/10 transition-colors"
                      >
                        <td className="py-3 px-6 font-medium flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#F8F4E9]/40 border border-[#935073]/10 overflow-hidden relative shadow-sm shrink-0">
                            <img 
                              src={getItemImage(item.name, activeTab)} 
                              alt={item.name} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-[#502D55] leading-tight">{item.name}</p>
                            <p className="text-[9px] text-[#935073] font-bold tracking-wide uppercase mt-1">
                              {activeTab === 'flowers' ? '🌸 Flower Design' : activeTab === 'flower_pots' ? '🪴 Flower Pot' : activeTab === 'pipe_keychains' ? '🔑 Pipe Cleaner' : '🧶 Crochet Craft'}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-[#935073]">
                          {item.price}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <button
                            onClick={() => onOrderClick({ name: item.name, price: item.price })}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#502D55] text-white hover:bg-[#935073] transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
                          >
                            <ShoppingBag size={12} />
                            Order Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-[#502D55]/60">
              <p className="text-sm">No items match your search. Try typing a different product name!</p>
            </div>
          )}
        </div>

        {/* Interactive Bespoke Bouquet Builder Card */}
        {activeTab === 'flowers' && (
          <div className="mt-8 bg-gradient-to-br from-white to-[#F8F4E9]/20 border border-[#935073]/15 rounded-2xl p-6 md:p-8 shadow-md animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl">✨</span>
              <h3 className="font-serif text-xl font-bold text-[#502D55]">Bespoke Bouquet Builder & Instant Price Calculator</h3>
            </div>
            <p className="text-xs text-[#502D55]/70 mb-6 max-w-2xl">
              Pick your preferred flowers and quantities below. The correct wrapping cost is **automatically calculated and bundled in** based on your total flower count!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Selectable Flower Units */}
              <div className="lg:col-span-7 space-y-3">
                <p className="text-[10px] font-bold text-[#935073] uppercase tracking-wider mb-2">1. Choose Flower Stems</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2">
                  {pipeCleanerFlowerPrices
                    .filter(f => f.name !== "Premium Customized Bouquet")
                    .map((flower) => {
                      const qty = selectedFlowers[flower.name] || 0;
                      return (
                        <div 
                          key={flower.name}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                            qty > 0 
                              ? 'bg-white border-[#935073] shadow-sm' 
                              : 'bg-white/50 border-[#935073]/10 hover:border-[#935073]/25'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#935073]/5 shrink-0">
                              <img 
                                src={getItemImage(flower.name, 'flowers')} 
                                alt={flower.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-serif font-bold text-[#502D55] leading-tight truncate max-w-[100px]">{flower.name}</p>
                              <p className="text-[10px] text-[#935073] font-mono mt-0.5">{flower.price}</p>
                            </div>
                          </div>

                          {/* Minus / Plus Counters */}
                          <div className="flex items-center gap-1.5 bg-[#502D55]/5 p-1 rounded-lg border border-[#935073]/5">
                            <button
                              type="button"
                              onClick={() => updateFlowerQty(flower.name, -1)}
                              className="w-5 h-5 rounded bg-white text-[#502D55] hover:bg-[#502D55]/10 flex items-center justify-center transition-colors shadow-xs"
                            >
                              <Minus size={10} strokeWidth={2.5} />
                            </button>
                            <span className="text-xs font-mono font-bold text-[#502D55] min-w-[14px] text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateFlowerQty(flower.name, 1)}
                              className="w-5 h-5 rounded bg-[#502D55] text-white hover:bg-[#935073] flex items-center justify-center transition-colors shadow-xs"
                            >
                              <Plus size={10} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Right Side: Smart Pricing Output & Checkout Pre-fill */}
              <div className="lg:col-span-5 bg-[#502D55]/5 rounded-2xl p-5 border border-[#935073]/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#935073]/15 pb-2.5 mb-4">
                    <p className="text-[10px] font-bold text-[#502D55] uppercase tracking-wider">2. Bouquet Estimates</p>
                    {totalFlowerCount > 0 && (
                      <button
                        onClick={clearFlowers}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={10} /> Reset
                      </button>
                    )}
                  </div>

                  {totalFlowerCount > 0 ? (
                    <div className="space-y-3.5 text-left">
                      {/* Itemized Flowers List */}
                      <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                        {Object.entries(selectedFlowers).map(([name, qty]) => {
                          const fl = pipeCleanerFlowerPrices.find(f => f.name === name);
                          const subtotal = fl ? fl.numericPrice * qty : 0;
                          return (
                            <div key={name} className="flex justify-between text-xs text-[#502D55]/85">
                              <span>{qty} × {name}</span>
                              <span className="font-mono">₹{subtotal}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Calculations breakdown */}
                      <div className="border-t border-dashed border-[#935073]/15 pt-3 space-y-2">
                        <div className="flex justify-between text-xs text-[#502D55]/70">
                          <span>Stem Cost Subtotal:</span>
                          <span className="font-mono">₹{flowersCost}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#502D55]/70">
                          <span>
                            Wrapping ({totalFlowerCount} {totalFlowerCount === 1 ? 'flower' : 'flowers'}):
                          </span>
                          <span className="font-mono text-[#935073] font-bold">
                            + ₹{wrappingCost}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#935073] bg-[#935073]/5 px-2 py-1 rounded-md leading-relaxed">
                          💡 Wrapping auto-applied based on your rules:
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[9px] text-[#502D55]/80 font-medium">
                            <li>1 flower: ₹60</li>
                            <li>2 & 3 flowers: ₹100</li>
                            <li>4 & 5 flowers: ₹150</li>
                            <li>5 & 6 flowers: ₹200 (applied to 6)</li>
                            <li>7 & 8 flowers: ₹250</li>
                            <li>9 & 10 flowers: ₹350</li>
                            <li>11 & 12 flowers: ₹400</li>
                            <li>13 & 14 flowers: ₹450</li>
                            <li>More than 15 flowers: ₹500</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-[#502D55]/50 flex flex-col items-center justify-center">
                      <span className="text-3xl mb-2 opacity-60">💐</span>
                      <p className="text-xs font-bold">Your Bouquet is Empty</p>
                      <p className="text-[10px] mt-1">Use the counters on the left to add your custom choice of flowers.</p>
                    </div>
                  )}
                </div>

                {/* Big live total indicator */}
                <div className="border-t border-[#935073]/15 pt-4 mt-6">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs font-bold text-[#502D55] uppercase tracking-wide">Total Estimated:</span>
                    <span className="text-2xl font-mono font-extrabold text-[#935073]">₹{finalTotal}</span>
                  </div>

                  {totalFlowerCount > 0 ? (
                    <button
                      onClick={() => {
                        const flowerSummary = Object.entries(selectedFlowers)
                          .map(([name, qty]) => `${qty}x ${name}`)
                          .join(', ');
                        
                        onOrderClick({
                          name: `Bespoke Custom Bouquet (${flowerSummary})`,
                          price: `₹${finalTotal} (includes ${wrappingLabel} of ₹${wrappingCost})`
                        });
                      }}
                      className="w-full py-3 bg-[#502D55] text-white hover:bg-[#935073] rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
                    >
                      <ShoppingBag size={14} />
                      Order This Custom Bouquet
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-100 text-[#502D55]/30 rounded-xl text-xs font-bold cursor-not-allowed border border-gray-200/50"
                    >
                      Add Flowers to Estimate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Bouquet Wrapping Cost Guide Card */}
        {activeTab === 'flowers' && (
          <div className="mt-8 bg-white border border-[#935073]/10 rounded-2xl p-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5 mb-4 border-b border-[#935073]/5 pb-3">
              <span className="text-xl">💐</span>
              <h4 className="font-serif text-base font-bold text-[#502D55]">Custom Bouquet Wrapping Fee Structure</h4>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
              {/* Tier 1 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">1 Flower</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Single Flower</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹60</p>
              </div>

              {/* Tier 2 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">2 & 3 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Small Bouquet</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹100</p>
              </div>

              {/* Tier 3 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">4 & 5 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Medium Bouquet</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹150</p>
              </div>

              {/* Tier 4 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">5 & 6 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Standard Bouquet</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹200</p>
              </div>

              {/* Tier 5 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">7 & 8 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Large Bouquet</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹250</p>
              </div>

              {/* Tier 6 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">9 & 10 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Extra Large</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹350</p>
              </div>

              {/* Tier 7 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">11 & 12 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Deluxe Bouquet</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹400</p>
              </div>

              {/* Tier 8 */}
              <div className="bg-[#F8F4E9]/30 rounded-xl p-3 border border-[#935073]/5 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">13 & 14 Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Super Deluxe</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹450</p>
              </div>

              {/* Tier 9 */}
              <div className="bg-[#935073]/5 rounded-xl p-3 border border-[#935073]/20 relative overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between">
                <span className="absolute top-1 right-1 text-[8px]">👑</span>
                <div>
                  <p className="text-[9px] font-bold text-[#935073] uppercase tracking-wider mb-1">15+ Flowers</p>
                  <p className="font-serif text-[11px] font-bold text-[#502D55] leading-tight mb-1">Grand Masterpiece</p>
                </div>
                <p className="text-xs text-[#935073] font-mono font-bold mt-2">₹500</p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Warning Notes */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#F6DBC0]/20 rounded-xl border border-[#F6DBC0]/40">
          <p className="text-xs text-[#502D55]/80 italic flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#935073] shrink-0" />
            <span>* Prices may vary slightly depending on wrapping paper selection, customization details, colors, and quantity.</span>
          </p>
          <a
            href="#custom-order"
            className="text-xs font-bold text-[#935073] hover:text-[#502D55] underline flex items-center shrink-0 transition-colors"
          >
            Want a fully custom bouquet or combination? Create yours now
          </a>
        </div>

      </div>
    </section>
  );
}
