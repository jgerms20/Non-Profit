import { Link } from 'react-router-dom'
import {
  Mic,
  Play,
  Headphones,
  Rss,
  Youtube,
  Apple,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Radio,
  Music2,
} from 'lucide-react'

import showData from '../../data/showEpisodes.json'

// ─── Brand Colors ────────────────────────────────────────────────────────────
// Navy: #1B365D  |  Gold: #D4A843  |  Teal: #2EC4B6  |  Surface: #1e293b

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const subscribePlatforms = [
  { key: 'spotify', label: 'Spotify', Icon: Music2 },
  { key: 'apple', label: 'Apple Podcasts', Icon: Apple },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
  { key: 'rss', label: 'RSS Feed', Icon: Rss },
]

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const isUpcoming = status === 'upcoming'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isUpcoming
          ? 'bg-[#D4A843]/10 text-[#D4A843] border border-[#D4A843]/30'
          : 'bg-[#2EC4B6]/10 text-[#2EC4B6] border border-[#2EC4B6]/30'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isUpcoming ? 'bg-[#D4A843]' : 'bg-[#2EC4B6]'
        }`}
      />
      {isUpcoming ? 'Upcoming' : 'Published'}
    </span>
  )
}

// ─── Topic Chip ──────────────────────────────────────────────────────────────
function TopicChip({ topic }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
      {topic}
    </span>
  )
}

// ─── Episode List Card ───────────────────────────────────────────────────────
function EpisodeCard({ episode }) {
  const isUpcoming = episode.status === 'upcoming'

  return (
    <div
      className={`group rounded-2xl border p-6 sm:p-7 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 ${
        isUpcoming
          ? 'border-[#D4A843]/30 bg-[#D4A843]/[0.04]'
          : 'border-white/10 bg-[#1e293b] hover:border-white/20'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Number / play block */}
        <div className="flex-shrink-0">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
              isUpcoming
                ? 'border-[#D4A843]/30 bg-[#D4A843]/10'
                : 'border-white/10 bg-gradient-to-br from-[#1B365D] to-[#2EC4B6]/40'
            }`}
          >
            {isUpcoming ? (
              <Calendar className="w-5 h-5 text-[#D4A843]" />
            ) : (
              <Play className="w-5 h-5 text-white" fill="currentColor" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Episode {episode.number}
            </span>
            <StatusBadge status={episode.status} />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#2EC4B6] transition-colors">
            {episode.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {episode.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {episode.topics.map((topic) => (
              <TopicChip key={topic} topic={topic} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {isUpcoming ? `Airs ${formatDate(episode.publishDate)}` : formatDate(episode.publishDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {episode.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ShowPage() {
  const { meta, episodes } = showData
  const featuredEpisode = episodes.find((ep) => ep.featured) || episodes[0]
  const restEpisodes = episodes.filter((ep) => ep.id !== featuredEpisode.id)

  return (
    <div>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B365D] via-[#0F172A] to-[#0F172A] pt-28 sm:pt-36 pb-20">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2EC4B6]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Mic className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-medium text-white/70 tracking-wider uppercase">
              {meta.brand}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            The Palmetto AI Show
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {meta.tagline}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2EC4B6]">
            <Radio className="w-4 h-4" />
            {meta.cadence}
          </div>

          {/* Subscribe buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {subscribePlatforms.map((platform) => (
              <a
                key={platform.key}
                href={meta.subscribeLinks[platform.key] || '#'}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30"
              >
                <platform.Icon className="w-4 h-4 text-[#D4A843]" />
                {platform.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED EPISODE ──────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {featuredEpisode.status === 'upcoming' ? 'Coming Up Next' : 'Featured Episode'}
            </span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#1e293b] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Play visual */}
              <div className="lg:col-span-2 relative flex items-center justify-center bg-gradient-to-br from-[#1B365D] to-[#2EC4B6] min-h-[220px] lg:min-h-full p-10">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
                  <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2EC4B6]">
                    Episode {featuredEpisode.number}
                  </span>
                  <StatusBadge status={featuredEpisode.status} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {featuredEpisode.title}
                </h2>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {featuredEpisode.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {featuredEpisode.topics.map((topic) => (
                    <TopicChip key={topic} topic={topic} />
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {featuredEpisode.status === 'upcoming'
                      ? `Airs ${formatDate(featuredEpisode.publishDate)}`
                      : formatDate(featuredEpisode.publishDate)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredEpisode.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ALL EPISODES ──────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] border-t border-white/5 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-3">
            <Headphones className="w-4 h-4 text-[#2EC4B6]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              The Archive
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
            Every Episode
          </h2>

          <div className="space-y-5">
            {restEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA BAND ──────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B365D] to-[#1B365D]/80" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2EC4B6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative px-8 py-16 sm:py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-6">
                <Mic className="w-8 h-8 text-[#D4A843]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Never miss an episode
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
                New conversations drop {meta.cadence.toLowerCase()}. Subscribe on your
                favorite platform, or get episode recaps straight to your inbox.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {subscribePlatforms.map((platform) => (
                  <a
                    key={platform.key}
                    href={meta.subscribeLinks[platform.key] || '#'}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200"
                  >
                    <platform.Icon className="w-4 h-4 text-[#D4A843]" />
                    {platform.label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/site/newsletter"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#1B365D] font-semibold px-8 py-3.5 shadow-lg shadow-[#D4A843]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#D4A843]/30 hover:scale-[1.02]"
                >
                  Get the Newsletter
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/site/get-involved"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium px-6 py-3 transition-all duration-200"
                >
                  Get Involved
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
