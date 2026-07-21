import { Link } from 'react-router-dom'
import {
  FlaskConical,
  FileText,
  BookOpen,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin,
  ShieldCheck,
  Sparkles,
  Mail,
  Tag,
} from 'lucide-react'

import insights from '../../data/insights.json'

const { meta, reports, articles } = insights

// ─── Category styling ────────────────────────────────────────────────────────
const categoryConfig = {
  Playbook: { text: 'text-[#D4A843]', bg: 'bg-[#D4A843]/10', border: 'border-[#D4A843]/20' },
  'Field Notes': { text: 'text-[#2EC4B6]', bg: 'bg-[#2EC4B6]/10', border: 'border-[#2EC4B6]/20' },
  Perspective: { text: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Explainer: { text: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
}
const defaultCategory = { text: 'text-slate-300', bg: 'bg-white/10', border: 'border-white/10' }

// ─── Status styling ──────────────────────────────────────────────────────────
const statusConfig = {
  'in-progress': { label: 'In Progress', text: 'text-[#D4A843]', bg: 'bg-[#D4A843]/10', border: 'border-[#D4A843]/30' },
  published: { label: 'Published', text: 'text-[#2EC4B6]', bg: 'bg-[#2EC4B6]/10', border: 'border-[#2EC4B6]/30' },
  planned: { label: 'Planned', text: 'text-slate-300', bg: 'bg-white/10', border: 'border-white/20' },
}

// ─── What We Study ───────────────────────────────────────────────────────────
const focusAreas = [
  {
    title: 'Workforce & Jobs',
    description: 'How AI is reshaping what a good job looks like across SC industries.',
    Icon: TrendingUp,
  },
  {
    title: 'Education Access',
    description: 'Who gets taught AI skills early — and who gets left to catch up.',
    Icon: BookOpen,
  },
  {
    title: 'Rural Connectivity',
    description: 'Infrastructure and access gaps outside SC’s major metros.',
    Icon: MapPin,
  },
  {
    title: 'Community Trust',
    description: 'What it takes for AI tools to earn trust in real neighborhoods.',
    Icon: ShieldCheck,
  },
]

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function ArticleCard({ article }) {
  const category = categoryConfig[article.category] || defaultCategory
  const featured = article.featured === true

  return (
    <div
      className={`group flex flex-col rounded-2xl border bg-[#1e293b] p-6 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 ${
        featured
          ? 'sm:col-span-2 border-[#D4A843]/40 hover:border-[#D4A843]/60'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${category.bg} ${category.text} ${category.border}`}
        >
          <Tag className="w-3 h-3" />
          {article.category}
        </span>
        {featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A843]/10 border border-[#D4A843]/30 px-2.5 py-1 text-xs font-semibold text-[#D4A843]">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      <h3
        className={`font-bold text-white leading-snug mb-3 group-hover:text-[#2EC4B6] transition-colors ${
          featured ? 'text-2xl' : 'text-lg'
        }`}
      >
        {article.title}
      </h3>

      <p className={`text-slate-400 leading-relaxed flex-1 ${featured ? 'text-base' : 'text-sm'}`}>
        {article.excerpt}
      </p>

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-300">{article.author}</span>
        <span>&middot;</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </span>
        <span>&middot;</span>
        <span>{formatDate(article.publishDate)}</span>
      </div>
    </div>
  )
}

export default function InstitutePage() {
  const flagship = reports[0]
  const status = flagship ? statusConfig[flagship.status] || statusConfig.planned : null

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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A843]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <FlaskConical className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              SCAiL Institute
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            {meta.tagline}
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            {meta.mission}
          </p>
        </div>
      </section>

      {/* ── 2. FLAGSHIP REPORT ───────────────────────────────────────────── */}
      {flagship && (
        <section className="bg-[#0F172A] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#D4A843]/30 bg-gradient-to-br from-[#1B365D] to-[#0F172A]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A843]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

              <div className="relative p-8 sm:p-12">
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A843]/15 border border-[#D4A843]/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D4A843]">
                    <FileText className="w-3.5 h-3.5" />
                    {flagship.type}
                  </span>
                  {status && (
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}
                    >
                      {status.label}
                    </span>
                  )}
                  <span className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                    Targeting {flagship.publishTarget}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 max-w-3xl leading-tight">
                  {flagship.title}
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
                  {flagship.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {flagship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to="/site/newsletter"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
                >
                  Get notified when it publishes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. WRITING & FIELD NOTES ─────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-16 sm:py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Writing &amp; Field Notes
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Plain-language briefings, perspectives, and dispatches from the
              communities we work in across South Carolina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE STUDY ─────────────────────────────────────────────── */}
      <section className="bg-[#1B365D] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What We Study
            </h2>
            <p className="mt-3 text-slate-300/80 max-w-2xl mx-auto">
              Four questions guide every report, article, and field note we
              publish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="flex flex-col items-start rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#D4A843]/10 mb-4">
                  <area.Icon className="w-5 h-5 text-[#D4A843]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1B365D] to-[#0F172A] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4A843]/10 mb-6">
            <Mail className="w-6 h-6 text-[#D4A843]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Get our research in your inbox
          </h2>
          <p className="mt-4 text-slate-300/80 text-lg">
            Every report and field note from the SCAiL Institute, before
            anyone else sees it.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/site/newsletter"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4A843] px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#D4A843]/25 hover:bg-[#e0b856] transition-colors"
            >
              Subscribe to the Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/site/get-involved"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Users className="w-4 h-4" />
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
