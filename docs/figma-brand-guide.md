# SCAiL — Figma Brand Guide Content

**Version 1.0 — April 2026**
**For use as reference while building the SCAiL brand system in Figma**

---

## 1. Brand Identity Overview

### Name
**SCAiL** — South Carolina AI Literacy

### Tagline
**"AI Literacy for Every Community"**

### Mission (Practical)
We teach people in South Carolina how AI works, how to use it, and how to build with it — starting with the communities that get overlooked first.

### Mission (Bold)
SCAiL is building the bridge between South Carolina's communities and the AI economy — through education, incubation, and investment.

### Mission (One-Liner)
AI literacy for every community in South Carolina.

### The Three Phases
1. **AI Literacy Nonprofit (501(c)(3))** — Teach communities about AI
2. **Community Innovation Incubator** — Turn learners into founders
3. **Investment Fund / Angel Network** — Fund the strongest startups, reinvest in Phase 1

### Brand Personality
- Warm, not corporate
- Direct, not academic
- Empowering, not charitable
- Honest, not performative
- South Carolina proud, not regional-only

---

## 2. Logo Usage

### Wordmark: SCAiL

**The lowercase "i" is the brand's signature.**
It embeds "AI" into the name: SC**Ai**L. The "i" should always be visually distinguished — recommended treatment is Teal `#2EC4B6` on the "Ai" letterforms.

### Figma Setup

Create these logo variants as components:

| Variant | Description |
|---|---|
| **Primary / Light** | Navy wordmark on white/light background, Teal "Ai" |
| **Primary / Dark** | White wordmark on dark background, Teal "Ai" |
| **Reversed / Navy** | White or Gold wordmark on Navy background |
| **Icon Only** | Stylized "Ai" mark for favicon, app icons, social avatars |
| **Full Lockup** | Wordmark + tagline beneath |
| **Compact Lockup** | Wordmark + tagline to the right |

### Clear Space Rules
- Minimum clear space on all sides = height of the lowercase "i"
- In Figma: create a frame with padding equal to the "i" height on all sides

### Minimum Sizes
- Digital: 120px wide (full wordmark), 32px (icon only)
- Print: 1 inch wide (full wordmark)

### Logo Do Nots
- No busy photo backgrounds without solid backing
- No recoloring outside approved palette
- No stretching, compressing, rotating, or drop shadows
- No tagline if already present in surrounding copy
- No use at sizes where "i" treatment becomes illegible

---

## 3. Color System

### Figma Color Styles to Create

#### Primary Palette
| Style Name | Hex | RGB | Token |
|---|---|---|---|
| `Brand/Navy` | `#1B365D` | 27, 54, 93 | `--color-brand-navy` |
| `Brand/Gold` | `#D4A843` | 212, 168, 67 | `--color-brand-gold` |
| `Brand/Teal` | `#2EC4B6` | 46, 196, 182 | `--color-brand-teal` |

#### Neutrals
| Style Name | Hex | RGB | Token |
|---|---|---|---|
| `Neutral/White` | `#FFFFFF` | 255, 255, 255 | — |
| `Neutral/Light Gray` | `#F8FAFC` | 248, 250, 252 | `--color-surface-light` |
| `Neutral/Slate` | `#334155` | 51, 65, 85 | `--color-surface-tertiary` |
| `Neutral/Dark` | `#1E293B` | 30, 41, 59 | `--color-surface-secondary` |
| `Neutral/Near-Black` | `#0F172A` | 15, 23, 42 | `--color-surface-primary` |

#### Phase Colors
| Style Name | Hex | Use |
|---|---|---|
| `Phase/1-Literacy` | `#3B82F6` | Phase 1 — AI Literacy Nonprofit |
| `Phase/2-Incubator` | `#22C55E` | Phase 2 — Community Incubator |
| `Phase/3-Fund` | `#F59E0B` | Phase 3 — Investment Fund |

#### Semantic Colors
| Style Name | Hex | Use |
|---|---|---|
| `Status/Success` | `#22C55E` | Completed items, positive indicators |
| `Status/Warning` | `#F59E0B` | In-progress, attention needed |
| `Status/Error` | `#EF4444` | Errors, blockers, declined |
| `Status/Info` | `#3B82F6` | Informational, neutral states |

