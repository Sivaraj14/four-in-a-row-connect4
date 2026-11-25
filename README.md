# Four in a Row

A responsive Connect Four game with offline same-device play and optional two-player online rooms.

## Run locally

Local mode works by opening `index.html` directly. To try online mode, run the server:

```sh
cd server
npm install
npm start
```

Then temporarily set `CONNECT4_SERVER_URL` in `config.js` to `http://localhost:3001` and serve the project directory over HTTP (for example, `npx serve .`). Restore the public URL before publishing. The server uses in-memory rooms; rooms are temporary and are removed after both players leave or a disconnected seat has been idle for one minute.

## Deploy

The included `render.yaml` describes a Render web service for Socket.IO and a static site. The client defaults to `https://four-in-a-row-server.onrender.com`, and CORS allows `https://four-in-a-row-site.onrender.com`. Deploy this directory as a Render Blueprint, then check the actual service URLs:

1. If Render assigned different URLs, set the server's `ALLOWED_ORIGINS` environment variable to the exact public site origin and update `CONNECT4_SERVER_URL` in `config.js` to the server's HTTPS URL, then redeploy the static site.
2. Confirm the server `/health` endpoint responds and create a room from two separate browsers/devices.

The static client derives secure WebSocket connections from the HTTPS server URL. No database, registration, or secrets are required. Render's free services may sleep when idle, causing the first connection to take longer while the backend wakes.

## Rules

The board and turn rules are in `game-logic.js`. Online moves are independently checked and applied by the server. A room holds at most two player identities; the first player is Red and the second Yellow. Player identity is kept in browser local storage for reconnects.
