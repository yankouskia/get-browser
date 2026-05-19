# Contributing to `get-browser`

Thanks for considering a contribution. This guide covers the dev loop, the
release model, and the conventions we follow.

## Prerequisites

- **Node.js** — active LTS (currently 20, 22, or 24).
- **pnpm** — installed automatically via Corepack: `corepack enable && corepack prepare pnpm@latest --activate`.

## Setting up the dev environment

```sh
git clone https://github.com/yankouskia/get-browser.git
cd get-browser
pnpm install
pnpm run build
pnpm test
```

Lefthook installs the git hooks on first `pnpm install`. If hooks ever get
out of sync, refresh them with `pnpm exec lefthook install`.

## The day-to-day loop

```sh
pnpm dev              # tsup --watch (rebuild on every save)
pnpm test:watch       # vitest in watch mode
pnpm test:coverage    # full coverage report — opens HTML in ./coverage/
pnpm run typecheck    # tsc --noEmit
pnpm run lint         # biome lint
pnpm run check        # lint + format check + import order
pnpm run validate     # publint + are-the-types-wrong
pnpm run docs         # regenerate API reference into docs/api/
pnpm run size         # bundle-size budget check
```

Use `pnpm run check --write` if you want Biome to auto-fix what it can.

## Conventional commits

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/).
The commit-msg hook enforces this — you'll see a friendly error if a message
isn't in the right shape.

Allowed prefixes: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `ci`,
`build`, `deps`, `perf`, `style`, `revert`. Add `!` after the prefix for a
breaking change, e.g. `refactor!: rename detect() to identify()`.

## Adding a changeset

Every user-facing change needs a changeset. Run:

```sh
pnpm exec changeset
```

…and pick the appropriate bump (patch / minor / major) plus a one-line
summary. Commit the generated `.changeset/*.md` file alongside your code
change.

The release workflow handles the actual version bump and `CHANGELOG.md`
update — don't edit those by hand.

## Tests

- Co-locate test fixtures in `test/fixtures.ts` — every UA string lives there
  so failures stay readable.
- Add a spec file per public function (`test/<feature>.test.ts`).
- For tricky generics or overloads, add a type-level spec
  (`test/*.test-d.ts`) with `expect-type` / `expectTypeOf`.
- Coverage threshold is **90%** lines/branches/functions/statements — if
  your change drops below, CI fails. Add tests, don't lower the threshold.

## Pull request expectations

- Branch from `master`.
- One logical change per PR. Prefer multiple small PRs over one big one.
- All status checks green: CI (Node 20/22/24 × Linux/macOS/Windows),
  CodeQL, bundle size, validate.
- A changeset is present when the change is user-visible.
- The PR description explains *why*, not just *what*.

## Code style

- Strict TypeScript only — `any` is a lint error.
- Prefer named exports over `export default`.
- Use `node:` import prefix for Node built-ins.
- Default to writing **no** comments; only add one where the *why* is
  non-obvious.

## Code of Conduct

This project follows the [Contributor Covenant 2.1](./CODE_OF_CONDUCT.md).
By participating, you agree to abide by its terms.
