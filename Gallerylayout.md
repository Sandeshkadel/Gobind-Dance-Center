# Video Gallery Layout Guidelines (13 Videos)

## Objective

Design a premium, modern, and highly organized video gallery for Gobind Dance Center showcasing **13 YouTube videos**.

The gallery should:

* Look professional and balanced.
* Avoid oversized empty spaces.
* Never crop YouTube thumbnails.
* Maintain consistent spacing and alignment.
* Support hover-to-play preview on desktop.
* Be fully responsive across all devices.
* Feel like a premium dance academy website rather than a basic video grid.

---

# Critical Requirement

## Never Crop Thumbnails

The current gallery should NEVER crop YouTube thumbnails.

Avoid:

```css
object-fit: cover;
```

This cuts off:

* Dancers
* Costumes
* Stage elements
* Thumbnail text
* Faces

Instead use:

```css
object-fit: contain;
object-position: center;
```

or

```css
object-fit: scale-down;
```

The entire thumbnail must always be visible.

---

# Video Ratio

Use YouTube's native aspect ratio:

```text
16 : 9
```

Example:

```css
aspect-ratio: 16 / 9;
```

All videos and thumbnails must maintain this ratio.

Never stretch videos.

Never force different heights.

---

# Recommended Layout

Since there are exactly **13 videos**, do NOT make all cards the same size.

Instead create a featured layout.

---

# Desktop Layout

## Row 1

Feature the newest or most important video.

```text
┌───────────────────────────────┬─────────────┬─────────────┐
│                               │             │             │
│                               │   Video 2   │   Video 3   │
│          Video 1              │             │             │
│         Featured              ├─────────────┼─────────────┤
│                               │   Video 4   │   Video 5   │
│                               │             │             │
└───────────────────────────────┴─────────────┴─────────────┘
```

Video 1 should be approximately 2x larger than regular cards.

This naturally draws attention to your best performance.

---

## Row 2

```text
┌─────────────┬─────────────┬─────────────┐
│   Video 6   │   Video 7   │   Video 8   │
├─────────────┼─────────────┼─────────────┤
│   Video 9   │  Video 10   │  Video 11   │
└─────────────┴─────────────┴─────────────┘
```

Equal-sized cards.

Perfect alignment.

---

## Row 3

```text
┌──────────────────┬──────────────────┐
│                  │                  │
│    Video 12      │    Video 13      │
│                  │                  │
└──────────────────┴──────────────────┘
```

Last row centered.

Avoid leaving a single lonely card.

Make both cards wider.

---

# Alternative Layout (Recommended)

For maximum consistency:

```text
Row 1
[ Video 1 ] [ Video 2 ] [ Video 3 ]

Row 2
[ Video 4 ] [ Video 5 ] [ Video 6 ]

Row 3
[ Video 7 ] [ Video 8 ] [ Video 9 ]

Row 4
[ Video 10 ] [ Video 11 ] [ Video 12 ]

Row 5
        [ Video 13 ]
```

However, center Video 13 and make it larger.

Example:

```text
┌───────────────────────┐
│       Video 13        │
└───────────────────────┘
```

Never leave it aligned to the left.

---

# Card Design

Each card should contain:

```text
┌──────────────────────┐
│                      │
│      Thumbnail       │
│                      │
├──────────────────────┤
│ Video Title          │
│ Optional Description │
└──────────────────────┘
```

---

# Hover Preview Behavior

Desktop only.

### Default

Show YouTube thumbnail.

### Hover

* Load YouTube iframe.
* Autoplay video.
* Mute audio.
* Smooth fade transition.

### Mouse Leave

* Stop playback.
* Destroy iframe.
* Show thumbnail again.

Do not preload all YouTube iframes.

Only load the iframe on hover.

This greatly improves performance.

---

# Responsive Layout

## Mobile (<768px)

Single column.

```text
Video 1
Video 2
Video 3
Video 4
...
Video 13
```

Each video:

* Full width
* 16:9 ratio
* No hover autoplay
* Tap to play

---

## Tablet (768px–1024px)

Two-column grid.

```text
┌────────────┬────────────┐
│  Video 1   │  Video 2   │
├────────────┼────────────┤
│  Video 3   │  Video 4   │
├────────────┼────────────┤
│  Video 5   │  Video 6   │
├────────────┼────────────┤
│  Video 7   │  Video 8   │
├────────────┼────────────┤
│  Video 9   │ Video 10   │
├────────────┼────────────┤
│ Video 11   │ Video 12   │
└────────────┴────────────┘

      Video 13
```

Center the final card.

---

## Desktop (>1024px)

Three-column layout with featured first video.

```text
Featured Section
Regular Grid
Centered Final Row
```

---

# Spacing Rules

Card Gap:

```css
24px
```

Section Padding:

```css
80px desktop
48px tablet
24px mobile
```

Card Radius:

```css
16px
```

Shadow:

```css
Soft and subtle
```

---

# Alignment Rules

Every card must:

* Have equal width.
* Use identical spacing.
* Maintain 16:9 thumbnails.
* Align titles perfectly.
* Align hover states perfectly.
* Avoid layout shifts.

---

# Final Quality Checklist

✅ No thumbnail cropping
✅ Full YouTube thumbnail visible
✅ 16:9 ratio everywhere
✅ Perfect alignment
✅ Featured first video
✅ Smooth hover preview
✅ Mobile-friendly
✅ Tablet-friendly
✅ Desktop-friendly
✅ Fast loading
✅ Premium dance academy presentation
The final gallery should feel elegant, organized, and professional while showcasing all 13 performances without making the page feel crowded or unbalanced.