### Color Emotion Map (for slide / page reference)
- **Navy** — Trust, education, stability, credibility
- **Gold** — South Carolina warmth, sunlight, opportunity, aspiration
- **Teal** — Innovation, technology, the future, AI

### Usage Rules
- Navy = dominant (headers, nav, primary CTAs)
- Gold = sparingly (celebrations, achievements, warmth accents)
- Teal = AI/tech features, links, innovation callouts
- Never use Gold as a large background area
- Never gradient between brand colors (palette is flat)
- Max 2 brand colors per component

### Accessibility (WCAG)
| Combo | AA Normal | AA Large | AAA |
|---|---|---|---|
| Navy on White | Pass | Pass | Pass |
| White on Navy | Pass | Pass | Pass |
| Gold on Navy | Fail | Pass | — |
| Teal on White | Fail | Pass | — |
| Gold on White | Fail | Fail | Fail |

---

## 4. Typography

### Typeface: Inter

**Inter is the sole typeface** for all SCAiL digital materials.

In Figma: Add Inter from Google Fonts. Create these text styles:

| Style Name | Weight | Size | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `Display/Hero` | Bold (700) | 48–72px | 1.2 | -0.02em | Page titles, hero headlines |
| `Display/Section` | Semibold (600) | 28–40px | 1.2 | -0.02em | H2 section headers |
| `Heading/Card` | Semibold (600) | 20–24px | 1.2 | 0 | H3 card titles, panel headers |
| `Body/Regular` | Regular (400) | 15–17px | 1.6 | 0 | Paragraphs, descriptions |
| `Body/Medium` | Medium (500) | 15–17px | 1.6 | 0 | Emphasized body text |
| `Caption/Label` | Medium (500) | 12–14px | 1.2 | 0 | Tags, metadata, timestamps |
| `Caption/AllCaps` | Medium (500) | 12px | 1.0 | 0.05–0.1em | Section labels, category tags |
| `Button/Primary` | Semibold (600) | 14–16px | 1.0 | 0 | CTA buttons, nav items |

### Monospace: JetBrains Mono
For code samples and technical content. Fallback: system monospace stack.

---

## 5. Imagery & Photography

### Style Direction
- Real people in real settings — classrooms, community centers, libraries, small businesses
- South Carolina landscapes and landmarks when relevant
- Warm, natural lighting — not clinical or stock-photo-sterile
- Diverse ages, backgrounds, and comfort levels with technology
- Show technology as a tool in people's hands, not as an abstraction

### Photography Treatment in Figma
- Default corner radius: 12px for cards, 16px for hero images
- Overlay for text on images: Navy `#1B365D` at 60–80% opacity
- Never place logo directly on a photo without a solid color backing

### Do Not Use
- Generic "hands typing on laptop" stock photos
- Photos with visible watermarks
- Overly futuristic / sci-fi imagery
- Photos that make communities look poor or helpless (deficit framing)
- AI-generated faces or uncanny imagery

### Illustration Style (if used)
- Flat, geometric, minimal — consistent with the brand's clean aesthetic
- Use only brand palette colors
- Line weight: 2px stroke for icons, 3px for larger illustrations
- Rounded corners on shapes (consistent with UI radius)

---

## 6. Iconography

### Icon System
Use **Lucide Icons** (the icon set already used in the React codebase).

### Figma Setup
Import the Lucide icon set or create components for frequently used icons:

| Icon | Name | Use |
|---|---|---|
| `LayoutDashboard` | Dashboard | Overview / home |
| `BookOpen` | Education | Phase 1 / literacy content |
| `Lightbulb` | Innovation | Phase 2 / incubator |
| `TrendingUp` | Growth | Phase 3 / investment |
| `Users` | Community | Team, contacts |
| `GraduationCap` | Learning | Curriculum, courses |
| `Scale` | Legal | Legal steps, compliance |
| `Calendar` | Calendar | Events, scheduling |
| `CheckSquare` | Tasks | Todos, checklists |
| `DollarSign` | Grants | Funding, grants |
| `Globe` | Web | Public site, online |
| `Sparkles` | AI | AI features, chatbot |
| `MessageSquare` | Messages | Communications |
| `Clock` | Timeline | Timeline, milestones |
| `Radar` | Market | Market intelligence |

