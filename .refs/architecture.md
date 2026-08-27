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
- `src/components/caramelo-provider/caramelo-provider.tsx` — sets the
  active theme (`caramelo` default, `pawee`) via a `data-theme` attribute
  that the token layer keys off; see `.refs/theming.md`.
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

Everything below is Caramelo's own values, declared once on `:root`. They're
also the *default* — see `.refs/theming.md` for how `[data-theme="pawee"]`
overrides the raw scales (and a couple of alias formulas) to reskin the same
components without touching component code.

- **`--color-caramelo-1..12`** / **`--color-gray-1..12`** — the two raw
  12-step scales. Steps 1–4 are surfaces, 5–7 are borders, 8–10 are
  icon/low-contrast text, 9 is the primary action color, 11–12 are text.
  Steps 1–8 never carry text directly.
- **`--color-bg`** — the page background. A dedicated neutral near-black
  (`#111113`), *not* an alias of `caramelo-1`: the app frame stays cool while
  warm `caramelo` surfaces sit on top. `[data-theme="pawee"]` swaps it for
  its own value.
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
- **`--color-scrim`** — the dim layer behind an overlay (`BottomSheet`). A
  near-black at 0.6 alpha (Pawee: `rgba(5,3,9,.6)`). Only overlay backdrops
  use it; it is never a component surface.
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
  today). The named type steps from the handoff are tokens —
  `--text-display` 32/38, `--text-title` 24/30, `--text-card-title` 17/22,
  `--text-body` 15/22, `--text-label` 13/18, `--text-caption` 11/14,
  `--text-micro` 10/13, `--text-badge` 9/12 — each carrying its own line
  height, so a screen never pairs one of these sizes with an ad-hoc leading.
  They sit *beside* `Text`'s `variant` scale (`small`/`medium`/`large` =
  14/16/18) rather than replacing it: `variant` is the library's own UI
  ladder, the `--text-*` tokens are the app's named steps, and a component
  reaches for the token whenever the design names the step. `Text`'s `color`
  variant carries a `link` entry for
  `--color-link` — the token that inline text actions use instead of
  `--color-brand`, so the one-brand-element-per-view rule survives a ghost
  action sitting next to a primary `Button`.
- **Keyboard focus** — every interactive component (buttons, fields, chips,
  nav rows, tabs, segmented control) adds `focus-visible:outline-2
  focus-visible:outline-brand focus-visible:outline-offset-2`, alongside
  (never instead of) its own hover/active treatment; fields that used to
  suppress the native outline via `focus:outline-none` rely on this instead.
  `SearchBar` is the exception: the focusable element is the inner `<input>`
  but the visual control is the wrapping `<div>`, so the ring is
  `focus-within:outline-*` on the wrapper and the input keeps
  `focus:outline-none`.

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

