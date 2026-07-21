import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Mic,
  FlaskConical,
  CalendarDays,
  Mail,
  MapPin,
  BookOpen,
  Lightbulb,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import mediaGallery from '../../data/mediaGallery.json'
import { toneGradient, orderedImages } from '../../utils/mediaTones'

// ─── The Brand House ─────────────────────────────────────────────────────────
const brandHouse = [
  {
    name: 'SCAiL Academy',
    description: 'Free, hands-on AI courses for every South Carolinian.',
    Icon: GraduationCap,
    to: '/site/academy',
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'hover:border-[#D4A843]/40',
  },
  {
    name: 'The Palmetto AI Show',
    description: 'Weekly conversations on AI, work, and opportunity in SC.',
    Icon: Mic,
    to: '/site/show',
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'hover:border-[#2EC4B6]/40',
  },
  {
    name: 'SCAiL Institute',
    description:
      'Research and plain-language briefings on AI in South Carolina.',
    Icon: FlaskConical,
    to: '/site/institute',
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'hover:border-[#D4A843]/40',
  },
  {
    name: 'Events',
    description: 'Intro classes, workshops, and demo days near you.',
    Icon: CalendarDays,
    to: '/site/events',
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'hover:border-[#2EC4B6]/40',
  },
  {
    name: 'The Palmetto AI Brief',
    description: 'The one email keeping SC current on AI, every Tuesday.',
    Icon: Mail,
    to: '/site/newsletter',
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'hover:border-[#D4A843]/40',
  },
]

// ─── Flywheel ─────────────────────────────────────────────────────────────────
const flywheel = [
  {
    phase: 1,
    title: 'AI Literacy',
    subtitle: 'Free courses and community classes build real AI skills.',
    Icon: BookOpen,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
  },
  {
    phase: 2,
    title: 'Innovation Incubator',
    subtitle: 'AI-literate community members become founders and builders.',
    Icon: Lightbulb,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'border-[#D4A843]/30',
  },
  {
    phase: 3,
    title: 'Investment Fund',
    subtitle: 'Capital flows to the strongest ideas, then back into Phase 1.',
    Icon: TrendingUp,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
  },
]

// ─── Impact stats ─────────────────────────────────────────────────────────────
const impactStats = [
  { value: '46 Counties', label: 'Statewide reach, no community skipped' },
  { value: '8+ Free Courses', label: 'From AI 101 to a Youth Lab demo day' },
  { value: 'Weekly Show', label: 'The Palmetto AI Show, every week' },
  { value: '$2M+ Grant Target', label: 'Fueling free access for Phase 1' },
]

export default function SiteHomePage() {
  const galleryImages = orderedImages(mediaGallery)

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-24 sm:pb-32">
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2EC4B6]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              South Carolina AI Literacy
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight">
            SC<span className="text-[#D4A843]">Ai</span>L
          </h1>

          <p className="mt-6 text-2xl sm:text-3xl font-bold text-white max-w-3xl mx-auto">
            South Carolina&rsquo;s home for AI literacy.
          </p>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            We&rsquo;re closing the AI divide across all 46 counties &mdash;
            through free education, weekly media, plain-language research,
            and community events that meet people where they are.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/site/academy"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Explore the Academy
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THE BRAND HOUSE ───────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              One mission. Five ways in.
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Every part of SCAiL exists to make AI make sense for South
              Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {brandHouse.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`group flex flex-col rounded-2xl border border-white/10 ${item.border} bg-[#1e293b] p-6 transition-all duration-200 hover:shadow-xl hover:shadow-black/20`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-5`}
                >
                  <item.Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#D4A843] opacity-80 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FROM THE FIELD ────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              From the field across South Carolina.
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              A look at classes, workshops, and demo days happening in
              communities statewide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${toneGradient(
                  img.tone
                )}`}
              >
                {/* Category chip */}
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/30 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
                  {img.category}
                </span>

                {/* Bottom scrim + caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-10">
                  <p className="text-sm font-semibold text-white leading-snug">
                    {img.caption}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/70">
                    <MapPin className="w-3 h-3" />
                    {img.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FLYWHEEL + IMPACT ─────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              The Three-Phase Flywheel
            </h2>
            <p className="mt-3 text-slate-300/80 max-w-2xl mx-auto">
              Education creates founders. Founders create companies.
              Companies create wealth. Wealth funds more education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {flywheel.map((p) => (
              <div
                key={p.phase}
                className={`flex flex-col items-center text-center rounded-2xl border ${p.border} bg-white/5 backdrop-blur-sm p-8`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl ${p.bg} mb-5`}
                >
                  <p.Icon className={`w-7 h-7 ${p.color}`} />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
                  Phase {p.phase}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {p.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center mb-16 gap-2 text-slate-500">
            <div className="h-px flex-1 max-w-24 bg-white/10" />
            <ChevronRight className="w-5 h-5" />
            <div className="h-px flex-1 max-w-24 bg-white/10" />
            <ChevronRight className="w-5 h-5" />
            <div className="h-px flex-1 max-w-24 bg-white/10" />
            <span className="text-xs font-medium text-[#D4A843] ml-2">
              Reinvest
            </span>
            <div className="h-px flex-1 max-w-16 bg-[#D4A843]/30" />
            <ChevronRight className="w-5 h-5 text-[#D4A843] rotate-180" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-white/10">
            {impactStats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-300/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NEWSLETTER CTA ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4A843]/10 mb-6">
            <Mail className="w-6 h-6 text-[#D4A843]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Get The Palmetto AI Brief
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            One email, every Tuesday, on what AI means for South Carolina.
          </p>

          <form
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full sm:flex-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-400">
            No hype, no jargon &mdash; just what AI means for South Carolina.
          </p>

          <Link
            to="/site/newsletter"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2EC4B6] hover:text-[#3fd6c8] transition-colors"
          >
            See past issues of the Brief
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
