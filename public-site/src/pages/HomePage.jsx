import { Link } from 'react-router-dom'
import { Users, Briefcase, GraduationCap, ArrowRight, MapPin, BookOpen, Heart } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    value: '78%',
    label: 'of rural Americans say they have no access to AI training',
  },
  {
    value: '3x',
    label: 'the economic gap between AI-literate and non-AI-literate workers',
  },
  {
    value: '0',
    label: 'AI literacy programs currently serving rural SC communities',
  },
]

const services = [
  {
    icon: Users,
    title: 'Community Workshops',
    description:
      'Free, in-person AI workshops brought directly to your community. No experience needed, all equipment provided.',
  },
  {
    icon: Briefcase,
    title: 'Skills Training',
    description:
      'Practical AI skills for your job, your farm, or your business. Learn tools you can use immediately.',
  },
  {
    icon: GraduationCap,
    title: 'Youth Programs',
    description:
      'Hands-on AI education for ages 14–22. Build real projects, earn portfolio pieces for college.',
  },
]

const programs = [
  {
    title: 'AI 101: What Is AI and Why Should I Care?',
    audience: 'All ages',
    duration: '90 min',
    level: 'Beginner',
  },
  {
    title: 'AI for Your Job: Practical Skills Workshop',
    audience: 'Working adults',
    duration: 'Half-day',
    level: 'Beginner',
  },
  {
    title: 'Youth AI Lab: Build Your First AI Project',
    audience: 'Ages 14–22',
    duration: '6 weeks',
    level: 'Beginner',
  },
  {
    title: 'AI for Small Business Owners',
    audience: 'Business owners',
    duration: '4 weeks',
    level: 'Beginner',
  },
]

const impactGoals = [
  { value: '500+', label: 'Community members trained' },
  { value: '12', label: 'Rural SC counties reached' },
  { value: '8', label: 'Free courses offered' },
  { value: '50+', label: 'Workshops delivered' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function LevelBadge({ level }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-teal/15 text-brand-teal border border-brand-teal/30">
      {level}
    </span>
  )
}

function ProgramCard({ program }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-3 hover:shadow-md hover:border-brand-teal/40 transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 text-base leading-snug flex-1">
          {program.title}
        </h3>
        <LevelBadge level={program.level} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-auto pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {program.audience}
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          {program.duration}
        </span>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, #2EC4B6 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-brand-teal text-sm font-semibold tracking-widest uppercase mb-6">
            <MapPin className="h-4 w-4" />
            South Carolina AI Literacy
          </p>

          {/* Wordmark heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-none">
            SC<span className="text-brand-gold">Ai</span>L
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
            Equipping rural South Carolina communities with the AI skills they need
            to compete, earn, and thrive — no technical background required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-brand-teal-light transition-colors duration-200 text-base shadow-lg"
            >
              View Our Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 hover:border-white transition-colors duration-200 text-base"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. The Problem ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              The AI Divide Is Real
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              While coastal tech hubs race ahead with AI, rural communities across
              South Carolina are being left behind — not because they lack talent,
              but because they lack access. SCAiL exists to close that gap.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm"
              >
                <p className="text-5xl font-extrabold text-brand-navy mb-3">
                  {stat.value}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400">
            Sources: Pew Research, McKinsey Global Institute, SCAiL market analysis
          </p>
        </div>
      </section>

      {/* ── 3. What We Do ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We Do
            </h2>
            <p className="text-lg text-slate-600">
              We meet communities where they are — in churches, libraries, community
              centers, and schools across rural South Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="flex flex-col items-start p-8 rounded-xl border border-slate-200 hover:border-brand-teal/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand-navy flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Programs ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Our Programs
              </h2>
              <p className="text-slate-600 text-lg">
                Practical, accessible, and completely free.
              </p>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-1.5 text-brand-teal font-semibold text-sm hover:text-brand-teal-light transition-colors shrink-0"
            >
              See All Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Community Impact ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Goals for 2026–2027
            </h2>
            <p className="text-slate-600 text-lg">
              We're building something lasting. Here's what we're working toward in
              our first phase.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {impactGoals.map((goal) => (
              <div
                key={goal.label}
                className="text-center p-6 rounded-xl bg-brand-navy"
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-brand-gold mb-2">
                  {goal.value}
                </p>
                <p className="text-slate-300 text-sm leading-snug">{goal.label}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400">
            Phase 1 targets. We're just getting started.
          </p>
        </div>
      </section>

      {/* ── 6. Call to Action ───────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-teal/20 mb-6">
              <Heart className="h-7 w-7 text-brand-teal" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Bring SCAiL to Your Community
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              We bring our workshops directly to communities across South Carolina.
              No cost to attendees. All equipment provided.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-bold px-8 py-4 rounded-lg hover:bg-brand-gold-light transition-colors duration-200 text-base shadow-lg"
            >
              Request a Workshop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
