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
  names are composed; never string-concatenate classes. It uses
  `extendTailwindMerge` to register the named type steps
  (`--text-display`/`title`/`card-title`/`body`/`label`/`caption`/`micro`/`badge`)
  in the `font-size` class group. Without that, tailwind-merge falls back to
  treating any unrecognised `text-*` as a **colour**, so `text-micro` and
  `text-neutral-3` would count as a conflict and the size would be silently
  dropped — every component that pairs a named step with a `Text` `color`
  depends on this. A new `--text-*` token has to be added to that list too.
- `src/utils/protection-gradient.ts` — `protectionGradient(surface)`, the
  page-colour→transparent upward wash that sits behind a bottom action area
  so text stays legible over whatever scrolls beneath it. It lives in one
  place because two components need the identical rule: `BottomSheet`'s
  `footer` and `StickyActionBar`.
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
- **AmountOption** — the donation sheet's preset value tiles. It is close to
  `OptionCard` but deliberately separate: `OptionCard` is a title+description
  card in a stacked list, `AmountOption` is a value tile in a row of three,
  and its second line is an **equivalence** ("R$ 25 · 1 semana de ração")
  that the org defines itself — data, not decoration, and the single
  strongest reason someone donates. `amountLabel` is a pre-formatted string,
  never a number: formatting money belongs to `MoneyInput` and the consumer,
  and a second formatter here could disagree with it. Values stay in integer
  cents in the consumer's state; this component never sees a number.
  Same native-radio construction and dark-brand-tint selection as
  `OptionCard` (the sheet's "Gerar PIX" button owns the brand fill), with a
  `check` glyph so selection is not colour alone. The equivalence line
  reserves its height even when empty, so a row where only one tile has one
  doesn't go ragged. `AmountOption.Group` lays out on a CSS grid rather than
  flex `flex-1 basis-0` — the last cell is typically "Outro valor", a
  `MoneyInput` rather than a tile, and a grid keeps the row aligned with a
  non-tile child in it.
- **OptionCard** — the publish flow's "what are you publishing?" step: a
  radio group whose options are cards, each with a title *and* a description
  (and the choice changes the rest of the flow). `Chip` is too small for two
  lines and `SegmentedControl` is view navigation, not a form value, so
  neither could be stretched to cover it. Built on a native
  `<input type="radio">` inside a `<label>` — same construction as
  `TriStateGroup`, so roving focus and arrow keys come from the platform —
  with one generated `name` per `OptionCard.Group`, shared through context so
  a consumer never has to invent one. Selected is the **dark brand tint**
  (`caramelo-4` surface, `caramelo-7` border, `on-brand-inverse` title), not
  the `caramelo-9` fill: this screen's primary `Button` is the one
  brand-filled element. The selected card also shows a `check` glyph, so the
  state is never colour alone. The card styles itself off `has-[:checked]:`
  rather than `peer-checked:` because the styled element is the input's
  parent; the glyph, a sibling, uses `peer-checked:`.
- **Chip** — height 34, radius 999. `selected` uses the brand fill (see "Why
  these components exist" above); `disabled` is the dashed/unavailable
  state, not the same as a chip that's merely inactive.
- **ChipGroup** — `Chip` is a single pill, but every screen in the design uses
  chips as a *group*, and the group is where the behaviour lives. Putting it
  here keeps selection, the cap and the keyboard model in one place instead of
  once per screen — the "· até 3" cap on the temperament group is a product
  rule, and it belongs in the design system rather than in a screen's CSS
  neighbours. `Chip` stays presentational; the group owns state.
  `value` is an array in both modes so a consumer's handler shape never
  changes between them — `single` simply never returns more than one entry.
  `selection="single"` renders `role="radiogroup"` with `role="radio"` chips,
  arrow-key navigation and a single roving tab stop (`tabIndex={-1}` on every
  chip but the selected one), which is what a radio group is expected to do;
  `multiple` renders a `role="group"` of `aria-pressed` toggles. Reaching
  `max` flips the *unselected* chips to `Chip`'s existing dashed
  `disabled` variant — the library's established "unavailable" convention —
  while selected chips stay live so the user can always trade one for
  another. Chips wrap and never truncate (Dynamic Type to 200% is a stated
  requirement). Because the selected chip reuses the brand fill, a
  `ChipGroup` must not share a row with a primary `Button`; that is the same
  rule `SegmentedControl` carries. The multiple-selection group renders as a
  `<fieldset>` rather than a `div role="group"` — same semantics, native
  element — while single selection stays a `div role="radiogroup"` because it
  also owns the arrow-key handler.
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
- **Tabs** — the underline tab strip for the ONG profile
  (`Animais · Sobre · Transparência`), Meus anúncios and Favoritos. It is a
  **separate component from `SegmentedControl`, not a variant of it**, and the
  split is the point: `SegmentedControl` means "the same content in another
  mode" and pays for that with the brand fill, which is exactly why it may
  not share a row with a primary `Button`. `Tabs` means "different content",
  sits directly under `Seguir`/`Doar` on the ONG profile, and therefore
  carries **no brand fill anywhere** — the only brand-coloured thing is the
  2px underline. Making it a variant would have left one component with two
  contradictory placement rules.
  `role="tablist"` with `role="tab"` children, `aria-selected`, a single
  roving tab stop and arrow-key navigation that skips disabled tabs. The
  panels stay in the consumer: the component owns the strip only.
  The underline is one absolutely-positioned element whose `left`/`width` are
  measured from the selected tab in a layout effect, so it *slides* between
  tabs over 150ms instead of blinking from one border to another. `count` is
  visually a quieter number after the label and is `aria-hidden`; the count
  is folded into the tab's `aria-label` instead ("Salvos, 4 itens"), because
  a bare number read out after a word means nothing. The strip scrolls
  horizontally rather than shrinking its labels — Dynamic Type to 200% is a
  stated requirement.
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
  compose this rather than forking it. `InputProps` is `ComponentProps<'input'>`
  rather than `InputHTMLAttributes` so a composing component can pass a `ref`
  straight through to the native field — `MaskedInput` needs one to restore
  the caret. `SearchBar` is deliberately *not*
  refactored onto these slots — its focused state is a spec'd prop contract,
  not a pseudo-class.
- **MoneyInput** — composes `Input` with a non-interactive `R$` leading
  affix. Its whole contract is in **integer cents**: `value` and `onChange`
  never touch a float, because the donation flow states "a Pawee fica com 0%"
  and shows an exact total, so the number has to survive to the PIX payload
  without a rounding step anywhere. Digits accumulate right to left like a
  till (`2` → `0,02`, `2500` → `25,00`), which is how every Brazilian payment
  UI behaves; typing `25,00` left to right also works, because the field only
  ever reads the digits. Formatting is `toLocaleString('pt-BR')` with two
  fixed decimals, so the accessible value is the formatted amount rather than
  the raw digit string. `min`/`max` clamp **on blur, not on keystroke** —
  clamping while typing makes it impossible to type a number that passes
  through an out-of-range prefix. `currency` exists but only accepts `BRL`;
  the prop is there so the contract doesn't have to change later. It shares
  its cents value with `AmountOption`'s preset tiles.
- **MaskedInput** — composes `Input` for the app's formatted fields
  (`phone-br`, `cnpj`, `cep`). WhatsApp is the product's only contact
  channel, so a wrong number breaks the whole adoption funnel — the format,
  the caret handling and the paste behaviour are worth owning once rather
  than being rewritten on each screen that captures a number.
  `onChange(raw, formatted)` hands back both: everything downstream (the API,
  a `wa.me` link) wants the raw digits, the field wants the display string.
  `value` is normalised by stripping non-digits, so a consumer may store
  either form and the field still renders correctly.
  The caret is preserved across reformatting by counting the digits before
  the caret and re-finding that digit position in the newly formatted string,
  applied in a layout effect (the caret is held as a fresh object per change
  so a repeated position still re-runs). Deleting a *separator* deletes the
  digit before it, which is what the user meant; a keystroke that would
  exceed the mask is rejected outright rather than truncated, so the stored
  value never silently loses what was typed. `phone-br` covers both 8- and
  9-digit local numbers. Validation is not the component's job: it reports
  what was typed and the consumer decides and passes `error`.
- **PasswordField** — composes `Input` rather than forking it: the reveal
  toggle is an `IconButton` in `Input`'s `trailing` slot, so it sits inside
  the field box and inside the field's focus ring. Toggling flips the same
  `<input>`'s `type` between `password` and `text` — the DOM node is never
  replaced, which is what keeps focus and the caret where they were. The
  toggle carries `aria-pressed` and an accessible label that changes with the
  state (`Mostrar senha` / `Ocultar senha`).
  `strength` (0–4) draws a four-segment bar under the field and **only
  renders when `strengthLabel` is also given** — the segments are colour, and
  colour alone is forbidden, so the word is the state and the bar is the
  decoration (the bar is `aria-hidden`, the word is an `aria-live` region).
  The fills deliberately avoid `--color-warning`: it aliases `--color-brand`,
  and a brand-filled meter next to a primary button would break the
  one-brand-element-per-view rule, so the ramp is `--color-danger` at 1,
  `gray-8` at 2–3 and `--color-success` at 4, with the *number of filled
  segments* carrying the progression. The component never computes the
  score — that is the consuming app's product policy — and `error` from
  `Input` replaces the meter, since a failed rule outranks a rating.
- **Textarea** — the multi-line half of the field pair. It repeats `Input`'s
  geometry, label and `error`/`hint` contract on purpose, so a form can swap
  one for the other without the surrounding layout changing. `showCount`
  renders `N/max` bottom-right and reads the limit from the native
  `maxLength` attribute — there is deliberately no second `max` prop, because
  the native attribute is what actually enforces the limit and a duplicate
  would be free to disagree with it. The visible counter is `aria-hidden` and
  the count is announced instead through a separate debounced
  `aria-live="polite"` region: a counter that fires on every keystroke is
  unusable with a screen reader. It turns `--color-danger` in the last 10%.
  The message/counter row wraps rather than clips, since Dynamic Type up to
  200% is a stated requirement and the design never truncates. `autoGrow`
  expands the field with its content up to a cap and then scrolls.
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
- **Checkbox** — the form-submission counterpart to `Switch`. The two are not
  interchangeable and the split is deliberate: in this app a `Switch` always
  means "a preference that takes effect now", so the auth screens' "manter
  conectado" and terms/18+ acceptance — values that only matter when the form
  is submitted — are checkboxes. Built on a native `<input type="checkbox">`
  visually replaced by a 22×22 box (`rounded-lg`, `--color-border` outline,
  `--color-brand` fill with an `on-brand-strong` `check` glyph when checked),
  the same "keep the platform, restyle the surface" approach `TriStateGroup`
  takes with radios. The box is top-aligned so a label wrapping to several
  lines doesn't drag it off centre, and the row keeps the 44 tap floor.
  `label` is a `ReactNode` because the terms copy carries inline links, and
  that is why the label text is **not** inside the `<label>` element: HTML
  says a label ignores clicks on interactive descendants, but that rule is
  not implemented everywhere (jsdom included), so the text is a sibling with
  its own click handler that bails out on `a, button, input, select` and the
  input is named through `aria-labelledby`. The result is deterministic: a
  link inside the label navigates and never toggles the box. Indeterminate is
  not implemented — nothing in the design uses it.
- **Switch** — 52×32 track, 26px knob. On: brand track, gray-1 knob
  (`on-brand-strong` logic applied to the knob itself). Off: gray-6 track,
  gray-12 knob. Track colour and knob position ease over 200ms; while the
  input is `:active` the knob stretches to 32px (`peer-active`), iOS-style,
  `motion-safe:` only. The keyboard ring is `peer-focus-visible` on the
  track.
- **Slider** — the app's only continuous input ("Distância máxima", 1.8 and
  2.5). A native `<input type="range">` restyled through
  `::-webkit-slider-thumb` / `::-moz-range-thumb`, the same "keep the
  platform, restyle the surface" approach as `Switch` and `TriStateGroup`:
  keyboard, touch and screen-reader support come for free, and distance is
  the filter the empty-state suggestions relax programmatically, so the value
  has to be settable from outside. The 4px track carries its own fill as a
  two-stop `linear-gradient` between `--color-brand` and `--color-gray-6` at
  the value's percentage — a real filled-track element would need a second
  absolutely-positioned layer that could drift out of sync with the thumb.
  The 24px thumb takes `--shadow-raised` and scales to 1.1 while pressed
  (`motion-safe:`); the focus ring lands on the thumb, not the track, so the
  ring follows the value. `label` and the formatted value sit on one line
  above the track, which is the pairing both screens draw, and `formatValue`
  also feeds `aria-valuetext` so the control reads "15 quilômetros" rather
  than "15". Two-handle ranges are out of scope — nothing in the design uses
  one.
- **SwitchRow** — `Switch` on its own is just the 52×32 control; every place
  the design uses it, it is a full-width row (label left, control right,
  often an explanatory second line). Eight instances across three screens
  would otherwise hand-roll the same flex row and the same label/input
  wiring, so the row is the component and `SwitchRow` generates the `id`
  itself — a consumer never juggles `id`/`htmlFor`.
  The row is a `div`, not a `<label>`, even though the design reads as one
  tappable row: `Switch` already *is* a `<label>` wrapping its own input, and
  nesting labels is invalid HTML. Instead the text side is the `<label>` and
  takes `flex-1`, so everything except the control itself is still a tap
  target. `description` is wired through `aria-describedby`, not left as a
  visual-only second line. `SwitchRow.Group` stacks rows with a `gray-4`
  hairline between them (the filter sheet draws it) — same sub-component
  shape as `TriStateGroup.Field`, deliberately following that precedent
  rather than inventing a second grouping idiom.
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
- **Autocomplete** — a typed query plus a list to pick from, for the city
  picker (the fallback when location permission is denied, so it is on the
  critical path), the search suggestions and the neighbourhood field.
  `Select` cannot do this — a native select is a closed list and takes no
  query. Filtering is **not** the component's job: two of the three uses get
  their options from the API, so `options` are handed in and the component
  owns only presentation and interaction.
  It is the library's first floating list, and it is deliberately *not* a
  `BottomSheet`: the "everything is a sheet" note under Known gaps covers
  menus, and an autocomplete popup is not a menu. Positioning is plain CSS
  anchoring (`relative` wrapper, `absolute inset-x-0 top-full`) rather than a
  positioning dependency.
  The wiring is the ARIA 1.2 combobox pattern: `role="combobox"` with
  `aria-expanded`/`aria-controls`/`aria-activedescendant` on the field, and a
  `role="listbox"` of `role="option"` rows. Focus never leaves the input —
  the active option is pointed at by id — which is why the options are `div`s
  with `tabIndex={-1}` and why selection happens on `mousedown` with
  `preventDefault` rather than on `click`: a click would blur the field and
  close the list before it landed. ↑/↓ move, `Enter` selects, `Esc` closes
  without selecting, `Tab` closes and moves on. The active index is clamped
  during render instead of being reset from an effect, so a shrinking option
  list can never point past its end. `loading` puts a `LoadingSkeleton`
  spinner *inside* the list and never replaces the field; `emptyLabel` is the
  only thing that renders for a non-empty query with no options, so the list
  is never an empty box. `variant="search"` puts the `search` glyph in
  `Input`'s `leading` slot for the suggestions screen, rather than forking
  the whole combobox onto `SearchBar`.
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
- **StatGrid** — the horizontal row of number-plus-label: the listing's spec
  tiles (`SEXO Fêmea · IDADE 2 anos · …`), the listing's reach numbers, the
  ONG's totals and the profile stats. The design uses **two orders** — the
  spec grid puts the label above the value, the profile stats put the number
  above the label — so `order` is a prop rather than a second component.
  `variant="tiles"` is the `--color-surface` card on `--radius-control`;
  `inline` drops the surface and separates cells with dividers, which is how
  the profile and ONG headers draw them.
  When no cell has an `onClick` the grid is a real `<dl>` of `<dt>`/`<dd>`
  pairs — the same reasoning as `SummaryRow`, since these are facts. As soon
  as one cell links somewhere (the profile stats open their lists) the grid
  switches to plain `div`/`button` cells, because a `<button>` cannot be a
  `<dt>`. Cells wrap to fewer columns on narrow widths instead of shrinking
  the type, since the labels have to survive Dynamic Type at 200% and
  `CANDIDATURA` is already long.
  It overlaps `SummaryRow` only superficially: that is a stacked list of
  label/value pairs, this is a grid of numbers.
- **SummaryRow** — a label on the left, a value on the right, optionally an
  action: the review-before-publishing list, the ONG transparency block, the
  donation total and the receipt. Three different meanings, one shape. The
  receipt case is why it is a component with a test rather than screen CSS —
  `Taxa Pawee · R$ 0,00` is the donation flow's central promise.
  Grouped rows are a real `<dl>`: `SummaryRow.Group` renders the list and
  each row renders the `<dt>`/`<dd>` pair, which is what makes the
  transparency block read to a screen reader as facts rather than loose text.
  The value is Roboto where it is data and steps up to Poppins 600 at the
  larger size for `emphasis`, the total row, which also gains a heavier top
  rule — at most one per group. A long value **wraps** under its own line
  rather than squeezing the label; nothing truncates.
  Distinct from `ListRow` (which navigates) and from `StatGrid` (a
  horizontal grid of numbers rather than a stacked list of pairs).
- **ListRow** — the generic tappable row: search suggestions and recent
  searches, the profile menu (`Meus anúncios`, `Minhas candidaturas`,
  `Virar uma ONG verificada`), and the empty-state relaxation offers
  (`Aumentar para 50 km · +6`). Six shapes of one row across three features,
  hand-built in each, is the duplication `.refs/conventions.md` forbids.
  It is **not** `NoticeRow`: that one is a notification with its own
  read/unread surface logic, and it is not `SummaryRow` either — a `ListRow`
  navigates, a `SummaryRow` states a fact. All three appear on adjacent
  screens, so they stay apart.
  Without `onClick` (or `as`) it renders a plain `div` and takes no
  interaction affordance; with either it becomes a full-row `<button>` — or
  whatever `as` names, through the shared `Slot` primitive, so a router link
  works — carrying the standard focus ring. `icon` goes through `Icon` at 20
  in `--color-neutral-3`, while `leading` takes any other node (an `Avatar`,
  a thumbnail). The two trailing numbers are deliberately different props:
  `count` is a plain right-aligned number (search suggestions, relaxation
  deltas) and `badgeCount` is the filled pill, reusing `TabBar`'s badge
  treatment rather than inventing a second one. `chevron` is decorative.
  It stays presentational: a destructive row like `Sair` takes its colour
  from a `className`, and no `tone` prop is added until a second use appears.
  `ListRow.Group` stacks rows with `gray-4` hairlines, matching
  `SwitchRow.Group` and `TriStateGroup.Field`.
- **NoticeRow** — unread = caramelo-3 surface + a brand dot; read reverts to
  the plain gray-2 surface with no dot. The dot is decorative, so unread also
  renders an `sr-only` "não lido" — the state must not be colour-and-shape
  only for a screen reader. `hint` is the second, quieter half of the meta
  line (`há 12 minutos · toque para abrir o WhatsApp`): it renders inline
  after `timestamp` at `--text-micro`, which keeps `timestamp` a timestamp
  instead of the catch-all string it had become. Passing `onClick` swaps the
  root from a `div` to a full-width `<button>` carrying the same surface plus
  the standard focus ring — every notice in the design deep-links somewhere,
  and letting the consumer wrap the row would nest the interactive element
  wrongly and lose that ring. `message` stays a `ReactNode` so the subject can
  be emphasised, but the row must read correctly without the emphasis: the
  emphasis is the consumer's, the meaning is the sentence's.
- **ApplicationCard** — `review`/`accepted`/`rejected`/`completed`, rendered
  through `Badge` rather than a private status cva: the card was the second
  implementation of the same status-pill concept, and the library keeps one.
  Its status names are deliberately the same strings as the matching `Badge`
  variants so the mapping is the identity. The "Aceitar"/"Ver respostas"
  action pair only renders for `review`, since none of the other statuses
  have a pending action in the spec.
- **SectionHeader** — the small label that introduces a group, on screen
  after screen: the filter sheet's field-group labels, the "O QUE ACONTECE
  AGORA" page eyebrows, the `HOJE`/`ESTA SEMANA` date groups in Avisos and
  the `SUGESTÕES`/`BUSCAS RECENTES` groups in search. Two treatments are
  genuinely in play, so they are variants rather than two components:
  `label` is sentence case, Poppins 500 at `--text-label` in
  `--color-neutral-2` (the form-group label inside a sheet), and `eyebrow` is
  uppercase with letter-spacing, Poppins 600 at `--text-micro` in
  `--color-neutral-3` (the page section marker). Avisos' date groups and
  search's suggestion groups both use `eyebrow` so the two lists read as one
  system.
  It renders a **real heading**, not a styled `div`: `titleAs` picks the
  level and defaults to `h2`. That is the deliberate call — a section marker
  that silently renders as a `span` is the trap here, and a consumer that
  wants no heading can pass its own element. `action` is right-aligned and is
  meant to be a ghost `Button` (`Limpar`, `Marcar lidos`); `count` renders
  after the title at reduced emphasis where the design shows one ("Salvos 4").
- **Carousel** — the pager for onboarding (three slides, swipe or
  `Continuar`) and the listing gallery (up to five photos with a `1 de 5`
  counter). `StepProgress` already shipped the *indicator* for both cases —
  `variant="dots"` and `tone="over-photo"` — so this component **renders
  `StepProgress` rather than reimplementing the dots**; only the pager itself
  was missing.
  The track is a CSS scroll-snap container (`snap-x snap-mandatory`, one snap
  point per child), which buys native touch physics and momentum with no
  gesture library. It is **controlled only**: both screens need the index
  (the gallery counter, the onboarding CTA that changes on the last slide).
  Changing `index` scrolls the track smoothly, and user scrolling reports
  back through `onIndexChange` debounced to the settled position — the effect
  skips while a scroll is in flight so the two never fight each other.
  ←/→ move between slides, the track is the focusable element, the region is
  `aria-roledescription="carousel"` and each slide is a labelled
  `role="group"` with `aria-roledescription="slide"`. There is **no autoplay
  and no infinite loop**: neither appears in the design and both are
  accessibility liabilities. The onboarding "Pular" is a ghost `Button`
  placed by the screen, not part of this component.
- **ExpandableText** — the clamped paragraph with a `Ler mais` control: the
  listing's story (up to the publish step's 400-character limit) and the ONG
  bio. The design clamps it so the primary action stays near the thumb.
  The one rule that matters is that **the toggle only renders when the text
  actually overflows** — the usual bug here is a `Ler mais` that shows under
  a two-line paragraph. Overflow is measured (`scrollHeight` against
  `clientHeight`) and re-measured through a `ResizeObserver`, because Dynamic
  Type to 200% is a stated requirement and what fits at 100% will not at
  200%.
  The clamp is applied through a `--clamp-lines` custom property plus a
  static arbitrary utility rather than an inline `WebkitLineClamp`, so the
  line count stays a real, inspectable style value.
  The full text is always in the DOM even while clamped, so it stays findable
  and readable by assistive tech; the toggle carries `aria-expanded` and
  `aria-controls`. Neither direction is animated — a height transition on
  unknown content is the classic source of jank. Uncontrolled by default,
  controlled when `expanded` is supplied. It sets the clamp, not the
  typography.
