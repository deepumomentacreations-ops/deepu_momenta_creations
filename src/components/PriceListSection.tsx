import React, { useState } from 'react';
import { Search, ArrowUpDown, Sparkles, Filter, ShoppingBag } from 'lucide-react';
import { 
  pipeCleanerFlowerPrices, 
  pipeCleanerKeychainPrices, 
  crochetKeychainPrices,
  PriceListItem
} from '../data/businessData';

interface PriceListSectionProps {
  onOrderClick: (item: { name: string; price: string }) => void;
  activeTab: 'flowers' | 'pipe_keychains' | 'crochet_keychains';
  setActiveTab: (tab: 'flowers' | 'pipe_keychains' | 'crochet_keychains') => void;
}

type TabType = 'flowers' | 'pipe_keychains' | 'crochet_keychains';

export default function PriceListSection({ onOrderClick, activeTab, setActiveTab }: PriceListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');

  // Map active tab to correct datasets
  const getDataset = (): PriceListItem[] => {
    switch (activeTab) {
      case 'flowers':
        return pipeCleanerFlowerPrices;
      case 'pipe_keychains':
        return pipeCleanerKeychainPrices;
      case 'crochet_keychains':
        return crochetKeychainPrices;
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

        {/* Tab Selection Segments (Interactive Filter Controls, styling according to Zero-Pill rules) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg mx-auto p-1.5 bg-[#502D55]/5 rounded-xl border border-[#935073]/5">
          <button
            onClick={() => { setActiveTab('flowers'); setSearchQuery(''); }}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'flowers'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🌸 Flowers
          </button>
          <button
            onClick={() => { setActiveTab('pipe_keychains'); setSearchQuery(''); }}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'pipe_keychains'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🔑 Pipe Keychains
          </button>
          <button
            onClick={() => { setActiveTab('crochet_keychains'); setSearchQuery(''); }}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'crochet_keychains'
                ? 'bg-[#502D55] text-white shadow-sm'
                : 'text-[#502D55]/80 hover:bg-[#502D55]/5 hover:text-[#502D55]'
            }`}
          >
            🧶 Crochet Keychains
          </button>
        </div>

        {/* Search and Sort Filter Bar */}
        <div className="bg-white rounded-xl border border-[#935073]/10 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
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
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <ArrowUpDown size={14} className="text-[#935073]" />
            <span className="text-xs text-[#502D55]/60 font-medium whitespace-nowrap">Sort by:</span>
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

        {/* Prices Table Area */}
        <div className="bg-white rounded-2xl border border-[#935073]/10 shadow-md overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-[#502D55]/5 to-[#935073]/5 border-b border-[#935073]/10 flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-[#502D55]">{getTabTitle()}</h3>
            <span className="text-[11px] font-semibold text-[#935073] bg-[#935073]/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {filteredAndSortedData.length} items
            </span>
          </div>

          {filteredAndSortedData.length > 0 ? (
            <div className="overflow-x-auto">
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
                      <td className="py-4 px-6 font-medium">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-[#935073]">
                        {item.price}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => onOrderClick({ name: item.name, price: item.price })}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#502D55] text-white hover:bg-[#935073] transition-all rounded-lg shadow-sm whitespace-nowrap"
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
          ) : (
            <div className="p-12 text-center text-[#502D55]/60">
              <p className="text-sm">No items match your search. Try typing a different product name!</p>
            </div>
          )}
        </div>

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
