# ebrahimyoussef.com

Client-first portfolio for Ebrahim Youssef, a front-end engineer and product builder. The static site presents selected work, services, process, personal context, direct contact routes, and an optional Islamic figures game.

## Stack

- Astro 7 with static output.
- One deferred React island for the game drawer.
- TypeScript, plain CSS, and a small brand token system.
- Vitest for game logic and portfolio content invariants.
- Deterministic build verification for rendered structure, metadata, sitemap, and assets.

## Requirements

- Node.js 22.12 or newer.
- pnpm 11 or newer.

## Local development

```sh
pnpm install --frozen-lockfile
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

## Quality gate

```sh
pnpm verify
```

This runs the complete Vitest suite, Astro diagnostics, the production build, and the generated-output verifier.

## Cloudflare Pages

The production project uses:

- Production branch: `main`
- Build command: `pnpm build`
- Build output directory: `dist`
- Canonical domain: `https://ebrahimyoussef.com`
- Required environment variables: none

`wrangler.jsonc` mirrors the static output directory for authenticated Wrangler inspection or direct-upload workflows. Normal production delivery should remain connected to the GitHub `main` branch so Cloudflare can associate each deployment with its source commit.

Before release, verify GitHub push access, Cloudflare account/project access, the custom-domain and DNS state, and the production deployment's commit SHA. A release is complete only when the canonical domain serves the merged `main` build and the public smoke checks pass.

## Brand assets

Run `pnpm icons` to regenerate favicon and social image assets from `assets/brand/`.
