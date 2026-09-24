# Ardas Social Kitchen — website redesign

Marketing site for **Ardas Social Kitchen**, a local Indian restaurant.

- **Preview URL:** https://ardas.evaakselrad.com (NDA + access code)
- **Hosting:** Cloudflare Workers (static assets + edge gate)
- **Status:** Scaffold — full design and content plan coming soon.

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