- **CopyField** — the three payloads that exist to be copied and never typed:
  the PIX copy-and-paste code (which the design puts *above* the QR, because
  that is how people pay on a phone in Brazil), the WhatsApp message shown in
  full before leaving the app, and the support error reference.
  `value` is always the exact string that reaches the clipboard; `display`
  is what the user sees, which is how the WhatsApp case can render a
  formatted bubble without risking a formatted string being pasted.
  `code` is a monospace block on the field surface that **wraps at any
  point** (`overflow-wrap: anywhere`) and scrolls after about four lines —
  the payload is never visually truncated, because a truncated code is a
  failed payment. `text` is the message bubble (photo radius with one corner
  tightened) with a ghost action; `inline` is the small monospace reference
  with a `copy` icon button.
  Copying goes through `navigator.clipboard.writeText` with a
  `document.execCommand` fallback, and **failure is surfaced** in an
  `role="alert"` line rather than silently doing nothing — clipboard access
  needs a secure context and can simply be refused. Success swaps the button
  to `copiedLabel` with a `check` for ~2s *and* announces it through an
  `aria-live="polite"` region, since a purely visual confirmation does not
  exist for a screen reader.
- **Divider** — the two separator shapes the design repeats: a plain hairline
  (between switch rows in the filter sheet, between blocks on the
  transparency screen) and a labelled one (the `ou` between the credential
  form and the social buttons). Small, but exactly the case
  `.refs/conventions.md` names — a piece that is going to appear again gets
  extracted from the start instead of being hand-written per screen.
  One token, `--color-border`, is used for every rule; there is deliberately
  no `tone` prop, because a divider that can be two different greys stops
  being a system decision and becomes a per-screen one.
  Unlabelled renders a real `<hr>` (correct semantics for free); labelled has
  to be a `div role="separator"`, since an `<hr>` cannot contain text — that
  branch carries biome suppressions for the splitter-oriented a11y rules
  (`aria-valuenow` and focusability apply to a resizable splitter, not to a
  static rule). `orientation="vertical"` stretches to the parent's height and
  is `aria-hidden`, because the one place the design uses it is a decorative
  header lockup. The component carries **no margin of its own**: spacing
  belongs to the layout that places it.
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
- **StickyActionBar** — the bottom action area outside a sheet: the listing
  detail's "Tenho interesse" bar (which the design says never leaves the
  screen), every publish step's "Continuar", and the adoption form's
  "Voltar"/"Continuar" pair. The protection gradient was already a written
  rule living *inside* `BottomSheet`; making this a component is what stops
  it being copy-pasted into six screens, and `BottomSheet` now consumes the
  same `protectionGradient()` helper so the rule exists once.
  It is `position: sticky`, not `fixed`, so it participates in its scroll
  container instead of fighting the `TabBar` — and it deliberately knows
  nothing about the tab bar: where both are present the consumer stacks them.
  There is **no shadow and no border**; the gradient is the entire separation
  device. Children lay out as a row, with `[&>button]:flex-1` so the primary
  action takes the remaining width and `[&>button.size-11]:flex-none` so an
  `IconButton` beside it stays at its 44 tap target. It is a layout container
  and nothing more: it never traps scroll or captures focus.