### Icon Specs
- Default size: 20px (in nav), 24px (in content), 48px (in feature cards)
- Stroke width: 2px (default), 1.5px for smaller sizes
- Color: inherit from parent (usually Navy or Slate in light mode, white/gray in dark mode)
- Teal for AI-specific icons in feature callouts

---

## 7. Digital Applications

### Website Components to Build in Figma

#### Navigation Bar (Public Site)
- Background: Navy `#1B365D`
- Logo: White wordmark with Teal "Ai"
- Nav links: White text, Inter Semibold 14px
- Active state: Gold `#D4A843` underline (2px)
- Mobile: hamburger menu, slide-in panel

#### Hero Section
- Full-width, min-height 600px
- Background options: Navy solid, Navy gradient overlay on photo
- Headline: Inter Bold 48–72px, White
- Subtext: Inter Regular 18–20px, White/80%
- CTA button: Gold background, Navy text, Inter Semibold 16px, 12px radius

#### Card Component
- Background: White (light) / `#1E293B` (dark)
- Border: 1px solid `#E2E8F0` (light) / `#475569` (dark)
- Border radius: 12px
- Padding: 24px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)` (light only)
- Title: Inter Semibold 20px, Navy
- Body: Inter Regular 15px, Slate

#### Button Variants
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | Navy `#1B365D` | White | None |
| Secondary | White | Navy | 1px Navy |
| Accent | Teal `#2EC4B6` | White | None |
| Gold CTA | Gold `#D4A843` | Navy | None |
| Ghost | Transparent | Navy | None |

All buttons: Inter Semibold, 14–16px, 12px radius, 12px 24px padding, hover darkens 10%

#### Footer
- Background: Navy `#1B365D`
- Text: White/80%
- Links: White, hover Gold
- 4-column layout: Brand, Navigate, Programs, Connect
- Bottom bar: copyright + social icons

### Dark Mode
- Background: Near-black `#0F172A`
- Surface: `#1E293B`
- Elevated surface: `#334155`
- Border: `#475569`
- Primary text: `#F1F5F9`
- Secondary text: `#94A3B8`
- All brand colors remain the same

### Responsive Breakpoints
| Name | Width | Layout |
|---|---|---|
| Mobile | 375px | Single column, stacked |
| Tablet | 768px | 2-column grid |
| Desktop | 1280px | Full layout, sidebar (tracker) or wide content (public) |

---

## 8. Print Applications

### Business Card
- Size: 3.5" × 2" (standard US)
- Front: Navy background, White SCAiL wordmark centered, Teal "Ai" accent
- Back: White background, contact info in Navy, Gold accent line
- Font sizes: Name 10pt Semibold, Title 8pt Regular, Contact 7.5pt Regular

### Letterhead
- Top: SCAiL full lockup (wordmark + tagline), left-aligned
- Gold 1pt accent line beneath header
- Body area: Inter Regular 11pt, Slate
- Footer: address, phone, email, website in Inter Regular 8pt

### Presentation Slides
- Title slide: Navy background, White wordmark, Gold accent
- Content slides: White background, Navy headers, Slate body
- Accent slides: Teal background, White text (use sparingly)
- Always include SCAiL icon mark in bottom-right corner
- Use 16:9 aspect ratio

### Flyer / Workshop Handout
- Header: Navy bar with White SCAiL wordmark
- Body: White background, Navy headings, Slate text
- CTA block: Gold background strip with Navy text
- QR code to scail.org in bottom-right

---

## 9. Social Media

### Profile Assets
| Platform | Avatar | Banner Size |
|---|---|---|
| X / Twitter | Icon-only mark, 400×400px | 1500×500px |
| LinkedIn | Icon-only mark, 400×400px | 1584×396px |
| Facebook | Icon-only mark, 400×400px | 820×312px |
| Instagram | Icon-only mark, 400×400px | N/A |

### Avatar
- Navy circle background
- White "Ai" icon mark centered
- Alternative: Teal "Ai" on Navy

