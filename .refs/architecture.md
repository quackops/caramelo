# Architecture

Caramelo is a React 19 + Tailwind v4 component library implementing the
Caramelo design system: two 12-step OKLCH color scales (a warm `caramelo` hue
and a cool `gray` hue), semantic token aliases on top of them, and a set of
atomic UI components built to match a Portuguese-language design spec
("Caramelo: a escala quente do design system").

Code is the truth. This file explains the *why* behind the shape it takes.

## Layout

- `src/index.ts` — the single export point. Every component is re-exported
  from here (`export { X, type XProps } from './components/x/x'`); consumers
  never import a component's file path directly.
- `src/components/<name>/` — one directory per component: `<name>.tsx`,
  `<name>.spec.tsx`, `<name>.stories.tsx`. One design concept per directory,
  no multi-component files.
- `src/components/slot/slot.tsx` — the polymorphic-`as`-prop primitive
  (`Slot`/`SlotProps`) used by components that need to render as a different
  element (`Button`, `Text`).
- `src/utils/cn.ts` — `cn()` (clsx + tailwind-merge) is the only way class
  names are composed; never string-concatenate classes.
- `src/style.css` — the Tailwind v4 entry point and the only place raw
  `oklch()` values are declared (see Tokens below).
- `templates/component/*.hbs` — plop scaffolding templates for
  `pnpm create:component`; new components should match this shape.

## Design system / shared UI

`src/style.css` is the only place raw color/spacing/radius values are
allowed. Every component consumes them through Tailwind utility classes
generated from the `@theme` custom properties — never a hardcoded `oklch()`
or bespoke pixel value for something a token already covers.

### Tokens

- **`--color-caramelo-1..12`** / **`--color-gray-1..12`** — the two raw
  12-step scales. Steps 1–4 are surfaces, 5–7 are borders, 8–10 are
  icon/low-contrast text, 9 is the primary action color, 11–12 are text.
  Steps 1–8 never carry text directly.
- **Semantic aliases** (`--color-brand`, `--color-brand-pressed`,
  `--color-link`, `--color-bg`, `--color-surface`, `--color-surface-2`,
  `--color-border`, `--color-neutral`, `--color-neutral-2`,
  `--color-neutral-3`, `--color-neutral-inverse`) — the only names screen/
  component code should reference. If a component needs a color that isn't
  here, the token is missing — it doesn't get invented ad hoc.
- **`--color-on-brand-strong`** (gray-1) vs **`--color-on-brand-inverse`**
  (gray-12) — brand surfaces split into two families that need opposite text
  colors: `on-brand-strong` is for text/icons on the *light* brand steps
  (caramelo-9/10/11 — e.g. the primary button, the FAB), `on-brand-inverse`
  is for the *dark* brand tints (caramelo-4..7 — e.g. an active icon button,
  a sidebar's active row, an avatar's initials plate). Every component that
  sits on a brand-colored surface declares which of the two it uses; there is
  no single generic "text on brand" token because gray-12 is unreadable on
  caramelo-9 and gray-1 is unreadable on caramelo-4.
- **Status colors** (`--color-success`, `--color-warning` — literally the
  brand color, `--color-danger`, `--color-whatsapp`) — `--color-warning`
  aliases `--color-brand` on purpose: the spec forbids amber meaning both
  "urgent" and "primary action" in the same view, so no component may use
  `--color-warning` for a background fill the way a primary button does;
  "urgent" is represented as an outline + icon + word instead (see Badge).
- Spacing scale: 4/8/12/16/20/24/32 (`--spacing-4`..`--spacing-32`). Radii:
  card 20, photo 16, sheet 28, control 14, chip 999
  (`--radius-card`/`--radius-photo`/`--radius-sheet`/`--radius-control`/
  `--radius-chip`). Minimum tap target 44×44 (`--size-tap-min`); standard
  control height 52 (`--size-control-height`).
- Typography: Poppins for UI/headings/labels/numbers (`Text` component,
  `font-poppins`), Roboto 300 for body copy (`font-roboto`, used directly in
  form-field values rather than through `Text`, since `Text` is Poppins-only
  today).

### Why these components exist

The spec is a mobile-first (iOS + responsive webapp) design system with a
hard accessibility floor: no state may rely on color alone. That constraint
directly shapes three components:

- **Badge** — "verified", "urgent", "adopted" always pair an icon glyph with
  the label text; there is no color-only status indicator.
- **Switch** — the toggle track color changes *and* the knob moves, so a
  colorblind user isn't relying on the caramelo/gray track distinction alone.
- **Input**'s error state adds a text message (not just a red border).

A second constraint — "the primary action color and the selection color are
the same caramelo-9" — shapes **Chip** (`selected` variant) and
**SegmentedControl**: both intentionally reuse the brand fill, and the spec's
own rule is that neither may share a visual row with a primary `Button`,
since a viewer could otherwise read the selected chip/segment as a second
call to action.

### Component reference

- **Button** — height 52, radius 14. Variants: `primary` (caramelo-9 fill,
  `on-brand-strong` text, hover/active states move to caramelo-10 —
  "pressed" is not a separate prop, it's the native `:hover`/`:active`
  state), `secondary` (outline), `handoff` (WhatsApp-only, `--color-whatsapp`
  fill), `destructive` (outline in `--color-danger`). Disabled is the native
  `disabled` attribute, not a variant.
