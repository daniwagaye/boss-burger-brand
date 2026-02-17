

# Boss Burger — Premium Restaurant Website

## Overview
A cinematic, mobile-first website for Boss Burger featuring stunning animations, parallax effects, and a premium dark-themed design. No online ordering — the only CTA is a "Call Now" button. An admin panel allows managing the menu without any technical knowledge.

**Color Palette:** Deep blacks/charcoals with a rich crimson red accent. Gold highlights for premium feel.
**Fonts:** Playfair Display (headings) + Inter (body)

---

## Page 1: Landing Page (/)

### Hero Section
- Full-screen cinematic hero with a dramatic burger background image
- Bold headline: "Bigger Taste. Better Burgers." with smooth text reveal animation on load
- Parallax layers: background image, foreground burger, smoke/overlay elements moving at different scroll speeds
- Prominent glowing "Call Now" button with ripple effect

### Navigation
- Transparent glassmorphism navbar over the hero
- Transitions to solid/sticky on scroll with smooth animation
- Mobile: hamburger menu + persistent floating "Call Now" button

### Scroll Experience
- Hero compresses as user scrolls down
- Each section appears with unique scroll-triggered animations (fade-up, slide-in, scale, staggered reveals)
- Smooth easing transitions throughout
- Respects `prefers-reduced-motion` accessibility setting

### Featured Menu Section
- Horizontal slider showing 4 featured burgers
- Cards with image, name, description, price
- Hover/tap: lift effect with shadow and subtle scale
- "View Full Menu" button linking to /menu

### Additional Sections
- **About** — Story of Boss Burger with a split image/text layout
- **Why Choose Us** — Icon cards with staggered reveal (quality ingredients, handcrafted, fresh daily)
- **Signature Ingredients** — Visual showcase with floating/parallax food imagery
- **Testimonials** — Customer quotes in glassmorphism cards
- **Location & Contact** — Embedded map placeholder, address, hours, and Call Now button

### Dark Mode
- Full dark mode support toggled via a button in the navbar

---

## Page 2: Menu Page (/menu)

### Visual Style
- Paper/parchment texture background for a printed menu feel
- Elegant serif headings + clean sans-serif body
- Luxury restaurant spacing and typography hierarchy

### Layout
- **Desktop:** Two columns — category sidebar on left, menu items on right
- **Mobile:** Single column with collapsible accordion sections per category

### Categories
- Burgers, Sides, Drinks (loaded from database)
- Smooth animated transitions when switching categories

### Item Detail Modal
- Clicking any item opens a beautifully animated modal with:
  - Large photo
  - Ingredients list
  - Price
  - Tags (spicy, cheese, vegetarian, etc.)
  - Call Now button
- Modal slides/scales in with backdrop blur

---

## Page 3: Admin Panel (/admin)

### Authentication
- Secure login page (username + email) using Supabase Auth
- Single admin account with role-based access (admin role stored in a `user_roles` table)
- No public registration — admin account created during setup

### Menu Management Dashboard
- Clean, minimal admin UI
- Full CRUD for menu items:
  - Add, edit, delete food items
  - Upload images (stored in Supabase Storage)
  - Set prices, descriptions, ingredients, tags
  - Mark items as "featured" (shown on landing page)
  - Hide/show items
  - Drag-and-drop reorder
- Category management (add/edit/delete categories)

### Publishing Workflow
- Save as draft or publish changes
- Live preview of how the item looks before publishing
- Export menu data as JSON

---

## Backend (Lovable Cloud / Supabase)

### Database Tables
- **categories** — id, name, sort_order, visible
- **menu_items** — id, name, description, price, image_url, category_id, ingredients, tags, is_featured, is_visible, is_draft, sort_order
- **user_roles** — secure admin role management

### Storage
- Supabase Storage bucket for food item images

### Security
- RLS policies ensuring only admin can modify data
- Public read access for menu items (for the website)
- Secure admin authentication

---

## Technical Highlights
- Mobile-first responsive design
- Lazy-loaded images for performance
- SEO-friendly semantic HTML structure
- Accessible contrast ratios and `tel:` links
- Smooth, premium animations with reduced-motion support
- Google Fonts: Playfair Display + Inter