### Banner
- Navy background
- White SCAiL wordmark centered or left-aligned
- Tagline "AI Literacy for Every Community" beneath
- Optional: SC palmetto tree watermark at 5% opacity, right side
- Gold accent line or dot pattern

### Post Templates (Create in Figma)

#### Quote Post (1080×1080)
- Navy background
- White quote text, Inter Regular 24px
- Gold quotation marks
- Attribution in Inter Medium 14px, White/60%
- SCAiL icon mark, bottom-right

#### Stat Post (1080×1080)
- White background
- Large number in Navy, Inter Bold 96px
- Context text in Slate, Inter Regular 18px
- Teal accent line
- SCAiL icon mark, bottom-right

#### Announcement Post (1080×1080)
- Teal background
- White headline text, Inter Bold 36px
- Details in White/80%, Inter Regular 16px
- SCAiL wordmark, bottom center

#### Event Post (1080×1350 portrait)
- Top half: photo or illustration with Navy overlay
- Bottom half: White card with event details
- Gold date badge
- Navy headline, Slate details

### Handle
**@SCAiLorg** on all platforms

---

## 10. Brand Voice Examples

### Website Hero
> **Every community in South Carolina deserves to understand AI.**
> We're here to make that happen — with free workshops, real-world training, and a belief that the people closest to the problem are the ones who'll build the best solutions.

### Grant Application Opening
> The SCAiL Initiative is a South Carolina-based 501(c)(3) nonprofit dedicated to delivering AI literacy education to communities across the state. Founded in 2026, SCAiL addresses the growing digital divide through hands-on workshops, community partnerships, and a curriculum built for practical application — not academic abstraction.

### Social Media Post
> SC, let's talk AI. Not the scary headlines. Not the tech bro hype. The actual tools that can help your business, your classroom, your community. That's what SCAiL is building. Free workshops launching soon. 🌴

### Workshop Welcome
> Welcome! Quick ground rules: there are no dumb questions here. Seriously. If you've never touched AI before, you're in the right place. If you've been using it for months, you're also in the right place. We're going to learn by doing, and by the end of today, you'll walk out with at least one tool you can use this week.

### Email Newsletter
> **This Week at SCAiL**
> We ran our first AI 101 workshop in Columbia last Wednesday — 34 people showed up, asked incredible questions, and left with hands-on experience using AI tools for their jobs. Here's what we learned, and what's coming next.

### Board Communication
> Phase 1 update: We've completed 3 of our first 8 planned workshops, reaching 89 participants across the Midlands. Grant pipeline stands at $45K submitted, $12K awarded. Next quarter focus: expanding to the Lowcountry and Upstate regions.

### Press / Media Quote
> "AI isn't coming to South Carolina — it's already here. The question is whether every community gets to participate, or just the ones that were already connected. SCAiL exists to make sure nobody gets left behind." — Joshua German, Founder

---

## Figma File Structure (Recommended)

```
📁 SCAiL Brand System
├── 📄 Cover Page
├── 📁 Foundations
│   ├── 📄 Colors
│   ├── 📄 Typography
│   └── 📄 Iconography
├── 📁 Logo
│   ├── 📄 Wordmark Variants
│   ├── 📄 Icon Mark Variants
│   ├── 📄 Lockup Variants
│   └── 📄 Usage Rules (Do / Don't)
├── 📁 Components
│   ├── 📄 Buttons
│   ├── 📄 Cards
│   ├── 📄 Navigation
│   ├── 📄 Forms
│   ├── 📄 Badges & Tags
│   └── 📄 Footer
├── 📁 Templates
│   ├── 📄 Website Pages (Home, About, Programs, Team, Contact)
│   ├── 📄 Social Media (Quote, Stat, Announcement, Event)
│   ├── 📄 Business Card
│   ├── 📄 Letterhead
│   └── 📄 Presentation Slides
└── 📁 Reference
    ├── 📄 Voice & Tone
    ├── 📄 Photography Guidelines
    └── 📄 Phase System
```

---

*Reference this document while building in Figma. Every hex code, size, weight, and spacing value here matches the live SCAiL codebase. When in doubt, the code is the source of truth.*
