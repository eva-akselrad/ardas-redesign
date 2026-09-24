# Ardas Social Kitchen — website redesign

Marketing site for **Ardas Social Kitchen**, a local Indian restaurant.

- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Status:** Scaffold only — full design and content plan coming soon.

## Local preview

Open `public/index.html` in a browser, or serve the folder:

```bash
npx --yes serve public
```

## Deploy (Cloudflare)

After `wrangler login`:

```bash
npx wrangler pages deploy public --project-name=ardas-social-kitchen
```

Adjust the project name in the Cloudflare dashboard if needed.

## Repo

Local git repo at `ardas-redesign`. Add a remote when ready (GitHub, Cursor origin, etc.).
