import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Lightbulb,
  TrendingUp,
  MapPin,
  Heart,
  Users,
  Shield,
  GraduationCap,
  Mic,
  FlaskConical,
  CalendarDays,
  Mail,
  ChevronRight,
} from 'lucide-react'

// ─── The Flywheel ─────────────────────────────────────────────────────────────
const flywheel = [
  {
    phase: 1,
    title: 'AI Literacy Nonprofit',
    Icon: BookOpen,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    description:
      'We teach AI literacy in the places people already trust — churches, libraries, community centers, schools. No cost, no tech background required. Every class builds trust, and every grant we win goes straight back into reaching the next county.',
  },
  {
    phase: 2,
    title: 'Community Innovation Incubator',
    Icon: Lightbulb,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
    border: 'border-[#D4A843]/30',
    description:
      'AI-literate community members become builders. Hackathons, cohorts, and demo days turn people who just learned what AI is into founders launching real companies rooted in South Carolina.',
  },
  {
    phase: 3,
    title: 'Investment Fund / Angel Network',
    Icon: TrendingUp,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
    border: 'border-[#2EC4B6]/30',
    description:
      'We fund the strongest companies to come out of the incubator. The returns don’t leave the state — they flow back into Phase 1, paying for more free classes in more counties.',
  },
]

// ─── Values ────────────────────────────────────────────────────────────────────
const values = [
  {
    title: 'Access over credentials',
    description:
      'You don’t need a degree, a laptop, or prior experience to learn AI here. If you can show up, we’ll teach you.',
    Icon: Users,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
  },
  {
    title: 'Trust first',
    description:
      'We show up in the places people already gather and already trust, and we keep showing up. Trust is earned before anything is asked in return.',
    Icon: Heart,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
  },
  {
    title: 'Local always',
    description:
      'This is a South Carolina organization for South Carolina communities. Every county matters, not just the ones with the most funding.',
    Icon: MapPin,
    color: 'text-[#2EC4B6]',
    bg: 'bg-[#2EC4B6]/10',
  },
  {
    title: 'Dignity in data',
    description:
      'We teach people to use AI with clear eyes about privacy, bias, and consent — never to be used by it. Understanding the tools means understanding their limits too.',
    Icon: Shield,
    color: 'text-[#D4A843]',
    bg: 'bg-[#D4A843]/10',
  },
]

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
    description: 'Research and plain-language briefings on AI in South Carolina.',
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

export default function SiteAboutPage() {
  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2EC4B6]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              About SCAiL
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto">
            Closing the AI divide across all 46 South Carolina counties.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
            SCAiL exists to build wealth and knowledge in communities that get
            overlooked — starting with free AI education, and growing into an
            incubator and investment fund that keeps the returns right here
            at home.
          </p>
        </div>
      </section>

      {/* ── 2. THE STORY ─────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#2EC4B6]">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                Why SCAiL, why South Carolina, why now.
              </h2>

              <div className="mt-6 space-y-5 text-slate-300 leading-relaxed">
                <p>
                  Joshua German grew up in Irmo, South Carolina, and graduated
                  from Dutch Fork High School. He watched the AI revolution
                  arrive fast — new tools, new jobs, new fortunes — and land
                  almost entirely in a handful of coastal tech hubs, while the
                  towns and neighborhoods he grew up around got none of it.
                </p>
                <p>
                  Not because the talent wasn&rsquo;t there. It was, and is.
                  What was missing was access: someone willing to walk into a
                  library in Williamsburg County or a church fellowship hall
                  in Orangeburg and explain, in plain language, what this
                  technology actually is and how it could work for the people
                  in the room.
                </p>
                <p>
                  So in 2026, Joshua founded SCAiL &mdash; South Carolina AI
                  Literacy &mdash; to be that access point. Not a coding
                  bootcamp, not a pitch to venture capital. A nonprofit built
                  to meet people exactly where they are, teach them what AI
                  means for their lives and livelihoods, and give them a real
                  path from learning to building to owning.
                </p>
                <p>
                  South Carolina, because it&rsquo;s home. Now, because every
                  year this gap goes unaddressed is a year of talent, ideas,
                  and wealth that leaves the state instead of building it.
                </p>
              </div>
            </div>

            {/* Founder card */}
            <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1B365D] to-[#2EC4B6] text-white text-xl font-bold mb-5">
                JG
              </div>
              <h3 className="text-lg font-bold text-white">Joshua German</h3>
              <p className="mt-1 text-sm font-semibold text-[#D4A843]">
                Founder &amp; President
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                Irmo, SC native. Dutch Fork High School graduate. Building
                SCAiL to make sure the next wave of technology builds wealth
                in South Carolina communities, not just around them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE FLYWHEEL ──────────────────────────────────────────────── */}
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
                className={`flex flex-col rounded-2xl border ${p.border} bg-white/5 backdrop-blur-sm p-8`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl ${p.bg} mb-5`}
                >
                  <p.Icon className={`w-7 h-7 ${p.color}`} />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2">
                  Phase {p.phase}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500">
            <div className="h-px flex-1 max-w-24 bg-white/10" />
            <ChevronRight className="w-5 h-5 hidden md:block" />
            <div className="h-px flex-1 max-w-24 bg-white/10 hidden md:block" />
            <ChevronRight className="w-5 h-5 hidden md:block" />
            <div className="h-px flex-1 max-w-24 bg-white/10 hidden md:block" />
            <span className="text-xs font-medium text-[#D4A843] mx-2 whitespace-nowrap">
              Reinvested into Phase 1
            </span>
            <div className="h-px flex-1 max-w-16 bg-[#D4A843]/30" />
            <ChevronRight className="w-5 h-5 text-[#D4A843] rotate-180" />
          </div>
        </div>
      </section>

      {/* ── 4. VALUES ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What We Stand For
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              The values that guide every class we teach and every decision
              we make.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-5 rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-white/20 transition-colors"
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
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE BRAND HOUSE ───────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24 border-t border-white/10">
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

      {/* ── 6. CTA BAND ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Be part of it.
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Whether you want to learn, volunteer, partner, or just stay in
            the loop &mdash; there&rsquo;s a place for you at SCAiL.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/site/newsletter"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get the Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
