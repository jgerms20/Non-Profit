import { useState } from 'react'
import {
  DollarSign,
  Lightbulb,
  ExternalLink,
  Clock,
  Calendar,
  AlertTriangle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  StickyNote,
  TrendingUp,
  Award,
  Send,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import PhaseTag from '../components/ui/PhaseTag'
import StatusBadge from '../components/ui/StatusBadge'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDate, daysUntil } from '../utils/dateUtils'
import grantsData from '../data/grants.json'

const GRANT_STATUSES = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'researching', label: 'Researching' },
  { value: 'preparing', label: 'Preparing Application' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'awarded', label: 'Awarded!' },
  { value: 'denied', label: 'Denied' },
]

const DIFFICULTY_CONFIG = {
  low: { label: 'Easy', variant: 'success' },
  medium: { label: 'Medium', variant: 'warning' },
  hard: { label: 'Challenging', variant: 'danger' },
}

const TIER_COLORS = {
  green: {
    border: 'border-green-500/30',
    headerBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    badgeVariant: 'success',
    dot: 'bg-green-500',
  },
  amber: {
    border: 'border-amber-500/30',
    headerBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    badgeVariant: 'warning',
    dot: 'bg-amber-500',
  },
  blue: {
    border: 'border-blue-500/30',
    headerBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    badgeVariant: 'info',
    dot: 'bg-blue-500',
  },
}

function formatAmount(min, max) {
  if (!min && !max) return 'Varies'
  const fmt = (n) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
    return `$${n}`
  }
  if (min === max) return fmt(min)
  return `${fmt(min)} – ${fmt(max)}`
}

