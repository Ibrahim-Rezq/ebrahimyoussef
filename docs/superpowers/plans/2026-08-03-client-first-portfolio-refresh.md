# Client-First Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a production-grade, client-first portfolio for startups and small businesses at `https://ebrahimyoussef.com` from the repository's primary `main` branch.

**Architecture:** Keep Astro's static output and reorganize the single page into focused, server-rendered Astro sections backed by typed content modules. Preserve the existing React game as a deferred island below the commercial journey, and deploy the generated `dist` directory through the existing Cloudflare Pages project.

**Tech Stack:** Astro 7, React 19, TypeScript 6, Vitest 4, static HTML/CSS, Cloudflare Pages

## Global Constraints

- Primary audiences: startup teams needing product/frontend work and small businesses needing complete websites.
- Primary actions: `Email me about a project` and `Book a call`; a verified booking URL or explicitly approved named fallback is required before release.
- Do not invent testimonials, client outcomes, metrics, contributions, or performance claims.
- Preserve the EY monogram, sand/terracotta/gold palette, restrained Arabic geometric motif, and quiet self-taught-developer note.
- Build with `pnpm build`; Cloudflare Pages publishes `dist` from `main`.
- Meet WCAG 2.2 AA contrast, keyboard access, visible focus, reduced-motion support, and no horizontal overflow at 320, 375, 768, 1024, and 1440 CSS pixels.
- A broken primary CTA, featured-project link, or internal anchor blocks release.

---

## File map

- `src/data/site.ts`: canonical identity, contact, booking, navigation, services, process, and metadata copy.
- `src/data/products.ts`: verified selected-work entries and their evidence links.
- `src/components/SiteHeader.astro`: compact branded navigation.
- `src/components/Hero.astro`: client thesis and the two primary actions.
- `src/components/SelectedWork.astro`: commercial proof from verified products.
- `src/components/Services.astro`: three recognizable client service categories.
- `src/components/Process.astro`: four-step engagement process.
- `src/components/About.astro`: concise personal brand and developer-learning note.
- `src/components/GameFeature.astro`: supporting wrapper around the deferred React game trigger.
- `src/components/Contact.astro`: repeated email and booking conversion actions.
- `src/components/Footer.astro`: compact identity and external links.
- `src/pages/index.astro`: approved section order only.
- `src/layouts/BaseLayout.astro`: complete metadata, structured data, and shared document shell.
- `src/styles/global.css`: tokens, shared layout primitives, accessibility, responsive behavior, and restrained motion.
- `tests/content.test.ts`: typed content invariants, CTA validity, unique anchors, and featured-link validity.
- `scripts/verify-build.mjs`: inspect generated HTML, metadata, sitemap, anchors, and static assets.
- `wrangler.jsonc`: reproducible Pages output configuration for direct inspection/deployment tooling.
- `README.md`: exact local build and Cloudflare Pages release settings.

### Task 1: Lock verified content and release prerequisites

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/data/products.ts`
- Create: `tests/content.test.ts`

**Interfaces:**
- Produces: `SITE.bookingUrl`, `SITE.navigation`, `SITE.services`, `SITE.process`; `Product.problem`, `Product.contribution`, `Product.result`, and `Product.featured`.
- Consumes: verified public NABD, Quran Unified API, email, social, and booking destinations.

- [ ] **Step 1: Record external prerequisites**

Run `git status --short --branch`, `git remote -v`, `gh auth status`, and the available Cloudflare/Wrangler authentication check. Record the Cloudflare Pages project name, current production branch, custom-domain state, and canonical origin in the task notes. Do not mutate remote state.

- [ ] **Step 2: Verify candidate evidence**

Open the NABD application and repository, Quran Unified API documentation and repository, current production site, GitHub profile, LinkedIn profile, and Qabilah profile. Retain only problem, contribution, and result statements directly supported by visible source or user-provided facts. Check final HTTP status and redirect destinations.

- [ ] **Step 3: Resolve the booking requirement**

Configure the real booking URL supplied or confirmed by the user. If none exists, stop only the booking-dependent release step and request explicit approval for the named fallback `mailto:ebrahimamin391@gmail.com?subject=Schedule%20a%20discovery%20call`; do not silently select it.

- [ ] **Step 4: Write failing content invariants**

Create `tests/content.test.ts` with Vitest assertions that the site URL is HTTPS, email is non-empty, booking is an HTTPS URL or the explicitly approved `mailto:` fallback, navigation anchors are unique, service/process arrays have exactly three/four entries, featured work has external evidence, and no item contains placeholder copy such as `coming soon`, `TBD`, or `TODO`.

- [ ] **Step 5: Run the focused test and confirm failure**

Run `pnpm vitest run tests/content.test.ts`. Expected: failure because the new site and product fields do not exist.

- [ ] **Step 6: Implement the typed content model**

Update `src/data/site.ts` and `src/data/products.ts` with the approved client-first hero, contact actions, navigation, services, process, personal note, and verified selected-work fields. Remove unsupported or placeholder copy.

- [ ] **Step 7: Run focused and existing tests**

Run `pnpm vitest run tests/content.test.ts` and `pnpm test`. Expected: all tests pass.

- [ ] **Step 8: Commit**

Run `git add src/data/site.ts src/data/products.ts tests/content.test.ts && git commit -m "feat: define client-first portfolio content"`.

### Task 2: Build the client journey

**Files:**
- Create: `src/components/SiteHeader.astro`
- Modify: `src/components/Hero.astro`
- Create: `src/components/SelectedWork.astro`
- Create: `src/components/Services.astro`
- Create: `src/components/Process.astro`
- Create: `src/components/About.astro`
- Create: `src/components/GameFeature.astro`
- Create: `src/components/Contact.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Delete after replacement: `src/components/Proof.astro`, `src/components/Products.astro`, `src/components/DevLogs.astro`, `src/components/Socials.astro`

