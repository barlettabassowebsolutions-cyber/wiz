# Wrapping It Up — Amityville Gift Shop

A replica of [wrap-it-fast.base44.app](https://wrap-it-fast.base44.app), rebuilt as a standalone
React + Vite + Tailwind app.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Deploy to Netlify

`netlify.toml` already sets the build command (`npm run build`), the publish folder (`dist`), Node 22,
and the redirect that lets `/shop` and `/admin` load on refresh.

- **From Git:** push this folder to a GitHub repo, then in Netlify choose *Add new project → Import an
  existing project* and pick the repo. Netlify reads the settings from `netlify.toml`.
- **Drag and drop:** run `npm install && npm run build`, then drag the `dist` folder onto
  [app.netlify.com/drop](https://app.netlify.com/drop).
- **CLI:** `npm install && npx netlify-cli deploy --prod` (it runs the build from `netlify.toml`; the
  first run asks you to log in and link a project).

The admin passcode is baked in when the site is built:

- Git or CLI deploys: add `VITE_ADMIN_PASSCODE` under *Project configuration → Environment variables*,
  then redeploy. Add it as a normal variable. Don't tick *Contains secret values*: the passcode ends
  up in the public JavaScript, so Netlify's secret scanner would find it and fail the deploy.
- Drag and drop: put `VITE_ADMIN_PASSCODE=yourcode` in a `.env` file before `npm run build`.
  Netlify doesn't rebuild dropped files, so its environment variables don't apply.

Leave `NODE_ENV` unset in Netlify. Setting it to `production` skips the dev dependencies the build
needs.

## Pages

| Route    | What it is                                                                  |
| -------- | --------------------------------------------------------------------------- |
| `/`      | Landing page: hero, shop/about cards, our story, testimonials               |
| `/shop`  | Occasion baskets with cart, services, chatter, contact, testimonials        |
| `/admin` | Shop owner view: pickup orders (click a status to advance it) and products  |
| `*`      | 404 page                                                                    |

Shoppers add baskets to the cart, enter a name, phone, and pickup day, and reserve the order for
in-store pickup. The cart persists in `localStorage`.

## Product photos

The 13 starting products use photos in `public/products/` (WebP, 960×720), one per basket, named
after it (`sympathy-tea-basket.webp` and so on). They are AI-generated stand-ins that match each
basket's description until real photos of the shop's baskets are available.

To use a real photo, either replace the file in `public/products/` with one of the same name and
redeploy, or paste the photo's URL into the product's *Image URL* in `/admin`. Landscape 4:3 photos
fit the product cards best.

The landing-page background is `src/assets/chocolate-case.avif`, with a `.jpg` fallback for older
browsers.

## Data and admin access

The original runs on Base44's hosted backend. This replica has no server. `src/api/client.js`
stores products and orders in the browser's `localStorage`, starting from the inventory in
`src/data/products.js`, and uses the same `entities.Product` / `entities.Order` calls
(`list`, `create`, `update`). To connect a real backend, replace that one file.

`/admin` asks for an owner passcode. Set it with `VITE_ADMIN_PASSCODE` in a `.env` file. It defaults
to `wrapitup`. The check runs in the browser, so it doesn't protect anything on its own. Put real
authentication in front of the backend before launch.

Because the data lives in each visitor's browser, orders placed on one device don't show up in
another device's admin view until a shared backend is connected.

## Layout

```
src/
  api/client.js          localStorage-backed Product/Order entities + owner sign-in
  data/products.js       starting inventory
  lib/cart.js            cart store (useSyncExternalStore)
  lib/shop-info.js       address, phone, links, testimonials
  components/home/       Hero, Pathways, About
  components/shop/       ShopNav, OccasionSection, ProductCard, ServiceSection, BottomBar, CartDrawer
  components/            Testimonials, Footer, ScrollToTop
  pages/                 Home, Shop, Admin, NotFound
```

`lucide-react` is pinned to `0.475.0` because newer releases redraw several icons and drop the
Facebook icon the site uses.
