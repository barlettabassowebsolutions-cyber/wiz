# Manolo's Rodizio & Seafood: site replica

A static rebuild of the homepage at
[manolosrodizioseafoodrestaurant.com](https://manolosrodizioseafoodrestaurant.com/). It uses the
same section order, layout, colors (`#101010` / `#FE3131`) and fonts (Playfair Display + Lora), and
it has the same behavior: sticky nav with an "Our Food" dropdown, a click-to-load map, FAQ
accordions, and the floating Call / Directions dock.

Plain HTML, CSS and JS, with no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
npx serve manolos
```

## Deploy to Netlify

- **Drag and drop:** drag the `manolos` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **From Git:** create a new Netlify project from this repo and set *Base directory* to `manolos`.
  `manolos/netlify.toml` tells Netlify there is nothing to build.

On Netlify, the reservation form is collected by Netlify Forms. Submissions show up under the
project's *Forms* tab. Anywhere else, the form shows the "please call us" message.

## What's the same and what's a stand-in

Matches the live site:

- Layout, spacing, colors, type and section order
- Business facts: name, address, phone, hours, Google rating (4.4 from 17 reviews), menu dishes,
  amenities, and the links to DoorDash, Grubhub, Facebook, Instagram, Yelp and Google

Stand-ins (swap these before launch):

| What               | Where                         | Why                                                         |
| ------------------ | ----------------------------- | ----------------------------------------------------------- |
| Photos             | `images/*.webp`               | The live site's photos are copyrighted. These are PDM/CC0 photos (see `CREDITS.md`). |
| Logo               | `images/logo.svg`             | Text wordmark. Replace with the restaurant's own logo file.  |
| Marketing copy     | `index.html`                  | Written fresh, not copied from the live site.               |
| Customer reviews   | `index.html`, "What Customers Say" | Placeholder cards. Paste in Google reviews once the restaurant approves quoting them. |
| Contact email      | `index.html` footer           | `info@example.com`. Use the restaurant's public email.      |
| Policy pages       | `legal.html`                  | Privacy, terms and accessibility text must come from the restaurant. |

To swap a photo, save the restaurant's photo over the file with the same name (for example
`images/clams.webp`). Landscape 4:3 photos fit the food cards best. The hero looks best at 1920px
wide or larger.

The live site has separate pages for About, Gallery, Reviews, FAQ, Menu, Contact and each food
category. This replica is the homepage only, so those nav links jump to the matching sections on
the page.