**Interfaces:**
- Consumes: typed values from `SITE` and `products`; `GameDrawer` remains the existing interactive island.
- Produces: anchors `work`, `services`, `process`, `about`, `play`, and `contact`; one `<h1>`; repeated valid email and booking actions.

- [ ] **Step 1: Add build-level structure assertions**

Extend `tests/content.test.ts` with expected navigation anchor names and CTA labels so component implementation cannot drift from centralized content.

- [ ] **Step 2: Implement semantic sections**

Build each listed Astro component with a single responsibility. Use semantic `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks; keep exactly one page-level heading; give external links safe `rel` values; provide explicit accessible labels for icon-only marks; and render the game trigger only inside `GameFeature` below About.

- [ ] **Step 3: Replace the page composition**

Set `src/pages/index.astro` order to `SiteHeader`, `Hero`, `SelectedWork`, `Services`, `Process`, `About`, `GameFeature`, `Contact`, and `Footer`. Hydrate `GameDrawer` with `client:idle` only.

- [ ] **Step 4: Remove obsolete sections**

Delete the four replaced components only after `rg` confirms no remaining imports. Do not alter game logic.

- [ ] **Step 5: Check the page**

Run `pnpm check` and `pnpm build`. Expected: zero errors and a generated `dist/index.html`.

- [ ] **Step 6: Commit**

Run `git add src/components src/pages/index.astro tests/content.test.ts && git commit -m "feat: build client-first portfolio journey"`.

### Task 3: Apply the distinctive production visual system

**Files:**
- Modify: `src/styles/global.css`
- Modify: all new section components from Task 2
- Modify: `src/components/Arabesque.astro` only if required to reduce decorative repetition

**Interfaces:**
- Consumes: existing color tokens, Rubik variable font, Monogram, and Arabesque.
- Produces: shared `.wrap`, `.section`, `.eyebrow`, `.button`, `.button-primary`, `.button-secondary`, `.section-heading`, and responsive grid primitives.

- [ ] **Step 1: Consolidate design tokens**

Retain the existing brand colors and establish explicit max-width, spacing, type-scale, border, focus, and motion tokens. Ensure body and control pairs meet WCAG AA; reserve decorative gold/terracotta values that fail small-text contrast for non-text use.

- [ ] **Step 2: Implement the editorial layout**

Make the hero left-aligned with controlled line length, clear CTA priority, a compact sticky-or-static header chosen based on overlap testing, wide project evidence, quiet service/process surfaces, and one restrained arabesque hero backdrop. Avoid repeated generic card grids where a list or split layout communicates hierarchy better.

- [ ] **Step 3: Implement responsive and interaction states**

Support 320px upward without horizontal overflow, 44px minimum interactive targets, `:focus-visible`, hover only inside hover-capable media queries, and reduced-motion overrides that disable nonessential transforms and smooth scrolling.

- [ ] **Step 4: Run static checks**

Run `pnpm check`, `pnpm test`, and `pnpm build`. Expected: all pass.

- [ ] **Step 5: Commit**

Run `git add src/styles/global.css src/components && git commit -m "style: refine the EY client portfolio system"`.

### Task 4: Complete metadata and deterministic build verification

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `scripts/verify-build.mjs`
- Modify: `package.json`
- Create: `wrangler.jsonc`
- Modify: `README.md`

**Interfaces:**
- Produces: `pnpm verify`; canonical metadata; Open Graph/Twitter tags; `Person` and `WebSite` JSON-LD; Wrangler Pages output declaration.

- [ ] **Step 1: Write the failing build verifier**

Create `scripts/verify-build.mjs` using Node built-ins to fail unless `dist/index.html`, `dist/sitemap-index.xml`, `dist/robots.txt`, `dist/og.png`, favicon assets, the canonical URL, description, Open Graph/Twitter fields, JSON-LD types, approved hero text, CTA labels, and every declared internal anchor exist. Check that `dist/index.html` contains no `TBD`, `TODO`, `coming soon`, or empty `href`.

- [ ] **Step 2: Add the verification command**

Add `"verify": "pnpm test && astro check && astro build && node scripts/verify-build.mjs"` to `package.json` and run `pnpm verify`. Expected: failure on incomplete metadata/content requirements before the layout update.

- [ ] **Step 3: Complete metadata**

Update `BaseLayout.astro` with the approved client title/description, canonical URL, complete Open Graph and Twitter metadata including alt text, and `Person` plus `WebSite` schema values generated from `SITE`.

- [ ] **Step 4: Add Cloudflare Pages configuration**

Create `wrangler.jsonc` with project name `ebrahimyoussef`, current deployment-date compatibility date, and `pages_build_output_dir: "./dist"`. Do not add the Cloudflare Astro runtime adapter because output remains static.

- [ ] **Step 5: Document exact release settings**

Update `README.md` with Node/pnpm requirements, `pnpm verify`, production branch `main`, build command `pnpm build`, output `dist`, canonical domain, and Cloudflare access prerequisites.

- [ ] **Step 6: Verify and commit**

Run `pnpm verify`, then `git add src/layouts/BaseLayout.astro scripts/verify-build.mjs package.json pnpm-lock.yaml wrangler.jsonc README.md && git commit -m "chore: verify static Cloudflare production builds"`.

### Task 5: Browser, accessibility, and link release audit

**Files:**
- Modify only files implicated by verified failures.

**Interfaces:**
- Consumes: production build served locally.
- Produces: evidence for responsive, keyboard, link, and Lighthouse acceptance criteria.

- [ ] **Step 1: Start the project server in required background mode**

Run `pnpm astro dev --background`, then `pnpm astro dev status`. Use `pnpm astro dev logs` for failures and `pnpm astro dev stop` after review.

- [ ] **Step 2: Inspect named viewports**

Use browser automation at 320x800, 375x812, 768x1024, 1024x768, and 1440x900. Confirm no horizontal document overflow, clipped text, overlap, or obscured controls; capture mobile and desktop screenshots for visual review.

- [ ] **Step 3: Complete keyboard and reduced-motion paths**

Navigate header, both hero CTAs, project links, game trigger and drawer, contact CTAs, and footer by keyboard. Confirm visible focus, logical order, Escape/close behavior for the drawer, and no nonessential movement with reduced motion enabled.

- [ ] **Step 4: Validate links**

Check all internal anchors and `mailto:` values locally. For HTTP(S) links, follow redirects and require final status 200–399 at the intended destination. Fix every broken primary or featured link before release.

- [ ] **Step 5: Run Lighthouse**

Run Lighthouse against the local production preview/mobile profile and require at least 90 in Performance, Accessibility, Best Practices, and SEO before publishing any speed claim. Fix actionable regressions and repeat.

- [ ] **Step 6: Run the complete gate and commit fixes**

Run `pnpm verify` and `git diff --check`. Commit only verified audit fixes with `git commit -m "fix: resolve portfolio release audit findings"`; skip the commit if no files changed.

### Task 6: Integrate, deploy, and prove production

**Files:**
- No planned source changes; documentation may be corrected if deployment settings differ from verified Cloudflare state.

**Interfaces:**
- Consumes: clean, verified feature branch and authenticated GitHub/Cloudflare access.
- Produces: matching local `main`, `origin/main`, Cloudflare production deployment, and working `https://ebrahimyoussef.com`.

