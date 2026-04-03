# Style Brief — Laura & Marc Wedding Website

## The One Rule
Before touching any code, read this file completely.
Every design decision must be checked against this brief.

---

## Vibe
Think: editorial fashion magazine meets handmade wedding invite.
Bold and confident, not cute and pastel. Playful but not childish.
The Condesa template is the reference — study the screenshot in this folder.

---

## Typography

**Display font:** CONDESA 28 TrueType (file in this folder)
- Use for: page titles, hero names, section headers
- Always large. Never small. If it feels too big, make it bigger.
- Color: orange (#E8451A) for hero/titles, dark (#1A1A1A) for section headers

**Body font:** "DM Sans" from Google Fonts (weight 300 and 400 only)
- Use for: all body text, form labels, captions, nav items
- Never bold for body text

**Size scale:**
- Hero title (Laura & Marc): clamp(80px, 16vw, 180px)
- Section headers: clamp(48px, 8vw, 96px)  
- Body: 15-16px, line-height 1.7
- Captions / labels: 11-12px, letter-spacing 0.14em, uppercase

---

## Colors

```
--cream:       #F0EBE0   ← background, use everywhere
--orange:      #E8451A   ← primary accent, titles, CTAs, stickers
--dark:        #1A1A1A   ← body text, nav logo
--muted:       #999999   ← secondary text, captions
--white:       #FAF7F2   ← form fields, subtle contrast against cream
```

No other colors. No green. No blue. No gradients.

---

## Layout

- Max content width: 1100px, centered
- Padding: 48px on desktop, 20px on mobile
- Lots of whitespace — when in doubt, add more space
- No cards. No tiles. No boxes with borders. Content floats on cream background.
- Sections separated by whitespace only, maybe a thin 1px border max

---

## The Sticker / Blob System

This is the signature design element. Use SVG blob shapes for ALL CTAs.

A blob looks like this — an organic rounded shape, not a circle, not a rectangle:
```html
<svg viewBox="0 0 200 200" class="blob-cta">
  <path d="M 100,20 C 140,10 175,40 185,80 C 195,120 170,160 130,175 
           C 90,190 50,175 30,145 C 10,115 15,65 40,40 C 55,25 75,28 100,20 Z"/>
  <text x="100" y="108" text-anchor="middle">RSVP</text>
</svg>
```

Use blobs for:
- Main RSVP call to action on landing page
- Submit button on form
- Navigation active state indicator
- "Thank you" confirmation message decoration

Each blob should be orange (#E8451A) fill, white text, slightly rotated (2-5deg).
Make them feel alive — slightly different shapes, not copy-pasted.

---

## Navigation

- Position: centered at top
- Logo left: "Laura & Marc" in DM Sans, small, dark
- Nav items: DM Sans uppercase, small letter-spacing, orange color
- Active page: underline or small blob indicator below the text
- No background color on nav — transparent, just sits on cream
- No borders, no boxes around nav

---

## Custom Cursor

A hand-drawn heart SVG as the cursor throughout the site:
```css
cursor: url("data:image/svg+xml,...heart svg...), auto;
```
The heart should be ~24px, dark stroke, no fill (outline only), slightly tilted.

---

## Forms

- No border boxes around form fields
- Just a bottom border (1px, #1A1A1A) under each input — like a signature line
- Labels above in small uppercase caps
- Submit = orange blob sticker (see blob system above)
- After submit: hide form, show "Thank you — we can't wait to celebrate with you!" 
  in large Condesa font + a "Back to Invitation" link that reloads the page

---

## Images

- Hotel photos: use the actual files from this folder (not Unsplash)
- Display as large editorial photos — full width or 50% width, not circular
- No round cropping. No green tint overlay. Just clean photos.
- Marc & Laura photo: use on landing page, displayed large and confident

---

## What to NEVER do

- ❌ No cards or tiles with border/shadow/background
- ❌ No gradient backgrounds  
- ❌ No rounded corners on content boxes (only on blob CTAs)
- ❌ No more than 2 font families
- ❌ No colored backgrounds on sections (only cream)
- ❌ No centering body text (left-align always, except hero title)
- ❌ No placeholder Unsplash images — use files from this folder
- ❌ No emoji in UI elements
- ❌ No Comic Sans, Inter, Roboto, Arial, or system fonts

---

## Page Structure

1. **Invitation** — Hero + RSVP form
2. **Itinerary** — Program + dress codes  
3. **Logistics** — Hotels + travel + shuttle
4. **Registry** — Simple text + PayPal link

Navigation always visible, always works in both directions.
After RSVP submit → show thank you → user can navigate back to any page.

---

## The Vibe Check

Before shipping any version, ask:
- Does it look like it could be a real Squarespace Condesa template?
- Is there enough whitespace?
- Are the titles BIG enough?
- Do the blobs feel playful and alive?
- Would a creative director at a design agency be proud of this?

If any answer is no — fix it before pushing.
