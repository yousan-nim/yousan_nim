# Design System — MASTER (Source of Truth)

**Project:** Yousan Nim — Full-Stack Developer Portfolio
**Pattern:** Portfolio Grid (visuals first, filterable, fast-loading)
**Style:** Space Glassmorphism (dark, cosmic, frosted glass) — derived from the existing theme
**Mode:** Dark-only (native `color-scheme: dark`)

> Retrieval: When building a page, read this file. If `design-system/pages/<page>.md` exists, its rules override this file.

---

## 1. Color Tokens (existing theme, kept)

Defined as CSS variables in `app/globals.css` under `:root`.

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#121212` | Page canvas (behind fixed video) |
| `--foreground` | `#ededed` | Default text |
| `--accent` | `#a855f7` (purple-500) | Primary accent — CTA glow, top-loader, focus ring |
| `--accent-2` | `#22d3ee` (cyan-400) | Secondary accent — badges, ambient glow |
| `--surface-1` | `rgba(255,255,255,0.03)` | Card base |
| `--surface-2` | `rgba(255,255,255,0.06)` | Raised card / hover |
| `--border` | `rgba(255,255,255,0.10)` | Hairline borders |
| `--border-strong` | `rgba(255,255,255,0.30)` | Hover / focus borders |

**Text opacity scale (on dark):** primary `text-white`, secondary `text-white/70`, tertiary `text-white/60`. **Do not** use below `text-white/60` for body copy that sits over the video without a scrim.

---

## 2. Glass Recipe (the one glass look)

```
rounded-2xl border border-white/10
bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
backdrop-blur-xl
shadow-[0_24px_80px_rgba(0,0,0,0.35)]
```

- **Ambient glow:** absolutely-positioned blurred purple + cyan blobs (`bg-purple-500/15`, `bg-cyan-500/15`, `blur-3xl`), `pointer-events-none`, `aria-hidden`.
- **Elevation scale:** card `shadow-[0_24px_80px_rgba(0,0,0,.35)]` → modal/sheet stronger. Keep one scale; no ad-hoc shadows.
- **Scrim rule:** any glass card carrying body text over the moving video must keep `from-white/[0.06]` (not fully transparent) so contrast stays ≥ 4.5:1.

## 3. Space Motif

- Subtle static star-field behind content (CSS radial-gradient dots, very low opacity) — set once globally, never animated (respect reduced-motion).
- Accent nebula glows only via the glass ambient blobs above. No animated starfield.

---

## 4. Typography

- **Family:** Geist Sans (loaded via `next/font`). Never override with system fonts.
- **Scale:** fluid `clamp()` — hero `clamp(40px,10vw,120px)`, h2 `clamp(24px,4vw,36px)`, body `clamp(14px,2.2vw,18px)`.
- **Weight hierarchy:** headings 600–900, body 400, labels/badges 500–600 uppercase with tracking.

## 5. Iconography (CRITICAL rule)

- **SVG only** — `react-icons` (`Si*`, `Fa*`, `Lu*`) or Lucide. **No emoji as structural icons.**
- One visual language, consistent size tokens (`icon-sm 16`, `icon-md 24`, `icon-lg 32`).

## 6. Motion Tokens

- Micro-interactions **150–300ms**, `ease-out` enter / `ease-in` exit.
- Hover cards: `-translate-y-1` + border brighten + glow, 300ms.
- **All** decorative animation (`animate-pulse`, `animate-ping`, parallax) MUST be disabled under `prefers-reduced-motion: reduce` (global CSS guard added).

## 7. Accessibility (non-negotiable)

- Global visible `:focus-visible` ring (accent, 2px + offset).
- Touch targets ≥ 44×44px (mobile). Icon-only controls need `aria-label`.
- Contrast ≥ 4.5:1 for text; never color-only meaning.
- No dead controls (every button does something or isn't a button).

## 8. Layout Tokens

- **Container:** single shared wrapper → `w-[95%] md:w-[80%] mx-auto max-w-screen-2xl`. Use everywhere (no ad-hoc `max-w-[90%]` / invalid `screen-5xl`).
- Spacing rhythm: 4/8px system. Section padding `py-20 md:py-28`.
- `min-h-dvh` over `100vh` on mobile.

## 9. Anti-Patterns (AVOID)

- Emoji icons · Arial/system font override · dead "Sign In" button · forced `grid-cols-2` on mobile · invalid Tailwind classes (`screen-5xl`) · text under video with no scrim · 25MB autoplay video on mobile.
