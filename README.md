# El Grullo Express

Next.js App Router, TypeScript, Tailwind CSS, and lucide-react restaurant landing page.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Validate and run production

```bash
npm run lint
npm run build
npm start
```

## Deploy on Vercel

Push this project to your own GitHub repository. Import it in Vercel, keep the detected Next.js defaults, and deploy. No environment variables are required.

## Content

`app/page.tsx` contains the location details, menu data, and review carousel. `app/layout.tsx` sets page metadata. Prices, hours, and the 1,360+ review count were supplied in the brief; confirm them before publishing. Google review excerpts link to their republished sources on Wanderlog. The hero photo is illustrative Unsplash photography and has a fallback if it cannot load. Replace it with approved restaurant photography when available. The rating and reviews refer to Express, even when the other location is selected.

Contact CTAs initiate phone calls; directions open Google Maps. This page does not include a checkout system.
