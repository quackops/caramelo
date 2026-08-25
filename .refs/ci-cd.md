# CI/CD

GitHub Actions, three workflows in `.github/workflows/`.

- **`ci.yml`** — runs on every push to `main` (excluding tag pushes and
  doc-only changes) and on every pull request. Cancels in-progress runs for
  the same ref on a new push (`concurrency` + `cancel-in-progress`).
- **`cd.yml`** — triggered by a successful `CI` run on `main`/`next`/`rc`, or
  manual dispatch. Builds the package and runs `semantic-release`, which cuts
  the version bump, tag, changelog and npm publish from Conventional Commit
  history.
- **`storybook-deploy.yml`** — publishes the Storybook build.

Toolchain is pinned to Node 24 (matches `.tool-versions`) via
`actions/setup-node@v6`, and pnpm 10 via `pnpm/action-setup@v4`.

## Jobs (`ci.yml`)

- **`lint`** — `pnpm install`, `pnpm lint` (Biome + `tsc --noEmit` in
  parallel), `pnpm test` (Vitest). This is the gate everything else needs;
  `cd.yml` only runs after this job succeeds.
- **`visual-regression`** — `pnpm install`, `pnpm run build`, Storybook-based
  visual regression check.

## Release

`semantic-release` derives the version bump from commit `type`s
(`feat` → minor, `fix`/`chore`/etc → patch, `!`/`BREAKING CHANGE:` → major),
so the commit conventions in `.agents/skills/commit/SKILL.md` are load-bearing
for release correctness, not just style.

## Not set up yet

No signing or provenance step beyond npm's own `NPM_TOKEN` publish. No
canary/prerelease channel is wired up for the `next`/`rc` branches beyond
what `cd.yml`'s trigger already allows.
