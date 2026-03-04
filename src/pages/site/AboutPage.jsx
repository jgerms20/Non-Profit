import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  Unlock,
  Users,
  Wrench,
  Landmark,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── Mission Statements ──────────────────────────────────────────────────────
const missionStatements = [
  {
    version: 1,
    label: 'Practical',
    usage: 'Grants, formal applications',
    text: 'The SCAiL Initiative teaches artificial intelligence skills to South Carolina communities, equipping residents with practical knowledge to improve their careers, businesses, and daily lives — while building a pipeline from education to entrepreneurship to investment.',
  },
  {
    version: 2,
    label: 'Bold',
    usage: 'Press, media, social media bios',
    text: 'Closing the AI divide in South Carolina — transforming overlooked communities into hubs of innovation, entrepreneurship, and lasting generational wealth.',
  },
  {
    version: 3,
    label: 'One-Liner',
    usage: 'Elevator pitch, intro line',
    text: 'We teach AI in South Carolina and turn that knowledge into businesses, jobs, and generational wealth.',
  },
]

// ─── Flywheel Phases ─────────────────────────────────────────────────────────
const phases = [
  {
    number: 1,
    title: 'AI Literacy Nonprofit',
    years: '2026 - 2027',
    Icon: BookOpen,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    dotColor: 'bg-[#2EC4B6]',
    details: [
      'Establish 501(c)(3) status in South Carolina',
      'Launch workshops across South Carolina counties',
      'Deliver 8 original courses to 500+ community members',
      'Build partnerships with schools, libraries, and churches',
      'Secure $2M+ in grant funding',
    ],
  },
  {
    number: 2,
    title: 'Community Innovation Incubator',
    years: '2027 - 2028',
    Icon: Lightbulb,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'border-[#D4A843]/30',
    dotColor: 'bg-[#D4A843]',
    details: [
      'Launch hackathons and innovation cohorts',
      'Provide mentorship and business resources',
      'Host demo days connecting founders with funders',
      'Turn AI-literate graduates into entrepreneurs',
    ],
  },
  {
    number: 3,
    title: 'Investment Fund',
    years: '2028 - 2030',
    Icon: TrendingUp,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    dotColor: 'bg-[#2EC4B6]',
    details: [
      'Create an angel network / micro-fund',
      'Fund the strongest companies from the incubator',
      'Generate returns for reinvestment',
      'Keep wealth circulating in the community',
    ],
  },
]

// ─── Values ──────────────────────────────────────────────────────────────────
const values = [
  {
    title: 'Access Over Exclusion',
    description: 'AI education for everyone, regardless of background.',
    Icon: Unlock,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
  },
  {
    title: 'Community Ownership',
    description: 'Built by and for the communities we serve.',
    Icon: Users,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
  },
  {
    title: 'Practical Over Theoretical',
    description: 'Real skills you can use today, not abstract concepts.',
    Icon: Wrench,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
  },
  {
    title: 'Long-Term Wealth Building',
    description: 'Not just education — economic transformation.',
    Icon: Landmark,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
  },
]

// ─── Timeline Milestones ─────────────────────────────────────────────────────
const milestones = [
  { year: '2026 Q1', text: 'SCAiL founded. 501(c)(3) application filed.' },
  { year: '2026 Q2', text: 'First community workshops launched in Williamsburg County.' },
  { year: '2026 Q3', text: 'Youth AI Lab and Small Business courses go live.' },
  { year: '2026 Q4', text: 'Train the Trainer certification program begins.' },
  { year: '2027', text: 'Expand to 12 counties across South Carolina. $2M grant milestone.' },
  { year: '2028', text: 'Innovation Incubator launches first cohort.' },
  { year: '2029', text: 'Investment fund established. First portfolio companies funded.' },
  { year: '2030', text: 'Full flywheel operational. Returns reinvested into Phase 1.' },
]

