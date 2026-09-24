# Ardas Social Kitchen — website redesign

Marketing site for **Ardas Social Kitchen**, a local Indian restaurant.

- **Preview URL:** https://ardas.evaakselrad.com (NDA + access code)
- **Hosting:** Cloudflare Workers (static assets + edge gate)
- **Status:** Scaffold on preview; full redesign plan in [`reference/REDESIGN-PLAN.md`](reference/REDESIGN-PLAN.md).

## Local dev

```bash
npm install
# Set preview password for local gate (optional; create .dev.vars with SITE_PASSWORD=...)
npm run dev
```

## Deploy

```bash
npm run deploy
```

Set or rotate the preview access code (Worker secret, not in git):

```bash
npx wrangler secret put SITE_PASSWORD
```

## Gate

When `NDA_ENABLED` is `true`, visitors must accept the confidentiality notice and enter `SITE_PASSWORD` before viewing the site. Cookies last 14 days on the preview domain.

## External links (canonical)

| Action | URL |
|--------|-----|
| Order online | https://order.toasttab.com/online/ardas-800-bustleton-pike |
| Gift cards | https://order.toasttab.com/egiftcards/ardas-800-bustleton-pike |

Source of truth: `content/links.json`. On the preview site, `/order` → order online and `/gift-cards` → gift cards (Toast).
