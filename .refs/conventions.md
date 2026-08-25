# Coding conventions & authoring rules

How code is written in this project. These are hard rules, not suggestions. This file is about **how to
author** code and where documentation lives.

## No comments in code

Code carries **no comments**. Do not:

- Explain a function with a comment above it.
- Annotate a line because it "might need documenting".
- Leave TODO/NOTE/why-notes inline.

If something needs explaining — a design-spec rule, a non-obvious decision, a
gotcha — it belongs in `.refs/`, **always**. The code says *what*; `.refs/`
says *why*. A comment is a signal that a `.refs/` entry is missing: write the
entry instead.

Name things well enough that the code reads without prose. Extract a
well-named function or variable instead of writing a comment.

## Documentation lives in `.refs/`

Every explanation of code behavior or design-spec rule goes in the matching
`.refs/` file (see [AGENTS.md](../AGENTS.md) for the map). When you add or
change a component, updating `.refs/architecture.md` is **part of the task**,
not a follow-up — the Operating Protocol in AGENTS.md is binding.

## Components must be reusable, and reused

The component library is built from **shared, reusable pieces**. One design
concept = one component (its own `src/components/<name>/` folder with
`<name>.tsx` + `<name>.spec.tsx` + `<name>.stories.tsx`), used everywhere that
concept appears. Do not reimplement the same behavior or interaction in two
places.

Before building something new, check whether an existing component already
does it (or nearly does it). If a near-match exists, **generalize and reuse
it** rather than copy-pasting a variant. If a piece is likely to appear again,
extract it to `src/components/` from the start.

Consistency is the goal: the same interaction should look and behave the same
everywhere a consumer of this library uses it.

## Design tokens only

Colors, spacing, radii and typography come from the CSS custom properties
declared in `src/style.css` (see `.refs/architecture.md` for the token map).
Components never hardcode a raw `oklch()`/hex value or a bespoke pixel size
for something a token already covers.