- **StatusTimeline** — the ordered state history the library had no way to
  express. It covers two screens in opposite directions with one component:
  the adoption application seen backwards by the adopter (interesse enviado →
  ONG aceitou → formulário → entrevista → decisão) and the forward-looking
  "O QUE ACONTECE AGORA" explainer, which is the same vertical rail with
  numbered steps. This is the screen where the whole funnel becomes legible,
  and the design requires the record to survive after the conversation moves
  to WhatsApp.
  It renders an `<ol>`, because the sequence *is* the meaning. Each event has
  a marker — `marker="check"` gives a filled `--color-brand` dot with an
  `on-brand-strong` `check` for `done`, a hollow brand ring for `current` and
  a `gray-6` dot for `pending`; `marker="number"` swaps the glyph for the
  step number. The connector between two events takes its colour from the
  **lower** event: grey above a `pending` step, brand above a reached one.
  State is never colour alone: `done` carries the glyph, `current` carries a
  distinct ring shape, and every event appends its state in words to the
  accessible name. Terminal outcomes (`recusada`, `desistiu`, `expirada`) end
  the list with a final event rather than adding a fourth marker state — the
  `Badge` above the timeline carries that.
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
menu, tooltip, data table, breadcrumbs) are documented
in the design doc but not yet built as components — they're compositions of
the atomic pieces above plus page-level state (routing, focus trapping) that
doesn't belong in this library's atomic component set. Build them here, not as
ad hoc screen CSS, when a consuming app needs one.

`BottomSheet` (overlay) and `StepProgress` (the "stepper") are now built —
`BottomSheet` still leaves focus trapping and scroll locking to the consumer.
