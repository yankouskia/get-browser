# Changesets

This directory holds [Changesets](https://github.com/changesets/changesets) —
one Markdown file per noteworthy change, written in the same PR that introduces
the change.

## Adding a changeset

```sh
pnpm exec changeset
```

The CLI prompts for the bump (patch / minor / major) and a short summary. The
generated file is committed alongside the code change.

## On merge to `master`

The release workflow either:

1. Opens or updates a **"Version Packages"** PR collecting the unreleased
   changesets, bumping `package.json`, and updating `CHANGELOG.md`; or
2. If that PR was just merged, publishes the new version to npm with
   provenance attestation enabled.

That means **don't manually edit `CHANGELOG.md` or bump the version** — the
release flow does it.

See `.changeset/config.json` for the changeset configuration.