function DeadlineBadge({ deadline }) {
  if (!deadline) return <span className="text-xs text-slate-500">Rolling / No Deadline</span>
  const days = daysUntil(deadline)
  const isOverdue = days < 0
  const isUrgent = days >= 0 && days <= 30

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 font-medium ${
        isOverdue
          ? 'bg-red-500/10 text-red-400'
          : isUrgent
          ? 'bg-amber-500/10 text-amber-400'
          : 'bg-slate-500/10 text-slate-400'
      }`}
    >
      {isOverdue ? (
        <AlertTriangle className="w-3 h-3" />
      ) : (
        <Calendar className="w-3 h-3" />
      )}
      {isOverdue
        ? `Deadline passed`
        : days === 0
        ? 'Due today!'
        : days <= 30
        ? `${days} days left`
        : formatDate(deadline)}
    </span>
  )
}

function SimpleExplanationCallout({ text }) {
  return (
    <div className="flex gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
      <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-200 leading-relaxed">{text}</p>
    </div>
  )
}

function GrantCard({ grant, status, notes, onStatusChange, onNotesChange }) {
  const [expanded, setExpanded] = useState(false)
  const diffConfig = DIFFICULTY_CONFIG[grant.difficulty] || DIFFICULTY_CONFIG.medium

  return (
    <div className="rounded-xl border border-slate-700 bg-surface-secondary hover:border-slate-600 transition-all duration-200">
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-100 leading-snug mb-1">
              {grant.name}
            </h4>
            <p className="text-xs text-slate-400">{grant.organization}</p>
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Key info row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="inline-flex items-center gap-1 text-sm font-bold text-green-400">
            <DollarSign className="w-4 h-4" />
            {formatAmount(grant.amount?.min, grant.amount?.max)}
          </span>
          <span className="text-slate-600">·</span>
          <DeadlineBadge deadline={grant.deadline} />
          <span className="text-slate-600">·</span>
          <Badge variant={diffConfig.variant}>{diffConfig.label}</Badge>
          <span className="text-slate-600">·</span>
          <PhaseTag phase={grant.phase} />
        </div>

        {/* Prep time */}
        {grant.estimatedPrepTime && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Prep time: {grant.estimatedPrepTime}</span>
          </div>
        )}

        {/* Simple explanation — always visible */}
        <SimpleExplanationCallout text={grant.simpleExplanation} />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700/50 pt-4">
          {/* Description */}
          {grant.description && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                About This Grant
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{grant.description}</p>
            </div>
          )}

          {/* Requirements checklist */}
          {grant.requirements?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Requirements
              </p>
              <ul className="space-y-2">
                {grant.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckSquare className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Staff notes */}
          {grant.notes && (
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1.5">
                Strategic Notes
              </p>
              <p className="text-sm text-blue-200 leading-relaxed">{grant.notes}</p>
            </div>
          )}

          {/* User notes */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5" />
              My Notes
            </p>
            <textarea
              value={notes || ''}
              onChange={(e) => onNotesChange(grant.id, e.target.value)}
              placeholder="Add your own notes, contacts, deadlines, ideas..."
              rows={3}
              className="w-full px-3 py-2 text-sm bg-slate-800 text-slate-200 placeholder:text-slate-600 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )}

      {/* Footer: status + link */}
      <div className="px-5 py-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
        <select
          value={status || 'not-started'}
          onChange={(e) => onStatusChange(grant.id, e.target.value)}
          className="text-xs px-2.5 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            paddingRight: '1.75rem',
            appearance: 'none',
          }}
        >
          {GRANT_STATUSES.map((s) => (
            <option key={s.value} value={s.value} className="bg-slate-800">
              {s.label}
            </option>
          ))}
        </select>

        {grant.applicationUrl && (
          <a
            href={grant.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Apply Now
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        )}
      </div>
    </div>
  )
}

function TierSection({ tier, grants, grantStatuses, grantNotes, onStatusChange, onNotesChange }) {
  const colors = TIER_COLORS[tier.color] || TIER_COLORS.blue
  const appliedCount = grants.filter((g) => {
    const s = grantStatuses[g.id]
    return s === 'submitted' || s === 'awarded'
  }).length
  const awardedCount = grants.filter((g) => grantStatuses[g.id] === 'awarded').length

  return (
    <div className={`rounded-xl border-2 ${colors.border} overflow-hidden`}>
      {/* Tier header */}
      <div className={`${colors.headerBg} px-6 py-4 border-b ${colors.border}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${colors.dot} flex-shrink-0 mt-0.5`} />
            <div>
              <h3 className={`text-base font-bold ${colors.iconColor}`}>{tier.label}</h3>
              <p className="text-sm text-slate-400 mt-0.5">{tier.simpleExplanation}</p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-xs text-slate-400">{grants.length} grants</p>
            {appliedCount > 0 && (
              <p className={`text-xs ${colors.iconColor} mt-0.5`}>
                {appliedCount} applied
                {awardedCount > 0 && ` · ${awardedCount} awarded`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grant cards */}
      <div className="p-4 space-y-3 bg-surface-primary/30">
        {grants.map((grant) => (
          <GrantCard
            key={grant.id}
            grant={grant}
            status={grantStatuses[grant.id] || grant.status || 'not-started'}
            notes={grantNotes[grant.id] || ''}
            onStatusChange={onStatusChange}
            onNotesChange={onNotesChange}
          />
        ))}
      </div>
    </div>
  )
}

export default function GrantsPage() {
  const [grantStatuses, setGrantStatuses] = useLocalStorage('grant-statuses', {})
  const [grantNotes, setGrantNotes] = useLocalStorage('grant-notes', {})

  const { tiers, grants } = grantsData

  function handleStatusChange(grantId, newStatus) {
    setGrantStatuses((prev) => ({ ...prev, [grantId]: newStatus }))
  }

  function handleNotesChange(grantId, notes) {
    setGrantNotes((prev) => ({ ...prev, [grantId]: notes }))
  }

  // Summary stats
  const totalPotentialMin = grants.reduce((sum, g) => sum + (g.amount?.min || 0), 0)
  const totalPotentialMax = grants.reduce((sum, g) => sum + (g.amount?.max || 0), 0)
  const appliedCount = grants.filter((g) => {
    const s = grantStatuses[g.id]
    return s === 'submitted' || s === 'awarded' || s === 'preparing' || s === 'researching'
  }).length
  const awardedCount = grants.filter((g) => grantStatuses[g.id] === 'awarded').length
  const awardedTotal = grants
    .filter((g) => grantStatuses[g.id] === 'awarded')
    .reduce((sum, g) => sum + (g.amount?.min || 0), 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-green-500/10">
          <DollarSign className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Grants & Funding</h1>
          <p className="text-slate-400 mt-1">
            Your funding roadmap — from immediate opportunities to long-term revenue.
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-lg font-bold text-green-400">
            {formatAmount(totalPotentialMin, totalPotentialMax)}
          </p>
          <p className="text-xs text-slate-400 mt-1">Total Potential</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{grants.length}</p>
          <p className="text-xs text-slate-400 mt-1">Opportunities</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{appliedCount}</p>
          <p className="text-xs text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-yellow-400" />
            <p className="text-2xl font-bold text-yellow-400">{awardedCount}</p>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {awardedCount > 0 ? `Awarded ${formatAmount(awardedTotal, awardedTotal)}` : 'Awarded'}
          </p>
        </div>
      </div>

      {/* Tier sections */}
      <div className="space-y-6">
        {tiers.map((tier) => {
          const tierGrants = grants.filter((g) => g.tier === tier.id)
          return (
            <TierSection
              key={tier.id}
              tier={tier}
              grants={tierGrants}
              grantStatuses={grantStatuses}
              grantNotes={grantNotes}
              onStatusChange={handleStatusChange}
              onNotesChange={handleNotesChange}
            />
          )
        })}
      </div>
    </div>
  )
}
