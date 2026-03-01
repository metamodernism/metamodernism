# Oblique Strategies — Implementation Plan

A single-page card site inspired by Brian Eno & Peter Schmidt's Oblique Strategies.
Built with vanilla HTML, CSS, and JavaScript (no frameworks), consistent with the rest of this repo.

---

## 1. Project Structure

```
oblique-strategies/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
    └── paper-texture.webp   (tileable uncoated card-stock texture)
```

One HTML file, one CSS file, one JS file. No build step.

---

## 2. Page & Card Composition

### 2a. Dark Background Stage
- **Page background:** deep black/near-black (`#111` or `#0a0a0a`), inspired by the classic Oblique Strategies black box.
- The card floats centred on this dark stage, creating strong contrast — like pulling a card from the deck.
- Subtle vignette or radial gradient to draw the eye inward to the card.

### 2b. The Card — Paper Finish
- Card is cream / off-white (`#f5f0e8`) with a visible **uncoated paper grain texture** overlaid via CSS.
- Texture layer: a tileable paper-stock image as `background-image`, blended with `background-blend-mode: multiply` at low opacity.
- CSS noise overlay via a tiny inline SVG `feTurbulence` filter for fine tactile grain.
- Soft `box-shadow` on multiple layers for realistic depth — the card should feel like it's sitting on a dark surface:
  ```
  box-shadow:
    0 1px 2px rgba(0,0,0,0.15),
    0 4px 12px rgba(0,0,0,0.25),
    0 20px 60px rgba(0,0,0,0.35);
  ```
- Very slight `border-radius` (~2–3px) — real cards aren't sharp but aren't rounded either.
- Card aspect ratio: roughly **2.5 × 3.5** (standard playing card proportion), sized responsively using `clamp()` or viewport units.

### 2c. Debossed Silver Typography (strategy text)
- The strategy prompt text is **centred** on the card, vertically and horizontally.
- **Debossed silver effect** achieved purely in CSS:
  - `color: transparent` with a silver metallic gradient (`linear-gradient(145deg, #c0c0c0, #e8e8e8, #a8a8a8, #d4d4d4)`) applied via `background-clip: text`.
  - Inner shadow simulation: `text-shadow` with a **light highlight 1px up-left** and a **dark shadow 1px down-right** to create the pressed-into-paper illusion.
  - The gradient angle shifts subtly on hover/tap for a foil-like shimmer.
- Font size: responsive, ~1.2–1.6rem depending on text length.
- Line-height generous (~1.6) for multi-line prompts.

### 2d. Corner Labels (GT America Mono)
- Four text elements positioned in each corner of the card, referencing the Data-Orbit business card layout from the reference images.
- Positioned with `position: absolute` + small inset (`~24px` from edges).
- **Font:** GT America Mono, loaded via `@font-face` with fallback stack: `"GT America Mono", "SF Mono", "Cascadia Code", "Courier New", monospace`.
- **Style:** uppercase, letter-spaced (`0.08em`), very small (`0.6–0.7rem`), muted colour (`rgba(0,0,0,0.35)`) so they feel printed on the stock, not overlaid.
- Suggested positions:
  - **Top-left** — Title / brand (e.g. "OBLIQUE STRATEGIES")
  - **Top-right** — Navigation or info link
  - **Bottom-left** — Edition or category
  - **Bottom-right** — Card number or action (e.g. "SHUFFLE")

### 2e. Optional: Category Label (bottom centre)
- Inspired by the "SELF PRACTICE" label in reference image 2.
- A small centred label beneath the main text, separated by a dot or thin rule.
- Same GT America Mono styling as corners.

---

## 3. Card Movement / Shuffle Animation

Triggered by tapping/clicking the card or the "Shuffle" corner label.

### Animation Sequence (~500ms total):

1. **Lift** (0–100ms): Current card scales up very slightly (`scale(1.02)`) and shadow deepens — the card lifts off the surface.
2. **Exit** (100–300ms): Card slides upward (`translateY(-40px)`) while fading out (`opacity → 0`). A very subtle rotation (`rotate(-1deg)`) adds organic movement — like flicking a card off the top of a deck.
3. **Swap** (at 250ms): JS updates the text content while the card is invisible.
4. **Enter** (300–500ms): New card fades in (`opacity 0 → 1`) and slides up from below (`translateY(30px) → translateY(0)`) with a gentle settle. Shadow returns to resting state.

### Implementation:
- CSS `@keyframes` for `card-exit` and `card-enter`.
- JS listens for click, applies `card-exit` class, swaps text on `animationend`, then applies `card-enter` class.
- `cubic-bezier(0.22, 1, 0.36, 1)` easing for a smooth, slightly springy feel.
- No card is ever visually duplicated — it's always one card, re-dealt.

---

## 4. Swipe-Up to Reveal "About" Underlay

### Concept
The entire card view (dark background + card) is a **sliding overlay panel**. Beneath it sits a fixed **underlay page** that explains what the Oblique Strategies are, their history, and how to use the site. Swiping the overlay upward reveals this underlay.

