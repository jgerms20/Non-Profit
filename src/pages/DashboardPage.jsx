import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Rocket,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Scale,
  Calendar,
  CheckSquare,
  DollarSign,
  ArrowRight,
  AlertCircle,
  Flag,
  Bell,
  Zap,
  Target,
} from 'lucide-react'

import phasesData from '../data/phases.json'
import todosData from '../data/todos.json'
import legalData from '../data/legalSteps.json'
import calendarEventsData from '../data/calendarEvents.json'

import { useLocalStorage } from '../hooks/useLocalStorage'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import PhaseTag from '../components/ui/PhaseTag'
import StatusBadge from '../components/ui/StatusBadge'
import { formatShortDate, daysUntil, isFuture } from '../utils/dateUtils'

// ─── Phase accent config ──────────────────────────────────────────────────────
const phaseAccent = {
  'phase-1': {
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/40',
    iconBg: 'bg-blue-500/15',
    iconText: 'text-blue-400',
    textAccent: 'text-blue-400',
    barColor: 'blue',
    Icon: BookOpen,
    numberBg: 'bg-blue-500',
  },
  'phase-2': {
    gradient: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/40',
    iconBg: 'bg-green-500/15',
    iconText: 'text-green-400',
    textAccent: 'text-green-400',
    barColor: 'green',
    Icon: Rocket,
    numberBg: 'bg-green-500',
  },
  'phase-3': {
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/40',
    iconBg: 'bg-amber-500/15',
    iconText: 'text-amber-400',
    textAccent: 'text-amber-400',
    barColor: 'amber',
    Icon: TrendingUp,
    numberBg: 'bg-amber-500',
  },
}

// ─── Event type config ────────────────────────────────────────────────────────
const eventTypeConfig = {
  deadline: { variant: 'danger', Icon: AlertCircle },
  meeting: { variant: 'info', Icon: Users },
  'grant-window': { variant: 'success', Icon: DollarSign },
  milestone: { variant: 'warning', Icon: Flag },
  reminder: { variant: 'purple', Icon: Bell },
}

// ─── Quick links ──────────────────────────────────────────────────────────────
const quickLinks = [
  {
    to: '/contacts',
    Icon: Users,
    title: 'Contacts',
    description: 'Manage partner and stakeholder relationships',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    to: '/legal',
    Icon: Scale,
    title: 'Legal Steps',
    description: 'SC incorporation and compliance checklist',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    to: '/grants',
    Icon: DollarSign,
    title: 'Grants',
    description: 'Track funding opportunities and deadlines',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    to: '/timeline',
    Icon: Clock,
    title: 'Timeline',
    description: 'Full roadmap from formation to fund',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    to: '/calendar',
    Icon: Calendar,
    title: 'Calendar',
    description: 'Upcoming deadlines and key events',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    to: '/messages',
    Icon: MessageSquare,
    title: 'Messages',
    description: 'AI-generated outreach and pitch templates',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
  },
]

