# SCAiL Logo Generation Prompts

**Purpose:** Use these prompts with AI image generation tools to produce logo concepts for SCAiL (South Carolina AI Literacy). Each prompt targets a different design direction. Run all three, then select the strongest concept to refine with a designer or through additional iterations. Note: SCAiL focuses on all South Carolina communities, not just rural areas.

**The one rule that applies to every prompt:** The name must read as **SCAiL** with the lowercase "i" visually distinct. If a result spells it SCAIL, SCAL, or anything else — regenerate immediately.

---

## Prompt 1: Modern Minimal

**Design Direction:** Clean wordmark where the "i" becomes the entire story. No illustration. Pure typography with one precise design intervention.

### Prompt Text

```
Professional nonprofit logo for the organization "SCAiL". The wordmark spells exactly "SCAiL" — capital S, capital C, capital A, lowercase i, capital L. The lowercase "i" is styled as a minimal neural network node: a small filled circle for the dot, with two or three thin radiating connection lines extending from the dot in the manner of a network diagram. The lines should feel like they belong to the letter, not like an afterthought. The "i" and its node treatment are colored in bright teal (#2EC4B6). The remaining letters S, C, A, L are set in deep navy blue (#1B365D) in a clean, modern sans-serif typeface similar to Inter or Helvetica Neue. No tagline. No icon or emblem beyond the wordmark itself. White background. Flat design, no gradients, no drop shadows, no 3D effects. The overall impression is: credible nonprofit, not tech startup.
```

### Platform Recommendation

**Ideogram** (ideogram.ai) — strongest at precise text rendering and letterform accuracy. This is critical because you need the exact spelling "SCAiL" with correct capitalization.

Alternative: **DALL-E 3** via ChatGPT or the API. In the prompt, add: "Render the text exactly as written: capital S, capital C, capital A, lowercase i, capital L."

Avoid Midjourney for this prompt — Midjourney struggles with exact text spelling and capitalization control.

### Recommended Settings

- Aspect ratio: **3:1** (wide wordmark format)
- Style: Flat / Graphic / Logo
- Ideogram style tag: `--style graphic`
- Generate 4 variations per run

### What to Look For in Results

- The "i" is distinctly lowercase and visually differentiated from the other letters
- The node/circuit treatment on the "i" reads clearly at both full size and when the image is shrunk to 200px wide
- The teal "i" creates a natural focal point without overwhelming the wordmark
- The overall weight and spacing feels balanced — not cramped, not too spread out
- It looks like something you'd see on a nonprofit letterhead or grant application cover

### When to Regenerate

Regenerate if:
- The spelling is wrong (SCAIL, Scail, SCAL, SCAil, etc.)
- The "i" treatment is too complex and looks like clip art rather than a letterform
- The logo has a drop shadow, gradient, or 3D bevel effect
- It looks like a tech company logo rather than a nonprofit
- The teal and navy colors are not clearly differentiated
- A tagline was added that you didn't ask for

Refinement tip: If the letterforms are right but the "i" treatment is too heavy, add to your next prompt: "The neural node on the lowercase i should be extremely subtle — the dot of the i is the node, with only one or two hairline connection lines."

---

## Prompt 2: Community + Tech Fusion

**Design Direction:** A logo mark (icon) paired with the wordmark. The icon carries the community feel; the wordmark carries the precision. This version works best for social media avatars, favicons, and contexts where the icon alone needs to communicate the brand.

### Prompt Text

```
Professional logo for "SCAiL", a nonprofit that teaches AI literacy in rural South Carolina. The logo consists of two parts: (1) a compact icon or emblem to the left, and (2) the wordmark "SCAiL" to the right. The icon should combine two ideas — human connection and AI/technology — in a single simple mark. Suggested approach: three small human figures or silhouettes arranged in a slight arc, with thin connecting lines between them that suggest both community bonds and a network graph or circuit diagram. The figures should be highly abstracted — geometric, not illustrative. The overall icon fits in a square or circular bounding box. Colors: deep navy blue (#1B365D) for the icon and most of the wordmark, with bright teal (#2EC4B6) for the connecting lines in the icon and the lowercase "i" in "SCAiL", and warm gold (#D4A843) as an accent on one element (a node highlight or the dot of the "i"). White background. Flat vector style. No gradients. The logo should be legible and recognizable when displayed at 32x32 pixels as a favicon. Nonprofit aesthetic — approachable and trustworthy, not a startup.
```

### Platform Recommendation

**Midjourney v6** — best at icon + wordmark compositions and abstract conceptual marks. The text rendering will likely need manual correction, but the icon quality is worth it.

Midjourney prompt addition: Append `--ar 3:1 --style raw --v 6` to the end of the prompt.

Alternative: **Adobe Firefly** (firefly.adobe.com) — good for vector-adjacent outputs that can be refined in Illustrator.

### Recommended Settings

- Aspect ratio: **3:1** for the full logo lockup (icon + wordmark)
- Aspect ratio: **1:1** separately for the icon only (regenerate with just the icon description, no wordmark)
- Midjourney flags: `--ar 3:1 --style raw --v 6 --q 2`
- Generate 4 variations, then use /vary on the strongest one

### What to Look For in Results

- The icon reads as both "community" and "technology" simultaneously — it should be ambiguous enough that it could mean either, but clear enough that it means something
- The three-element abstraction (people/nodes) works as a standalone favicon at 32px
- The connecting lines in the icon and the "i" in the wordmark create visual rhyme — the same design idea appears twice, tying the icon and the text together
- The gold accent draws the eye to exactly one point without competing with the teal
- The wordmark and icon feel designed together, not assembled separately

### When to Regenerate