- **IconButton** — 44×44 tap target. `active` toggles between a neutral
  gray-3 surface and an active caramelo-3/caramelo-7-bordered surface using
  `on-brand-inverse` text (caramelo-3 is a dark brand tint).
- **Fab** — 56×56, full radius, caramelo-9 fill, `on-brand-strong` icon. One
  of only two components with a shadow (the other is the sheet pattern),
  both using the same `0 8px 24px oklch(17.8% .0119 80.9 / .6)` token value.
- **Chip** — height 34, radius 999. `selected` uses the brand fill (see "Why
  these components exist" above); `disabled` is the dashed/unavailable
  state, not the same as a chip that's merely inactive.
- **Badge** — status pill for verified/tutor/urgent/new/adopted. Every
  variant renders an icon character plus the label (see accessibility note
  above); `urgent` is an outline in `--color-link` (caramelo-11), never a
  filled brand background, so it can't be misread as a CTA.
- **SegmentedControl** — shares the brand fill with the selected option by
  design; must not appear on the same row as a primary `Button`.
- **Input** — height 52, radius 14. `focus` is the native CSS
  `:focus`/`:focus-visible` pseudo-class, not a prop — no consumer should
  ever need to force it. `error` is a prop because it's driven by validation
  state, and renders both a border color change and a text message below the
  field.
- **Select** — native `<select>` styled to the same field spec, with a
  decorative chevron. The spec's custom open-menu visual (a floating list
  with a checkmark on the selected row) is a distinct overlay/menu pattern,
  not part of this atomic field — it isn't implemented here.
- **Switch** — 52×32 track, 26px knob. On: brand track, gray-1 knob
  (`on-brand-strong` logic applied to the knob itself). Off: gray-6 track,
  gray-12 knob.
- **SearchBar** — height 52, radius 14. Takes a `focused` prop rather than
  relying on `:focus`, because the spec's focused state is a *value present
  + focus ring* combination that also needs a clear ("×") button — that
  combined state isn't reachable from a CSS pseudo-class alone.
- **Avatar** — 48px (authorship) / 32px (stacks). Shows initials on a
  caramelo-4 plate with a brand-9 ring when there's no photo.
- **AnimalCard** — the list-style card: 104×104 photo (radius 16) inside a
  gray-2 card (radius 20) sitting on the caramelo-1 page background — the
  gray card gives the warm-toned photo a neutral frame without needing a
  border.
- **Toast** — `success`/`error` only; the spec shows no third (info/neutral)
  variant, so none is implemented. Renders as `<output>` for correct
  assistive-tech semantics.
- **TabBar** — mobile, 83px, 5 roots. The publish action renders as a raised
  `Fab`, not a sixth flat tab. Notification badges always carry a border in
  the bar's own surface color so they read as layered on top of the icon
  rather than fused to it.
- **Sidebar** — web, 248px, collapsing to 72px (icon-only, via the
  `collapsed` prop) below the 1280px breakpoint. The active row uses the
  caramelo-4 surface, *never* the full caramelo-9 brand fill — that stays
  reserved for the sidebar's own publish button, so there's exactly one
  brand-colored element per view.
- **EmptyState** — `empty`/`error` variants. Every instance renders a title,
  one sentence and an action button; illustration-only empty states are not
  supported by the component (the spec explicitly forbids that shape).
- **LoadingSkeleton** — `block` (shimmer placeholder) and `spinner` (28px
  ring) variants, both rendered as `<output>`. Both animations are
  `motion-safe:`-guarded so `prefers-reduced-motion` collapses the shimmer to
  a static surface and the spin to a static ring.
- **PhotoUpload** — a 3-column grid: cover photo (first item, "CAPA" badge),
  other photos (remove button), and an "add" slot with an n/max counter, plus
  a dropzone. Drag-to-reorder and the native camera/photo-roll picker are
  interaction behavior left to the consumer; this component renders the
  visual states only.
- **NoticeRow** — unread = caramelo-3 surface + a brand dot; read reverts to
  the plain gray-2 surface with no dot.
- **ApplicationCard** — `review`/`accepted`/`rejected`/`completed` status
  pill. The "Aceitar"/"Ver respostas" action pair only renders for `review`,
  since none of the other statuses have a pending action in the spec.
- **Tag** — a plain gray-3 label pill (radius 7, not the full-radius chip
  shape) for factual attributes like "castrada"/"vacinada"/"dócil". Extracted
  from `AnimalCard`'s tag list so any other consumer needing the same
  attribute-pill look reuses it instead of re-implementing the markup; not
  interactive and not the same component as `Chip` (`Chip` is a
  selectable/filterable control, `Tag` is a static label).

## Known gaps

The spec's overlay/page-level patterns (bottom sheet, modal, confirmation
dialog, menu, tooltip, map pin/cluster, data table, breadcrumbs, tabs,
stepper) are documented in the design doc but not yet built as components —
they're compositions of the atomic pieces above plus page-level state
(routing, focus trapping) that doesn't belong in this library's atomic
component set. Build them here, not as ad hoc screen CSS, when a consuming
app needs one.
