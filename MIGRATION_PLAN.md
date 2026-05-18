# Migration Plan — `get-browser` v2

> Living document. Updated as each phase completes.

## What this package does

`get-browser` is a tiny browser-environment detection library. It inspects
`window.navigator` (and a couple of globals like `window.chrome` / `window.opr`)
to answer two questions: **which browser engine is this running in** (Chrome,
Firefox, Safari, Edge, IE, Opera, Android WebView), and **is this a mobile
device**. The public API is a small set of `isX()` predicates plus a `detect()`
function that returns a single canonical browser name from the `browsers` enum.
Consumers use it client-side to gate features or render browser-specific UI.

## Current state snapshot (pre-modernization)

| Aspect | State |
| --- | --- |
| Last release | `1.0.2`, ~7 years stale on npm |
| Language | Plain ES2015 JavaScript, no type definitions |
| Source files | 10 in `src/` (one module per detector) |
| Build | Webpack 4 + Babel 7 → UMD bundle per entry in `dist/` |
| Module system | UMD output, ES module source, browser global named `browser` |
| Node `engines` | Not declared |
| Tests | **None** |
| Linter | **None** |
| Formatter | None (only `.editorconfig`) |
| CI | **None** (no `.github/` directory; abandoned Dependabot PRs on remote) |
| Docs | README only |
| Public API | `browsers`, `detect`, `isMobile`, `isAndroid`, `isChrome`, `isEdge`, `isFirefox`, `isIE`, `isOpera`, `isSafari` |
| Coverage baseline | 0% (no tests existed) |

### Latent bugs found during recon

1. `is-chrome.js`: `chrome !== 'undefined'` compares an object to the string `"undefined"` — always truthy. Likely meant `typeof chrome !== 'undefined'`.
2. `is-edge.js`: only matches legacy `Edge/` UA token, misses Chromium-based Edge (`Edg/`, shipped 2020).
3. `is-opera.js` / `is-safari.js`: return truthy values rather than strict booleans.
4. `is-mobile.js`: regex is from a 2012-vintage `detectmobilebrowsers.com` snippet, but accurate enough; will keep with minor cleanup.

All four are fixed in Phase 3 and documented in `BREAKING_CHANGES.md`.

## Target state (post-modernization)

| Aspect | Target |
| --- | --- |
| Version | `2.0.0` (major bump — see `BREAKING_CHANGES.md`) |
| Language | TypeScript 5.x, strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` |
| Module strategy | Dual ESM + CJS via `exports` map, with `.d.ts` for both conditions; UMD/IIFE bundle alongside for `<script>` usage |
| Node `engines` | Active LTS only (>= 20) |
| Build | `tsup` (zero-config dual emit + types + sourcemaps + UMD) |
| Test runner | Vitest with jsdom + happy-dom matrix, `@vitest/coverage-v8` |
| Coverage threshold | ≥90% lines/branches |
| Lint + format | **Biome** (one binary, fast — see `DECISIONS.md`) |
| Package validation | `publint` + `@arethetypeswrong/cli` |
| Release | Changesets |
| CI | GitHub Actions: `ci.yml`, `release.yml`, `docs.yml`, `codeql.yml` |
| Docs site | TypeDoc → `docs/`, published to GitHub Pages |
| Public API | **Preserved** plus optional `userAgent`/`navigator` injection for SSR/testability |
| Provenance | `publishConfig.provenance: true`, OIDC-based publish from CI |

## Phase plan

- [x] **Phase 0 — Recon.** Read entire repo, write this plan, establish baseline. *(done)*
- [ ] **Phase 1 — Foundation.** Branch, package.json hygiene, tsconfig, dual exports, pnpm lockfile, `.nvmrc`/`.node-version`.
- [ ] **Phase 2 — Dependencies.** Drop Webpack 4 / Babel 7 / babel-loader. New devDeps: typescript, tsup, vitest, @biomejs/biome, @changesets/cli, typedoc, jsdom/happy-dom, publint, @arethetypeswrong/cli, size-limit.
- [ ] **Phase 3 — Code.** Port `src/*.js` → `src/*.ts`, fix bugs from recon, return strict booleans, allow injected UA for SSR/tests, add typed `Browser` union.
- [ ] **Phase 4 — Tooling.** Biome config, tsup config, scripts, pre-commit (simple-git-hooks + lint-staged).
- [ ] **Phase 5 — Tests.** Unit tests per detector with curated UA fixtures, `detect()` integration, type tests, ≥90% coverage threshold.
- [ ] **Phase 6 — CI.** Four workflows above + dependabot.yml; pin third-party actions to SHAs.
- [ ] **Phase 7 — Docs.** README rewrite, TypeDoc, CONTRIBUTING / CODE_OF_CONDUCT / SECURITY / CHANGELOG / `.github/` templates.
- [ ] **Phase 8 — Hygiene.** `.gitignore`/`.gitattributes`, examples/, size-limit, clean-install verification.
- [ ] **Phase 9 — Verify.** install → typecheck → lint → test → build → publint → attw → pack-dry-run, all green.

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Existing UMD consumers relying on `window.browser` global | Medium | Medium | Ship a UMD/IIFE bundle alongside dual ESM+CJS, with a clear note in `BREAKING_CHANGES.md`. |
| Boolean truthy-vs-strict change breaks a consumer | Low | Low | Documented in `BREAKING_CHANGES.md`; truthy values still coerce identically in `if`/`&&`/`\|\|` contexts. |
| Edge detection change (now matches Chromium-Edge) reports edge where it used to report chrome | Low | Medium | Documented in `BREAKING_CHANGES.md`; major bump signals it. |
| Dependabot PRs on the deprecated Webpack toolchain remain in remote | Low | None | The whole Webpack toolchain is removed; those PRs become irrelevant on `master`. Maintainer can close them post-merge. |
| Secrets in history | Unknown | High | Run `gitleaks` in Phase 8; do not rewrite history. |
