# Architecture Decision Records

Lightweight ADRs for the v2 modernization. Most recent first.

---

## ADR-006 — Use `tsup` for the build

**Context.** We need dual ESM + CJS emit with type declarations, source maps, and
an additional UMD/IIFE bundle for `<script>` consumers. The source is ~150 lines
across ten tiny modules — no compile-time complexity warrants a custom Rollup
config.

**Decision.** Adopt `tsup` (esbuild under the hood). Single `tsup.config.ts`
emits ESM + CJS + `.d.ts` + sourcemaps + UMD/IIFE in one pass.

**Alternatives considered.**
- *Rollup directly* — more configuration knobs but no benefit here.
- *`tsc` project references only* — does not produce CJS+ESM dual output or UMD.
- *`unbuild`* — also great; chose tsup for its larger community footprint and
  built-in `watch`/`onSuccess` hooks.

**Consequences.** Locked into esbuild's downlevelling behavior for syntax (which
is fine — we target ES2022). Build is sub-second.

---

## ADR-005 — Use Biome instead of ESLint + Prettier

**Context.** Library is ~150 LOC. Setting up ESLint v9 flat config, Prettier,
and the half-dozen plugins called for in the brief is heavyweight for a project
this size and produces friction (multiple binaries, two configs, separate IDE
extensions, slower CI).

**Decision.** Adopt **Biome** for linting + formatting in a single binary.

**Alternatives considered.**
- *ESLint v9 (flat config) + `typescript-eslint` v8 + Prettier + plugins (unicorn,
  import-x, n, promise)* — recommended in the brief; rejected because the
  payoff is small for a tiny browser-detection lib.
- *Oxlint* — fast but the rule coverage and stability story is weaker than
  Biome as of late 2025.

**Consequences.** Lose some ESLint-only rules (e.g. `eslint-plugin-import-x`
order rules); Biome's built-in `style/useImportType`, `correctness`, and
`suspicious` rule families are sufficient here. If the project later grows or
the maintainer wants a richer rule set, swapping back to ESLint is straightforward.

---

## ADR-004 — Use pnpm

**Context.** The repo shipped with a Yarn 1 lockfile, which has been in
maintenance mode for years. We are regenerating the lockfile anyway.

**Decision.** Use **pnpm 9+** via Corepack. Pin in `packageManager`.

**Alternatives considered.**
- *Yarn Berry (PnP)* — adds friction for downstream contributors using common
  Node tooling that doesn't yet speak PnP.
- *npm* — works but pnpm has materially better install performance and a
  stricter dependency tree (catches phantom deps).

**Consequences.** Contributors need Corepack-aware Node (>=16.10) or to install
pnpm explicitly. Documented in `CONTRIBUTING.md`.

---

## ADR-003 — Keep public API stable; bump major only for output-shape changes

**Context.** Existing consumers depend on `browsers`, `detect()`, `isMobile()`,
and the per-browser `isX()` predicates being available from the package root.

**Decision.** Preserve all named exports exactly as published in 1.0.2. The
v2 major bump is justified by:
1. UMD bundle no longer the package entry (now under `dist/umd/`).
2. `isX()` predicates now return strict `boolean` (some previously returned
   truthy values).
3. Chromium-based Edge is now detected as `edge` (was `chrome`).
4. Drop of EOL Node from `engines`.

**Alternatives considered.** Cutting underused predicates (e.g. `isIE`) — kept
for compatibility; deprecation can happen in v3.

**Consequences.** Documented in `BREAKING_CHANGES.md`. Consumers using ESM/CJS
imports require no changes.

---

## ADR-002 — Allow injected `userAgent` for SSR / testability

**Context.** Original detectors read `window.navigator` directly. That makes
them unusable on the server (Next.js, Remix, Astro SSR) and harder to test
without a DOM.

**Decision.** Each detector accepts an optional `{ userAgent, vendor, navigator }`
options object. When omitted, it falls back to `globalThis.navigator?.userAgent`
and friends. Returns `false` cleanly when neither is available, instead of
throwing.

**Alternatives considered.** Two parallel sets of APIs (`isChromeFromUA(ua)`
and `isChrome()`). Rejected — single API with optional argument is cleaner.

**Consequences.** All detectors are now SSR-safe by default.

---

## ADR-001 — Single-branch trunk-style modernization on `modernize/v2`

**Context.** Per the brief, either feature-branch-per-phase or a single
`modernize/v{next-major}` branch. The repo has no active concurrent work.

**Decision.** Single `modernize/v2` branch, one commit per logical change,
conventional-commits style.

**Alternatives considered.** PR-per-phase. Adds review overhead with no
benefit since there are no other maintainers.

**Consequences.** History is easy to review as a linear log; the final
merge to `master` is one fast-forward or merge commit at the maintainer's
discretion.
