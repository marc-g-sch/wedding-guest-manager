# Game Brief — Marc & Laura Wedding Game

## Concept
A short Super Mario-style platformer. Marc is Mario, Laura is Princess Peach.
3 levels, ~2 minutes to complete. Built in HTML5 Canvas. Retro Game Boy aesthetic.

## Visual Style
- Game Boy Color aesthetic — pixelated, retro
- Small canvas centered on a dark background (like holding a Game Boy)
- Pixel font: "Press Start 2P" from Google Fonts
- Color palette: limited, retro — greens, creams, dark outlines

## Characters
- Mario = Marc (placeholder: orange square with "M" — photo added later)
- Princess Peach = Laura (placeholder: pink square with "L" — photo added later)
- Enemies = simple red squares (Goombas) for now

## Controls
- Desktop: arrow keys to move, spacebar or arrow up to jump
- Mobile: on-screen buttons (left, right, jump) — large enough to tap

## Levels

### Level 1 — Wolfgangsee
- Setting: lake and mountains (simple pixel art background)
- Simple platforms, 3 goombas, 10 coins to collect
- End: flagpole to grab

### Level 2 — St. Gilgen
- Setting: Austrian village
- More gaps between platforms, 5 goombas, moving platform section
- End: flagpole

### Level 3 — Ansitz Wartenfels (Castle)
- Setting: castle
- Harder jumps, moving platforms, 8 enemies
- End: Laura waiting — fireworks animation
- Win screen: "You made it! 🎉 Laura & Marc · 18.07.2026" in large font, confetti

## UI
- Top bar: Score (left) · Lives: 3 (center) · Level (right)
- Lives shown as small heart icons
- Game over screen: "Game Over" + "Try Again?" button
- Win screen: big celebration message + "Play Again?" button

## Game Feel
- Mario jumps with satisfying arc — not floaty, not too stiff
- Coins make a sound when collected (simple beep via Web Audio API)
- Death animation: Marc spins and falls off screen
- Simple background music loop (Web Audio API generated, 8-bit style)

## Technical
- Single HTML file: index.html
- No external game libraries — pure vanilla JS + HTML5 Canvas
- Must work on mobile and desktop
- Target file size: under 500kb

## Integration
- This game will be embedded in the wedding website as a 5th tab
- Build it as standalone first, embed later via iframe or copy-paste