- [ ] **Step 1: Record and synchronize safely**

Record `git status --short --branch` and the feature SHA. Fetch `origin`, inspect divergence, and merge `origin/main` into the feature branch if required. Never rewrite published history or discard unrelated work.

- [ ] **Step 2: Re-run the full gate on the integration candidate**

Run `pnpm install --frozen-lockfile` and `pnpm verify`. Expected: all tests, check, build, and deterministic build verification pass.

- [ ] **Step 3: Merge into the primary branch**

Switch to `main`, fast-forward from `origin/main`, merge `feat/brand-hub-v1` without squashing or rewriting history, and run `pnpm verify` again. Record the merged `main` SHA.

- [ ] **Step 4: Push and observe Cloudflare**

Push `main` to `origin`. Inspect the Cloudflare Pages production deployment until it reports success for the exact merged SHA. If Git integration is unavailable but authenticated direct upload is explicitly part of the existing project workflow, deploy the verified `dist` without changing the production branch contract.

- [ ] **Step 5: Verify the canonical production URL**

Require successful HTTPS responses for `/`, `/og.png`, `/favicon.svg`, `/robots.txt`, and `/sitemap-index.xml`; correct canonical redirects; the approved hero text; valid email and booking actions; and representative Astro assets. Run a production Lighthouse check and link smoke test.

- [ ] **Step 6: Prove commit alignment**

Confirm local `main`, `origin/main`, and the Cloudflare deployment identify the same commit. Record the production URL, deployment ID, commit SHA, and verification results in the final handoff.
