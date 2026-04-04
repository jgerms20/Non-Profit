import { useState } from 'react'
import { Palette, Type, Image, Layout, Printer, Share2, MessageCircle, Eye, Download, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'

const NAVY = '#1B365D'
const GOLD = '#D4A843'
const TEAL = '#2EC4B6'
const WHITE = '#FFFFFF'
const LIGHT_GRAY = '#F8FAFC'
const NEAR_BLACK = '#0F172A'
const SLATE = '#334155'

const colors = {
  primary: [
    { name: 'Deep Navy Blue', hex: NAVY, rgb: '27, 54, 93', use: 'Headers, navigation, CTAs, trust elements', text: 'white' },
    { name: 'Warm Gold', hex: GOLD, rgb: '212, 168, 67', use: 'Highlights, success indicators, warmth accents', text: NAVY },
    { name: 'Bright Teal', hex: TEAL, rgb: '46, 196, 182', use: 'AI/tech features, innovation sections, links', text: 'white' },
  ],
  neutrals: [
    { name: 'White', hex: WHITE, rgb: '255, 255, 255', use: 'Backgrounds, reversed text', text: NAVY },
    { name: 'Light Gray', hex: LIGHT_GRAY, rgb: '248, 250, 252', use: 'Section backgrounds, cards', text: NAVY },
    { name: 'Slate Text', hex: SLATE, rgb: '51, 65, 85', use: 'Body copy, secondary text', text: 'white' },
    { name: 'Near-Black', hex: NEAR_BLACK, rgb: '15, 23, 42', use: 'Dark mode backgrounds', text: 'white' },
  ],
  phases: [
    { name: 'Phase 1 — Literacy', hex: '#3B82F6', text: 'white' },
    { name: 'Phase 2 — Incubator', hex: '#22C55E', text: 'white' },
    { name: 'Phase 3 — Fund', hex: '#F59E0B', text: NAVY },
  ],
}

const typographyScale = [
  { name: 'Display / Hero', weight: 'Bold (700)', size: '48–72px', lh: '1.2', ls: '-0.02em', use: 'Page titles, hero headlines' },
  { name: 'Section Heading', weight: 'Semibold (600)', size: '28–40px', lh: '1.2', ls: '-0.02em', use: 'H2 section headers' },
  { name: 'Subheading', weight: 'Semibold (600)', size: '20–24px', lh: '1.2', ls: '0', use: 'H3 card titles, panel headers' },
  { name: 'Body', weight: 'Regular (400)', size: '15–17px', lh: '1.6', ls: '0', use: 'Paragraphs, descriptions' },
  { name: 'Caption / Label', weight: 'Medium (500)', size: '12–14px', lh: '1.2', ls: '0', use: 'Tags, metadata, timestamps' },
  { name: 'Button', weight: 'Semibold (600)', size: '14–16px', lh: '1.0', ls: '0', use: 'CTA buttons, nav items' },
]

const voiceExamples = [
  {
    context: 'Website Hero',
    text: 'Every community in South Carolina deserves to understand AI. We\'re here to make that happen — with free workshops, real-world training, and a belief that the people closest to the problem are the ones who\'ll build the best solutions.',
  },
  {
    context: 'Grant Opening',
    text: 'The SCAiL Initiative is a South Carolina-based 501(c)(3) nonprofit dedicated to delivering AI literacy education to communities across the state. Founded in 2026, SCAiL addresses the growing digital divide through hands-on workshops, community partnerships, and a curriculum built for practical application — not academic abstraction.',
  },
  {
    context: 'Social Media',
    text: 'SC, let\'s talk AI. Not the scary headlines. Not the tech bro hype. The actual tools that can help your business, your classroom, your community. That\'s what SCAiL is building. Free workshops launching soon.',
  },
  {
    context: 'Workshop Welcome',
    text: 'Welcome! Quick ground rules: there are no dumb questions here. Seriously. If you\'ve never touched AI before, you\'re in the right place. If you\'ve been using it for months, you\'re also in the right place. We\'re going to learn by doing, and by the end of today, you\'ll walk out with at least one tool you can use this week.',
  },
  {
    context: 'Press Quote',
    text: '"AI isn\'t coming to South Carolina — it\'s already here. The question is whether every community gets to participate, or just the ones that were already connected. SCAiL exists to make sure nobody gets left behind." — Joshua German, Founder',
  },
]

const logoVariants = [
  { name: 'Primary / Light', bg: '#FFFFFF', wordmark: NAVY, ai: TEAL, desc: 'Navy wordmark, Teal "Ai" on white' },
  { name: 'Primary / Dark', bg: NEAR_BLACK, wordmark: '#F1F5F9', ai: TEAL, desc: 'White wordmark, Teal "Ai" on dark' },
  { name: 'Reversed / Navy', bg: NAVY, wordmark: WHITE, ai: GOLD, desc: 'White wordmark, Gold "Ai" on navy' },
  { name: 'Gold Accent', bg: NAVY, wordmark: GOLD, ai: TEAL, desc: 'Gold wordmark, Teal "Ai" on navy' },
]

function CopyHex({ hex }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} className="inline-flex items-center gap-1 text-xs opacity-70 hover:opacity-100 transition-opacity">
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {hex}
    </button>
  )
}

