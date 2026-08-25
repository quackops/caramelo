# Theming

Caramelo ships two themes: **`caramelo`** (default — the warm amber system
`architecture.md` describes) and **`pawee`** — pawee.space's own purple
system, imported from the "Pawee Mobile Handoff" design canvas. Components
never know which theme is active; the token layer does all the work.

## How it works

`CarameloProvider` (`src/components/caramelo-provider/`) renders a `<div
data-theme={theme}>` wrapper. `src/style.css` holds a `[data-theme="pawee"]`
block that overrides every `--color-*` custom property Caramelo declares:
both the raw 12-step scales (`--color-caramelo-1..12`, `--color-gray-1..12`)
**and** the semantic aliases (`--color-brand`, `--color-surface`,
`--color-neutral`, …) that Caramelo itself defines as `var()` references to
those raw steps.

That second half is not optional, and it cost real time to learn. In theory
it should be: CSS resolves `var()` lazily against the cascaded value at the
element being styled, and `--color-brand: var(--color-caramelo-9)` is a
completely ordinary chained custom property — overriding
`--color-caramelo-9` under `[data-theme="pawee"]` should be enough for
`--color-brand` (and therefore `.bg-brand`) to pick up the new value with no
alias override needed. **In practice, this didn't hold.** Deployed and
verified against `caramelo.pawee.space` directly: `bg-brand` and
`active:bg-brand-pressed` (both one hop through an alias —
`--color-brand`/`--color-brand-pressed` → `--color-caramelo-9/10`) stayed on
Caramelo's value under the pawee theme, while `hover:bg-caramelo-11` and
direct raw-scale classes elsewhere (`border-caramelo-7`, `bg-caramelo-4`)
switched correctly. Every artifact was checked byte-for-byte — the compiled
CSS, the live production CSS, the decorator/provider JS — and all matched
intended source with no discrepancy; the two-hop alias chain simply didn't
repaint correctly in the browser rendering it, spec notwithstanding. Rather
than keep chasing why, every alias is now restated directly per theme, so
no utility class needs more than one `var()` hop under either theme. It
costs some duplication (a value like pawee's `#8a4fd3` appears in both
`--color-caramelo-9` and `--color-brand`) — that's the trade being made.

Components that (against `conventions.md`) reach for a raw scale step
directly (`bg-caramelo-4`, `text-caramelo-12`, …) still re-theme for free
off the raw-scale half of the block, no component code changes needed —
that part of the original design held up fine. It was specifically the
alias indirection that didn't.

Caramelo itself needs no override block: its values already live on
`:root` (from `@theme`), so `[data-theme="caramelo"]` would just be a
byte-for-byte duplicate. A component rendered with no `CarameloProvider` at
all still gets Caramelo — it's the true, ambient default, not just
`CarameloProvider`'s default prop value.

**Spacing, radius and type-scale tokens are not themed.** Every number in
pawee's own "Espaçamento, raio e alvo" and "Tipografia" sections matches
Caramelo's exactly (20px screen margin, 12px card gap, 20/16/28 radii, 52px
control height, 44×44 tap target, Poppins UI / Roboto 300 body). Only color
moves between themes.

## Aliases whose Caramelo *formula* wouldn't have worked anyway

Independent of the indirection problem above, some aliases needed a
genuinely different value under pawee, not just a restated one — their
Caramelo formula encodes a Caramelo-specific decision, not a universal rule:

- **`--color-on-brand-strong` / `--color-on-brand-inverse`.** Caramelo's
  formula is `on-brand-strong: var(--color-gray-1)` (dark text) because
  caramelo-9 is a *light* fill. Pawee's action color (`#8A4FD3`) is a
  mid-tone purple that needs *light* text instead — the button text in the
  handoff is `#fff`. Both tokens are `#ffffff` for pawee, or buttons would
  render unreadable dark-on-purple text.
