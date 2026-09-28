/**
 * Deepu Momenta Creations - Centralized Business Data
 * This file contains all business info, categories, product price lists,
 * FAQs, and gallery assets. It serves as the single source of truth.
 */

export interface BusinessInfo {
  name: string;
  instagramUsername: string;
  instagramUrl: string;
  phone: string;
  whatsAppNumber: string;
  whatsAppUrl: string;
  email: string;
  aboutTitle: string;
  aboutDescription: string;
}

export const businessInfo: BusinessInfo = {
  name: "Deepu Momenta Creations",
  instagramUsername: "@deepu_momenta_creations",
  instagramUrl: "https://www.instagram.com/deepu_momenta_creations",
  phone: "9703265096",
  whatsAppNumber: "9703265096",
  whatsAppUrl: "https://wa.me/919703265096",
  email: "deepu.momenta.creations@gmail.com",
  aboutTitle: "Made by Hand, Made with Love",
  aboutDescription: "At Deepu Momenta Creations, we craft exquisite handmade and customized products designed to celebrate life's most precious occasions. Whether you are looking for birthdays, anniversaries, weddings, festivals, or just special self-gifting moments, our creations bring tactile warmth and personal joy to every recipient. Every single item is handcrafted meticulously with utmost care and can be fully customized according to your preferred colors, designs, names/letters, quantities, and bouquet arrangement styles.",
};

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  startingPrice?: string;
  priceRange?: string;
  imageUrl: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "pipe-cleaner-flowers",
    name: "Pipe-Cleaner Flowers",
    description: "Handcrafted pipe-cleaner flowers available in a variety of flower types, colors, and sizes.",
    startingPrice: "₹60",
    imageUrl: "/images/pipe_cleaner_flowers_1790604545525.jpg"
  },
  {
    id: "pipe-cleaner-bouquets",
    name: "Customized Flower Bouquets",
    description: "Bespoke wrapped bouquets created exactly according to your preferred flowers, colors, quantity, and budget.",
    startingPrice: "₹150",
    imageUrl: "/images/flower_bouquets_1790604561485.jpg"
  },
  {
    id: "gift-hampers",
    name: "Customized Gift Hampers",
    description: "Premium fairy-lit gift hampers curated with customized photo frames, gorgeous flower claw clips, cute handmade keychains, and personalized notes.",
    startingPrice: "₹300",
    imageUrl: "/images/gift_hampers_new.jpg"
  },
  {
    id: "pipe-cleaner-keychains",
    name: "Pipe-Cleaner Keychains",
    description: "Charming and adorable handmade keyrings in cartoon characters, initials, and sweet shapes.",
    startingPrice: "₹40",
    imageUrl: "/images/handmade_keychains_1790604595375.jpg"
  },
  {
    id: "crochet-keychains",
    name: "Crochet Keychains",
    description: "Delicately crocheted miniature objects, flowers, and animals with beautiful details.",
    startingPrice: "₹40",
    imageUrl: "/images/handmade_keychains_1790604595375.jpg"
  },
  {
    id: "handbags",
    name: "Handcrafted Handbags",
    description: "Cute, tactile handbags woven from pipe-cleaners or knitted from high-quality crochet yarns.",
    priceRange: "₹200 – ₹2,000",
    imageUrl: "/images/handcrafted_bags_1790604608782.jpg"
  },
  {
    id: "bangles",
    name: "Customized Thread Bangles",
    description: "Beautiful, personalized thread-wrapped bangles in custom sizing and colors to match your outfit.",
    imageUrl: "/images/thread_bangles_1790606388735.jpg"
  },
  {
    id: "earrings",
    name: "Handmade Earrings",
    description: "Unique, artisan earrings handcrafted in distinct textures, shapes, and delightful styles.",
    imageUrl: "/images/handmade_earrings_1790606404938.jpg"
  },
  {
    id: "invisible-chains",
    name: "Invisible Chains",
    description: "Elegant, minimalist necklaces featuring fine translucent cords with brilliant floating gemstones and matching crystal stud earrings.",
    startingPrice: "₹150",
    imageUrl: "/images/invisible_chains_new.jpg"
  },
  {
    id: "embroidery",
    name: "Embroidery Customization",
    description: "Exquisite personalized embroidery detailing on handkerchiefs, shirts, kurtis, and special fabrics.",
    startingPrice: "₹400",
    imageUrl: "/images/custom_embroidery_1790606433845.jpg"
  }
];

export interface PriceListItem {
  name: string;
  price: string;
  numericPrice: number;
}

export const pipeCleanerFlowerPrices: PriceListItem[] = [
  { name: "Daisy", price: "₹60", numericPrice: 60 },
  { name: "Double Layer Daisy", price: "₹100", numericPrice: 100 },
  { name: "Tulip", price: "₹100", numericPrice: 100 },
  { name: "Large Tulip", price: "₹150", numericPrice: 150 },
  { name: "Sunflower", price: "₹100", numericPrice: 100 },
  { name: "Large Sunflower", price: "₹200", numericPrice: 200 },
  { name: "Rose", price: "₹120", numericPrice: 120 },
  { name: "Lily", price: "₹130", numericPrice: 130 },
  { name: "Hibiscus", price: "₹140", numericPrice: 140 },
  { name: "Lavender Bunch (3)", price: "₹120", numericPrice: 120 },
];

