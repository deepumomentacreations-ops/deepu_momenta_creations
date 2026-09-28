import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Instagram, 
  Phone, 
  Mail, 
  Heart, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ArrowRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

import { 
  businessInfo, 
  productCategories, 
  faqs, 
  galleryItems, 
  reviews 
} from './data/businessData';

import InstagramModal from './components/InstagramModal';
import PriceListSection from './components/PriceListSection';
import AIAssistant from './components/AIAssistant';

export default function App() {
  // Mobile Navigation Menu Toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Header Shadow state on Scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Pre-Order Modal states
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: string;
    category?: string;
  } | null>(null);

  // Customized Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formProduct, setFormProduct] = useState('Pipe-Cleaner Flowers');
  const [formBudget, setFormBudget] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formQuantity, setFormQuantity] = useState('1');
  const [formDate, setFormDate] = useState('');
  const [formDetails, setFormDetails] = useState('');
  
  // Form submission message status
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Payment Modal & Screenshot Upload States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [paymentScreenshotFile, setPaymentScreenshotFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'PhonePe' | 'Paytm'>('PhonePe');

  // Standalone Direct Payment states (the separate payment plot)
  const [directName, setDirectName] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [directAmount, setDirectAmount] = useState('');
  const [directReference, setDirectReference] = useState('');
  const [directScreenshot, setDirectScreenshot] = useState<string | null>(null);
  const [directScreenshotFile, setDirectScreenshotFile] = useState<File | null>(null);
  const [directMethod, setDirectMethod] = useState<'PhonePe' | 'Paytm'>('PhonePe');

  // Customization Photo Upload (Optional photo attachment for hampers or frames)
  const [customizationPhoto, setCustomizationPhoto] = useState<string | null>(null);
  const [customizationPhotoName, setCustomizationPhotoName] = useState('');

  // Active Category filter state for the category showcase
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Interactive FAQ active item index state
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Governs active tab inside the price directory
  const [priceListTab, setPriceListTab] = useState<'flowers' | 'pipe_keychains' | 'crochet_keychains'>('flowers');

  // Governs active tab inside the instagram gallery
  const [galleryTab, setGalleryTab] = useState<'posts' | 'reels'>('posts');

  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle CTA clicking -> launches Instagram Modal
  const handleOrderClick = (product?: { name: string; price: string; category?: string }) => {
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
    setIsInstagramModalOpen(true);
  };

  // Callback when user clicks "I've Followed - Continue to Order" inside Instagram Modal
  const handleInstagramConfirmed = () => {
    setIsInstagramModalOpen(false);
    
    // Auto fill custom order form if a specific product was chosen
    if (selectedProduct) {
      setFormProduct(selectedProduct.name);
      setFormDetails(`I am interested in ordering: "${selectedProduct.name}" priced at ${selectedProduct.price}.`);
    } else {
      setFormProduct('Pipe-Cleaner Flowers');
      setFormDetails('');
    }

    // Smooth scroll to Custom Order Form section
    const orderSection = document.getElementById('custom-order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Validation & Order Link Generator for WhatsApp (Action 9 & 10)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formProduct || !formDate) {
      alert("Please fill in all required fields (Name, Phone, Product, and Required Date). 💕");
      return;
    }

    // Instead of opening WhatsApp immediately, we open the Payment Confirmation Modal
    setIsPaymentModalOpen(true);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB. Please upload a smaller image. 💕");
        return;
      }
      setPaymentScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalWhatsAppRedirect = () => {
    if (!paymentScreenshot) {
      alert("Please upload your payment screenshot to finalize your pre-order! 💕");
      return;
    }

    const message = `Hello Deepu Momenta Creations! 👋

I have placed a customized order and completed the UPI payment! Here are my order details:

📝 ORDER DETAILS:
• Name: ${formName}
• Phone: ${formPhone}
• Product: ${formProduct}
• Quantity: ${formQuantity}
• Budget: ₹${formBudget || 'Standard'}
• Preferred Color: ${formColor || 'Not specified'}
• Required Date: ${formDate}
${customizationPhoto ? `• Custom Photo for Customization: [Attached image named "${customizationPhotoName}"]` : '• Custom Photo for Customization: [None]'}

🎨 CUSTOMIZATION DETAILS:
${formDetails || 'No specifications.'}

💸 PAYMENT CONFIRMATION:
• Paid via: ${paymentMethod}
• Payment Screenshot: [Yes, Attached below]

Thank you! I am pasting this order receipt and sending the payment screenshot right now.`;

    // Copy formatted text to clipboard
    navigator.clipboard.writeText(message).catch(err => console.log(err));

    // Encode text and compile WhatsApp link
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919703265096?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsFormSubmitted(true);
    setIsPaymentModalOpen(false);

    // Show a beautiful custom thank-you confirmation alert
    alert("🎉 Your customized order draft is ready! WhatsApp has been opened. We copied your order details automatically! Simply paste the text in the WhatsApp chat and attach your payment screenshot to confirm with Greeshma. 💕");
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#935073]/20 selection:text-[#502D55] overflow-x-hidden">
      
      {/* ----------------- TOP NAVIGATION BAR (Top Bar Contract Compliance) ----------------- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F8F4E9]/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Zone 1: Brand Title (One line, display face, single element) */}
          <a href="#" className="font-serif text-xl md:text-2xl font-extrabold tracking-tight text-[#502D55] hover:opacity-90 transition-opacity">
            Deepu Momenta Creations
          </a>

          {/* Zone 2: Navigation links (Muted, unboxed text links) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#502D55]/85">
            <a href="#about" className="hover:text-[#935073] transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#935073] transition-all group-hover:w-full" />
            </a>
            <a href="#products" className="hover:text-[#935073] transition-colors relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#935073] transition-all group-hover:w-full" />
            </a>
            <a href="#price-list" className="hover:text-[#935073] transition-colors relative group">
              Price List
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#935073] transition-all group-hover:w-full" />
            </a>
            <a href="#custom-order" className="hover:text-[#935073] transition-colors relative group">
              Custom Order
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#935073] transition-all group-hover:w-full" />
            </a>
            <a href="#gallery" className="hover:text-[#935073] transition-colors relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#935073] transition-all group-hover:w-full" />
            </a>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleOrderClick()}
              className="px-4 py-2 text-xs font-bold bg-[#502D55] text-white rounded-xl hover:bg-[#935073] transition-colors duration-200 shadow-md whitespace-nowrap shrink-0"
            >
              Order Now
            </button>
          </div>

          {/* Hamburger Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#502D55] hover:text-[#935073] transition-colors focus:outline-none p-1"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#F8F4E9] border-b border-[#935073]/10 shadow-lg px-6 py-6 space-y-4 flex flex-col transition-all">
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#502D55] hover:text-[#935073] py-1 border-b border-[#935073]/5"
            >
              About Us
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#502D55] hover:text-[#935073] py-1 border-b border-[#935073]/5"
            >
              Our Products
            </a>
            <a 
              href="#price-list" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#502D55] hover:text-[#935073] py-1 border-b border-[#935073]/5"
            >
              Price Directory
            </a>
            <a 
              href="#custom-order" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#502D55] hover:text-[#935073] py-1 border-b border-[#935073]/5"
            >
              Custom Order Form
            </a>
            <a 
              href="#gallery" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-[#502D55] hover:text-[#935073] py-1 border-b border-[#935073]/5"
            >
              Gallery Portfolio
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOrderClick();
              }}
              className="w-full py-3 text-sm font-bold bg-[#502D55] text-white rounded-xl hover:bg-[#935073] transition-colors shadow-md mt-2"
            >
              Order Customized Item
            </button>
          </div>
        )}
      </header>


      {/* ----------------- 3. HERO SECTION ----------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-[#F8F4E9]">
        {/* Background Overlay mesh and image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/hero_background_1790604516215.jpg" 
            alt="Handcrafted creations workspace background" 
            className="w-full h-full object-cover opacity-[0.14] blur-[1px] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle elegant design accents */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4E9]/30 via-transparent to-[#F8F4E9]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
          
          {/* Floral Little Sparkle Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#935073]/5 border border-[#935073]/10 text-xs font-semibold text-[#935073] mb-6 animate-pulse">
            <Sparkles size={13} className="text-[#935073]" />
            <span>100% Handcrafted with Love</span>
          </div>

          {/* Main Display Heading */}
          <h1 className="font-serif text-4xl md:text-6xl font-extrabold text-[#502D55] leading-[1.12] tracking-tight text-wrap max-w-4xl mx-auto">
            Handcrafted with Care, Created for Your Special Moments
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base md:text-lg text-[#502D55]/85 max-w-2xl mx-auto leading-relaxed">
            Beautiful, premium handmade and customized creations made especially for birthdays, anniversaries, weddings, and life's personal moments.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOrderClick()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#502D55] text-white font-bold hover:bg-[#935073] hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Order Now
            </button>
            <a
              href="#products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-[#935073]/20 text-[#502D55] font-bold hover:bg-[#F8F4E9]/50 transition-colors flex items-center justify-center gap-2"
            >
              View Products
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F6DBC0]/40 text-[#502D55] font-bold hover:bg-[#F6DBC0]/60 transition-colors flex items-center justify-center gap-2"
            >
              Contact Us
            </a>
          </div>

          {/* Instagram Quick Link (Instagram CTA) */}
          <div className="mt-14 p-4 max-w-md mx-auto bg-white/40 rounded-2xl border border-[#935073]/10 backdrop-blur-sm shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#935073]/10 text-[#935073]">
                <Instagram size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#502D55]/60">See our latest designs</p>
                <p className="text-sm font-bold text-[#502D55]">{businessInfo.instagramUsername}</p>
              </div>
            </div>
            <a
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold bg-[#935073] text-white rounded-lg hover:bg-[#502D55] transition-colors flex items-center gap-1"
            >
              Follow on IG <ExternalLink size={12} />
            </a>
          </div>

        </div>
      </section>


      {/* ----------------- 4. ABOUT US SECTION ----------------- */}
      <section id="about" className="py-20 bg-white border-t border-[#935073]/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story/Images grid representing customized choices */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square bg-[#F8F4E9] border border-[#935073]/10">
                <img 
                  src="/images/pipe_cleaner_flowers_1790604545525.jpg" 
                  alt="Custom flower craft design" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#F8F4E9]">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#F6DBC0]">Personalization Choice</p>
                  <p className="text-sm font-serif font-bold">You choose colors, wrapping, letters, and sizes!</p>
                </div>
              </div>

              {/* Grid of quick features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8F4E9]/40 rounded-xl border border-[#935073]/5 text-center">
                  <span className="text-2xl">🎨</span>
                  <p className="text-xs font-bold text-[#502D55] mt-1">Unlimited Colors</p>
                </div>
                <div className="p-4 bg-[#F8F4E9]/40 rounded-xl border border-[#935073]/5 text-center">
                  <span className="text-2xl">🎀</span>
                  <p className="text-xs font-bold text-[#502D55] mt-1">Custom Ribbon & Wrapping</p>
                </div>
              </div>
            </div>

            {/* About Narrative text */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#502D55] leading-tight mb-6">
                {businessInfo.aboutTitle}
              </h2>
              <p className="text-sm md:text-base text-[#502D55]/80 leading-relaxed space-y-4">
                {businessInfo.aboutDescription}
              </p>

              {/* Lists of things customizable */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#502D55] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-[#935073] rounded-full" />
                  Every detail can be customized:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Color Palettes', 'Flower Quantities', 'Name Letters', 'Specific Designs', 'Combination Hampers', 'Bouquet Wrapping'].map((opt) => (
                    <div key={opt} className="flex items-center gap-2 text-xs text-[#502D55]/80 font-medium">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">✓</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white border border-[#935073]/20 text-[#502D55] hover:bg-[#F8F4E9]/50 transition-all font-bold text-sm flex items-center gap-2 shadow-sm"
                >
                  <Instagram size={16} className="text-[#935073]" />
                  See Custom Previews
                </a>
                <a
                  href="https://wa.me/919703265096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#935073] text-white hover:bg-[#502D55] transition-all font-bold text-sm flex items-center gap-2 shadow-md"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 5. PRODUCTS / CATEGORIES Grid ----------------- */}
      <section id="products" className="py-20 bg-[#F8F4E9]/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          {/* Section Headers */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Artisan Collections</p>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#502D55] leading-tight">
              Handcrafted Product Categories
            </h2>
            <p className="mt-3 text-sm text-[#502D55]/70">
              Browse our stunning handcrafted categories. Every product category contains customizable items curated carefully to reflect tactile perfection.
            </p>
          </div>

          {/* Interactive filter toggles for category display (Zero-Pill styling) */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-10 max-w-2xl mx-auto p-1 bg-[#502D55]/5 rounded-xl border border-[#935073]/5">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveCategoryFilter('flowers')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryFilter === 'flowers'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              Flowers & Bouquets
            </button>
            <button
              onClick={() => setActiveCategoryFilter('keychains')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryFilter === 'keychains'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              Keychains & Gifts
            </button>
            <button
              onClick={() => setActiveCategoryFilter('bags')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryFilter === 'bags'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              Bags & Crochet
            </button>
          </div>

          {/* Category Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories
              .filter(cat => {
                if (activeCategoryFilter === 'all') return true;
                if (activeCategoryFilter === 'flowers') return cat.id.includes('flowers') || cat.id.includes('bouquets');
                if (activeCategoryFilter === 'keychains') return cat.id.includes('keychains') || cat.id.includes('hampers');
                if (activeCategoryFilter === 'bags') return cat.id.includes('bags') || cat.id.includes('bangles') || cat.id.includes('earrings') || cat.id.includes('embroidery');
                return true;
              })
              .map((cat) => (
                <div 
                  key={cat.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-[#935073]/10 shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Category Image 4:3 */}
                  <div 
                    onClick={() => {
                      if (cat.id === "pipe-cleaner-flowers" || cat.id === "pipe-cleaner-bouquets") {
                        setPriceListTab('flowers');
                        document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (cat.id === "pipe-cleaner-keychains") {
                        setPriceListTab('pipe_keychains');
                        document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (cat.id === "crochet-keychains") {
                        setPriceListTab('crochet_keychains');
                        document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="relative aspect-[4/3] bg-[#F8F4E9] overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={cat.imageUrl} 
                      alt={`Handmade ${cat.name} by Deepu Momenta Creations`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Category Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Name & price metadata (Zero-Pill rule: clean inline text) */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 
                          onClick={() => {
                            if (cat.id === "pipe-cleaner-flowers" || cat.id === "pipe-cleaner-bouquets") {
                              setPriceListTab('flowers');
                              document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                            } else if (cat.id === "pipe-cleaner-keychains") {
                              setPriceListTab('pipe_keychains');
                              document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                            } else if (cat.id === "crochet-keychains") {
                              setPriceListTab('crochet_keychains');
                              document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="font-serif text-lg font-bold text-[#502D55] group-hover:text-[#935073] transition-colors cursor-pointer"
                        >
                          {cat.name}
                        </h3>
                        {(cat.startingPrice || cat.priceRange) && (
                          <span className="text-xs font-mono font-bold text-[#935073]">
                            {cat.startingPrice ? `From ${cat.startingPrice}` : cat.priceRange}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#502D55]/70 leading-relaxed mb-6">
                        {cat.description}
                      </p>
                    </div>

                    {/* Responsive Actions */}
                    <div className="flex gap-2 border-t border-[#935073]/5 pt-4">
                      {cat.id === "pipe-cleaner-flowers" || cat.id === "pipe-cleaner-bouquets" ? (
                        <button
                          onClick={() => {
                            setPriceListTab('flowers');
                            document.getElementById('price-list')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-2.5 text-xs font-bold text-center bg-[#502D55] text-white hover:bg-[#935073] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles size={14} className="text-[#F6DBC0]" />
                          Customize Bouquet / Select Flowers
                        </button>
                      ) : (
                        <>
                          <a
                            href="#price-list"
                            onClick={() => {
                              if (cat.id === 'pipe-cleaner-keychains') {
                                setPriceListTab('pipe_keychains');
                              } else if (cat.id === 'crochet-keychains') {
                                setPriceListTab('crochet_keychains');
                              }
                            }}
                            className="flex-1 py-2 text-xs font-bold text-center border border-[#935073]/15 text-[#502D55] rounded-xl hover:bg-[#F8F4E9]/50 transition-colors"
                          >
                            View Products
                          </a>
                          <button
                            onClick={() => handleOrderClick({ name: cat.name, price: cat.startingPrice || 'Custom quote' })}
                            className="flex-1 py-2 text-xs font-bold text-center bg-[#502D55] text-white rounded-xl hover:bg-[#935073] transition-all shadow-sm"
                          >
                            Order Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
            ))}
          </div>

        </div>
      </section>


      {/* ----------------- 6. INTERACTIVE PRICE DIRECTORY ----------------- */}
      <PriceListSection 
        onOrderClick={(item) => handleOrderClick(item)} 
        activeTab={priceListTab}
        setActiveTab={setPriceListTab}
      />


      {/* ----------------- 9. CUSTOMIZED ORDER SECTION ----------------- */}
      <section id="custom-order" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="bg-[#F8F4E9]/80 rounded-3xl border border-[#935073]/15 p-8 md:p-12 shadow-xl relative overflow-hidden">
            
            {/* Background sparkle accents */}
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={120} className="text-[#935073]" />
            </div>

            {/* Title / Description */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-2xl">🎨</span>
              <h2 className="font-serif text-3xl font-extrabold text-[#502D55] tracking-tight mt-2">
                Create Something Special
              </h2>
              <p className="mt-2 text-sm text-[#502D55]/85">
                Tell us what you have in mind and we'll help create a handmade product especially for you. Filling out this form compiles a draft straight to Deepu's WhatsApp!
              </p>
            </div>

            {/* Custom order form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="formName" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="formName"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="formPhone" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="formPhone"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Product Required */}
                <div>
                  <label htmlFor="formProduct" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Product Category Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="formProduct"
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  >
                    <option value="Pipe-Cleaner Flowers">Pipe-Cleaner Flowers</option>
                    <option value="Customized Flower Bouquets">Customized Flower Bouquets</option>
                    <option value="Customized Gift Hampers">Customized Gift Hampers</option>
                    <option value="Pipe-Cleaner Keychains">Pipe-Cleaner Keychains</option>
                    <option value="Crochet Keychains">Crochet Keychains</option>
                    <option value="Handcrafted Handbags">Handcrafted Handbags</option>
                    <option value="Customized Thread Bangles">Customized Thread Bangles</option>
                    <option value="Handmade Earrings">Handmade Earrings</option>
                    <option value="Invisible Chains">Invisible Chains</option>
                    <option value="Embroidery Customization">Embroidery Customization</option>
                    <option value="Other">Other Custom Craft</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="formBudget" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Estimated Budget (₹)
                  </label>
                  <input
                    type="number"
                    id="formBudget"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Preferred Color */}
                <div>
                  <label htmlFor="formColor" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Preferred Color Palette
                  </label>
                  <input
                    type="text"
                    id="formColor"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    placeholder="e.g. Lavender & Blush Pink"
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="formQuantity" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Quantity Required
                  </label>
                  <input
                    type="number"
                    id="formQuantity"
                    min="1"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Required Date */}
                <div className="md:col-span-2">
                  <label htmlFor="formDate" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Required Date / Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="formDate"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-white border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                {/* Optional Custom Photo Upload Choice */}
                <div className="md:col-span-2 bg-white/45 border border-[#935073]/10 p-5 rounded-2xl">
                  <label className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Upload Your Photo for Customization <span className="text-[10px] text-[#502D55]/60 font-normal lowercase">(optional - for gift hampers, custom frames, or references)</span>
                  </label>
                  
                  {!customizationPhoto ? (
                    <label 
                      htmlFor="custom-form-photo-input"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-[#935073]/25 bg-white hover:bg-[#F8F4E9]/40 rounded-xl p-6 cursor-pointer transition-all text-center group"
                    >
                      <span className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">🖼️</span>
                      <span className="text-xs font-bold text-[#502D55]">Select or drop your photo here</span>
                      <span className="text-[10px] text-[#502D55]/50 mt-1">Accepts PNG, JPG, or JPEG (Max 10MB)</span>
                      <input 
                        type="file" 
                        id="custom-form-photo-input"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert("File size exceeds 10MB. Please upload a smaller photo. 💕");
                              return;
                            }
                            setCustomizationPhotoName(file.name);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCustomizationPhoto(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-emerald-500/20 shadow-sm animate-in fade-in duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-[#935073]/10 relative shadow-sm">
                          <img 
                            src={customizationPhoto} 
                            alt="Customization preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            ✓ Photo Saved in Pre-order!
                          </p>
                          <p className="text-[10px] text-[#502D55]/60 truncate max-w-[200px] md:max-w-xs">
                            {customizationPhotoName}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          setCustomizationPhoto(null);
                          setCustomizationPhotoName('');
                        }}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove Photo
                      </button>
                    </div>
                  )}
                </div>

                {/* Customization Details */}
                <div className="md:col-span-2">
                  <label htmlFor="formDetails" className="block text-xs font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Customization Details & Special Requests
                  </label>
                  <textarea
                    id="formDetails"
                    rows={4}
                    value={formDetails}
                    onChange={(e) => setFormDetails(e.target.value)}
                    placeholder="Provide specific details (e.g., 'I want a bouquet of 3 tulips and 2 roses wrapped in pink paper with a white bow, and a card saying Happy Birthday Mom')"
                    className="w-full bg-white border border-[#935073]/20 rounded-xl p-4 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073] placeholder-[#502D55]/40"
                  />
                </div>

              </div>

              {/* Form Actions */}
              <div className="pt-4 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#502D55] to-[#935073] text-white font-bold rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Send Order on WhatsApp
                </button>
                
                {isFormSubmitted && (
                  <p className="mt-3 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check size={14} /> Successfully generated draft! Complete the sending action on WhatsApp.
                  </p>
                )}
              </div>

            </form>

          </div>

          {/* ----------------- STANDALONE DIRECT PAYMENT & CONFIRMATION DESK ----------------- */}
          <div id="payment-methods" className="mt-16 bg-white rounded-3xl border border-[#935073]/15 p-8 md:p-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-3xl">💳</span>
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#502D55] mt-2 mb-3">
                Direct Payment & Confirmation Desk
              </h2>
              <p className="text-xs md:text-sm text-[#502D55]/70 leading-relaxed">
                Already discussed your custom order on Instagram/WhatsApp or know your budget? Pay directly using PhonePe/Paytm QR below, upload your screenshot, and submit to instantly finalize your order! 💕
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Payment Details Form (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#935073] border-b border-[#935073]/10 pb-2">
                  1. Payment Identification
                </h3>

                <div>
                  <label htmlFor="directName" className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="directName"
                    required
                    value={directName}
                    onChange={(e) => setDirectName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#F8F4E9]/30 border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                <div>
                  <label htmlFor="directPhone" className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="directPhone"
                    required
                    value={directPhone}
                    onChange={(e) => setDirectPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full bg-[#F8F4E9]/30 border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                <div>
                  <label htmlFor="directAmount" className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Amount Paid (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="directAmount"
                    required
                    value={directAmount}
                    onChange={(e) => setDirectAmount(e.target.value)}
                    placeholder="Enter paid amount (e.g., 350)"
                    className="w-full bg-[#F8F4E9]/30 border border-[#935073]/20 rounded-xl px-4 py-3 text-sm text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073]"
                  />
                </div>

                <div>
                  <label htmlFor="directReference" className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    What is this payment for? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="directReference"
                    required
                    rows={2}
                    value={directReference}
                    onChange={(e) => setDirectReference(e.target.value)}
                    placeholder="e.g., '1 Customized Tulip Bouquet + Crochet Keychain'"
                    className="w-full bg-[#F8F4E9]/30 border border-[#935073]/20 rounded-xl p-4 text-xs text-[#502D55] focus:outline-none focus:ring-1 focus:ring-[#935073] placeholder-[#502D55]/40"
                  />
                </div>
              </div>

              {/* Middle Column: Scanning Terminals (4 cols) */}
              <div className="lg:col-span-4 bg-[#F8F4E9]/30 border border-[#935073]/10 rounded-2xl p-6 flex flex-col items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#935073] border-b border-[#935073]/10 pb-2 w-full mb-4 text-center">
                  2. Scan QR to Pay
                </h3>

                {/* Direct payment method switcher tabs */}
                <div className="flex w-full gap-1 p-0.5 bg-[#502D55]/5 rounded-lg border border-[#935073]/5 mb-4">
                  <button
                    onClick={() => setDirectMethod('PhonePe')}
                    className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
                      directMethod === 'PhonePe'
                        ? 'bg-white text-[#502D55] shadow-sm'
                        : 'text-[#502D55]/60 hover:text-[#502D55]'
                    }`}
                  >
                    PhonePe
                  </button>
                  <button
                    onClick={() => setDirectMethod('Paytm')}
                    className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
                      directMethod === 'Paytm'
                        ? 'bg-white text-[#502D55] shadow-sm'
                        : 'text-[#502D55]/60 hover:text-[#502D55]'
                    }`}
                  >
                    Paytm
                  </button>
                </div>

                {/* QR Screen terminal */}
                <div className="relative w-40 h-44 bg-white rounded-xl border border-[#935073]/10 p-2 flex items-center justify-center overflow-hidden shadow-sm">
                  <img 
                    src={directMethod === 'PhonePe' ? "/images/phone_pay.png" : "/images/paytm.png"} 
                    alt={`${directMethod} payment QR`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 text-center w-full">
                  <p className="text-[9px] font-semibold text-[#502D55]/50 uppercase tracking-wider">
                    {directMethod === 'PhonePe' ? 'UPI Phone Number' : 'Paytm UPI ID'}
                  </p>
                  <p className="text-xs font-mono font-bold text-[#502D55] mt-0.5">
                    {directMethod === 'PhonePe' ? '9703265096' : '9703265096@ptyes'}
                  </p>
                  <button
                    onClick={() => {
                      const textToCopy = directMethod === 'PhonePe' ? '9703265096' : '9703265096@ptyes';
                      navigator.clipboard.writeText(textToCopy);
                      alert(`Copied ${directMethod} details to clipboard! 💕`);
                    }}
                    className="mt-1 text-[11px] font-bold text-[#935073] hover:text-[#502D55] transition-colors inline-flex items-center gap-0.5"
                  >
                    Copy details
                  </button>
                </div>
              </div>

              {/* Right Column: Screenshot Upload & Send (3 cols) */}
              <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#935073] border-b border-[#935073]/10 pb-2 w-full">
                  3. Send Screenshot
                </h3>

                <div className="text-left">
                  <label className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2">
                    Attach Screenshot <span className="text-red-500">*</span>
                  </label>

                  {!directScreenshot ? (
                    <label 
                      htmlFor="direct-screenshot-input" 
                      className="flex flex-col items-center justify-center border-2 border-dashed border-[#935073]/25 bg-white hover:bg-[#F8F4E9]/20 rounded-xl p-5 cursor-pointer transition-all text-center group"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📤</span>
                      <span className="text-[11px] font-bold text-[#502D55]">Upload receipt</span>
                      <input 
                        type="file" 
                        id="direct-screenshot-input" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 10 * 1024 * 1024) {
                              alert("File size exceeds 10MB. Please upload a smaller image. 💕");
                              return;
                            }
                            setDirectScreenshotFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setDirectScreenshot(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="bg-[#F8F4E9]/30 rounded-xl border border-emerald-500/20 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-14 bg-gray-100 rounded-lg overflow-hidden border border-[#935073]/10 relative">
                          <img 
                            src={directScreenshot} 
                            alt="Receipt preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-bold text-emerald-600">Attached!</p>
                          <p className="text-[9px] text-[#502D55]/60 truncate max-w-[80px]">
                            {directScreenshotFile?.name || 'receipt.png'}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setDirectScreenshot(null);
                          setDirectScreenshotFile(null);
                        }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {directScreenshot && directName && directPhone && directAmount && directReference ? (
                    <button
                      onClick={() => {
                        const message = `Hello Deepu Momenta Creations! 👋

I have made a direct UPI payment and am sending the confirmation receipt:

📝 PAYMENT SUMMARY:
• Customer: ${directName}
• Phone: ${directPhone}
• Amount Paid: ₹${directAmount}
• Payment For: ${directReference}
• Paid via: ${directMethod}
• Attachment: Payment Screenshot Included

Please confirm my order details! Thank you.`;

                        // Copy formatted text to clipboard
                        navigator.clipboard.writeText(message).catch(err => console.log(err));

                        // Open WhatsApp
                        const encodedMessage = encodeURIComponent(message);
                        const whatsappUrl = `https://wa.me/919703265096?text=${encodedMessage}`;
                        window.open(whatsappUrl, '_blank');

                        alert("🎉 Payment Details Copied! Greeshma's WhatsApp has been opened. Simply paste your order receipt in the chat and send the screenshot of your payment to finalize! 💕");
                        
                        // Clear direct payment form states
                        setDirectName('');
                        setDirectPhone('');
                        setDirectAmount('');
                        setDirectReference('');
                        setDirectScreenshot(null);
                        setDirectScreenshotFile(null);
                      }}
                      className="w-full py-3 bg-[#502D55] text-white font-bold rounded-xl text-xs hover:bg-[#935073] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer hover:scale-[1.01]"
                    >
                      <MessageCircle size={14} />
                      Confirm Payment & Send
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-100 text-[#502D55]/40 font-bold rounded-xl text-[10px] cursor-not-allowed border border-gray-200/50"
                    >
                      🔒 Please fill all fields & upload receipt
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Account Suffix Details */}
            <p className="mt-8 text-[9px] text-[#502D55]/40 italic text-center border-t border-[#935073]/5 pt-4">
              * Bank Association: Indian Overseas Bank - 0345. Receipts are securely compiled on your client device. Direct payments will be confirmed by Greeshma instantly.
            </p>
          </div>

        </div>
      </section>


      {/* ----------------- 12. GALLERY SECTION ----------------- */}
      <section id="gallery" className="py-20 bg-[#F8F4E9]/30 border-t border-[#935073]/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          {/* Gallery Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Studio Showcase</p>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#502D55] leading-tight">
              Instagram Inspiration Gallery
            </h2>
            <p className="mt-3 text-sm text-[#502D55]/70">
              Browse the actual designs, packaging standards, and work clips from our official feed. Every piece can be customized just for you!
            </p>
          </div>

          {/* Instagram Post vs Reel Toggle (Interactive Segmented Control) */}
          <div className="flex justify-center gap-2 mb-10 max-w-xs mx-auto p-1 bg-[#502D55]/5 rounded-xl border border-[#935073]/5">
            <button
              onClick={() => setGalleryTab('posts')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                galleryTab === 'posts'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              📸 Photos & Posts
            </button>
            <button
              onClick={() => setGalleryTab('reels')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                galleryTab === 'reels'
                  ? 'bg-white text-[#502D55] shadow-sm'
                  : 'text-[#502D55]/70 hover:text-[#502D55]'
              }`}
            >
              🎥 Crafting Reels
            </button>
          </div>

          {galleryTab === 'posts' ? (
            /* Photos Tab (showing Greeshma's real photos!) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleOrderClick({ name: item.title, price: 'Custom Quote', category: item.category })}
                  className="relative bg-white rounded-2xl border border-[#935073]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-square"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#502D55]/90 via-[#502D55]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-[#F8F4E9] translate-y-2 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-[10px] font-bold text-[#F6DBC0] uppercase tracking-widest mb-1">{item.category}</p>
                    <h4 className="font-serif text-base font-bold mb-2">{item.title}</h4>
                    <span className="text-xs inline-flex items-center gap-1 text-white underline">
                      Order details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Reels Tab (with play overlay and views counters!) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "r1", title: "Unboxing customized fairy-lit birthday gift hamper 🎁✨", views: "14.8K views", imageUrl: "/images/gift_hampers.jpg" },
                { id: "r2", title: "Making an invisible gemstone chain with matching earrings 💎", views: "24.1K views", imageUrl: "/images/invisible_chains.jpg" },
                { id: "r3", title: "Handcrafting lavender pipe-cleaner flower bouquet 🌸🎀", views: "18.5K views", imageUrl: "/images/flower_bouquets_1790604561485.jpg" },
                { id: "r4", title: "Customized silk thread bangles collection showcase 🎨", views: "12.3K views", imageUrl: "/images/thread_bangles_1790606388735.jpg" },
                { id: "r5", title: "Tiny crochet octopus and heart keychains demo 🧸🧶", views: "9.7K views", imageUrl: "/images/handmade_keychains_1790604595375.jpg" },
                { id: "r6", title: "Mini pipe-cleaner handbags overview 👜💕", views: "11.2K views", imageUrl: "/images/handcrafted_bags_1790604608782.jpg" }
              ].map((reel) => (
                <a 
                  key={reel.id}
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white rounded-2xl border border-[#935073]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-square block"
                >
                  <img 
                    src={reel.imageUrl} 
                    alt={reel.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Static Dark overlay for reels */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  
                  {/* Bouncing Play Button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="h-14 w-14 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110">
                      <span className="translate-x-[2px] text-lg">▶</span>
                    </span>
                  </div>

                  {/* Top-Right Reel Tag (inline text, zero-pill rule) */}
                  <div className="absolute top-4 right-4 text-xs font-bold text-white tracking-wide">
                    {reel.views}
                  </div>

                  {/* Reel Titles */}
                  <div className="absolute bottom-4 left-4 right-4 text-[#F8F4E9]">
                    <p className="text-[10px] font-bold text-[#F6DBC0] uppercase tracking-widest mb-1">IG REEL CLIP</p>
                    <h4 className="font-serif text-sm font-semibold leading-snug mb-2">{reel.title}</h4>
                    <span className="text-[11px] inline-flex items-center gap-1 text-white underline">
                      Watch on Instagram <ExternalLink size={10} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Quick Instagram profile redirection footer */}
          <div className="mt-12 text-center">
            <a 
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#935073]/20 bg-white text-sm font-bold text-[#502D55] hover:bg-[#F8F4E9] transition-colors"
            >
              <Instagram size={18} className="text-[#935073]" />
              Go to Instagram Page to see all Posts & Reels
            </a>
          </div>

        </div>
      </section>


      {/* ----------------- 13. CUSTOMER REVIEWS SECTION ----------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Precious Feedback</p>
          <h2 className="font-serif text-3xl font-extrabold text-[#502D55] leading-tight mb-8">
            What Our Community Says
          </h2>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Ready placeholder for future real reviews */}
              {reviews.map((r: any) => (
                <div key={r.id} className="p-6 rounded-2xl bg-[#F8F4E9]/40 border border-[#935073]/10">
                  <p className="text-sm text-[#502D55]/80 italic">"{r.text}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#502D55]">{r.name}</p>
                      <p className="text-[10px] text-[#502D55]/50">{r.product}</p>
                    </div>
                    <span className="text-xs text-yellow-500 font-bold">{"★".repeat(r.rating)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-[#F8F4E9]/60 border border-[#935073]/10 max-w-xl mx-auto">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-serif text-lg font-bold text-[#502D55] mb-2">Customer reviews coming soon</h3>
              <p className="text-xs text-[#502D55]/70 leading-relaxed max-w-sm mx-auto">
                Our cozy handmade studio is growing! Once our first customer feedback is verified, we will display gorgeous testimonials here. Craft yours today and join our story!
              </p>
            </div>
          )}
        </div>
      </section>


      {/* ----------------- 14. FAQ SECTION ----------------- */}
      <section className="py-20 bg-[#F8F4E9]/30 border-t border-[#935073]/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          
          {/* FAQ Headers */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest text-[#935073] uppercase mb-2">Curious Minds</p>
            <h2 className="font-serif text-3xl font-extrabold text-[#502D55] leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Interactive Accordion Layout */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-[#935073]/10 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-[#502D55] hover:bg-[#F8F4E9]/20 transition-all focus:outline-none"
                  >
                    <span className="text-sm md:text-base leading-snug">{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#935073] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#502D55]/80 leading-relaxed border-t border-[#502D55]/5 animate-in slide-in-from-top-2 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ----------------- 15. CONTACT US SECTION ----------------- */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gradient-to-tr from-[#502D55] to-[#935073] rounded-3xl p-8 md:p-12 text-[#F8F4E9] shadow-2xl relative overflow-hidden">
            
            {/* Soft decorative background circles */}
            <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#F6DBC0]/10 blur-xl" />
            <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[#F6DBC0]/10 blur-xl" />

            {/* Left Contact coordinates */}
            <div className="lg:col-span-6 z-10">
              <p className="text-xs font-bold tracking-widest text-[#F6DBC0] uppercase mb-2">Connect Directly</p>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Get In Touch With Deepu
              </h2>
              <p className="mt-4 text-sm text-[#F8F4E9]/80 leading-relaxed">
                Have customized colors, design constraints, corporate gifting, or wholesale query in mind? Reach out on your preferred channel. We're happy to discuss!
              </p>

              {/* Direct Coordinate Details */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F8F4E9]/10 text-[#F6DBC0]">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#F8F4E9]/60">WhatsApp & Phone</p>
                    <p className="text-sm font-semibold">{businessInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F8F4E9]/10 text-[#F6DBC0]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#F8F4E9]/60">Official Email</p>
                    <p className="text-sm font-semibold">{businessInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F8F4E9]/10 text-[#F6DBC0]">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#F8F4E9]/60">Instagram Handle</p>
                    <p className="text-sm font-semibold">{businessInfo.instagramUsername}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact button board */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-4 z-10">
              <a
                href={businessInfo.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <a
                href={`tel:${businessInfo.phone}`}
                className="w-full py-4 rounded-xl bg-white text-[#502D55] hover:bg-[#F8F4E9]/80 font-bold text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Phone size={18} className="text-[#935073]" />
                Call Now
              </a>

              <a
                href={`mailto:${businessInfo.email}`}
                className="w-full py-4 rounded-xl bg-[#F6DBC0] text-[#502D55] hover:opacity-90 font-bold text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Mail size={18} className="text-[#502D55]" />
                Send Email
              </a>

              <a
                href={businessInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Instagram size={18} />
                Follow on Instagram
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ----------------- 16. FOOTER ----------------- */}
      <footer className="bg-[#502D55] text-[#F8F4E9]/90 border-t border-[#935073]/20 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-5 space-y-4">
              <h4 className="font-serif text-xl font-bold tracking-tight text-white">Deepu Momenta Creations</h4>
              <p className="text-xs text-[#F8F4E9]/70 max-w-sm leading-relaxed">
                "Handcrafted with Care, Created for Your Special Moments" — Elegant pipe-cleaner flower bouquets, customized hampers, keychains, and handbags constructed carefully for birthdays, anniversaries, and weddings.
              </p>
              <div className="flex gap-3">
                <a 
                  href={businessInfo.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-[#F8F4E9]/10 hover:bg-[#F8F4E9]/20 transition-colors flex items-center justify-center text-[#F6DBC0]"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href={businessInfo.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-[#F8F4E9]/10 hover:bg-[#F8F4E9]/20 transition-colors flex items-center justify-center text-[#F6DBC0]"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick navigation links */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#F6DBC0]">Quick Links</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a href="#" className="hover:text-white transition-colors">Home</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#products" className="hover:text-white transition-colors">Products</a>
                <a href="#price-list" className="hover:text-white transition-colors">Price List</a>
                <a href="#custom-order" className="hover:text-white transition-colors">Customize</a>
                <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Column 3: Contact coordinate summary */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#F6DBC0]">Contact info</h5>
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-1.5">
                  <Phone size={12} className="text-[#F6DBC0]" />
                  <span>9703265096</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#F6DBC0]" />
                  <span>deepu.momenta.creations@gmail.com</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Instagram size={12} className="text-[#F6DBC0]" />
                  <span>@deepu_momenta_creations</span>
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-[#F8F4E9]/10 pt-6 text-center text-xs text-[#F8F4E9]/50">
            <p>© 2026 Deepu Momenta Creations. All rights reserved. Handcrafted with meticulous love and absolute precision.</p>
          </div>

        </div>
      </footer>


      {/* ----------------- 21. FLOATING WHATSAPP BUTTON (Bottom Left Corner) ----------------- */}
      <a
        href="https://wa.me/919703265096?text=Hello%20Deepu%20Momenta%20Creations!%20%F0%9F%91%8B%20I%20am%20interested%20in%20ordering%20a%20beautiful%20customized%20handmade%20creation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce"
        aria-label="Chat on WhatsApp with Deepu"
      >
        <MessageCircle size={28} />
      </a>


      {/* ----------------- 11. AI SHOPPING ASSISTANT (Bottom Right Corner Floating Component) ----------------- */}
      <AIAssistant />


      {/* ----------------- INTERACTIVE PAYMENT & SCREENSHOT UPLOAD MODAL ----------------- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F8F4E9] rounded-3xl border border-[#935073]/15 max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#502D55]/5 hover:bg-[#502D55]/10 flex items-center justify-center text-[#502D55] transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#935073]/10 text-xs font-bold text-[#935073] mb-2 uppercase tracking-wide">
                <Sparkles size={12} /> Secure UPI Pre-Order
              </span>
              <h3 className="font-serif text-2xl font-extrabold text-[#502D55] leading-tight">
                Order & Payment
              </h3>
              <p className="text-xs text-[#502D55]/70 mt-1 max-w-sm mx-auto">
                Scan a QR code below to pay. Then, upload your payment screenshot to generate your WhatsApp confirmation receipt!
              </p>
            </div>

            {/* Brief Order Summary */}
            <div className="bg-white rounded-2xl border border-[#935073]/10 p-4 mb-6 text-xs text-[#502D55]">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-[#935073] mb-2">Order Summary</h4>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                <p><span className="opacity-60">Customer:</span> <strong className="font-semibold">{formName}</strong></p>
                <p><span className="opacity-60">Product:</span> <strong className="font-semibold">{formProduct}</strong></p>
                <p><span className="opacity-60">Quantity:</span> <strong className="font-semibold">{formQuantity} pcs</strong></p>
                <p><span className="opacity-60">Budget:</span> <strong className="font-semibold">₹{formBudget || 'Standard'}</strong></p>
                <p><span className="opacity-60">Custom Photo:</span> <strong className="font-semibold text-emerald-600">{customizationPhoto ? 'Yes, Attached' : 'None'}</strong></p>
                <p><span className="opacity-60">Required Date:</span> <strong className="font-semibold">{formDate}</strong></p>
              </div>
            </div>

            {/* Payment Mode Selector Tabs */}
            <div className="flex gap-2 p-1 bg-[#502D55]/5 rounded-xl border border-[#935073]/5 mb-4">
              <button
                onClick={() => setPaymentMethod('PhonePe')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  paymentMethod === 'PhonePe'
                    ? 'bg-white text-[#502D55] shadow-sm'
                    : 'text-[#502D55]/60 hover:text-[#502D55]'
                }`}
              >
                📱 Pay via PhonePe
              </button>
              <button
                onClick={() => setPaymentMethod('Paytm')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  paymentMethod === 'Paytm'
                    ? 'bg-white text-[#502D55] shadow-sm'
                    : 'text-[#502D55]/60 hover:text-[#502D55]'
                }`}
              >
                👛 Pay via Paytm
              </button>
            </div>

            {/* Selected QR Card */}
            <div className="bg-white rounded-2xl border border-[#935073]/10 p-5 text-center flex flex-col items-center mb-6">
              <div className="relative w-44 h-44 bg-[#F8F4E9]/30 rounded-xl border border-[#935073]/10 p-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={paymentMethod === 'PhonePe' ? "/images/phone_pay.png" : "/images/paytm.png"} 
                  alt={`${paymentMethod} payment QR`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 w-full">
                <p className="text-[10px] font-semibold text-[#502D55]/50 uppercase tracking-wider">
                  {paymentMethod === 'PhonePe' ? 'UPI Phone Number' : 'Paytm UPI ID'}
                </p>
                <p className="text-sm font-mono font-bold text-[#502D55] mt-0.5">
                  {paymentMethod === 'PhonePe' ? '9703265096' : '9703265096@ptyes'}
                </p>
                <button
                  onClick={() => {
                    const textToCopy = paymentMethod === 'PhonePe' ? '9703265096' : '9703265096@ptyes';
                    navigator.clipboard.writeText(textToCopy);
                    alert(`Copied ${paymentMethod} details to clipboard! 💕`);
                  }}
                  className="mt-1.5 text-xs font-bold text-[#935073] hover:text-[#502D55] transition-colors inline-flex items-center gap-1"
                >
                  Copy Details
                </button>
              </div>
            </div>

            {/* Screenshot Upload Block */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-[#502D55] uppercase tracking-wider mb-2 text-left">
                Upload Payment Screenshot <span className="text-red-500">*</span>
              </label>

              {!paymentScreenshot ? (
                /* Upload Dropzone */
                <label 
                  htmlFor="modal-screenshot-input" 
                  className="flex flex-col items-center justify-center border-2 border-dashed border-[#935073]/25 bg-white hover:bg-[#F8F4E9]/20 rounded-2xl p-6 cursor-pointer transition-all text-center group"
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📤</span>
                  <span className="text-xs font-bold text-[#502D55]">Click to upload screenshot</span>
                  <span className="text-[10px] text-[#502D55]/50 mt-1">PNG, JPG, or JPEG up to 10MB</span>
                  <input 
                    type="file" 
                    id="modal-screenshot-input" 
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                </label>
              ) : (
                /* Uploaded File Preview */
                <div className="bg-white rounded-2xl border border-emerald-500/20 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden border border-[#935073]/10 relative">
                      <img 
                        src={paymentScreenshot} 
                        alt="Receipt preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        Screenshot Attached!
                      </p>
                      <p className="text-[10px] text-[#502D55]/60 truncate max-w-[150px]">
                        {paymentScreenshotFile?.name || 'receipt.png'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setPaymentScreenshot(null);
                      setPaymentScreenshotFile(null);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="space-y-2">
              {paymentScreenshot ? (
                <button
                  onClick={handleFinalWhatsAppRedirect}
                  className="w-full py-4 bg-gradient-to-r from-[#502D55] to-[#935073] text-white font-bold rounded-2xl hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Confirm Payment & Send on WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-gray-200 text-[#502D55]/40 font-bold rounded-2xl cursor-not-allowed flex items-center justify-center gap-2 border border-gray-300/50 text-xs"
                >
                  🔒 Please Upload Payment Screenshot to Confirm
                </button>
              )}
              
              <p className="text-[10px] text-[#502D55]/40 italic text-center">
                * Note: Your receipt image and formatted pre-order details are compiled automatically. Simply paste them in the WhatsApp chat that opens!
              </p>
            </div>

          </div>
        </div>
      )}


      {/* ----------------- INSTAGRAM FOLLOW PRE-ORDER MODAL ----------------- */}
      <InstagramModal
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        onConfirm={handleInstagramConfirmed}
        productDetails={selectedProduct}
      />

    </div>
  );
}
