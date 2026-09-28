import React from 'react';
import { Instagram, Check, X, ArrowRight } from 'lucide-react';
import { businessInfo } from '../data/businessData';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productDetails?: {
    name: string;
    price: string;
    category?: string;
  } | null;
}

export default function InstagramModal({
  isOpen,
  onClose,
  onConfirm,
  productDetails,
}: InstagramModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#502D55]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#F8F4E9] border border-[#935073]/20 p-6 shadow-2xl transition-all z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#502D55]/60 hover:text-[#502D55] transition-colors p-1 rounded-full hover:bg-[#502D55]/5"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#935073] to-[#F6DBC0] text-[#F8F4E9] mb-4 shadow-md">
          <Instagram size={28} className="animate-pulse" />
        </div>

        {/* Titles */}
        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold text-[#502D55] tracking-tight">
            💕 One Little Step Before Your Order
          </h3>
          {productDetails ? (
            <p className="mt-1 text-sm text-[#935073] font-semibold">
              Interested in: {productDetails.name} ({productDetails.price})
            </p>
          ) : (
            <p className="mt-1 text-sm text-[#935073] font-semibold">
              Creating your custom handmade memory
            </p>
          )}
          <p className="mt-3 text-sm text-[#502D55]/80 leading-relaxed px-1">
            Love our handmade creations? Follow us on Instagram to see our latest designs, custom work previews, and stay connected with our tiny craft studio.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-6 space-y-3">
          {/* Step 1: Follow */}
          <a
            href={businessInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white border border-[#935073]/10 text-[#502D55] hover:bg-[#935073]/5 hover:border-[#935073]/30 transition-all shadow-sm group font-medium"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#935073]/10 text-[#935073] text-xs font-bold">1</span>
              <span>Follow {businessInfo.instagramUsername}</span>
            </div>
            <ArrowRight size={16} className="text-[#935073] transition-transform group-hover:translate-x-1" />
          </a>

          {/* Step 2: Confirm & Continue */}
          <button
            onClick={onConfirm}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#502D55] to-[#935073] text-[#F8F4E9] hover:from-[#3D2141] hover:to-[#7E4362] transition-all shadow-md group font-semibold"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F8F4E9]/20 text-[#F8F4E9] text-xs font-bold">2</span>
              <span>I've Followed — Continue to Order</span>
            </div>
            <Check size={18} className="text-[#F6DBC0]" />
          </button>
        </div>

        {/* Security disclaimer (adhering to constraints: Do not claim we verify password/account, do not ask for credentials) */}
        <p className="mt-4 text-center text-[11px] text-[#502D55]/50 italic">
          No login or account password required. This step relies on your honest support to help our handmade small business grow. Thank you! 💕
        </p>
      </div>
    </div>
  );
}
