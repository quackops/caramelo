# Agent Instructions

## .refs — feature & architecture notes

Working references for how this project is built. Code is the truth; these
explain the *why* and the gotchas.

- [conventions.md](./.refs/conventions.md) — authoring rules: **no comments in
  code** (docs go in `.refs/`), reusable-component discipline. Read first.
- [architecture.md](./.refs/architecture.md) — stack, layout, design system,
  extension points, conventions.
- [theming.md](./.refs/theming.md) — the `caramelo`/`pawee` theme system:
  how `CarameloProvider` and the token layer work together, where each
  theme's values come from, and known fidelity gaps.
- [ci-cd.md](./.refs/ci-cd.md) — CI/CD pipeline: jobs, toolchain pin, what's
  not set up yet.
- [incidents/](./.refs/incidents/README.md) — postmortems + standing rules;
  **read before any migration or destructive op**.

Add more `.refs/` files as the project grows a subsystem worth explaining —
one file per concern, linked from this list.

## Operating Protocol

*The Self-Maintaining Loop:* If you create a new feature, make changes to an
existing one, or modify app lifecycle process, *your final task before
completing the job is to update the corresponding markdown file in the
`.refs/` directory*. The documentation must perfectly reflect the code in the
app.
