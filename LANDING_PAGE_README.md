# Budgefy Landing Page

A modern, responsive landing page for Budgefy – Personal Expense Tracker built with Next.js 14, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features Implemented ✅

### Layout
- [x] Full-width responsive landing page
- [x] Hero, Features, Categories, and Footer sections
- [x] Smooth scrolling navigation
- [x] Particle.js animated background

### Top Navbar
- [x] Budgefy logo with gradient styling
- [x] Navigation links (Home, Features, Analytics)
- [x] Login/Signup buttons
- [x] Theme toggle (dark/light mode)
- [x] Responsive design with mobile optimizations

### Hero Section
- [x] Bold tagline: "Track smart, spend smarter with Budgefy 💰"
- [x] Compelling subtext with value proposition
- [x] Two CTA buttons:
  - "Get Started" → Opens signup modal
  - "See Analytics" → Links to /analytics
- [x] Trust indicators (security, users, rating)
- [x] Animated gradient background with particles

### Features Section
- [x] Grid of 6 feature cards with Lucide icons
- [x] Each card includes icon, title, and bullet points
- [x] Scroll animations with Framer Motion
- [x] Hover effects and transitions
- [x] Real-time analytics focus

### Categories Section
- [x] 8 colorful category badges with emojis
- [x] Hover animations and interactions
- [x] Responsive grid layout
- [x] Food, Transport, Shopping, Entertainment, etc.

### Auth Modal
- [x] Triggered from navbar Login/Signup buttons
- [x] shadcn/ui dialog component
- [x] Tabbed interface (Login/Signup)
- [x] Form validation with Zod
- [x] Firebase auth integration
- [x] Smooth animations with Framer Motion
- [x] Name field for signup
- [x] Password visibility toggle

### Footer
- [x] Brand information and mission
- [x] Quick navigation links
- [x] Social media icons (GitHub, LinkedIn)
- [x] Copyright notice
- [x] Privacy/Terms links
- [x] Multi-column responsive layout

## Design Features

### Theme & Colors
- [x] Finance-inspired color palette (greens, purples, blues)
- [x] Gradient effects throughout
- [x] Dark/light mode support
- [x] Custom CSS variables for consistent theming

### Animations
- [x] Framer Motion for modal transitions
- [x] Scroll-based animations for sections
- [x] Hover effects on interactive elements
- [x] Staggered animations for feature cards

### Responsive Design
- [x] Mobile-first approach
- [x] Responsive typography (text-4xl to text-7xl)
- [x] Adaptive layouts for all screen sizes
- [x] Touch-optimized interactions

### Performance
- [x] Optimized particle system (60fps limit)
- [x] Efficient re-renders with React.memo where needed
- [x] Smooth scrolling behavior
- [x] Fast page loads with Next.js

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Particles**: React TSParticles
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Auth**: Firebase Authentication
- **Theme**: next-themes

## File Structure

```
components/
├── landing-page.tsx          # Main landing page component
├── auth-modal.tsx            # Login/Signup modal
├── particle-background.tsx   # Animated background
├── theme-toggle.tsx          # Dark/light mode toggle
└── ui/                       # shadcn/ui components
    ├── dialog.tsx
    ├── tabs.tsx
    ├── button.tsx
    ├── card.tsx
    └── ...

app/
├── page.tsx                  # Main page with conditional rendering
├── globals.css               # Global styles and CSS variables
└── layout.tsx                # Root layout
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Key Features Highlights

- **Smooth User Experience**: Seamless animations and transitions
- **Mobile-First**: Optimized for all devices
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Performance**: Optimized animations and efficient rendering
- **Modern Design**: Finance-themed with professional gradients
- **Interactive Elements**: Hover effects and click animations
- **Theme Support**: Dark/light mode with system preference detection

The landing page successfully captures the essence of a modern fintech application while providing an engaging user experience that converts visitors into users.
