# Dataxera Sdn Bhd — Corporate Website (`dataxera.github.io`)

Official corporate website for **Dataxera Sdn Bhd** and the **Dataxera Product Suite**, hosted on GitHub Pages.

## Site Structure

- **`index.html`** — Corporate Home & Product Suite Hub for **Dataxera Sdn Bhd**, featuring the product suite directory, corporate value pillars, **Enterprise Entity 360** solutions (**Natural Disaster 360**, **Customer 360**, **HR 360**, **Asset & Vendor 360**), and **Community Edition / Enterprise Edition** (`8x5` & `16x5` SLA).
- **`products/citadel/index.html`** — Dedicated product page for **[Dataxera Citadel](https://github.com/dataxera/citadel)**, detailing the 8 integrated open-source engines, Entity 360 solutions, Phase 1–4 roadmap, deployment flexibility, and Enterprise Edition support.
- **`index.css`** & **`app.js`** — Shared design system (`#141c29` Slate-Navy & `#108d87` Teal) and interactive logic shared across the corporate hub and all product pages.
- **`assets/`** — Official Dataxera and Dataxera Citadel logo assets.

## Adding a New Product Page

1. Create a new directory under `products/<product-slug>/index.html` using `products/citadel/index.html` as a template (referencing `../../index.css`, `../../app.js`, and `../../assets/`).
2. Add a `.product-suite-card` entry in the `#products` `.suite-grid` section of `index.html` linking to `products/<product-slug>/index.html`.