// =============================================================================
// ABOUT PAGE
// =============================================================================
export default function AboutPage() {
  return (
    <div className="-m-6 sm:-m-8">
      {/* ── 1. HEADER ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            About{' '}
            <span>
              SC<span className="text-[#D4A843]">Ai</span>L
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-300/80">
            The SCAiL Initiative &mdash; South Carolina AI Literacy
          </p>
        </div>
      </section>

      {/* ── 2. MISSION STATEMENTS ────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Our Mission &mdash; Three Perspectives
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              One mission. Three ways to say it, each suited to a different
              audience and context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missionStatements.map((m) => (
              <div
                key={m.version}
                className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1e293b] p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1B365D] text-white text-xs font-bold">
                    {m.version}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {m.label}
                    </span>
                    <span className="block text-xs text-slate-400 dark:text-slate-500">
                      {m.usage}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                  &ldquo;{m.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE STORY ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-[#1e293b]/50 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Decorative bar */}
            <div className="hidden lg:block flex-shrink-0 w-1 self-stretch rounded-full bg-gradient-to-b from-[#2EC4B6] via-[#D4A843] to-[#1B365D]" />

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                The Story
              </h2>

              <div className="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  The SCAiL Initiative was born from a simple observation: South Carolina
                  communities are being left behind in the AI revolution &mdash;
                  not because they lack talent, but because they lack access.
                </p>
                <p>
                  Founded in 2026 by{' '}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Joshua German
                  </span>
                  , The SCAiL Initiative exists to close that gap.
                </p>
                <p>
                  We started with one question:{' '}
                  <em className="text-[#D4A843] font-medium not-italic">
                    What if the communities most overlooked by technology became
                    the ones leading it?
                  </em>
                </p>
                <p>
                  That question led to a three-phase model &mdash; starting with
                  education, graduating into entrepreneurship, and ultimately
                  creating an investment ecosystem that keeps wealth circulating
                  in the communities that generate it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. THREE-PHASE FLYWHEEL ──────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              The Three-Phase Flywheel
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A self-reinforcing cycle: education funds incubation, incubation
              funds investment, investment funds more education.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <div
                key={phase.number}
                className={`relative flex flex-col lg:flex-row gap-6 rounded-2xl border ${phase.border} bg-slate-50 dark:bg-[#1e293b] p-6 sm:p-8`}
              >
                {/* Phase number + icon */}
                <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${phase.bg}`}
                  >
                    <phase.Icon className={`w-6 h-6 ${phase.color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      Phase {phase.number}
                    </span>
                    <span className="block text-xs text-slate-400 dark:text-slate-500">
                      {phase.years}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {phase.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {phase.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ChevronRight
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${phase.color}`}
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector arrow between phases */}
                {idx < phases.length - 1 && (
                  <div className="hidden lg:flex absolute -bottom-6 left-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 z-10">
                    <ArrowRight className="w-4 h-4 text-[#D4A843] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VALUES ────────────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What We Stand For
            </h2>
            <p className="mt-3 text-slate-300/70 max-w-2xl mx-auto">
              The values that guide every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-5 rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl ${v.bg}`}
                >
                  <v.Icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TIMELINE ──────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Roadmap
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Key milestones on the path from founding to full flywheel.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#2EC4B6] via-[#D4A843] to-[#1B365D]" />

            <div className="space-y-8">
              {milestones.map((m, idx) => {
                // Alternate dot color
                const dotColor =
                  idx < 4
                    ? 'bg-[#2EC4B6]'
                    : idx < 6
                    ? 'bg-[#D4A843]'
                    : 'bg-[#1B365D]'

                return (
                  <div key={idx} className="relative flex items-start gap-6 pl-12 sm:pl-16">
                    {/* Dot */}
                    <div
                      className={`absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full ${dotColor} ring-4 ring-white dark:ring-[#0F172A]`}
                    />
                    <div>
                      <span className="block text-xs font-bold tracking-wider uppercase text-[#D4A843] mb-1">
                        {m.year}
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {m.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join the Movement
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Whether you want to volunteer, partner, donate, or simply learn
            &mdash; SCAiL has a place for you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
