# ebrahimyoussef.com

Personal site for Ebrahim Youssef. One page: an intro, proof of work, product
links, dev-log placeholder, socials, and a playable Islamic figures game
built into the page itself, no separate app or route.

The game: seven rounds per session, tap-to-answer or write-the-name-in-Arabic
modes, a share card rendered to canvas, and a daily streak kept in
localStorage.

## Stack

- Astro 7, static output, no server.
- One React island: the game drawer. It hydrates on idle and its code is
  split from the rest of the page, so playing the game costs nothing until
  someone opens it.
- Plain CSS with a small custom-property token system. No Tailwind, no
  CSS-in-JS.
- Vitest covers the game's pure logic: Arabic answer matching, the game
  state reducer, and the streak calculation.

## Requirements

Node 22.12 or newer, pnpm.

## Commands

```
pnpm install   # install dependencies
pnpm dev       # local dev server at localhost:4321
pnpm build     # production build to ./dist
pnpm test      # run the Vitest suite
pnpm check     # astro check (types, a11y hints)
pnpm icons     # regenerate favicons and og.png from assets/brand/
```

## Deploy

Cloudflare Pages builds and deploys the `main` branch automatically on
push. Other branches don't deploy.