export const pipeCleanerKeychainPrices: PriceListItem[] = [
  { name: "Cloud", price: "₹40", numericPrice: 40 },
  { name: "Tulip", price: "₹50", numericPrice: 50 },
  { name: "Bow", price: "₹50", numericPrice: 50 },
  { name: "Butterfly", price: "₹50", numericPrice: 50 },
  { name: "Cherry", price: "₹50", numericPrice: 50 },
  { name: "Daisy", price: "₹60", numericPrice: 60 },
  { name: "Rainbow", price: "₹60", numericPrice: 60 },
  { name: "Smiley", price: "₹60", numericPrice: 60 },
  { name: "Star", price: "₹60", numericPrice: 60 },
  { name: "Lavender Bunch (3)", price: "₹70", numericPrice: 70 },
  { name: "Evil Eye", price: "₹70", numericPrice: 70 },
  { name: "Bear", price: "₹70", numericPrice: 70 },
  { name: "Lettering", price: "₹80", numericPrice: 80 },
  { name: "Double Layer Daisy", price: "₹80", numericPrice: 80 },
  { name: "Heart", price: "₹80", numericPrice: 80 },
  { name: "Heart Chain", price: "₹80", numericPrice: 80 },
  { name: "Panda", price: "₹80", numericPrice: 80 },
  { name: "Bunny", price: "₹80", numericPrice: 80 },
  { name: "Sunflower", price: "₹90", numericPrice: 90 },
  { name: "Rose", price: "₹90", numericPrice: 90 },
  { name: "Blue Lily", price: "₹90", numericPrice: 90 },
  { name: "Pink Lily", price: "₹90", numericPrice: 90 },
  { name: "Tulip Bunch (3)", price: "₹90", numericPrice: 90 },
  { name: "Strawberry", price: "₹90", numericPrice: 90 },
  { name: "Octopus", price: "₹120", numericPrice: 120 },
];

export const crochetKeychainPrices: PriceListItem[] = [
  { name: "Small Heart", price: "₹40", numericPrice: 40 },
  { name: "Medium Heart", price: "₹60", numericPrice: 60 },
  { name: "Bow – Single Colour", price: "₹70", numericPrice: 70 },
  { name: "Bat", price: "₹70", numericPrice: 70 },
  { name: "Double Colour Heart", price: "₹80", numericPrice: 80 },
  { name: "Butterfly", price: "₹80", numericPrice: 80 },
  { name: "Evil Eye", price: "₹80", numericPrice: 80 },
  { name: "Daisy", price: "₹90", numericPrice: 90 },
  { name: "Sunflower", price: "₹90", numericPrice: 90 },
  { name: "Heart", price: "₹90", numericPrice: 90 },
  { name: "Bow – Double Colour", price: "₹100", numericPrice: 100 },
  { name: "Rose", price: "₹120", numericPrice: 120 },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Do you accept customized orders?",
    answer: "Yes, absolutely! Almost all of our handmade products can be customized fully in terms of color palette, arrangement size, specific names/letters, and accessory combinations according to your specific desires."
  },
  {
    question: "How can I place an order?",
    answer: "Our ordering process is simple and fun. First, browse our products and click 'Order Now'. We ask that you follow our Instagram (@deepu_momenta_creations) to stay connected with our latest creations. Then, continue to our brief customization details form. Filling it out will auto-generate a structured message which opens straight in WhatsApp so we can finalize your customized order."
  },
  {
    question: "Can I choose the flower colors?",
    answer: "Yes! You can choose your preferred flower colors. We will strive to match them perfectly, subject to pipe-cleaner or yarn color availability."
  },
  {
    question: "Do you make customized bouquets?",
    answer: "Yes. Customized pipe-cleaner bouquets are our specialty! They can be tailored specifically to fit your budget, flower count, wrapping paper styles, and color combinations."
  },
  {
    question: "What is the starting price for gift hampers?",
    answer: "Our fully customized occasion gift hampers start from ₹300, allowing you to curate beautiful packages even on a modest budget."
  },
  {
    question: "What is the starting price for embroidery?",
    answer: "Custom hand embroidery on handkerchiefs, shirts, kurtis, and other textiles starts from ₹400."
  },
  {
    question: "Can I customize keychains?",
    answer: "Yes, you can request custom letters/initials or specific colors for several of our pipe-cleaner and crochet keychains."
  },
  {
    question: "How do I get the final price for a customized order?",
    answer: "The final price depends on the dimensions, material type, quantity, and complexity of the request. Once you submit the customized details form, we will review it and confirm the final price directly with you on WhatsApp."
  }
];

// Elegant placeholder review data structure
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export const reviews: Review[] = [
  // Elegant placeholder state - No actual customer reviews provided yet.
  // Add real customer reviews here in the future
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Pastel Lavender Bouquet", category: "Pipe-Cleaner Bouquets", imageUrl: "/images/flower_bouquets_1790604561485.jpg" },
  { id: "g2", title: "Handcrafted Rose and Daisies", category: "Pipe-Cleaner Flowers", imageUrl: "/images/pipe_cleaner_flowers_1790604545525.jpg" },
  { id: "g3", title: "Fairy-Lit Birthday Gift Hamper", category: "Customized Gift Hampers", imageUrl: "/images/gift_hampers_new.jpg" },
  { id: "g4", title: "Cute Bear and Strawberry Keychains", category: "Keychains", imageUrl: "/images/handmade_keychains_1790604595375.jpg" },
  { id: "g5", title: "Delicate Crochet Mini Bags", category: "Handbags", imageUrl: "/images/handcrafted_bags_1790604608782.jpg" },
  { id: "g6", title: "Gemstone Invisible Chain & Earrings Set", category: "Invisible Chains", imageUrl: "/images/invisible_chains_new.jpg" }
];