// ─── Phase Card ───────────────────────────────────────────────────────────────
function PhaseCard({ phase, phaseSteps }) {
  const accent = phaseAccent[phase.id]
  const { Icon, gradient, border, iconBg, iconText, textAccent, barColor, numberBg } = accent

  const totalSteps = phase.keyMetrics?.totalSteps ?? phase.steps?.length ?? 0
  const completedCount = Object.values(phaseSteps).filter((v) => v === 'completed').length
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0

  return (
    <Link
      to={`/phase/${phase.number}`}
      className={`group relative flex flex-col rounded-xl border ${border} bg-gradient-to-br ${gradient} p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-black/40 cursor-pointer`}
    >
      {/* Phase number pill */}
      <div className="flex items-start justify-between mb-4">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${numberBg} text-white text-sm font-bold shadow-md`}>
          {phase.number}
        </div>
        <StatusBadge status={phase.status} size="sm" />
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className={`flex-shrink-0 p-1.5 rounded-md ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconText}`} />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
          {phase.title}
        </h3>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
        {phase.subtitle}
      </p>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
          <span className={`text-xs font-semibold ${textAccent}`}>{progressPct}%</span>
        </div>
        <ProgressBar value={progressPct} color={barColor} size="sm" />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {completedCount} / {totalSteps} steps
          </span>
          <span className={`text-xs font-medium ${textAccent} flex items-center gap-1 group-hover:gap-1.5 transition-all`}>
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Cost range */}
      {phase.keyMetrics?.estimatedTotalCost && (
        <div className="mt-3 pt-3 border-t border-white/10 dark:border-slate-700/50">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Est. cost:{' '}
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              ${phase.keyMetrics.estimatedTotalCost.min.toLocaleString()} – ${phase.keyMetrics.estimatedTotalCost.max.toLocaleString()}
            </span>
          </span>
        </div>
      )}
    </Link>
  )
}

// ─── Deadline Row ─────────────────────────────────────────────────────────────
function DeadlineRow({ event }) {
  const days = daysUntil(event.date)
  const { variant, Icon: TypeIcon } = eventTypeConfig[event.type] ?? eventTypeConfig.reminder

  const urgencyClass =
    days <= 3
      ? 'text-red-400'
      : days <= 7
      ? 'text-amber-400'
      : 'text-slate-400 dark:text-slate-500'

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <TypeIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{event.title}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{formatShortDate(event.date)}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge variant={variant} className="hidden sm:inline-flex">
          {calendarEventsData.eventTypes?.[event.type]?.label ?? event.type}
        </Badge>
        <span className={`text-xs font-semibold tabular-nums ${urgencyClass}`}>
          {days === 0 ? 'Today' : days === 1 ? '1 day' : `${days}d`}
        </span>
      </div>
    </div>
  )
}

// ─── Action Item Row ──────────────────────────────────────────────────────────
function ActionItemRow({ todo }) {
  const priorityVariant = todo.priority === 'high' ? 'danger' : todo.priority === 'medium' ? 'warning' : 'success'

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{todo.title}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant={priorityVariant}>{todo.priority} priority</Badge>
          {todo.phase && <PhaseTag phase={todo.phase} />}
          {todo.dueDate && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Due {formatShortDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, icon: Icon, accent }) {
  return (
    <div className="flex flex-col gap-1 bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
      <div className={`w-8 h-8 rounded-lg ${accent.bg} flex items-center justify-center mb-1`}>
        <Icon className={`w-4 h-4 ${accent.text}`} />
      </div>
      <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{label}</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [phaseStepsAll] = useLocalStorage('phase-steps', {})
  const [todoStatuses] = useLocalStorage('todo-statuses', {})
  const [legalStepStatuses] = useLocalStorage('legal-steps', {})

  // Build per-phase step state maps
  const phaseStepMaps = useMemo(() => {
    const maps = {}
    phasesData.forEach((phase) => {
      const relevantKeys = (phase.steps ?? []).map((s) => s.id)
      const map = {}
      relevantKeys.forEach((k) => {
        map[k] = phaseStepsAll[k] ?? 'not-started'
      })
      maps[phase.id] = map
    })
    return maps
  }, [phaseStepsAll])

  // Quick stats
  const stats = useMemo(() => {
    const allTodos = todosData.todos ?? []
    const allEvents = calendarEventsData.events ?? []
    const now = new Date()
    const sevenDaysOut = new Date(now)
    sevenDaysOut.setDate(now.getDate() + 7)

    // Use live todoStatuses from localStorage — fall back to static status
    const remaining = allTodos.filter((t) => {
      const liveStatus = todoStatuses[t.id] ?? t.status ?? 'not-started'
      return liveStatus !== 'completed'
    }).length

    const upcomingCount = allEvents.filter((e) => {
      const d = new Date(e.date)
      return d >= now && d <= sevenDaysOut
    }).length

    // Count unique contacts that have been reached-out-to (todos with assignee)
    const contactedSet = new Set(
      allTodos.filter((t) => t.assignee).map((t) => t.assignee)
    )

    // Legal steps completed — read from legal-steps localStorage
    const allLegalSteps = legalData.steps ?? []
    const legalDone = allLegalSteps.filter(
      (s) => (legalStepStatuses[s.id] || s.status) === 'completed'
    ).length

    return { remaining, upcomingCount, contacted: contactedSet.size, legalDone }
  }, [todoStatuses, legalStepStatuses])

  // Upcoming deadlines (next 7 events sorted by date)
  const upcomingDeadlines = useMemo(() => {
    const now = new Date()
    return (calendarEventsData.events ?? [])
      .filter((e) => isFuture(e.date) || daysUntil(e.date) === 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 7)
  }, [])

  // Top 5 high-priority incomplete todos
  const topTodos = useMemo(() => {
    const allTodos = todosData.todos ?? []
    const priorityRank = { high: 0, medium: 1, low: 2 }
    return allTodos
      .filter((t) => {
        const liveStatus = todoStatuses[t.id] ?? t.status ?? 'not-started'
        return liveStatus !== 'completed'
      })
      .sort((a, b) => (priorityRank[a.priority] ?? 2) - (priorityRank[b.priority] ?? 2))
      .slice(0, 5)
  }, [todoStatuses])

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-phase-1 via-phase-2 to-phase-3 flex items-center justify-center text-white font-bold text-xs shadow-md">
            AI
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Command Center
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 ml-11">
          SCAiL — your hub for everything.
        </p>
      </div>

      {/* ── Phase Overview Cards ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">Phase Overview</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">Click to explore each phase</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {phasesData.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              phaseSteps={phaseStepMaps[phase.id] ?? {}}
            />
          ))}
        </div>
      </section>

      {/* ── Quick Stats Row ──────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4">At a Glance</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            value={stats.remaining}
            label="Action items remaining"
            icon={CheckSquare}
            accent={{ bg: 'bg-blue-500/10', text: 'text-blue-400' }}
          />
          <StatCard
            value={stats.upcomingCount}
            label="Deadlines in next 7 days"
            icon={AlertCircle}
            accent={{ bg: 'bg-red-500/10', text: 'text-red-400' }}
          />
          <StatCard
            value={stats.contacted}
            label="Team members active"
            icon={Users}
            accent={{ bg: 'bg-green-500/10', text: 'text-green-400' }}
          />
          <StatCard
            value={stats.legalDone}
            label="Legal steps completed"
            icon={Scale}
            accent={{ bg: 'bg-purple-500/10', text: 'text-purple-400' }}
          />
        </div>
      </section>

      {/* ── Deadlines + Action Items (2-col) ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Upcoming Deadlines */}
        <Card
          title="Upcoming Deadlines"
          subtitle="Next 7 events sorted by date"
          icon={Calendar}
          headerAction={
            <Link
              to="/calendar"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {upcomingDeadlines.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
              No upcoming events.
            </p>
          ) : (
            <div>
              {upcomingDeadlines.map((event) => (
                <DeadlineRow key={event.id} event={event} />
              ))}
            </div>
          )}
        </Card>

        {/* Recent Action Items */}
        <Card
          title="Priority Action Items"
          subtitle="Top 5 high-priority incomplete tasks"
          icon={Zap}
          headerAction={
            <Link
              to="/todos"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {topTodos.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">
              All caught up! No pending action items.
            </p>
          ) : (
            <div>
              {topTodos.map((todo) => (
                <Link key={todo.id} to="/todos">
                  <ActionItemRow todo={todo} />
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ── Quick Links Grid ─────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">Quick Links</h2>
          <Target className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickLinks.map(({ to, Icon, title, description, color, bg }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-secondary p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-150"
            >
              <div className={`flex-shrink-0 p-2 rounded-lg ${bg} mt-0.5`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {title}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
