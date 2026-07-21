import { Link } from 'react-router-dom'
import {
  Mail,
  Check,
  Calendar,
  ArrowRight,
  Inbox,
  Mic,
  FlaskConical,
  Sparkles,
} from 'lucide-react'
import newsletter from '../../data/newsletter.json'

const { meta, issues, stats } = newsletter

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function splitSection(section) {
  const [title, ...rest] = section.split('—')
  return { title: title.trim(), description: rest.join('—').trim() }
}

// ─── Reusable signup form ────────────────────────────────────────────────────
function SignupForm({ align = 'center', size = 'lg' }) {
  const padY = size === 'lg' ? 'py-3.5' : 'py-3'
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`flex flex-col sm:flex-row items-center gap-3 w-full max-w-md ${
        align === 'center' ? 'mx-auto justify-center' : ''
      }`}
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        className={`w-full sm:flex-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-4 ${padY} text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50`}
      />
      <button
        type="submit"
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4A843] px-7 ${padY} text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors flex-shrink-0`}
      >
        Subscribe
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}

// =============================================================================
// NEWSLETTER PAGE
// =============================================================================
export default function NewsletterPage() {
  const featuredIssue = issues.find((i) => i.featured)
  const otherIssues = issues.filter((i) => !i.featured)

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-24 sm:pb-28">
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A843]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Mail className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              {meta.brand}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {meta.tagline}
          </h1>

          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2EC4B6]">
            <Calendar className="w-4 h-4" />
            {meta.cadence}
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
            <SignupForm />
            <p className="mt-4 text-xs text-slate-400">
              Free. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT'S INSIDE ─────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What&rsquo;s Inside Every Issue
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Same four sections, every Tuesday &mdash; short, useful, and
              written for South Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {meta.sections.map((section, idx) => {
              const { title, description } = splitSection(section)
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-[#D4A843]/30 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#D4A843]/10">
                    <Check className="w-4 h-4 text-[#D4A843]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. PAST ISSUES ───────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Past Issues
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Catch up on everything The Brief has covered so far.
            </p>
          </div>

          {/* Featured issue */}
          {featuredIssue && (
            <div className="mb-8 rounded-2xl border border-[#D4A843]/40 bg-gradient-to-br from-[#D4A843]/10 to-[#1e293b] p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A843]/15 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4A843]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Latest Issue
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                  Issue {featuredIssue.number}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDate(featuredIssue.publishDate)}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                {featuredIssue.title}
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-3xl">
                {featuredIssue.preview}
              </p>
            </div>
          )}

          {/* Other issues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {otherIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-white/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                    Issue {issue.number}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(issue.publishDate)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {issue.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {issue.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. GOAL BAND ─────────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#2EC4B6]/10 mb-6">
            <Inbox className="w-6 h-6 text-[#2EC4B6]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            The goal: {stats.goal}
          </h2>
          <p className="mt-4 text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
            Every subscriber is one more South Carolinian who isn&rsquo;t
            guessing about AI &mdash; they&rsquo;re getting a straight answer,
            every Tuesday. Help us get there.
          </p>
        </div>
      </section>

      {/* ── 5. CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join the Brief
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            {meta.cadence}. No hype, no jargon &mdash; just what AI means for
            South Carolina.
          </p>

          <div className="mt-10">
            <SignupForm />
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Free. Unsubscribe anytime.
          </p>

          <div className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm text-slate-400">Want more?</span>
            <Link
              to="/site/show"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2EC4B6] hover:text-[#3fd6c8] transition-colors"
            >
              <Mic className="w-4 h-4" />
              Watch the Palmetto AI Show
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/site/institute"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A843] hover:text-[#e0b856] transition-colors"
            >
              <FlaskConical className="w-4 h-4" />
              Explore the Institute
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