### HTML Structure
```html
<body>
  <!-- Underlay: always present, sits behind -->
  <section class="underlay">
    <h1>What are Oblique Strategies?</h1>
    <p>Created in 1975 by Brian Eno and Peter Schmidt...</p>
    <button class="back-to-cards">Back to cards</button>
  </section>

  <!-- Overlay: the card page, slides over the top -->
  <section class="overlay">
    <div class="card">...</div>
    <div class="drag-indicator"></div>
  </section>
</body>
```

### Interaction (JS):
- **Pointer/touch tracking:** `pointerdown` → `pointermove` → `pointerup` on the overlay.
- During drag: overlay follows the finger with `translateY(deltaY)`, clamped so it can only move upward (negative Y).
- **Snap threshold:** if dragged past ~20% of viewport height, animate fully to `translateY(-100vh)`. Otherwise, snap back to `translateY(0)`.
- **Velocity detection:** a fast flick (high velocity even if short distance) also triggers the full reveal.
- **Drag indicator:** a small horizontal pill/bar (`40px × 4px`, rounded, `rgba(255,255,255,0.3)`) centred at the bottom of the overlay, ~16px from the edge. Subtle pulse animation on idle to hint at draggability.

### Desktop Support:
- Scroll-wheel on the overlay triggers the slide (wheel-delta past threshold).
- One of the corner labels (e.g. top-right "ABOUT") can also trigger it on click.
- On the underlay, "Back to cards" button or swipe-down reverses the animation.

### CSS:
- Overlay: `position: fixed; inset: 0; transform: translateY(0); transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);`
- During drag: transition is disabled (JS applies transform directly for 1:1 tracking).
- Underlay: `position: fixed; inset: 0;` with its own styling — dark text on light background, or light text on dark, inverted from the card view for contrast.

---

## 5. Underlay Content & Design

- **Background:** warm off-white or cream (the inverse of the dark card stage).
- **Typography:** clean sans-serif body text, generous margins, comfortable reading width (~60ch).
- **Content sections:**
  - What are Oblique Strategies?
  - Brief history (Eno & Schmidt, 1975)
  - How to use this site
  - Credit / attribution
- **"Back to cards"** button styled as a minimal outlined button or text link.

---

## 6. Strategy Data

- A JavaScript array of strategy strings in `app.js`.
- Source: the classic ~115 prompts from the widely-reproduced fifth edition, or placeholder custom prompts (to confirm with you).
- Random selection with simple duplicate avoidance (track last N shown, re-pick if duplicate).
- On page load: display one random card immediately, no loading state.

---

## 7. Visual Design Summary

| Element                | Treatment                                                         |
|------------------------|-------------------------------------------------------------------|
| **Page background**    | Near-black `#0a0a0a`, subtle radial vignette                     |
| **Card background**    | Cream `#f5f0e8`, paper-stock texture, noise grain overlay         |
| **Card shadow**        | Multi-layer box-shadow for realistic float depth                  |
| **Strategy text**      | Debossed silver gradient, `background-clip: text`, ~1.4rem        |
| **Corner labels**      | GT America Mono, 0.65rem, uppercase, spaced, muted `rgba(0,0,0,0.35)` |
| **Card proportions**   | ~2.5:3.5 aspect ratio, responsive sizing                         |
| **Shuffle animation**  | Lift → slide-up exit → text swap → slide-up enter, ~500ms        |
| **Underlay background**| Warm cream `#f5f0e8` or inverted dark                             |
| **Underlay text**      | Dark body text, sans-serif, ~18px, comfortable reading width      |
| **Drag indicator**     | Small pill bar, `rgba(255,255,255,0.3)`, bottom of overlay        |

---

## 8. Execution Steps

1. **Scaffold** — Create `index.html`, `css/style.css`, `js/app.js` with base HTML structure (overlay + underlay).
2. **Dark stage + card layout** — Dark page background, centred card with correct proportions, paper texture, and depth shadow.
3. **Debossed silver type** — Style the main strategy text with metallic gradient + text-shadow deboss.
4. **Corner labels** — Position four GT America Mono labels in each corner with the right weight and spacing.
5. **Strategy data + random draw** — Populate the JS array and wire up random card display on load.
6. **Card shuffle animation** — CSS keyframes + JS click handler for the lift/exit/swap/enter sequence.
7. **Swipe-up underlay** — Pointer tracking, snap threshold, velocity detection, drag indicator, and the slide transition.
8. **Underlay content** — Style the about/history page beneath the card view.
9. **Responsive polish** — Clamp card sizing across breakpoints, touch-friendly hit targets, hover states.
10. **Commit & push.**

---

## Open Questions

- **Strategy text font:** GT America Mono for everything (cohesive), or a contrasting serif for the main card text (more visual hierarchy)?
- **Card content:** Classic Oblique Strategies prompts, or placeholder text so you can supply your own?
- **Corner label content:** What four labels do you want? (e.g. "OBLIQUE STRATEGIES" / "ABOUT" / "EDITION V" / "SHUFFLE")
- **Underlay colour scheme:** Light (cream bg, dark text) as an inversion of the card stage, or keep it dark (dark bg, light text) for continuity?
