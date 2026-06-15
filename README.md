# Karthicks Wishlist

A public gadget wishlist where friends and family browse items, see what's already claimed, and pledge a gift. Built as a static React SPA.

## Features

- **Live wishlist** — products, prices, images, and claimed status from Airtable via a Cloudflare Worker
- **Grid / list views** — toggle layout; sort by price (default: high → low)
- **Wishlist / Claimed tabs** — open items and gifted items in separate views with counts
- **Bundle card** — pledge every open item in one go from a full-width CTA at the end of the list
- **Pledge modal** — Formspree submission with name, optional contact fields, team/group, and message

## Stack

| Layer | Choice |
|-------|--------|
| UI | React 19, Vite 8, Tailwind CSS 4 |
| Data | Cloudflare Worker → Airtable (`records` format) |
| Pledges | [Formspree](https://formspree.io) |

Layout-critical styles live in `src/index.css`; Tailwind handles spacing utilities.

## Getting started

```bash
npm install
cp .env.example .env   # add your Formspree form ID
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Worker endpoint for wishes (defaults to production URL) |
| `VITE_FORMSPREE_ID` | Formspree form ID for pledge submissions |

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
npm run lint     # ESLint
```

## Project structure

```
src/
├── App.jsx                 # shell: header, grid, pledge modal
├── components/
│   ├── Header.jsx
│   ├── WishGrid.jsx        # toolbar, filters, sort, layout
│   ├── WishCard.jsx
│   ├── WishBundleCard.jsx
│   ├── PledgeModal.jsx
│   └── SkeletonCard.jsx
├── hooks/useWishes.js      # fetch + state for wishlist data
├── utils/wishes.js         # sort, filter, price formatting
└── config.js               # API_URL, FORMSPREE_ID
```

## Data model

The Worker returns Airtable records as-is. Relevant fields:

- `Product Name`, `Price`, `URL`, image URL
- `Select`: `Open` (available) or `Gifted` (claimed)

Bundle pledges send a synthetic item to Formspree with a semicolon-separated list of all open product names in the `item` field.

## Deploy

`npm run build` outputs a static site in `dist/`. Deploy to any static host (Cloudflare Pages, Netlify, etc.) and set the `VITE_*` env vars at build time.
