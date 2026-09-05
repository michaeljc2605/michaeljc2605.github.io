# One Castle. Many Realms.

An independent portfolio redesign of the Disney homepage built around one continuous journey through six themed worlds: meadow, ocean, city, desert, frost and space.

## What is implemented

- Cinematic, blended four-realm opening scene
- Fixed story navigation and scroll-progress trail
- Interactive six-realm map
- Six sticky, full-screen story environments
- Realm-specific parallax, particles, light, scanline, water, frost and orbital motion
- Reactive star-trail cursor and high-visibility realm-specific FX layers
- Linked circular story portals with orbiting story destinations
- FX MAX/soft mode and an automatic six-realm cinematic journey
- Functional mobile realm menu
- Optional generative ambient soundscape that starts only after user interaction
- Disney hub for Watch, Visit, Play and Shop
- Responsive layouts and `prefers-reduced-motion` support

## Source structure

- `app/page.tsx` — semantic page structure and interaction logic
- `app/globals.css` — visual system, layouts, realm styling and animation
- `public/assets` — local image assets
- `ASSET-GUIDE.md` — source links, replacement specifications and ideal final asset sizes

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Portfolio note

This is an unofficial student portfolio concept. Disney names and the Disney wordmark remain the property of their respective owner. The prototype should not be presented as an official Disney product.
