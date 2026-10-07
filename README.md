# El Grullo Express

A complete Next.js App Router restaurant landing page with TypeScript, Tailwind CSS 4, and Lucide icons. Requires Node.js 22 or newer.

## Start locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000. If your environment blocks network-interface detection, run `npm run dev -- --hostname 127.0.0.1`.

## Production

```bash
npm run lint
npm run build
npm start
```

## Deploy to Vercel

Push the project folder to GitHub, import the repository into Vercel, and keep the detected Next.js settings. No environment variables or external asset downloads are required.

## Project files

- `app/page.tsx`: interactive branch switcher, menu filters, salsa selector, illustrated taco dip, and review carousel.
- `app/globals.css`: warm textures, papel picado, rustic signage, animation, and reduced-motion support.
- `app/layout.tsx`: root layout and restaurant metadata.
- `tailwind.config.ts`: content scanning and named palette tokens, loaded through the CSS `@config` directive.
- `postcss.config.mjs`: Tailwind CSS 4 PostCSS integration.
- `package-lock.json`: dependency lock for reproducible `npm ci` installs.

## Content notes

Hours, menu prices, and the 1,360+ review count were supplied in the project brief. Confirm current details before publishing. The 4.5 rating is the Express branch aggregate, not an individual review rating. Real Google review excerpts link to their republished sources on Wanderlog. Quotes refer to Express regardless of the selected branch.

The taco art is an inline SVG illustration. Salsa selection previews heat levels; ask the branch for availability. Call links initiate a phone call and directions open Google Maps. This landing page does not process online orders or payments.
