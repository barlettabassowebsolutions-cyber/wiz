# Wrapping It Up — "Baskets" page redesign

A redesign of [wrappingitup.biz/copy-of-shop-products-online](https://www.wrappingitup.biz/copy-of-shop-products-online).
The text, menu, links, images and their order are the same as the original page. Only the design and layout changed.

```
redesign/
  index.html     the page, with its CSS and JavaScript inline
  images/        the client's original images as WebP
```

Open `index.html` in a browser, or serve the folder with `npx serve redesign`.

## What maps to what

| Original (Wix)                                  | Redesign                                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| Striped header with bow and the three headings  | Hero card. The headings sit on a frosted panel over the bow artwork    |
| Lime vertical menu on the left                  | Sticky sidebar on desktop. On phones and tablets it's a slide-in menu. Submenus open with the chevron |
| Product gallery (Movie Night Basket)            | Product card with Quick View (a dialog) and Add to Cart                |
| Second basket photo (387.jpg)                   | Below the product, on a striped mat                                    |
| Striped footer with bow and phone number        | Footer banner with a tap-to-call button, plus the main menu links      |

## Notes

- **Brand colours** come from the original site: lime `#BECC5A`, pale lime `#DFEB97`, olive `#4C5224`
  and black. They're defined as CSS variables at the top of the `<style>` block.
- **Fonts:** Bricolage Grotesque for headings and Inter for body text, both from Google Fonts.
- **Links** still point to the live wrappingitup.biz pages. *Add to Cart* opens the product's page in the
  current store. Point these at the new store's URLs when the site moves.
- **Social icons:** the original page has no social links, so none were added.
- **Accessibility text** that isn't visible on the page: a "Skip to content" link that appears on
  keyboard focus, labels for icon buttons (Menu, Close, submenu toggles), and alt text on both
  product photos.
- **Header artwork** is 1000 px wide, so it looks soft on large and high-density screens. A higher
  resolution version from the client would sharpen the hero.
- Without JavaScript, the menu shows fully expanded and everything else still works except Quick View.
