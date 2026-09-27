/**
 * ============================================================================
 * UNICORN TREATS — BUSINESS CONFIGURATION FILE
 * ============================================================================
 * 
 * Hey Jolene! This is your control center.
 * You can edit any price, flavor, social handle, phone number, or date right here
 * without touching any React code or HTML templates.
 * 
 * Whenever you change a value here, the whole website automatically updates!
 */

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  subtitle: string;
  description: string;
  tags?: string[];
  isSpecial?: boolean;
}

export interface ComboDeal {
  id: string;
  name: string;
  items: string;
  price: number;
  formattedPrice: string;
  isSpecialCombo?: boolean;
  badge?: string;
  description: string;
}

export interface SpecialFlavor {
  id: string;
  name: string;
  highlight: string;
  accentColor: string;
}

export interface BrandConfig {
  brandName: string;
  subBrand: string;
  tagline: string;
  mission: string;
  qualityPillars: string[];
  
  // Birthday & Milestone Details
  birthday: {
    milestone: string;       // e.g. "TURNING 15"
    dateString: string;      // e.g. "October 23rd"
    badgeText: string;       // e.g. "Turning 15 on October 23rd"
    callout: string;         // e.g. "Support a young entrepreneur!"
    yearCelebrated: number;  // 2026
  };

  // Contact and Social Info (Easy placeholders - safely handled if left as placeholders)
  contact: {
    phoneNumber: string;       // e.g. "+1 (555) 123-4567" or "[PHONE NUMBER]"
    whatsappNumber: string;    // e.g. "+15551234567" or "[WHATSAPP NUMBER]"
    instagramHandle: string;   // e.g. "@unicorntreatsbyjolene" or "[INSTAGRAM HANDLE]"
    instagramUrl: string;      // e.g. "https://instagram.com/unicorntreatsbyjolene"
    facebookPage: string;      // e.g. "Unicorn Treats by Jolene" or "[FACEBOOK PAGE]"
    facebookUrl: string;       // e.g. "https://facebook.com/unicorntreatsbyjolene"
    email: string;             // e.g. "orders@unicorntreats.com"
    locationNote: string;      // e.g. "Local pickup & delivery available"
  };

  // Signature Brownies
  brownies: {
    title: string;
    description: string;
    flavors: ProductItem[];
  };

  // Signature Cookies
  cookies: {
    title: string;
    description: string;
    flavors: ProductItem[];
  };

  // Special Combo Deals
  combos: ComboDeal[];

  // Special Flavors
  specialFlavors: SpecialFlavor[];

