# HelixOS Brand Identity Guide

## Overview

HelixOS now has a professional, modern brand identity with consistent placement across all authentication and application screens. The brand conveys trustworthiness, innovation, and enterprise-grade healthcare operations.

## Logo System

### Full Logo
- **Location**: `public/logo.png`
- **Use**: Main authentication pages (sign in, sign up, verify email)
- **Size**: Scalable, recommended sizes 40x40, 56x56, 80x80px
- **Format**: PNG with transparent background
- **Colors**: Cyan/teal helix symbol with modern sans-serif wordmark "HelixOS"
- **Recognizable at**: Any size from 32px+

### Icon-Only Logo
- **Location**: `public/logo-icon.png`
- **Use**: Collapsed sidebar, favicon, small UI elements
- **Size**: Geometric helix/spiral symbol
- **Format**: PNG with transparent background
- **Colors**: Cyan/teal on transparent
- **Recognizable at**: 20px to 56px (favicon-friendly at 32x32)

## Component Usage

### Logo React Component

Located in `components/logo.tsx`, the Logo component provides flexible configuration:

```typescript
import { Logo } from '@/components/logo'

// Full logo at medium size (default)
<Logo />

// Full logo at large size
<Logo variant="full" size="lg" />

// Icon only at small size
<Logo variant="icon" size="sm" />

// As a link
<Logo href="/" />

// Custom className
<Logo className="custom-class" />
```

### Props

- **variant**: `'full' | 'icon'` (default: `'full'`)
  - `full`: Shows logo with wordmark
  - `icon`: Shows icon only
  
- **size**: `'sm' | 'md' | 'lg'` (default: `'md'`)
  - `sm`: 28x28px (icon: 20x20px)
  - `md`: 40x40px (icon: 28x28px)
  - `lg`: 56x56px (icon: 40x40px)
  
- **href**: Optional link destination (default: none)
  - Wraps logo in Next.js Link component
  
- **className**: Custom CSS classes (optional)

## Logo Placement

### Authentication Pages

#### Sign In & Sign Up
- **Position**: Top center within the card
- **Size**: Medium (40x40px)
- **Spacing**: 32px margin below logo to heading
- **Usage**: 
  ```tsx
  <div className="mb-8 flex flex-col items-center gap-3">
    <Logo variant="full" size="md" />
    <div className="text-center">
      {/* Heading and subtitle */}
    </div>
  </div>
  ```

#### Verify Email
- **Position**: Top center above the mail icon
- **Size**: Medium (40x40px)
- **Spacing**: 32px margin below logo to mail icon
- **Usage**:
  ```tsx
  <div className="flex justify-center mb-8">
    <Logo variant="full" size="md" />
  </div>
  ```

### Application Layout

#### Sidebar Navigation
- **Position**: Top left, integrated with "HelixOS" text
- **Icon Size**: Small (28x28px icon only)
- **Spacing**: 12px gap between icon and text
- **Behavior**: 
  - Icon visible when sidebar is expanded
  - Text visible when sidebar is expanded
  - Automatically hides when sidebar collapses
- **Usage**:
  ```tsx
  <div className="flex items-center gap-3">
    {sidebarOpen && <Logo variant="icon" size="sm" />}
    {sidebarOpen && (
      <div>
        <h1>HelixOS</h1>
        <p>Demo Workspace</p>
      </div>
    )}
  </div>
  ```

## Design Consistency

### Dark Mode Optimization
- Logo is designed and optimized for dark mode
- Uses cyan (#06B6D4) color which provides excellent contrast on dark backgrounds
- Transparent background ensures integration with any background color

### Visual Hierarchy
- Logo establishes immediate brand recognition
- Proper spacing prevents visual clutter
- Logo size scales appropriately with content context
- Text labels complement logo without redundancy

### Spacing Guidelines
- **Above logo**: 0 (should be flush with container top when appropriate)
- **Below logo (to next element)**: 24-32px for breathing room
- **Around logo (horizontal)**: Centered or aligned with visual hierarchy
- **From sidebar edges**: 16px padding (included in component container)

## File Structure

```
public/
├── logo.png              # Full logo with wordmark
└── logo-icon.png        # Icon-only version

components/
└── logo.tsx             # Reusable Logo component
```

## Integration Checklist

- [x] Logo component created (`components/logo.tsx`)
- [x] Logo assets generated (`public/logo.png`, `public/logo-icon.png`)
- [x] Integrated into Sign In page
- [x] Integrated into Sign Up page (via AuthForm)
- [x] Integrated into Verify Email page
- [x] Integrated into Demo Sidebar
- [x] Sidebar collapse/expand functionality working
- [x] Logo responsive and optimized for all sizes

## Brand Colors

### Primary Color
- **Cyan**: `#06B6D4` (used in logo symbol)
- **Usage**: Primary interactive elements, branding accent
- **Contrast**: Excellent on #0F172A (background) and #1E293B (sidebar)

### Supporting Colors
- **Midnight Navy**: `#0F172A` (main background)
- **Slate**: `#1E293B` (sidebar background)
- **Slate Border**: `#334155` (borders and dividers)
- **Muted Text**: `#94A3B8` (secondary text)
- **White**: `#FFFFFF` (primary text)

## Usage Examples

### Authentication Flow
1. User visits sign-in page → sees HelixOS logo at top center
2. User signs up → sees HelixOS logo with "Create an account" message
3. User receives verification email → sees HelixOS logo at top of verify page

### Application Flow
1. User logs in → sees HelixOS icon in sidebar header
2. User navigates app → logo remains fixed in sidebar
3. User collapses sidebar → icon only remains visible

## Future Enhancements

### Favicon
The icon-only logo (`logo-icon.png`) is favicon-ready at 32x32px:
- Use in `public/favicon.ico`
- Reference in `layout.tsx` metadata

### Animated Logo
Consider future enhancement with subtle animation:
- Gentle rotation on hover
- Pulse animation on page load
- Used for loading states

### Light Mode Support
Current logo optimized for dark mode. Future enhancements could include:
- Light mode variant with adjusted colors
- Theme-aware component auto-switching
- CSS filters for automatic adaptation

## Technical Notes

### Image Optimization
- Logos use PNG format with transparency
- Files are already optimized for web
- Next.js Image component handles responsive sizing
- Priority loading ensures instant logo display

### Performance
- Logo component uses `priority` prop for Image
- Minimal bundle size impact
- Lazy loading not applied (logos load immediately)

### Accessibility
- Alt text: "HelixOS" on all logo images
- Logos are decorative/branding, not functional
- Text labels accompany logos in navigation
- Sufficient color contrast maintained

## Questions & Support

For logo variations, sizing adjustments, or brand consistency questions, refer to:
- This guide for technical implementation
- `components/logo.tsx` for component API
- Generated logo assets in `public/`