- **`--color-warning`.** Caramelo aliases it straight to `--color-brand`
  on purpose (`architecture.md`: "warning aliases brand — the spec forbids
  amber meaning both urgent and primary action"). Pawee doesn't have that
  problem: its handoff gives urgent/donate a dedicated **sunbeam**
  (`#F2B75C`), visibly distinct from the action purple, so it's declared
  independently rather than aliased to brand.

- **`--color-brand-hover`.** `Button`'s primary hover used to reuse
  `--color-link`/caramelo-11 directly, and for Caramelo that's correct
  (verified against the design canvas). But "link/tint color" and "hover
  state of the primary fill" are different roles that only happen to share
  a value in Caramelo. Reusing caramelo-11's *formula* for pawee meant
  reusing `#B08CE8` — pawee's own link color, a purple-300 tint meant for
  text on a dark background, well past the action fill in perceived
  lightness. As a button hover it read as a jarring flash, not a subtle
  state change. `--color-brand-hover` is now its own token, set to the
  midpoint between `--color-brand` and `--color-brand-pressed` for both
  themes — Caramelo: `oklch(81.5% 0.168 80.9)` (halfway between caramelo-9
  and caramelo-10, no longer tied to caramelo-11 at all); pawee:
  `#733EAE` (RGB midpoint of `#8A4FD3` and `#5C2E8A`). The fill now
  darkens in one consistent direction — idle → hover → active/press —
  instead of brightening on hover and reversing on press.

That last point required one component change: `Badge`'s `urgent` variant
used to hardcode `border-brand`/`text-link` (coincidentally correct for
Caramelo, since warning ≡ brand there, but wrong for any theme where they
differ). It now uses `border-warning`/`text-warning`. Effect on Caramelo:
the label's exact value moves from caramelo-11 (link, 87.1% L) to caramelo-9
(warning/brand, 83.1% L) — same hue, ~4% lightness, not perceptible at
11px/600 weight. The border was already caramelo-9 either way.

## Where pawee's values came from

Sourced from the "Pawee Mobile Handoff" canvas's FUNDAMENTOS token table and
cross-checked against its BIBLIOTECA DE COMPONENTES swatches and the actual
flow screens. Directly confirmed anchors:

| Role | Value | Source |
|---|---|---|
| bg / gray-1, caramelo-1 | `#0B0714` | `space-900` |
| surface / gray-2, caramelo-2 | `#171022` | `space-700` ("card") |
| gray-3 (input/surface-2) | `rgba(255,255,255,.05)` | CAMPOS field bg |
| gray-4 | `rgba(255,255,255,.07)` | disabled button / tutor badge |
| gray-6 (border) | `rgba(255,255,255,.1)` | field/chip/icon-button border |
| gray-7 (strong border) | `rgba(255,255,255,.18)` | secondary button border |
| gray-10 (text floor) | `#8E86A0` | "terciário 55%… tom mais escuro permitido para qualquer texto" |
| gray-11 (secondary text) | `#C9C2D6` | "secundário 70%" |
| gray-12 (primary text) | `#ffffff` | "texto 100%" |
| caramelo-3 | `rgba(138,79,211,.08)` | input focus bg |
| caramelo-4 | `rgba(138,79,211,.18)` | Badge "new" bg / active icon-button bg |
| caramelo-7 | `rgba(138,79,211,.5)` | active icon-button border |
| caramelo-9 (brand) | `#8A4FD3` | `purple-400`, "ação" |
| caramelo-10 (pressed) | `#5C2E8A` | button "pressionado sem glow" |
| caramelo-11 (link) | `#B08CE8` | `purple-300`, "link" |
| success | `#3FD1A0` | named swatch |
| warning | `#F2B75C` | `sunbeam`, "doar" / urgent badge |
| danger | `#FF6B6B` | named swatch |
| whatsapp | `#25D366` | named swatch — identical to Caramelo's, theme-invariant |

Steps without a direct swatch (gray-5/8/9, caramelo-1/2/5/6/8) are
interpolated between the confirmed anchors above, following the alpha/role
progression the handoff itself uses elsewhere. If pawee's design evolves,
re-derive these against a fresh export rather than assuming they're locked.

## `key={theme}` on the provider's root

`CarameloProvider` keys its wrapper `<div>` on `theme`, so switching `theme`
on an already-mounted provider unmounts and remounts the node instead of
updating its `data-theme` attribute in place. Kept as cheap insurance
against any future flavor of "attribute changed, some descendant didn't
repaint" — but note it was tried, alone, as the fix for the alias-chain bug
above and **did not resolve it**: a fresh mount ruled out staleness/repaint
timing as the cause and was what pointed at the alias chain itself instead.
The real fix was restating every alias directly, above.

## Known gaps (deliberate, for now)

- **No button gradient/glow.** Pawee's primary button is a
  `linear-gradient(180deg,#8A4FD3,#663399)` with a purple glow shadow.
  Caramelo's spec forbids gradient fills on buttons ("sem gradiente em
  botão — cor sólida"), and `Button` has one solid-fill implementation
  shared by both themes. Pawee renders as a flat caramelo-9(pawee) fill —
  correct color, no gradient/glow. `#663399` (`purple-500`, "legado") isn't
  used anywhere in the token set as a result.
- **WhatsApp button text.** Both themes route it through
  `--color-neutral-inverse`. Caramelo's handoff never shows this text
  color explicitly (assumed dark-neutral); pawee's actual value is a
  dark green (`#062E14`), tuned to sit on the WhatsApp-green fill
  specifically, not pawee's generic dark tone (`#0B0714`). Not worth a
  dedicated `--color-on-whatsapp` token for one button's text; the
  difference is a subtle hue shift, not a contrast problem.
- **`Badge`'s `urgent` shape.** Pawee's own BIBLIOTECA DE COMPONENTES mock
  renders every badge variant, urgent included, as a soft rgba fill with no
  border. Caramelo's `Badge` renders `urgent` as outline-only, no fill, by
  design (see above), and that structural choice is shared across themes
  rather than branching per theme. Under pawee, `urgent` is therefore a
  sunbeam outline instead of pawee's literal soft-fill pill — colors are
  correct, the outline-vs-fill shape is Caramelo's, not pawee's mock.