  // Closing / Brand Lockup
  closing: {
    headline: string;
    subheadline: string;
    closingNote: string;
    signature: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  brandName: "UNICORN TREATS",
  subBrand: "Unicorn Treats by Jolene",
  tagline: "SWEET TREATS • BIG DREAMS",
  mission: "A young entrepreneur creating homemade brownies and cookies with fresh ingredients and lots of love.",
  qualityPillars: [
    "HOMEMADE TREATS",
    "FRESH INGREDIENTS",
    "MADE WITH LOVE"
  ],

  birthday: {
    milestone: "TURNING 15",
    dateString: "October 23rd",
    badgeText: "Turning 15 on October 23rd",
    callout: "Support a young entrepreneur!",
    yearCelebrated: 2026
  },

  contact: {
    // Replace with your real contact information whenever you are ready:
    phoneNumber: "[PHONE NUMBER]",
    whatsappNumber: "[WHATSAPP NUMBER]",
    instagramHandle: "[INSTAGRAM HANDLE]",
    instagramUrl: "",
    facebookPage: "[FACEBOOK PAGE]",
    facebookUrl: "",
    email: "hello@unicorntreats.example.com",
    locationNote: "Made fresh to order in small batches"
  },

  brownies: {
    title: "Signature Brownies",
    description: "Rich • Fudgy • Loaded with Chocolate • Made with Love",
    flavors: [
      {
        id: "b-classic",
        name: "Classic Chocolate",
        price: 4.00,
        formattedPrice: "$4",
        category: "Signature Brownie",
        subtitle: "Fudgy Dark Cocoa",
        description: "Dense, intensely fudgy dark chocolate brownie with a paper-thin crinkly top."
      },
      {
        id: "b-pecan",
        name: "Chocolate Pecan",
        price: 4.50,
        formattedPrice: "$4.50",
        category: "Signature Brownie",
        subtitle: "Toasted Georgia Pecans",
        description: "Rich chocolate brownie packed with toasted buttered pecans for satisfying crunch."
      },
      {
        id: "b-chunk",
        name: "Chocolate Chunk",
        price: 4.50,
        formattedPrice: "$4.50",
        category: "Signature Brownie",
        subtitle: "Molten Callebaut Chunks",
        description: "Loaded with jumbo melted chocolate chunks for an irresistible gooey melt."
      },
      {
        id: "b-cookies-cream",
        name: "Cookies & Cream",
        price: 4.50,
        formattedPrice: "$4.50",
        category: "Signature Brownie",
        subtitle: "Oreo Crumbles & Cream",
        description: "Swirled vanilla cream fudge studded with crunchy crushed chocolate sandwich cookies."
      },
      {
        id: "b-seasonal",
        name: "Seasonal Special",
        price: 5.00,
        formattedPrice: "$5",
        category: "Signature Brownie",
        subtitle: "Chef Jolene's Surprise",
        description: "A limited-run festive batch crafted with seasonal gourmet fruit, spices, or berries.",
        isSpecial: true
      }
    ]
  },

  cookies: {
    title: "Signature Cookies",
    description: "Soft • Chewy • Loaded with Flavor • Baked Fresh",
    flavors: [
      {
        id: "c-classic-chip",
        name: "Classic Chocolate Chip",
        price: 3.50,
        formattedPrice: "$3.50",
        category: "Signature Cookie",
        subtitle: "Golden & Gooey",
        description: "Crisp buttery edges with a soft, chewy center brimming with premium semi-sweet chocolate."
      },
      {
        id: "c-brown-butter-pecan",
        name: "Brown Butter Pecan",
        price: 4.00,
        formattedPrice: "$4",
        category: "Signature Cookie",
        subtitle: "Nutty Caramel Notes",
        description: "Nutty browned butter dough folded with slow-roasted pecans and sea salt crystals."
      },
      {
        id: "c-peanut-butter-chocolate",
        name: "Peanut Butter Chocolate",
        price: 4.00,
        formattedPrice: "$4",
        category: "Signature Cookie",
        subtitle: "Creamy & Decadent",
        description: "Creamy peanut butter dough packed with dark chocolate chips and a touch of flake salt."
      },
      {
        id: "c-strawberry-white-chocolate",
        name: "Strawberry White Chocolate",
        price: 4.00,
        formattedPrice: "$4",
        category: "Signature Cookie",
        subtitle: "Berry Sweet Bliss",
        description: "Infused with tart real strawberry morsels and luscious Belgian white chocolate melts."
      },
      {
        id: "c-chocolate-orange",
        name: "Chocolate Orange",
        price: 4.00,
        formattedPrice: "$4",
        category: "Signature Cookie",
        subtitle: "Zesty Citrus Fudge",
        description: "Rich chocolate cookie with fragrant orange zest and dark cocoa essence."
      },
      {
        id: "c-seasonal",
        name: "Seasonal Special",
        price: 4.50,
        formattedPrice: "$4.50",
        category: "Signature Cookie",
        subtitle: "Monthly Chef Creation",
        description: "Jolene's latest small-batch cookie invention crafted with seasonal delights.",
        isSpecial: true
      }
    ]
  },

  combos: [
    {
      id: "combo-4-brownies",
      name: "4 Brownies",
      items: "4 Signature Brownies",
      price: 15,
      formattedPrice: "$15",
      description: "Pick any 4 of your favorite signature brownie flavors in a gift sleeve."
    },
    {
      id: "combo-4-cookies",
      name: "4 Cookies",
      items: "4 Signature Cookies",
      price: 14,
      formattedPrice: "$14",
      description: "Four freshly baked gourmet cookies wrapped warm with love."
    },
    {
      id: "combo-6-brownies",
      name: "6 Brownies",
      items: "6 Signature Brownies",
      price: 22,
      formattedPrice: "$22",
      description: "Half-dozen decadent fudgy brownies, perfect for weekend gatherings."
    },
    {
      id: "combo-6-cookies",
      name: "6 Cookies",
      items: "6 Signature Cookies",
      price: 20,
      formattedPrice: "$20",
      description: "Half-dozen assorted cookies packed with melt-in-your-mouth flavor."
    },
    {
      id: "combo-12-box",
      name: "12-Piece Box (mix)",
      items: "12-Piece Box Assortment",
      price: 40,
      formattedPrice: "$40",
      description: "The crowd pleaser: a curated baker's dozen style box of brownies & cookies."
    },
    {
      id: "combo-special-6-6",
      name: "6 Brownies + 6 Cookies",
      items: "6 Signature Brownies + 6 Signature Cookies",
      price: 45,
      formattedPrice: "$45",
      isSpecialCombo: true,
      badge: "SPECIAL COMBO",
      description: "The ultimate flyer showcase deal! 6 rich fudgy brownies paired with 6 chewy gourmet cookies."
    }
  ],

  specialFlavors: [
    {
      id: "sf-1",
      name: "Brown Butter Pecan Chocolate Chunk",
      highlight: "Toasted caramel aroma & molten chunks",
      accentColor: "#F4C95D"
    },
    {
      id: "sf-2",
      name: "Strawberry White Chocolate",
      highlight: "Real sun-ripened berries & silky white cacao",
      accentColor: "#F45AA8"
    },
    {
      id: "sf-3",
      name: "Peanut Butter Dream",
      highlight: "Gooey whipped peanut center with dark drizzle",
      accentColor: "#F4C95D"
    },
    {
      id: "sf-4",
      name: "Chocolate Orange",
      highlight: "Valencia orange zest folded into dark truffle chocolate",
      accentColor: "#FF9ACB"
    },
    {
      id: "sf-5",
      name: "Espresso Chocolate",
      highlight: "Roasted espresso beans elevating deep cocoa notes",
      accentColor: "#3A1C12"
    },
    {
      id: "sf-6",
      name: "Coconut Island",
      highlight: "Toasted island coconut shreds over velvety milk chocolate",
      accentColor: "#FFF4DE"
    }
  ],

  closing: {
    headline: "Thank you for supporting my dream!",
    subheadline: "Good Things Are Homemade",
    closingNote: "Every batch is baked from scratch with real butter, farm eggs, and chocolate goodness.",
    signature: "Jolene"
  }
};
