import { useState, useMemo } from 'react'
import {
  Radar,
  ExternalLink,
  Search,
  Filter,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Lightbulb,
  TrendingUp,
  Users,
  Handshake,
  Sparkles,
  Eye,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import marketIntelData from '../data/marketIntel.json'

const CATEGORY_CONFIG = {
  direct: {
    label: 'Direct Competitor',
    variant: 'danger',
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  adjacent: {
    label: 'Adjacent Player',
    variant: 'warning',
    icon: Eye,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  partner: {
    label: 'Potential Partner',
    variant: 'success',
    icon: Handshake,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  inspiration: {
    label: 'Inspiration',
    variant: 'purple',
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
}

const THREAT_CONFIG = {
  low: {
    label: 'Low Threat',
    variant: 'success',
    icon: ShieldCheck,
    color: 'text-green-400',
    dotColor: 'bg-green-500',
  },
  medium: {
    label: 'Medium Threat',
    variant: 'warning',
    icon: Shield,
    color: 'text-amber-400',
    dotColor: 'bg-amber-500',
  },
  high: {
    label: 'High Threat',
    variant: 'danger',
    icon: ShieldAlert,
    color: 'text-red-400',
    dotColor: 'bg-red-500',
  },
}

function WeeklyBrief({ brief }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="rounded-xl border-2 border-blue-500/30 bg-white dark:bg-surface-secondary overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-6 py-4 bg-blue-500/10 border-b border-blue-500/20 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Lightbulb className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-blue-300">
              Weekly Market Brief
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Updated {brief.date}
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        )}
      </button>

      {expanded && (
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {brief.summary}
          </p>

          {brief.keyInsights?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Key Insights
              </h4>
              <ul className="space-y-2">
                {brief.keyInsights.map((insight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CompetitorCard({ competitor }) {
  const [expanded, setExpanded] = useState(false)
  const catConfig = CATEGORY_CONFIG[competitor.category] || CATEGORY_CONFIG.adjacent
  const threatConfig = THREAT_CONFIG[competitor.threatLevel] || THREAT_CONFIG.low
  const CatIcon = catConfig.icon

  return (
    <div
      className={`rounded-xl border bg-white dark:bg-surface-secondary hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 border-slate-200 dark:border-slate-700`}
    >
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {competitor.name}
              </h4>
              {competitor.url && (
                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3 h-3" />
              <span>{competitor.location}</span>
            </div>
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={catConfig.variant}>
            <CatIcon className="w-3 h-3 mr-1" />
            {catConfig.label}
          </Badge>
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${threatConfig.dotColor}`}
            />
            <span className={`text-xs font-medium ${threatConfig.color}`}>
              {threatConfig.label}
            </span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {competitor.description}
        </p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-200 dark:border-slate-700/50 pt-4">
          {/* What they do */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
              What They Do
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {competitor.whatTheyDo}
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competitor.strengths?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">
                  Their Strengths
                </p>
                <ul className="space-y-1.5">
                  {competitor.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {competitor.weaknesses?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">
                  Their Weaknesses
                </p>
                <ul className="space-y-1.5">
                  {competitor.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Strategic notes */}
          {competitor.notes && (
            <div className="rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1.5">
                Strategic Notes
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                {competitor.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="w-3 h-3" />
          <span>Checked {competitor.lastChecked}</span>
        </div>
        {competitor.url && (
          <a
            href={competitor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Visit Site
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        )}
      </div>
    </div>
  )
}

export default function MarketIntelPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [threatFilter, setThreatFilter] = useState('all')

  const { competitors, weeklyBrief, categories, lastUpdated } = marketIntelData

  const filteredCompetitors = useMemo(() => {
    return competitors.filter((c) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesSearch =
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.whatTheyDo.toLowerCase().includes(q) ||
          (c.notes && c.notes.toLowerCase().includes(q))
        if (!matchesSearch) return false
      }

      // Category filter
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false

      // Threat filter
      if (threatFilter !== 'all' && c.threatLevel !== threatFilter) return false

      return true
    })
  }, [competitors, searchQuery, categoryFilter, threatFilter])

  // Stats
  const categoryStats = useMemo(() => {
    const counts = { direct: 0, adjacent: 0, partner: 0, inspiration: 0 }
    competitors.forEach((c) => {
      if (counts[c.category] !== undefined) counts[c.category]++
    })
    return counts
  }, [competitors])

  const threatStats = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 }
    competitors.forEach((c) => {
      if (counts[c.threatLevel] !== undefined) counts[c.threatLevel]++
    })
    return counts
  }, [competitors])

  const selectClasses =
    'text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer appearance-none pr-7'

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/10">
          <Radar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Market Intelligence
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track competitors, partners, and the AI literacy landscape. Know your field.
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-white dark:bg-surface-secondary border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {competitors.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tracked Orgs</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-surface-secondary border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-red-500 dark:text-red-400">
            {threatStats.high}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High Threat</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-surface-secondary border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {categoryStats.partner}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Potential Partners</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-surface-secondary border border-slate-200 dark:border-slate-700 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {lastUpdated}
            </p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last Updated</p>
        </div>
      </div>

      {/* Weekly Brief */}
      <WeeklyBrief brief={weeklyBrief} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organizations..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={selectClasses}
            style={selectStyle}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label} ({categoryStats[cat.id] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Threat filter */}
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={threatFilter}
            onChange={(e) => setThreatFilter(e.target.value)}
            className={selectClasses}
            style={selectStyle}
          >
            <option value="all">All Threat Levels</option>
            <option value="high">High ({threatStats.high})</option>
            <option value="medium">Medium ({threatStats.medium})</option>
            <option value="low">Low ({threatStats.low})</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {filteredCompetitors.length} of {competitors.length} organizations
        </p>
        {(searchQuery || categoryFilter !== 'all' || threatFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter('all')
              setThreatFilter('all')
            }}
            className="text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Competitor cards grid */}
      {filteredCompetitors.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCompetitors.map((competitor) => (
            <CompetitorCard key={competitor.id} competitor={competitor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No organizations match your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter('all')
              setThreatFilter('all')
            }}
            className="mt-2 text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 border-t border-slate-200 dark:border-slate-700/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Market intelligence last updated {lastUpdated}. Review and update entries regularly.
        </p>
      </div>
    </div>
  )
}
