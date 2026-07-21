import { Link } from 'react-router-dom'
import {
  HandHeart,
  Users,
  MapPin,
  Heart,
  Building2,
  Megaphone,
  ArrowRight,
  Mail,
} from 'lucide-react'

// ─── Ways to help ─────────────────────────────────────────────────────────────
const ways = [
  {
    id: 'volunteer',
    Icon: HandHeart,
    title: 'Volunteer & Teach',
    description:
      'Help run classes, mentor learners, or co-teach a session in your area of expertise. No AI background required — just a willingness to show up.',
    cta: 'Volunteer with us',
    href: 'mailto:joshua@scail.org?subject=I%20want%20to%20volunteer%20with%20SCAiL',
    accent: 'text-[#2EC4B6]',
    accentBg: 'bg-[#2EC4B6]/10',
    accentBorder: 'border-[#2EC4B6]/20',
  },
  {
    id: 'host',
    Icon: MapPin,
    title: 'Host a Class',
    description:
      'Offer a library, church, community center, or meeting room as a venue. We bring the curriculum and the instructor — you bring the space and the neighbors.',
    cta: 'Offer a venue',
    href: 'mailto:joshua@scail.org?subject=I%20want%20to%20host%20a%20SCAiL%20class',
    accent: 'text-[#D4A843]',
    accentBg: 'bg-[#D4A843]/10',
    accentBorder: 'border-[#D4A843]/20',
  },
  {
    id: 'donate',
    Icon: Heart,
    title: 'Donate',
    description:
      'Every class is free to attend. Your gift covers instructors, materials, and travel so a community that can’t pay tuition still gets the training.',
    cta: 'Make a gift',
    href: 'mailto:joshua@scail.org?subject=I%20want%20to%20donate%20to%20SCAiL',
    accent: 'text-rose-400',
    accentBg: 'bg-rose-400/10',
    accentBorder: 'border-rose-400/20',
  },
  {
    id: 'board',
    Icon: Users,
    title: 'Join the Board or Advisory',
    description:
      'Lend your expertise in nonprofit governance, education, finance, or technology. We’re building the leadership bench for all three phases of SCAiL.',
    cta: 'Explore board service',
    href: 'mailto:joshua@scail.org?subject=I%27m%20interested%20in%20board%20or%20advisory%20service',
    accent: 'text-[#2EC4B6]',
    accentBg: 'bg-[#2EC4B6]/10',
    accentBorder: 'border-[#2EC4B6]/20',
  },
  {
    id: 'corporate',
    Icon: Building2,
    title: 'Corporate & Grant Partners',
    description:
      'Sponsor a cohort, fund a county, or partner on workforce and reskilling programs. We’ll build a partnership that fits your mission and your budget.',
    cta: 'Start a partnership',
    href: 'mailto:joshua@scail.org?subject=Corporate%20or%20grant%20partnership%20inquiry',
    accent: 'text-[#D4A843]',
    accentBg: 'bg-[#D4A843]/10',
    accentBorder: 'border-[#D4A843]/20',
  },
  {
    id: 'spread',
    Icon: Megaphone,
    title: 'Spread the Word',
    description:
      'Tell your neighbors, share a class with your group chat, subscribe to the newsletter, or follow the show. The mission travels through people, not ads.',
    cta: 'See what’s happening',
    href: '/site',
    accent: 'text-rose-400',
    accentBg: 'bg-rose-400/10',
    accentBorder: 'border-rose-400/20',
  },
]

export default function GetInvolvedPage() {
  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-24 sm:pb-32">
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
            <HandHeart className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              Get Involved
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Joshua does the connecting.
            <br className="hidden sm:block" /> The community makes it real.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
            SCAiL only reaches all 46 counties because people like you open a
            door — a room, a network, a gift, a Saturday. Help us bring free
            AI literacy to your corner of South Carolina.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:joshua@scail.org"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Email us
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/site/events"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Find a class
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. WAYS TO HELP ──────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ways to Help
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              There’s a role for everyone in this mission &mdash; pick the
              one that fits what you have to give.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ways.map((way) => {
              const isInternal = way.href.startsWith('/')
              const LinkTag = isInternal ? Link : 'a'
              const linkProps = isInternal
                ? { to: way.href }
                : { href: way.href }

              return (
                <div
                  key={way.id}
                  className={`flex flex-col rounded-2xl border ${way.accentBorder} bg-[#1e293b] p-6 sm:p-8 transition-all duration-200 hover:border-white/20 hover:shadow-xl hover:shadow-black/20`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${way.accentBg} mb-5`}
                  >
                    <way.Icon className={`w-6 h-6 ${way.accent}`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {way.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {way.description}
                  </p>

                  <LinkTag
                    {...linkProps}
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${way.accent} hover:gap-2.5 transition-all`}
                  >
                    {way.cta}
                    <ArrowRight className="w-4 h-4" />
                  </LinkTag>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. WHO WE'RE LOOKING FOR ─────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-14">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4A843]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2EC4B6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-slate-300 mb-6">
                From Joshua
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Who We&rsquo;re Looking For
              </h2>

              <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
                <p>
                  I grew up in Irmo, and I&rsquo;ve seen what happens when
                  opportunity shows up in some zip codes and skips others.
                  SCAiL exists to close that gap, one classroom at a time,
                  across every one of South Carolina&rsquo;s 46 counties.
                </p>
                <p>
                  I&rsquo;m not looking for the most impressive resume in the
                  room. I&rsquo;m looking for people who care about their
                  community more than their credentials &mdash; the retired
                  teacher who knows every family in town, the pastor with a
                  fellowship hall and a full congregation, the small-business
                  owner who wants their team to keep up, the funder who
                  believes rural and underserved communities deserve a real
                  shot at this technology.
                </p>
                <p>
                  If that sounds like you, or someone you know, I want to
                  hear from you. This only works if we build it together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CONTACT BAND ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4A843]/10 border border-[#D4A843]/20 mb-6">
            <Mail className="w-7 h-7 text-[#D4A843]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Let&rsquo;s talk
          </h2>

          <p className="mt-4 text-slate-300/80 text-lg">
            Whatever brought you to this page, send it our way. There&rsquo;s
            no wrong reason to reach out.
          </p>

          <div className="mt-10">
            <a
              href="mailto:joshua@scail.org"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              <Mail className="w-5 h-5" />
              joshua@scail.org
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            A real person reads every message &mdash; usually Joshua himself.
          </p>

          <Link
            to="/site"
            className="mt-10 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to SCAiL home
          </Link>
        </div>
      </section>
    </div>
  )
}
