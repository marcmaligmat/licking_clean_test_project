# Licking Clean - Provider Profile Page

A mobile-first, SEO-optimized provider profile page for Licking Clean cleaning services, built with Next.js 15, React, Tailwind CSS, and Supabase integration.

## 🎨 Design Features

- **Brand Colors**: Custom Tailwind theme with Soft Teal (#4DB6AC), Warm Coral (#FF7F50), Golden Beige (#F5E050)
- **Typography**: Poppins for headings (20px, bold), Lato for body text (14px)
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Semantic HTML, meta tags, and structured data ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (optional - app works with mock data)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd licking_clean
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Setup (Supabase)

### Create Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create providers table
CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES providers(id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample provider
INSERT INTO providers (name, bio, rating) VALUES (
    'Maria Rodriguez',
    'Professional house cleaner with 8+ years experience. Trusted by 200+ families for deep cleaning, weekly maintenance, and move-in/out services. Eco-friendly products and satisfaction guaranteed.',
    5
);
```

### Enable Row Level Security (Optional)

```sql
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to providers
CREATE POLICY "Public providers read" ON providers FOR SELECT USING (true);

-- Allow public insert to bookings
CREATE POLICY "Public bookings insert" ON bookings FOR INSERT WITH CHECK (true);
```

## 📱 Features

### Core Functionality
- **Provider Profile**: Name, photo, bio, and rating display
- **Top-Rated Badge**: Golden beige badge highlighting provider status
- **Customer Reviews**: 3 hardcoded reviews with star ratings
- **Sort Functionality**: Sort reviews by highest rating
- **Booking System**: One-click booking with Supabase integration
- **Responsive Design**: Mobile-first with tablet and desktop optimizations

### Technical Features
- **Server-Side Rendering**: Fast initial page loads
- **Error Handling**: Graceful fallbacks for Supabase connection issues
- **Loading States**: Smooth UX with loading indicators
- **Image Optimization**: Next.js Image component with fallbacks
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom configuration
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel-ready
- **Fonts**: Google Fonts (Poppins, Lato)

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with fonts and SEO
│   └── page.tsx             # Main provider profile component
├── lib/
│   └── supabase.ts          # Supabase client and types
├── .env.local               # Environment variables
├── tailwind.config.ts       # Custom Tailwind configuration
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to GitHub:**
   - Push your code to a GitHub repository
   - Import the project in Vercel dashboard

2. **Configure Environment Variables:**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel dashboard

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

### Build Locally
```bash
npm run build
npm run start
```

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to modify brand colors:
```javascript
colors: {
  'soft-teal': '#4DB6AC',
  'warm-coral': '#FF7F50',
  // ... other colors
}
```

### Provider Data
Modify the mock data in `src/app/page.tsx` or set up Supabase with your provider information.

## 🎯 Performance Features

- **Core Web Vitals Optimized**: Fast LCP, low CLS, good FID
- **Image Optimization**: WebP format with lazy loading
- **Font Loading**: Optimized Google Fonts loading with `font-display: swap`
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: Supabase queries cached on client side

## 📊 SEO Features

- **Meta Tags**: Comprehensive meta tags for social media
- **Structured Data**: Ready for JSON-LD implementation
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Mobile-Friendly**: Responsive design with proper viewport
- **Fast Loading**: Optimized for Core Web Vitals

## 🧪 AI Tools Used

This project was enhanced using:
- **GitHub Copilot**: React component generation and TypeScript interfaces
- **Claude Code**: Architecture planning and responsive design implementation
- **Supabase AI**: Database schema optimization and query generation

## ⏱️ Development Time

Approximately 3 hours total:
- Initial setup and configuration: 30 minutes
- Component development: 1.5 hours  
- Supabase integration: 45 minutes
- Styling and responsive design: 15 minutes

## 📄 License

This project is for demonstration purposes. Customize as needed for your cleaning service business.

---

**Live Demo**: [Add your Vercel URL here]
**GitHub**: [Add your GitHub repository URL here]