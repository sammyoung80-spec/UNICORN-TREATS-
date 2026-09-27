# Unicorn Treats by Jolene — Sweet Treats • Big Dreams 🦄✨

A luxury interactive dessert landing page built for young dessert entrepreneur **Jolene** and her brand **Unicorn Treats**. Inspired directly by the official Unicorn Treats promotional flyer, combining rich dark chocolate aesthetics with playful unicorn fantasy, hot pink accents, warm gold highlights, and 3D product interactions.

---

## 🎂 Key Features

1. **Cinematic Hero**:
   - High-impact luxury dessert photography with subtle floating chocolate crumbs, gold dust, and pink hearts.
   - Scroll-driven chocolate disassembly & reassembly animation.
   - Milestone celebration: *Turning 15 on October 23rd • Support a young entrepreneur!*

2. **3D Interactive Product Cards (Critical Feature)**:
   - **Signature Brownies** (Classic Chocolate $4, Chocolate Pecan $4.50, Chocolate Chunk $4.50, Cookies & Cream $4.50, Seasonal Special $5).
   - **Signature Cookies** (Classic Chocolate Chip $3.50, Brown Butter Pecan $4, Peanut Butter Chocolate $4, Strawberry White Chocolate $4, Chocolate Orange $4, Seasonal Special $4.50).
   - Smooth 3D flip card effect on desktop hover (or mobile tap) revealing a collectible price tag and "Order This Flavor" button.
   - Fully keyboard accessible (`Enter` / `Space` / Tab navigation) with reduced-motion support.

3. **Special Flavors Deck**:
   - 6 interactive flavor cards (*Brown Butter Pecan Chocolate Chunk, Strawberry White Chocolate, Peanut Butter Dream, Chocolate Orange, Espresso Chocolate, Coconut Island*).

4. **Special Combo Deals**:
   - Complete tier list from the flyer (*4 Brownies $15, 4 Cookies $14, 6 Brownies $22, 6 Cookies $20, 12-Piece Box $40, and the featured **Special Combo: 6 Brownies + 6 Cookies for $45**)*.

5. **Multi-Channel Order Hub**:
   - Interactive Treat Bag drawer calculating subtotal in real-time.
   - Pre-formatted messages for WhatsApp, Phone Call, SMS, and Instagram DM.
   - Inquiry form equipped with anti-spam honeypot security.

6. **Progressive Web App (PWA) & Home Screen Installation**:
   - `manifest.json` configured with brand icons, standalone display mode, and status bar theming.
   - Service worker auto-registration via `vite-plugin-pwa` with Google Fonts runtime caching and offline readiness.
   - In-app install button in the navigation header and order section with iOS Safari guidance modal.

7. **Milestone Celebration Confetti**:
   - Palette-matched gold, hot pink, and cream celebratory confetti burst triggers when interacting with "Place Your Order" CTA buttons, celebrating Jolene's *Turning 15 on October 23rd* milestone.
   - Fully respects `prefers-reduced-motion: reduce`.

8. **Flyer Visual DNA**:
   - Hand-painted hot pink brush strokes and gold banners.
   - Official scalloped rosette seal (*"Unicorn Treats by Jolene — Sweet Treats • Big Dreams"*).
   - Brand lockup with custom SVG Unicorn and Royal Crown logo.

---

## 👩‍🍳 Business Owner Guide: How to Edit Details

All business details, prices, contact channels, and flavors live in **one single configuration file**:

📁 `src/data/config.ts`

**You do NOT need to touch any HTML or React components.**

### 1. Changing Prices & Flavor Names
Open `src/data/config.ts` and locate the `brownies` or `cookies` array:

```typescript
// To change the price of Classic Chocolate Brownie from $4 to $4.25:
{
  id: "b-classic",
  name: "Classic Chocolate",
  price: 4.25,                 // Change this number
  formattedPrice: "$4.25",     // Change this displayed label
  category: "Signature Brownie",
  subtitle: "Fudgy Dark Cocoa",
  description: "Dense, intensely fudgy dark chocolate brownie..."
}
```

### 2. Changing Phone, WhatsApp, and Social Handles
In `src/data/config.ts`, find the `contact` block:

```typescript
contact: {
  phoneNumber: "+1 (555) 123-4567",         // Replace [PHONE NUMBER]
  whatsappNumber: "+15551234567",           // Replace [WHATSAPP NUMBER]
  instagramHandle: "@unicorntreatsbyjolene", // Replace [INSTAGRAM HANDLE]
  instagramUrl: "https://instagram.com/yourhandle",
  facebookPage: "Unicorn Treats by Jolene",  // Replace [FACEBOOK PAGE]
  facebookUrl: "https://facebook.com/yourpage",
  email: "hello@unicorntreats.com",
}
```
*Note: If any placeholder like `[PHONE NUMBER]` is left as is, the website will display a helpful popup rather than creating a broken link.*

### 3. Changing the Birthday Date or Milestone
In `src/data/config.ts`:

```typescript
birthday: {
  milestone: "TURNING 15",
  dateString: "October 23rd",
  badgeText: "Turning 15 on October 23rd",
  callout: "Support a young entrepreneur!",
}
```

### 4. Updating Photos
Photos are mapped in:
📁 `src/assets/assetMap.ts`
Simply drop your new photo file into `src/assets/images/` and update the import in `assetMap.ts`.

---

## 🛠️ Developer Setup & Commands

```bash
# Run local development server
npm run dev

# Compile TypeScript and check for errors
npm run lint

# Build production assets
npm run build
```

---

## 🔒 Security Model

See `SECURITY.md` for full details on our zero-secret policy, bot prevention, and input validation.
