import { Link } from 'react-router-dom'
import {
  Users,
  Briefcase,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import PalmettoTree from '../components/PalmettoTree'
import SCCrescent from '../components/SCCrescent'
import SCState from '../components/SCState'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    value: '78%',
    label: 'of Americans say they have no access to AI training where they live',
  },
  {
    value: '3×',
    label: 'the earnings gap opening between AI-literate and non-AI-literate workers',
  },
  {
    value: '1st',
    label: "SCAiL is building South Carolina's first dedicated AI literacy nonprofit",
  },
]

const regions = [
  { name: 'Upstate', detail: 'Greenville · Spartanburg · Anderson' },
  { name: 'Midlands', detail: 'Columbia · Irmo · Lexington' },
  { name: 'Pee Dee', detail: 'Florence · Myrtle Beach · Marion' },
  { name: 'Lowcountry', detail: 'Charleston · Beaufort · Walterboro' },
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
      'Practical AI skills for your job, your farm, or your business. Learn tools you can use the same day you learn them.',
  },
  {
    icon: GraduationCap,
    title: 'Youth Programs',
    description:
      'Hands-on AI education for ages 14–22. Build real projects, earn portfolio pieces for college and careers.',
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

const phases = [
  {
    number: '01',
    icon: BookOpen,
    name: 'Learn',
    title: 'AI Literacy Nonprofit',
    description:
      'Free AI education in churches, libraries, and community centers across the state. Build skills. Build trust.',
    status: 'Happening now',
    active: true,
  },
  {
    number: '02',
    icon: Lightbulb,
    name: 'Build',
    title: 'Community Innovation Incubator',
    description:
      'Turn learners into founders. Hackathons, startup cohorts, and demo days rooted in SC communities.',
    status: 'Next up',
    active: false,
  },
  {
    number: '03',
    icon: TrendingUp,
    name: 'Fund',
    title: 'Community Investment Fund',
    description:
      'Back the strongest ideas with capital. Returns flow back into education — and the flywheel turns again.',
    status: 'The horizon',
    active: false,
  },
]

const impactGoals = [
  { end: 500, suffix: '+', label: 'Community members trained' },
  { end: 46, suffix: '', label: 'SC counties targeted' },
  { end: 8, suffix: '', label: 'Free courses offered' },
  { end: 50, suffix: '+', label: 'Workshops delivered' },
]

const tickerItems = [
  'All 46 counties',
  'Zero cost to attendees',
  '8 free programs',
  'No tech background required',
  'We come to you',
  'Founded in the Midlands',
  'Youth · Adults · Seniors',
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgramCard({ program }) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 hover:border-brand-teal/50 transition-all duration-300">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug flex-1">
          {program.title}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-teal/15 text-brand-teal border border-brand-teal/30 shrink-0">
          {program.level}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
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
      <section className="relative bg-gradient-to-b from-brand-navy-deep via-brand-navy to-brand-navy overflow-hidden">
        {/* Aurora blobs */}
        <div
          className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl animate-float-slow pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2EC4B6 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-20 -right-24 h-[420px] w-[420px] rounded-full opacity-15 blur-3xl animate-float-slower pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4A843 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        {/* Faint grid */}
        <div className="absolute inset-0 bg-grid-faint pointer-events-none" aria-hidden="true" />

        {/* Crescent in the sky — like the flag */}
        <SCCrescent className="absolute top-12 right-[12%] h-12 w-12 sm:h-16 sm:w-16 text-brand-gold/70 animate-pulse-soft pointer-events-none" />

        {/* Palmetto horizon line */}
        <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-[4%] pointer-events-none" aria-hidden="true">
          <PalmettoTree className="h-44 sm:h-64 w-auto text-black/30" />
          <PalmettoTree className="hidden md:block h-32 w-auto text-black/20 -mb-6" style={{ transform: 'scaleX(-1)' }} />
          <PalmettoTree className="hidden sm:block h-24 w-auto text-black/15 -mb-10" />
          <PalmettoTree className="hidden md:block h-36 w-auto text-black/20 -mb-4" />
          <PalmettoTree className="h-52 sm:h-72 w-auto text-black/30" style={{ transform: 'scaleX(-1)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-36 sm:pb-44 text-center">
          {/* Eyebrow */}
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-brand-teal text-xs sm:text-sm font-semibold tracking-widest uppercase mb-8">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              South Carolina&apos;s AI Literacy Nonprofit
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] text-balance">
              <span className="text-brand-gold">AI</span> for every corner of
              <br />
              the <span className="text-gradient-gold">Palmetto State</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
              The tools reshaping the economy shouldn&apos;t belong to a few zip codes.
              SCAiL brings free, hands-on AI education to churches, libraries, schools,
              and community centers across all 46 counties — no tech background required.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-teal-light hover:scale-[1.03] active:scale-100 transition-all duration-200 text-base shadow-lg shadow-brand-teal/25"
              >
                Explore Our Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base"
              >
                Bring SCAiL to Your Community
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Ticker strip ─────────────────────────────────────────────────── */}
      <div className="bg-brand-gold overflow-hidden py-3 select-none" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {tickerItems.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center gap-3 px-6 text-brand-navy font-bold text-sm tracking-wide uppercase whitespace-nowrap"
                >
                  {item}
                  <SCCrescent className="h-3 w-3 text-brand-navy/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. The Problem ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
                The <span className="text-brand-gold">AI</span> divide is real.
                <br className="hidden sm:block" />
                <span className="text-brand-teal"> So is the talent here.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                While tech hubs race ahead, communities across South Carolina are being
                priced out and left out — not for lack of ability, but for lack of access.
                SCAiL exists to close that gap, county by county.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 120}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <p className="text-5xl font-extrabold text-brand-navy dark:text-brand-teal mb-3">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            Sources: Pew Research, McKinsey Global Institute, SCAiL market analysis
          </p>
        </div>
      </section>

      {/* ── 4. Four regions, one mission ────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-brand-gold text-sm font-semibold tracking-widest uppercase mb-4">
                  Statewide by design
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
                  Four regions. Forty-six counties. One mission.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  From the Blue Ridge foothills to the Sea Islands, SCAiL is built to
                  reach every community in the state — starting in the Midlands, where
                  we were founded, and growing outward.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regions.map((region, i) => (
                    <Reveal key={region.name} delay={i * 80}>
                      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:bg-white/10 hover:border-brand-teal/40 transition-colors duration-200">
                        <p className="text-white font-bold mb-0.5">{region.name}</p>
                        <p className="text-slate-400 text-xs">{region.detail}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150} className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 blur-3xl opacity-30"
                  style={{ background: 'radial-gradient(circle, #2EC4B6 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <SCState className="relative h-64 sm:h-80 w-auto text-brand-teal/90 drop-shadow-2xl" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. What We Do ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                What We Do
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We meet communities where they are — in churches, libraries, community
                centers, and schools across South Carolina.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Reveal key={service.title} delay={i * 120}>
                  <div className="group flex flex-col items-start p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-teal/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full bg-white dark:bg-slate-800">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-brand-teal" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Featured Programs ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  Our Programs
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Practical, accessible, and completely free.
                </p>
              </div>
              <Link
                to="/programs"
                className="inline-flex items-center gap-1.5 text-brand-teal font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0"
              >
                See All Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program, i) => (
              <Reveal key={program.title} delay={i * 80}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. The Flywheel ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-brand-teal text-sm font-semibold tracking-widest uppercase mb-4">
                The bigger picture
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
                We&apos;re not just teaching <span className="text-brand-gold">AI</span>.
                <br />
                We&apos;re building an <span className="text-gradient-gold">engine</span>.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Education is phase one. The long game is community wealth — knowledge
                that becomes companies, companies that attract capital, and capital
                that flows right back into the classroom.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <Reveal key={phase.number} delay={i * 140}>
                  <div
                    className={`relative flex flex-col p-8 rounded-2xl border h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      phase.active
                        ? 'border-brand-teal/60 bg-gradient-to-b from-brand-teal/10 to-transparent dark:from-brand-teal/15 shadow-lg shadow-brand-teal/10'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-5xl font-extrabold ${phase.active ? 'text-brand-teal' : 'text-slate-200 dark:text-slate-700'}`}>
                        {phase.number}
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          phase.active
                            ? 'bg-brand-teal text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`h-5 w-5 ${phase.active ? 'text-brand-teal' : 'text-brand-gold'}`} />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {phase.name}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 8. Goals ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                Our Goals for 2026–2027
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                We&apos;re building something lasting. Here&apos;s what phase one looks like in numbers.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {impactGoals.map((goal, i) => (
              <Reveal key={goal.label} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-brand-navy to-brand-navy-deep border border-white/5 h-full">
                  <p className="text-4xl sm:text-5xl font-extrabold text-brand-gold mb-2">
                    <CountUp end={goal.end} suffix={goal.suffix} />
                  </p>
                  <p className="text-slate-300 text-sm leading-snug">{goal.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            Phase 1 targets. We&apos;re just getting started.
          </p>
        </div>
      </section>

      {/* ── 9. Call to Action ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-navy to-brand-navy-deep py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint pointer-events-none" aria-hidden="true" />
        {/* Palmetto night scene */}
        <SCCrescent className="absolute top-10 left-[14%] h-10 w-10 text-brand-gold/50 animate-pulse-soft pointer-events-none" />
        <div className="absolute bottom-0 left-6 sm:left-16 text-black/25 pointer-events-none" aria-hidden="true">
          <PalmettoTree className="h-48 sm:h-64 w-auto" />
        </div>
        <div className="absolute bottom-0 right-6 sm:right-16 text-black/25 pointer-events-none" aria-hidden="true">
          <PalmettoTree className="h-40 sm:h-56 w-auto" style={{ transform: 'scaleX(-1)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5 tracking-tight text-balance">
                Bring SC<span className="text-brand-gold">Ai</span>L to your community
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-10">
                A church hall, a library room, a school gym — that&apos;s all it takes.
                We bring the equipment, the curriculum, and the instructors. You bring
                the people. Zero cost, every time.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-bold px-8 py-4 rounded-xl hover:bg-brand-gold-light hover:scale-[1.03] active:scale-100 transition-all duration-200 text-base shadow-xl shadow-brand-gold/20"
              >
                Request a Workshop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
