# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a missing pet website ("Retrouvons Tao" - Find Tao), built with TypeScript and styled using Tailwind CSS with shadcn/ui components. The site helps locate a missing cat named Tao in Toulouse, France, featuring a reward system, reporting form, and photo gallery.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server (localhost:3000)
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint on codebase

### Package Management
This project uses **pnpm** as the package manager (pnpm-lock.yaml present)

## Architecture & Code Organization

### Application Structure
- **App Router**: Uses Next.js 15 App Router (`app/` directory structure)
- **Single Page Application**: Main content in `app/page.tsx` as client component
- **Component Architecture**: Feature-based components in `/components/` with shared UI components in `/components/ui/`

### Key Components
- `TaoHeroImage` - Custom hero image with circular gradient background
- `ReportForm` - Form for reporting cat sightings
- `PhotoGallery` - Gallery of cat photos
- `RewardSection` - Reward information display
- `TipsSection` - Tips for finding lost pets

### Design System
- **shadcn/ui Components**: Extensive use of Radix UI primitives with Tailwind styling
- **Theme System**: CSS variables-based theming with HSL color system
- **Typography**: Geist Sans and Geist Mono fonts configured globally
- **Icons**: Lucide React icon library
- **Styling**: Tailwind CSS with custom extensions for colors, animations, and design tokens

### Configuration Details
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **Build Configuration**: ESLint and TypeScript errors ignored during builds (development convenience)
- **Image Optimization**: Disabled for static hosting compatibility
- **Styling**: CSS variables for theming, custom animations for accordions

### Data Flow
- **Client-Side Only**: All components are client-side rendered ("use client" directive)
- **State Management**: Local component state using React hooks
- **Forms**: React Hook Form with Zod validation (dependencies present)
- **No Backend**: Static site without API routes or database connections

### Development Patterns
- **Component Composition**: Uses composition pattern with shadcn/ui base components
- **Utility Functions**: Single utility file (`lib/utils.ts`) with `cn()` helper for className merging
- **Mobile-First**: Responsive design with mobile-first approach
- **Semantic HTML**: Proper semantic structure for accessibility

### Asset Management
- **Public Directory**: Images stored in `/public/` with tao-specific assets
- **Image References**: Direct path references (no Next.js Image optimization due to unoptimized setting)

### Styling Architecture
- **CSS Custom Properties**: Extensive use of CSS variables for theming
- **Component Variants**: Class Variance Authority for component styling variants
- **Animation System**: Tailwind CSS Animate plugin for micro-interactions
- **Color System**: HSL-based color system with semantic color tokens

This is a focused, single-purpose application with a clean architecture optimized for static deployment and maximum compatibility across devices and browsers.