# Four in a Row

Free Connect Four with local play and online rooms. The Cloudflare Worker serves the static site and validates room moves; a SQLite-backed Durable Object owns each room and relays real-time updates over WebSockets.

## Deploy to Cloudflare

Cloudflare Workers is the replacement for the previous Render deployment. No Render services or `render.yaml` are needed.

1. Create a Cloudflare account and connect it to GitHub, or install Node.js and use Wrangler from this repository.
2. In a terminal, run:

   ```sh
   cd worker
   npm install
   npx wrangler login
   npm run deploy
   ```

3. Wrangler prints the public `workers.dev` URL. The Worker serves both the site and `/api/room/*` and `/ws`; no URL edits are needed because `config.js` uses the current site origin.
4. Open that URL and test local play and online rooms from two separate browsers/devices.

To use Cloudflare's Git integration instead of the CLI, configure the Worker project with `worker/wrangler.toml`, deploy the Worker and SQLite Durable Object migration, and set the static asset directory to the repository root. The root `.assetsignore` excludes the server source and development files from the public asset upload.

## Local development

```sh
cd worker
npm install
npm run dev
```

Wrangler serves the site and emulates the Worker and Durable Objects locally. Open the local URL it prints; online rooms work in that local session.

## Limits and behavior

Rooms are isolated by room code and support two seats. The first player is Red and the second Yellow. Room state is authoritative in a Durable Object. Cloudflare Workers Free has daily request and Durable Object limits; requests beyond free limits can fail until the limits reset. Check the current Cloudflare plan and usage limits before publishing broadly.

## SEO

Update the canonical/OG URLs in `index.html`, plus `sitemap.xml` and `robots.txt`, after choosing a custom domain. The current placeholders should be replaced with the deployed Workers hostname before requesting indexing.