function Section({ id, icon: Icon, title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-slate-200 dark:border-surface-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-6 py-4 bg-white dark:bg-surface-secondary hover:bg-slate-50 dark:hover:bg-surface-tertiary/50 transition-colors text-left"
      >
        <Icon className="h-5 w-5 text-brand-teal shrink-0" />
        <span className="font-semibold text-slate-900 dark:text-white flex-1">{title}</span>
        {open ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 bg-white dark:bg-surface-secondary">{children}</div>}
    </div>
  )
}

function WordmarkPreview({ bg, wordmark, ai, name }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-lg border border-slate-200 dark:border-surface-border p-6 flex items-center justify-center" style={{ backgroundColor: bg, minWidth: 200 }}>
        <span style={{ color: wordmark, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>
          SC<span style={{ color: ai }}>Ai</span>L
        </span>
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{name}</span>
    </div>
  )
}

export default function BrandGuidePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Brand Guide</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            SCAiL visual identity system — colors, typography, logo, voice, and application specs
          </p>
        </div>
        <a
          href="/docs/SCAiL-Brand-Guide.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors text-sm font-medium shrink-0"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* Brand Identity Hero */}
      <div className="rounded-xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a4a7a 100%)` }}>
        <div className="p-8 sm:p-12 text-center">
          <div className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            SC<span style={{ color: TEAL }}>Ai</span>L
          </div>
          <p className="text-white/60 text-sm mt-4 tracking-widest uppercase">South Carolina AI Literacy</p>
          <p className="text-white/80 mt-3 text-lg" style={{ color: GOLD }}>
            "AI Literacy for Every Community"
          </p>
        </div>
      </div>

      {/* Sections */}
      <Section id="colors" icon={Palette} title="Color System">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Primary Palette</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {colors.primary.map((c) => (
                <div key={c.hex} className="rounded-lg overflow-hidden border border-slate-200 dark:border-surface-border">
                  <div className="h-20" style={{ backgroundColor: c.hex }} />
                  <div className="p-3 bg-white dark:bg-surface-tertiary">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{c.name}</p>
                    <CopyHex hex={c.hex} />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">RGB: {c.rgb}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{c.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Neutrals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colors.neutrals.map((c) => (
                <div key={c.hex} className="rounded-lg overflow-hidden border border-slate-200 dark:border-surface-border">
                  <div className="h-12" style={{ backgroundColor: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #e2e8f0' : 'none' }} />
                  <div className="p-2 bg-white dark:bg-surface-tertiary">
                    <p className="font-medium text-xs text-slate-900 dark:text-white">{c.name}</p>
                    <CopyHex hex={c.hex} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Phase Colors</h4>
            <div className="flex gap-3">
              {colors.phases.map((c) => (
                <div key={c.hex} className="flex-1 rounded-lg overflow-hidden">
                  <div className="py-3 px-4 text-center" style={{ backgroundColor: c.hex, color: c.text }}>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs opacity-80">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Accessibility (WCAG)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left border-b border-slate-200 dark:border-surface-border">
                    <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Combination</th>
                    <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">AA Normal</th>
                    <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">AA Large</th>
                    <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Preview</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  {[
                    { combo: 'Navy on White', aa: 'Pass', aaLg: 'Pass', bg: WHITE, fg: NAVY },
                    { combo: 'White on Navy', aa: 'Pass', aaLg: 'Pass', bg: NAVY, fg: WHITE },
                    { combo: 'Gold on Navy', aa: 'Fail', aaLg: 'Pass', bg: NAVY, fg: GOLD },
                    { combo: 'Teal on White', aa: 'Fail', aaLg: 'Pass', bg: WHITE, fg: TEAL },
                  ].map((r) => (
                    <tr key={r.combo} className="border-b border-slate-100 dark:border-surface-border/50">
                      <td className="py-2">{r.combo}</td>
                      <td className={`py-2 font-medium ${r.aa === 'Pass' ? 'text-green-600' : 'text-red-500'}`}>{r.aa}</td>
                      <td className={`py-2 font-medium ${r.aaLg === 'Pass' ? 'text-green-600' : 'text-red-500'}`}>{r.aaLg}</td>
                      <td className="py-2">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: r.bg, color: r.fg, border: r.bg === WHITE ? '1px solid #e2e8f0' : 'none' }}>
                          Sample
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section id="logo" icon={Eye} title="Logo & Wordmark">
        <div className="space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The lowercase <strong className="text-brand-teal">"i"</strong> in SCAiL embeds "AI" directly into the name: SC<strong className="text-brand-teal">Ai</strong>L. It should always be visually distinguished — typically in Teal.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {logoVariants.map((v) => (
              <WordmarkPreview key={v.name} {...v} />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
              <h4 className="font-semibold text-sm text-green-700 dark:text-green-400 mb-2">Do</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>Always keep the lowercase "i"</li>
                <li>Maintain clear space equal to height of "i"</li>
                <li>Min 120px wide (digital), 1" (print)</li>
                <li>Use on approved backgrounds only</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
              <h4 className="font-semibold text-sm text-red-700 dark:text-red-400 mb-2">Don't</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>No busy photo backgrounds without backing</li>
                <li>No stretching, compressing, or shadows</li>
                <li>No recoloring outside approved palette</li>
                <li>No tagline if already in surrounding copy</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="typography" icon={Type} title="Typography">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              <strong>Inter</strong> is the sole typeface for all SCAiL digital materials. Monospace: <strong>JetBrains Mono</strong>.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-surface-border">
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Style</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Weight</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Size</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Line H.</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Preview</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {typographyScale.map((t) => {
                  const weight = t.weight.includes('700') ? 700 : t.weight.includes('600') ? 600 : t.weight.includes('500') ? 500 : 400
                  return (
                    <tr key={t.name} className="border-b border-slate-100 dark:border-surface-border/50">
                      <td className="py-2 font-medium text-slate-900 dark:text-white">{t.name}</td>
                      <td className="py-2">{t.weight}</td>
                      <td className="py-2">{t.size}</td>
                      <td className="py-2">{t.lh}</td>
                      <td className="py-2">
                        <span style={{ fontWeight: weight, fontSize: Math.min(parseInt(t.size), 24), lineHeight: t.lh, letterSpacing: t.ls }} className="text-slate-900 dark:text-white">
                          SCAiL
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="imagery" icon={Image} title="Imagery & Photography" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Style Direction</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>Real people in real settings — classrooms, community centers, libraries</li>
                <li>South Carolina landscapes when relevant</li>
                <li>Warm, natural lighting — not clinical</li>
                <li>Diverse ages, backgrounds, comfort levels with tech</li>
                <li>Technology as a tool in people's hands, not abstraction</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Treatment</h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>Corner radius: 12px (cards), 16px (hero images)</li>
                <li>Text overlay: Navy at 60–80% opacity</li>
                <li>Never logo directly on photos without solid backing</li>
                <li>No generic stock photos, watermarks, sci-fi imagery</li>
                <li>No deficit framing of communities</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="digital" icon={Layout} title="Digital Applications" defaultOpen={false}>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Button Variants</h4>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: NAVY }}>Primary</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold border" style={{ color: NAVY, borderColor: NAVY }}>Secondary</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: TEAL }}>Accent</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: GOLD, color: NAVY }}>Gold CTA</button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ color: NAVY }}>Ghost</button>
          </div>

          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-4">Card Component</h4>
          <div className="max-w-sm rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-tertiary shadow-sm p-6">
            <h3 className="font-semibold text-lg" style={{ color: NAVY }}>Card Title</h3>
            <p className="text-sm mt-2" style={{ color: SLATE }}>Body text in Inter Regular 15px. Cards use 24px padding, 12px radius, 1px border.</p>
          </div>

          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-4">Responsive Breakpoints</h4>
          <div className="flex gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">Mobile: 375px</span>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">Tablet: 768px</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">Desktop: 1280px</span>
          </div>

          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-4">Dark Mode Surface Scale</h4>
          <div className="flex gap-2">
            {[
              { name: 'Background', hex: NEAR_BLACK },
              { name: 'Surface', hex: '#1E293B' },
              { name: 'Elevated', hex: '#334155' },
              { name: 'Border', hex: '#475569' },
            ].map((s) => (
              <div key={s.name} className="flex-1 rounded-lg overflow-hidden text-center">
                <div className="h-10" style={{ backgroundColor: s.hex }} />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{s.name}</p>
                <p className="text-[10px] text-slate-400">{s.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="print" icon={Printer} title="Print Applications" defaultOpen={false}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Business Card</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">3.5" x 2" standard US. Front: Navy bg, White wordmark. Back: White bg, Navy contact info, Gold accent line.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Letterhead</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">SCAiL lockup top-left. Gold 1pt accent line. Body: Inter Regular 11pt Slate. Footer: address, phone, email, web.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Presentation Slides</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">16:9 ratio. Title: Navy bg, White wordmark, Gold accent. Content: White bg, Navy headers. SCAiL icon mark bottom-right.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-surface-tertiary">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Flyer / Handout</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Navy header bar with White wordmark. White body. Gold CTA strip. QR code to scail.org bottom-right.</p>
          </div>
        </div>
      </Section>

      <Section id="social" icon={Share2} title="Social Media" defaultOpen={false}>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Profile Assets</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-surface-border">
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Platform</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Avatar</th>
                  <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Banner</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                {[
                  { p: 'X / Twitter', a: '400x400px', b: '1500x500px' },
                  { p: 'LinkedIn', a: '400x400px', b: '1584x396px' },
                  { p: 'Facebook', a: '400x400px', b: '820x312px' },
                  { p: 'Instagram', a: '400x400px', b: 'N/A' },
                ].map((r) => (
                  <tr key={r.p} className="border-b border-slate-100 dark:border-surface-border/50">
                    <td className="py-2 font-medium">{r.p}</td>
                    <td className="py-2">{r.a}</td>
                    <td className="py-2">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Post Templates</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Quote Post', size: '1080x1080', bg: NAVY, desc: 'Navy bg, white quote text, gold marks' },
              { name: 'Stat Post', size: '1080x1080', bg: WHITE, desc: 'White bg, navy stat, teal accent' },
              { name: 'Announcement', size: '1080x1080', bg: TEAL, desc: 'Teal bg, white headline' },
              { name: 'Event', size: '1080x1350', bg: NAVY, desc: 'Photo top, white card bottom' },
            ].map((t) => (
              <div key={t.name} className="rounded-lg overflow-hidden border border-slate-200 dark:border-surface-border">
                <div className="h-16 flex items-center justify-center" style={{ backgroundColor: t.bg }}>
                  <span className="text-xs font-bold" style={{ color: t.bg === WHITE ? NAVY : WHITE }}>{t.size}</span>
                </div>
                <div className="p-2 bg-white dark:bg-surface-tertiary">
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Handle: <strong>@SCAiLorg</strong> on all platforms</p>
        </div>
      </Section>

      <Section id="voice" icon={MessageCircle} title="Brand Voice Examples" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">We Sound Like</p>
              <p className="text-xs text-green-700 dark:text-green-400">Warm, direct, empowering, honest. A neighbor who wants to help.</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-xs font-semibold text-red-800 dark:text-red-300 mb-1">We Never Sound Like</p>
              <p className="text-xs text-red-700 dark:text-red-400">Condescending, savior-complex, academic, corporate, or vague.</p>
            </div>
          </div>
          {voiceExamples.map((ex) => (
            <div key={ex.context} className="border-l-3 border-brand-teal pl-4">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{ex.context}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{ex.text}"</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center pb-4">
        SCAiL Brand Guide v1.0 — April 2026. Full PDF available for download above.
      </p>
    </div>
  )
}