- **Button** — height 52, radius 14. Variants: `primary` (`--color-brand`
  fill, `on-brand-strong` text; `:hover` and `:active` both move to
  `--color-brand-pressed` — "pressed" is not a separate prop, it's the
  native `:hover`/`:active` state, and hover doesn't get its own lighter
  step: engaging the button at all (mouse over or actually pressed) reads
  as one darker state, not two), `secondary` (outline), `handoff`
  (WhatsApp-only, `--color-whatsapp` fill), `destructive` (outline in
  `--color-danger`). Disabled is the native `disabled` attribute, not a
  variant. Background and transform both transition together
  (`motion-safe:transition-all`) so hover/press/theme changes cross-fade
  instead of snapping. The label never wraps (`whitespace-nowrap`) — a
  narrow container makes the button wider, never taller than its fixed
  height (see `ApplicationCard`'s side-by-side action pair).
  `ghost` is the fifth variant: a text-only action with no surface and no
  border, for the "Pular"/"Esqueci a senha"/"Limpar"/"Agora não" class of
  secondary escape hatches, and for `BottomSheet`'s `action` slot. Its text is
  `--color-link`, **not** `--color-brand`: brand is reserved for one element
  per view and a ghost action routinely sits beside a primary `Button`, so
  reusing brand would read as a second call to action. Hover and press both
  brighten to `--color-neutral` (the link scale has no pressed step), and
  disabled drops to `--color-neutral-3`. It is also the one variant that
  drops `--size-control-height`: a ghost action inside a sheet header or
  beside a title cannot be 52 tall, so it uses `h-auto` plus padding and
  guarantees the 44×44 floor through `min-h-11` instead. Because the hover
  colour lives on the wrapper, its label renders `text-inherit` rather than a
  `Text` `color`, and it is Poppins 500 where the filled variants are 600.
- **Icon** — the app's glyph set, split into two families behind one name
  union. The **stroke** family is Feather-style (`home`, `heart`, `plus`,
  `bell`, `user`, `search`, `filter`, `sliders`, `map-pin`, `list`, `grid`,
  `map`, `shield`, `check`, `check-circle`, `alert-circle`, `message-circle`,
  `share-2`, `camera`, `image`, `gift`, `clock`, `copy`, `eye`, `edit`,
  `trash`, `flag`, `download`, `pause`, `play`, `refresh`, `wifi-off`,
  `chevron-down`, `chevron-left`, `chevron-right`, `x`): 24×24 `viewBox`,
  `fill="none"`, `stroke="currentColor"` (colour comes from the parent's text
  colour, or the `color` prop), round caps/joins, and `size` (default 24)
  thickens the stroke to 2.4 below 14px per the brand spec. The **filled**
  family is the third-party brand marks (`whatsapp`, `apple`, `google`,
  exported as `filledIconNames`/`FilledIconName`): they are official
  single-path marks, so they cannot honour a stroke contract and instead
  render `fill="currentColor"` with `stroke="none"` and no stroke width. They
  live inside `Icon` rather than inside `SocialButton` so there stays exactly
  one glyph primitive in the library — a consumer asking for a mark uses the
  same `<Icon name>` call as any other glyph, and `iconNames` stays the single
  index (the Storybook glyph sheet iterates it, so it covers both families
  automatically). Because they are trademarks the paths are the official
  artwork, never a redraw; `apple` in particular must follow Apple's "Sign in
  with Apple" usage rules at the consumer level. Decorative by default
  (`aria-hidden`); pass `aria-label` to promote it to `role="img"`. This is
  the glyph primitive `IconButton`/`Fab`/`TabBar` etc. render inside — those
  components own the hit target and surface, `Icon` owns only the artwork.
- **IconButton** — 44×44 tap target. `active` toggles between a neutral
  gray-3 surface and an active caramelo-3/caramelo-7-bordered surface using
  `on-brand-inverse` text (caramelo-3 is a dark brand tint). Pass an `icon`
  (`IconName`) to render an `Icon` at 20px; `children` still works for a
  non-glyph child.
- **Fab** — 56×56, full radius, caramelo-9 fill, `on-brand-strong` icon. One
  of only two components with a shadow (the other is the sheet pattern),
  both using the same `0 8px 24px oklch(17.8% .0119 80.9 / .6)` token value.
  Takes the same `icon`/`children` pair as `IconButton` (`Icon` at 24px).
- **Chip** — height 34, radius 999. `selected` uses the brand fill (see "Why
  these components exist" above); `disabled` is the dashed/unavailable
  state, not the same as a chip that's merely inactive.
- **Badge** — the *only* status pill in the library, covering three families:
  the public statuses (`verified`, `tutor`, `urgent`, `new`, `adopted`), the
  listing lifecycle (`active`, `paused`) and the application state machine
  (`review`, `accepted`, `interview`, `approved`, `rejected`, `withdrawn`,
  `expired`, `completed`). They live on one component rather than splitting
  into a second `StatusBadge` because the pill shape, the compact-size logic
  and — above all — the glyph-plus-label accessibility rule are identical;
  splitting them would mean enforcing that rule in two places.
  Every variant that has a glyph renders it through `Icon` (12px at
  `default`, 10px at `compact`) rather than as a text character, so the
  artwork stays in the one primitive that owns it; the glyph is decorative
  and the label carries the meaning. `tutor` and `new` are the two variants
  with no glyph — their label is already the whole message. The colour class
  sits on the outer pill and the label renders `text-inherit`, so the glyph
  and the text can never drift apart.
  `urgent` is an outline in `--color-warning` (equals `--color-brand`
  for Caramelo specifically — see `.refs/theming.md` for why this can't be a
  hardcoded `brand` reference), never a filled brand background, so it can't
  be misread as a CTA. `rejected`, `withdrawn`, `expired` and `completed` all
  land on the same `gray-3` surface on purpose: a terminal status should not
  shout, and glyph + label already separate them, which is exactly what the
  no-colour-alone rule asks for. Takes a `size`
  (`default`/`compact`) prop — `compact` is what AnimalCard uses for its
  inline verified badge, since a plain `className` override can only reach
  the outer pill (padding), not the label's own font-size.
- **SegmentedControl** — shares the brand fill with the selected option by
  design; must not appear on the same row as a primary `Button`. Segment
  fill/colour cross-fades over 150ms, unselected segments get a `gray-4`
  hover, and pressing a segment squashes it to 95% — all `motion-safe:`.
- **Input** — height 52, radius 14. `focus` is the native CSS
  `:focus`/`:focus-visible` pseudo-class, not a prop — no consumer should
  ever need to force it. `error` is a prop because it's driven by validation
  state, and renders both a border color change and a text message below the
  field. `leading`/`trailing` are affix slots *inside* the 52-tall box, so a
  password reveal toggle or an `R$` prefix belongs to the field instead of
  being absolutely positioned over it by the consumer — which would put the
  control outside the field's focus ring. Because an affix can be focusable,
  the field's border/background/ring moved from the `<input>` to the wrapper
  as `focus-within:*` (the input keeps `focus:outline-none`) — the same
  arrangement `SearchBar` already uses, deliberately reused rather than
  invented a second time. `leading` is `aria-hidden` and `--color-neutral-3`:
  in this design it is always a symbol that the label already says (`R$`, a
  unit). `trailing` is not hidden, because that slot is where an interactive
  control or a live counter goes. `hint` is the quiet non-error line under
  the field; `error` wins and replaces it, and whichever renders is wired to
  the input through `aria-describedby`. `PasswordField` and `MoneyInput`
  compose this rather than forking it. `SearchBar` is deliberately *not*
  refactored onto these slots — its focused state is a spec'd prop contract,
  not a pseudo-class.
- **Select** — native `<select>` styled to the same field spec, with a
  decorative `Icon name="chevron-down"` overlay. The spec's custom open-menu visual (a floating list
  with a checkmark on the selected row) is a distinct overlay/menu pattern,
  not part of this atomic field — it isn't implemented here. The native option
  popup is forced to `--color-surface` / `--color-neutral`
  (`[&_option]:bg-surface [&_option]:text-neutral`) so the list isn't
  white-on-white on dark until hover.
  `variant` is `field` (the default, unchanged) or `ghost` — the same native
  picker with no surface, no border and no fixed height, for the Mural's
  location switcher and the inline alert-frequency picker, where the control
  reads as a title or as part of a sentence rather than as a form field.
  `ghost` inherits font family, size and leading from its parent (the
  consumer sets the type step on the element), shrinks the chevron to 16 and
  guarantees the 44 tap floor with `min-h-11` instead of the control height.
  It is a variant rather than a separate `InlinePicker` component precisely
  because of the option-colour workaround above: a second component would
  have to maintain that hack twice.
- **Switch** — 52×32 track, 26px knob. On: brand track, gray-1 knob
  (`on-brand-strong` logic applied to the knob itself). Off: gray-6 track,
  gray-12 knob. Track colour and knob position ease over 200ms; while the
  input is `:active` the knob stretches to 32px (`peer-active`), iOS-style,
  `motion-safe:` only. The keyboard ring is `peer-focus-visible` on the
  track.
- **SearchBar** — height 52, radius 14. Takes a `focused` prop rather than
  relying on `:focus`, because the spec's focused state is a *value present
  + focus ring* combination that also needs a clear ("×") button — that
  combined state isn't reachable from a CSS pseudo-class alone. The leading
  magnifier is `Icon name="search"` and the clear button wraps `Icon
  name="x"`. The keyboard focus ring is `focus-within` on the wrapper (see
  Keyboard focus above).
  When an `onClear` handler is passed the clear button stays mounted at all
  times and only toggles `invisible` + `aria-hidden` + `tabIndex` on the empty
  value, so typing the first character doesn't shift the input width.
- **Avatar** — 48px (authorship) / 32px (stacks). Shows initials on a
  caramelo-4 plate with a brand-9 ring when there's no photo.
- **AnimalCard** — the list-style card: 104×104 photo (radius 16) inside a
  gray-2 card (radius 20) sitting on the neutral `--color-bg` page background
  — the gray card gives the warm-toned photo a neutral frame without needing
  a border. Its inline badge uses `Badge`'s `size="compact"`.
- **Toast** — `success`/`error` only; the spec shows no third (info/neutral)
  variant, so none is implemented. Renders as `<output>` for correct
  assistive-tech semantics.
- **TabBar** — mobile, 83px, 5 roots. The publish action renders as a raised
  `Fab`, not a sixth flat tab. Notification badges always carry a border in
  the bar's own surface color so they read as layered on top of the icon
  rather than fused to it. `TabBarItem.icon` is an `IconName` (rendered
  through `Icon`, 23px), not a free `ReactNode`.
- **Sidebar** — web, 248px, collapsing to 72px (icon-only, via the
  `collapsed` prop) below the 1280px breakpoint. The active row uses the
  caramelo-4 surface, *never* the full caramelo-9 brand fill — that stays
  reserved for the sidebar's own publish button, so there's exactly one
  brand-colored element per view. `SidebarItem.icon` is an `IconName`
  (rendered through `Icon`, 18px); `logo.mark` stays a free `ReactNode`.
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
  visual states only. The remove (`x`) and add (`plus`) affordances render
  through `Icon`.
- **NoticeRow** — unread = caramelo-3 surface + a brand dot; read reverts to
  the plain gray-2 surface with no dot.
- **ApplicationCard** — `review`/`accepted`/`rejected`/`completed`, rendered
  through `Badge` rather than a private status cva: the card was the second
  implementation of the same status-pill concept, and the library keeps one.
  Its status names are deliberately the same strings as the matching `Badge`
  variants so the mapping is the identity. The "Aceitar"/"Ver respostas"
  action pair only renders for `review`, since none of the other statuses
  have a pending action in the spec.
- **Tag** — a plain gray-3 label pill (radius 7, not the full-radius chip
  shape) for factual attributes like "castrada"/"vacinada"/"dócil". Extracted
  from `AnimalCard`'s tag list so any other consumer needing the same
  attribute-pill look reuses it instead of re-implementing the markup; not
  interactive and not the same component as `Chip` (`Chip` is a
  selectable/filterable control, `Tag` is a static label).
- **BottomSheet** — the overlay pattern the app uses in place of a modal or a
  menu (both listed as gaps but absent from the app — everything is a sheet).
  Fixed, bottom-anchored, `--color-surface` panel with `rounded-t-sheet`, a
  `--color-border` top hairline and `--shadow-raised` (the same shadow token
  as `Fab`). `size` (`short`/`medium`/`tall`/`full`) caps the panel height in
  `dvh`; `full` goes edge to edge and drops the radius. A 38×5 `gray-7` handle
  sits at the top; `title` + optional `action` (a link node, right-aligned)
  form the header; `footer` renders over an automatic
  `--color-surface`→transparent protection gradient so it never reads as an
  opaque bar glued to the content. The scrim is `--color-scrim` and clicking
  it calls `onClose`. Entry is `slide-up-sheet` + `fade-in` on the scrim, both
  `motion-safe:`-guarded. Renders `null` when `open` is false; focus trapping
  and scroll locking are left to the consuming app.
- **StepProgress** — the multi-step indicator every wizard flow (publish,
  adoption form, onboarding) was drawing by hand. The bar spans its container width (`w-full`). `variant="bars"`: equal
  `flex-1` segments, 4px tall, `--color-brand` for the first `current` of
  `total`, `--color-gray-6` for the rest. `variant="dots"`: 5px dots, the
  active one a 22×5 pill so shape carries state, not just color — `tone`
  `default` uses `brand`/`gray-7`, `over-photo` uses `neutral`/`neutral`-at-45%
  for carousels laid over imagery. Optional `label` renders below as Poppins
  500 11/14 `neutral-3`. Width/colour transitions are 150ms,
  `motion-safe:`-guarded. Exposes `role="progressbar"` with
  `aria-valuenow`/`valuemax`.
- **TriStateGroup** — the "Sim / Não / Não sei" answer control from the health
  step, where a null answer is valid and "não sei" must never render as a red
  ✗. The group fills its container width; three `flex-1 basis-0` targets (equal thirds, labels `whitespace-nowrap`), 42px tall, `rounded-xl`, gap 8. Built on native
  `<input type="radio">` inside `<label>` (one generated `name` per group via
  `useId`) so arrow-key navigation and roving focus come from the platform.
  A selected Sim/Não is the brand fill plus a `✓`/`✗` glyph (never colour
  alone); a selected "Não sei" is the dashed + `--color-gray-3` "empty /
  unavailable" convention with no glyph. Unselected is a `--color-border`
  outline. No error state — null is a valid value. Option colour/border
  cross-fades over 150ms, a press squashes the target to 97%, and the
  `✓`/`✗` glyph fades-and-scales in (`animate-fade-in-scale`) — all
  `motion-safe:`. `TriStateGroup.Field` stacks several with gap 16.

## Known gaps

The spec's remaining overlay/page-level patterns (modal, confirmation dialog,
menu, tooltip, map pin/cluster, data table, breadcrumbs, tabs) are documented
in the design doc but not yet built as components — they're compositions of
the atomic pieces above plus page-level state (routing, focus trapping) that
doesn't belong in this library's atomic component set. Build them here, not as
ad hoc screen CSS, when a consuming app needs one.

`BottomSheet` (overlay) and `StepProgress` (the "stepper") are now built —
`BottomSheet` still leaves focus trapping and scroll locking to the consumer.
