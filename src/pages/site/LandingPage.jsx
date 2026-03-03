import { Link } from 'react-router-dom'
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  GraduationCap,
  MapPin,
  DollarSign,
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react'

// ─── Featured courses (hand-picked from SCAiL originals) ─────────────────────
const featuredCourses = [
  {
    id: 'sc-1',
    title: 'AI 101: What Is AI and Why Should I Care?',
    description:
      'A plain-language introduction to AI for community members with zero experience. Hands-on ChatGPT demo included.',
    level: 'Beginner',
    duration: '90 min',
    audience: 'All ages, no experience needed',
  },
  {
    id: 'sc-2',
    title: 'AI for Your Job: Practical Skills Workshop',
    description:
      'Hands-on workshop helping working adults apply AI to real workplace tasks — resumes, emails, and job searches.',
    level: 'Beginner',
    duration: 'Half-day',
    audience: 'Working adults & job seekers',
  },
  {
    id: 'sc-6',
    title: 'Youth AI Lab: Build Your First AI Project',
    description:
      'Six-week program for ages 14-22 covering AI basics through ethics, prompt engineering, and a live demo day.',
    level: 'Beginner',
    duration: '6 weeks',
    audience: 'Ages 14-22',
  },
  {
    id: 'sc-7',
    title: 'AI Leadership Academy',
    description:
      'Eight-week program for community leaders who want to lead AI adoption in their organizations.',
    level: 'Intermediate',
    duration: '8 weeks',
    audience: 'Community leaders & entrepreneurs',
  },
]

// ─── Three Pillars ───────────────────────────────────────────────────────────
const pillars = [
  {
    phase: 1,
    title: 'AI Literacy',
    subtitle: 'Teaching communities to use AI as a tool for growth',
    Icon: BookOpen,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    glow: 'group-hover:shadow-[#2EC4B6]/20',
  },
  {
    phase: 2,
    title: 'Innovation Incubator',
    subtitle: 'Turning AI-literate community members into founders',
    Icon: Lightbulb,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'border-[#D4A843]/30',
    glow: 'group-hover:shadow-[#D4A843]/20',
  },
  {
    phase: 3,
    title: 'Investment Fund',
    subtitle: 'Funding the strongest ideas back into our communities',
    Icon: TrendingUp,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    glow: 'group-hover:shadow-[#2EC4B6]/20',
  },
]

// ─── Impact Numbers ──────────────────────────────────────────────────────────
const impactStats = [
  { value: '500+', label: 'Community Members Trained', Icon: Users },
  { value: '12', label: 'Rural Counties Reached', Icon: MapPin },
  { value: '8', label: 'Original Courses', Icon: GraduationCap },
  { value: '$2M+', label: 'Grant Funding Targeted', Icon: DollarSign },
]

// ─── Partners ────────────────────────────────────────────────────────────────
const partners = ['OpenAI', 'Google', 'IBM', 'Khan Academy', 'SmarterX']

// ─── Course Level Color ──────────────────────────────────────────────────────
function levelBadgeClass(level) {
  if (level === 'Beginner')
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
  if (level === 'Intermediate')
    return 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400'
  return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
}

// =============================================================================
// LANDING PAGE
// =============================================================================
export default function LandingPage() {
  return (
    <div className="-m-6 sm:-m-8">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A]">
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2EC4B6]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32 lg:py-40 text-center">
          {/* Logo mark */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              South Carolina AI Literacy
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
            SC
            <span className="text-[#D4A843]">Ai</span>L
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
            Closing the AI divide in rural South Carolina &mdash; transforming
            overlooked communities into hubs of innovation, entrepreneurship,
            and lasting generational wealth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Explore Our Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. THREE PILLARS ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              The Three-Phase Flywheel
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Education creates founders. Founders create companies. Companies
              create wealth. Wealth funds more education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.phase}
                className={`group relative flex flex-col items-center text-center rounded-2xl border ${p.border} bg-white dark:bg-[#1e293b] p-8 transition-all duration-300 hover:shadow-xl ${p.glow}`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl ${p.bg} mb-5`}
                >
                  <p.Icon className={`w-7 h-7 ${p.color}`} />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-2">
                  Phase {p.phase}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {p.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Flywheel arrows (visible on desktop) */}
          <div className="hidden md:flex items-center justify-center mt-6 gap-2 text-slate-300 dark:text-slate-600">
            <div className="h-px flex-1 max-w-24 bg-slate-200 dark:bg-slate-700" />
            <ChevronRight className="w-5 h-5" />
            <div className="h-px flex-1 max-w-24 bg-slate-200 dark:bg-slate-700" />
            <ChevronRight className="w-5 h-5" />
            <div className="h-px flex-1 max-w-24 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-medium text-[#D4A843] ml-2">
              Reinvest
            </span>
            <div className="h-px flex-1 max-w-16 bg-[#D4A843]/30" />
            <ChevronRight className="w-5 h-5 text-[#D4A843] rotate-180" />
          </div>
        </div>
      </section>

      {/* ── 3. IMPACT NUMBERS ────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Our Impact Targets
            </h2>
            <p className="mt-2 text-sm text-slate-300/70">
              Phase 1 goals (2026 &ndash; 2027)
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4">
                  <stat.Icon className="w-6 h-6 text-[#D4A843]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
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

      {/* ── 4. FEATURED COURSES ──────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Featured Programs
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Original SCAiL courses built for rural South Carolina
              </p>
            </div>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A843] hover:text-[#e0b856] transition-colors"
            >
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to="/curriculum"
                className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
              >
                {/* Color strip */}
                <div className="h-1.5 bg-gradient-to-r from-[#1B365D] via-[#2EC4B6] to-[#D4A843]" />

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${levelBadgeClass(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-[#2EC4B6] dark:group-hover:text-[#2EC4B6] transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                    {course.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {course.audience}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PARTNERS & SUPPORTERS ─────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#1e293b] py-14 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-8">
            Platform Partners & Supporters
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {partners.map((name) => (
              <span
                key={name}
                className="text-lg sm:text-xl font-bold text-slate-300 dark:text-slate-600 select-none"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
            Partnership discussions in progress &mdash; logos coming soon
          </p>
        </div>
      </section>

      {/* ── 6. CTA FOOTER ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to bring AI literacy to your community?
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Whether you are a community leader, educator, funder, or simply
            curious &mdash; there is a place for you at SCAiL.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
