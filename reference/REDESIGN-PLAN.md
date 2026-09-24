# Ardas Social Kitchen — redesign plan

**Source audit:** [ardasworld.com](https://ardasworld.com/) (WordPress + Elementor, “Coffeytea”-style theme, built by 2B Unique)  
**Preview / build target:** [ardas.evaakselrad.com](https://ardas.evaakselrad.com/) (Cloudflare Workers, NDA gate)  
**Assets archived:** `reference/images/` + `reference/image-manifest.json`  
**HTML snapshots:** `reference/pages*` (content extraction only; not for production)

---

## 1. Goals

| Goal | Why |
|------|-----|
| **Feel like Ardas, not a template** | Current site leans generic restaurant theme (stock icons, placeholder testimonials, demo-theme assets). |
| **Lead with mission + community** | Story (Guru’s → Ardas, charity, pay-what-you-wish buffet, Guru’s Guardian Angels) is the differentiator. |
| **Drive orders & visits** | Toast ordering/gift cards stay primary CTAs; hours/location/map always one tap away. |
| **Fast, accessible, mobile-first** | Heavy Elementor markup (~380KB menu page); target lightweight static/SSR site on Cloudflare. |
| **Own the brand** | Use real photography, consistent typography, no `demo.themexbd.com` assets. |

---

## 2. Audience & jobs to be done

- **Local diners** — hours, menu highlights, order pickup/delivery, directions.  
- **Buffet / value seekers** — pay-what-you-wish lunch story, what to expect.  
- **Catering & events** — inquiry path, capacity, sample menus.  
- **Community followers** — Guru’s legacy, nonprofit work, food truck appearances.  
- **Staff** — employment page (simple, dignified).

---

## 3. Current site inventory

### Primary navigation (keep, simplify labels)

| Item | Current URL | Notes |
|------|-------------|--------|
| About | `/about/` | Founders story, nonprofit, buffet + dinner positioning |
| Employment | `/employment/` | Sub-page under About today — can stay nested |
| Menu | `/menu/` | Very long on-page menu (100+ items); ❤️ = favorites |
| Order Online | Toast (canonical) | [https://order.toasttab.com/online/ardas-800-bustleton-pike](https://order.toasttab.com/online/ardas-800-bustleton-pike) — also `content/links.json` and `/order` on preview |
| Catering | `/catering/` | Event catering CTA |
| Gift Cards | Toast (canonical) | [https://order.toasttab.com/egiftcards/ardas-800-bustleton-pike](https://order.toasttab.com/egiftcards/ardas-800-bustleton-pike) — also `content/links.json` and `/gift-cards` on preview |
| Food Truck | `/food-truck/` | Events / mobile service |
| Gallery | `/portfolio-grid/` | Rename to **Gallery** in IA |
| Contact | `/contact/` | Address, phone, email, map |

### Core facts (carry forward)

- **Name:** Ardas Social Kitchen  
- **Address:** 800 Bustleton Pike, Richboro, PA  
- **Phone:** (267) 395-1001  
- **Email:** info@ardasworld.com  
- **Social:** [Facebook](https://www.facebook.com/p/Ardas-Social-Kitchen-61573273678349/), [Instagram](https://www.instagram.com/ardassocialkitchen/)  
- **Founders:** Ashni Kumar & Priya Trivedi (former Guru’s Indian Cuisine, Newtown)  
- **Programs:** Pay-what-you-wish vegetarian lunch buffet; Guru’s Guardian Angels (animals + meals for families in need)

### Homepage messages to preserve

1. Hero: *Warm Indian Flavors, Made From the Heart*  
2. Pillars: Indian favorites · Vegetarian lunch buffet · Catering  
3. Long-form “Ardas prayer” narrative (Guru’s → purpose → community)  
4. Social proof — **replace** template testimonials with real Google/Yelp quotes + names  
5. Persistent header: phone, email, social

### Menu structure (high level)

On-site menu is categorized (examples): appetizers/chaat, sauces/curries by protein, signatures, soups, vegetarian specialties, biryanis, breads, desserts, beverages — with heart-marked favorites. **Do not rebuild 10k lines of HTML**; prefer:

- **Phase 1:** Featured dishes + link to Toast / PDF / filtered menu  
- **Phase 2:** Structured menu data (JSON or CMS) generated from Toast export or one-time scrape

### Known quality issues on live site

- Template/demo images (`demo.themexbd.com`) still referenced  
- Testimonial names/titles look like theme placeholders (“Co-Founder”, “Marketing”)  
- Typos: “Execllent!!”, broken CTAs (`href="#"` on home feature cards)  
- `/gallery` URL in some contexts 404s — actual slug is `/portfolio-grid/`  
- SEO: good local title; opportunity for structured data (Restaurant, Menu, Hours)

---

## 4. Proposed information architecture (new site)

```
Home
├── Our story (About) — founders, Guru’s, nonprofit, buffet mission
├── Menu — featured + categories + “Order online” (Toast)
├── Visit — hours, map, parking, dine-in / takeout
├── Catering — packages, inquiry form (email or simple form worker)
├── Food truck — schedule + booking CTA
├── Gallery — masonry grid from archived photos
├── Contact — form + map embed
└── Employment — short page + PDF or email apply
```

**Global chrome:** Sticky header with **Order** (primary button), phone click-to-call, mobile bottom bar optional.

**Footer:** Address, hours, social, Toast gift cards, copyright, optional “Site by …”.

---

## 5. Creative direction (draft)

| Element | Direction |
|---------|-----------|
| **Mood** | Warm, family kitchen, spiritual without preachy — gold/amber accents on deep brown or charcoal (align with current logo treatment). |
| **Photography** | Real food + dining room + community; use `reference/images/` (dishes, interiors, catering). |
| **Typography** | One distinctive display face for “Ardas” + highly readable sans for body (avoid default system-only stack in final). |
| **Motion** | Subtle only — hero fade, menu category scroll; respect `prefers-reduced-motion`. |
| **Voice** | First-person plural, grateful, community-focused; shorten homepage wall of text into scannable sections + “Read full story”. |

---

## 6. Page-by-page build plan

### Phase A — Foundation (preview site)

1. **Design tokens** — color, type, spacing, button styles  
2. **Layout shell** — header, footer, responsive nav, meta/OG tags  
3. **Home** — hero, 3 pillars, story teaser, featured dishes, real testimonial strip, map strip  
4. **NDA gate** — already live; restyle to match new brand when shell exists  

### Phase B — Core pages

5. **Our story** — merge homepage long copy + About page founders/nonprofit content  
6. **Menu** — category nav + favorites grid; deep link to Toast for ordering  
7. **Visit / Contact** — hours table, Google Maps embed, click-to-call, mailto  
8. **Gallery** — lazy-loaded grid from archived images (+ alt text from filenames/dish names)  

### Phase C — Revenue & ops

9. **Catering** — hero, bullet packages, inquiry (Formspree, Worker email, or mailto)  
10. **Food truck** — copy from current page + CTA  
11. **Employment** — concise posting + contact  

### Phase D — Launch on production domain

12. **SEO** — LocalBusiness JSON-LD, sitemap, robots  
13. **Performance** — WebP/AVIF, responsive `srcset`, CF caching  
14. **Analytics** — privacy-conscious (e.g. Cloudflare Web Analytics)  
15. **Cutover** — `ardasworld.com` DNS to new host when approved; keep Toast URLs unchanged  

---

## 7. Technical approach (this repo)

| Piece | Choice |
|-------|--------|
| Hosting | Cloudflare Workers + static assets (existing) |
| Preview | `ardas.evaakselrad.com` + NDA gate + `SITE_PASSWORD` secret |
| Build | Start static HTML/CSS; optional Vite/11ty if pages multiply |
| Menu data | `content/menu.json` later; avoid embedding giant HTML |
| Images | `public/assets/` optimized copies from `reference/images/` |
| Forms | Worker proxy or third-party; no secrets in client |

---

## 8. Image archive (`reference/images/`)

**43 files** pulled from live site (full-size where possible). Highlights:

| Use | Files |
|-----|--------|
| Brand | `Ardas-White.png`, `Ard.png` |
| Hero / atmosphere | `Mixed.jpg`, `About_Ardas.jpg`, `video-bg-1.jpg`, `Ardas1–8`, `Ardas-A/B/C` |
| Food marketing | `Butter-Chicken.jpg`, `Korma.jpg`, `Daal-Tadka.jpg`, `Garlic-Naan1.jpg`, `Paneer-Lacha.jpg`, `mixed-Grill2.jpg`, etc. |
| Feature icons (interim) | `Bowl-1.png`, `Catering.png`, `Food-Truck.png` — replace with photo-led cards in redesign |
| UI chrome | `Address.png`, `Mail.png`, `Phone-300x300.png` — likely replace with SVG icons |

Provenance and URLs: `reference/image-manifest.json`.

**Note:** Images are from the restaurant’s public site for redesign reference; confirm licensing with owners before wider redistribution.

---

## 9. Content needed from client

- [ ] Confirmed **hours** (not consistently structured in scraped HTML)  
- [ ] Final **hero headline** (keep or evolve?)  
- [ ] **3–6 real testimonials** (name + optional photo permission)  
- [ ] **Catering** packages, minimums, lead time  
- [ ] **Food truck** calendar or booking process  
- [ ] **Employment** blurb / application method  
- [ ] **Favicon / logo** vector if available (PNG archived)  
- [ ] Approval to drop template/demo assets entirely  

---

## 10. Success metrics (post-launch)

- Mobile Lighthouse: Performance ≥ 90, Accessibility ≥ 95  
- Order Online CTR from header + home hero  
- Catering inquiries (form submits or mailto clicks)  
- Bounce rate on menu page vs. today (proxy via analytics)

---

## 11. Suggested next step

Build **Phase A** on the preview domain: home + shell using archived photography, one featured-menu section, and Toast CTAs — then review with the owners before migrating full menu and switching `ardasworld.com`.