Regenerate if:
- The icon is too illustrative (realistic human figures, detailed hands, photorealistic elements)
- There are more than three colors present beyond the specified palette
- The icon and wordmark feel like they came from different design systems
- The connecting lines in the icon look like a spider web or nervous system rather than a network
- The favicon version (1:1 crop of the icon) is illegible or unrecognizable
- The gold accent is applied to too many elements and loses its focusing power

Refinement tip: If the icon concept is right but too detailed, add: "Simplify the icon further — it should be constructible from no more than 8 geometric shapes total."

---

## Prompt 3: SC State Pride

**Design Direction:** A logo that earns trust specifically in South Carolina by incorporating a recognizable state symbol — the palmetto, the state outline, or the crescent — into the mark. This version is strongest for community outreach materials, local partnerships, and anything shown to an audience that cares about "is this actually from South Carolina."

### Prompt Text

```
Professional logo for "SCAiL" (South Carolina AI Literacy), a nonprofit teaching AI literacy across all of South Carolina. The logo incorporates the state of South Carolina's outline — or a stylized palmetto tree silhouette — as part of the mark. Option A: The letter "A" in "SCAiL" is drawn in the rough shape of the South Carolina state outline, with the Upstate as the peak of the A and the coast as the base. Option B: A small palmetto tree silhouette sits as the dot above the lowercase "i" in "SCAiL", replacing the standard circular dot. The palmetto should be extremely simplified — 5 to 7 fronds maximum, flat and geometric. Colors: deep navy blue (#1B365D) for the primary wordmark, warm gold (#D4A843) for the palmetto or state shape element, bright teal (#2EC4B6) for the lowercase "i" stem and any secondary details. White background. Clean flat vector style, no gradients, no textures. The SC reference should feel like an earned, natural part of the design — not a clip art palmetto pasted onto a tech logo. Works as a website header and a 400x400 social media avatar.
```

### Platform Recommendation

**Ideogram** (ideogram.ai) — handles the combination of letterform modification and geographic/symbolic elements better than other platforms. Use the "Design" or "Graphic" style setting.

Alternative: **DALL-E 3** with the instruction: "This is a flat vector logo design. Render as if it were a professional SVG logo. Do not add photorealistic textures or lighting."

For the palmetto-as-dot concept specifically: Midjourney v6 handles this kind of letterform + symbol substitution well. Use `--style raw` to prevent over-stylization.

### Recommended Settings

- Aspect ratio: **3:1** for the header/wordmark version
- Aspect ratio: **1:1** for the social media avatar version (crop or regenerate with the icon centered)
- Ideogram: Style = Graphic, Color palette = Custom (enter the three hex codes)
- Generate Option A and Option B separately — they are two different design directions, not variations of the same idea
- Run 4 generations of each option

### What to Look For in Results

- The South Carolina reference is recognizable but not heavy-handed — a South Carolinian should smile when they see it, not roll their eyes
- Option A (SC outline as "A"): The letterform still reads clearly as an "A" even with the geographic shaping. If it looks like a map with letters around it rather than a letter shaped like a map, regenerate.
- Option B (palmetto as dot): The palmetto is clearly a palmetto, not a generic tree or asterisk. The stem of the "i" and the palmetto feel like one connected element.
- At social media avatar size (400x400, viewed at 50x50 on a phone), the mark still communicates something — it doesn't dissolve into noise.
- The three colors are all present but none is fighting the others for dominance. Navy leads, gold accents, teal sharpens.

### When to Regenerate

Regenerate if:
- The palmetto looks like a snowflake, asterisk, flower, or generic botanical shape
- The South Carolina state outline is present but looks like a clip art map rather than a letterform
- Any color outside the three specified colors appears (no red, no green, no orange)
- The overall logo reads as "Southern" or "country" rather than "modern South Carolina nonprofit"
- The "i" dot has been replaced but the palmetto is too large — it should be roughly the same visual weight as a standard dot
- Gradients, shadows, or textures appear

Refinement tip: If the palmetto concept is close but the tree is too ornate, specify: "The palmetto silhouette is made from a single vertical rectangle for the trunk and exactly 5 curved lines for the fronds. It is a symbol, not an illustration."

---

## After You Generate

### Step 1: Select a Direction

Run all three prompts. You are looking for one result that makes you feel "yes, that's SCAiL." Pick the direction, not the specific execution — the AI output is a starting point.

### Step 2: Verify the Spelling

Before sharing any result: confirm the wordmark reads **SCAiL** exactly. Zoom in. The lowercase "i" must be lowercase.

### Step 3: Get a Vector Version

AI image generators produce raster files (PNG, JPEG). A final logo needs to be an SVG vector file. Once you have a strong concept:

1. Share the image with a designer (Fiverr, Contra, or a local designer) and ask them to recreate it as a clean SVG.
2. Alternatively, use Adobe Illustrator's Image Trace or vectorize.io to convert the PNG, then clean it up manually.
3. Target deliverables: `scail-logo.svg`, `scail-logo-dark.svg` (white version for dark backgrounds), `scail-icon.svg` (icon only, 1:1).

### Step 4: Test It

Before finalizing, check the logo:
- On white background (light mode site header)
- On navy background (dark mode site header, email footer)
- At 32x32 pixels (favicon)
- At 400x400 pixels (social media avatar)
- Printed at 1 inch on paper (business card, flyer)
- In grayscale (will it still communicate when printed in black and white?)

### Step 5: Load It Into the Site

Once you have the SVG, drop it into `/home/user/Non-Profit/public/` and update the site's `<head>` favicon reference and the Sidebar/TopBar components to use the real logo instead of the placeholder text.

---

*These prompts were written for SCAiL in March 2026. As the brand evolves into Phase 2 (Incubator) and Phase 3 (Investment Fund), logo variants for each pillar may need to be developed as sub-brands under the SCAiL parent mark.*
