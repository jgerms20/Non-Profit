import { useState, useRef, useEffect } from 'react'
import {
  GitBranch,
  BarChart2,
  CheckCircle2,
  MapPin,
  Lightbulb,
  FileText,
  Hash,
  Users,
  Send,
  Globe,
  BookOpen,
  Award,
  DollarSign,
  Rocket,
  Star,
  Briefcase,
  TrendingUp,
  Clock,
} from 'lucide-react'
import Tabs from '../components/ui/Tabs'
import Badge from '../components/ui/Badge'
import { formatDate, formatShortDate, isPast, isFuture } from '../utils/dateUtils'
import { getPhaseConfig } from '../utils/phaseColors'
import timelineData from '../data/timeline.json'

// ---------------------------------------------------------------------------
// Icon resolver
// ---------------------------------------------------------------------------
const ICON_MAP = {
  Lightbulb,
  MapPin,
  FileText,
  Hash,
  Users,
  Send,
  Globe,
  BookOpen,
  Award,
  DollarSign,
  Rocket,
  Star,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
}

function resolveIcon(name) {
  return ICON_MAP[name] || Clock
}

// ---------------------------------------------------------------------------
// Date math helpers
// ---------------------------------------------------------------------------
const CHART_START = new Date('2026-02-01')
const CHART_END = new Date('2030-12-31')
const TOTAL_MS = CHART_END - CHART_START
const MONTH_WIDTH = 64 // px per month

function msToPercent(date) {
  const d = new Date(date)
  return ((d - CHART_START) / TOTAL_MS) * 100
}

function monthsBetween(a, b) {
  const start = new Date(a)
  const end = new Date(b)
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  )
}

const TOTAL_MONTHS = monthsBetween(CHART_START, CHART_END) + 1 // inclusive
const CHART_PX_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

function dateToX(date) {
  const d = new Date(date)
  const months = monthsBetween(CHART_START, d)
  const dayFraction = (d.getDate() - 1) / 30
  return (months + dayFraction) * MONTH_WIDTH
}

function generateMonthLabels() {
  const labels = []
  let current = new Date(CHART_START)
  while (current <= CHART_END) {
    labels.push(new Date(current))
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1)
  }
  return labels
}

const MONTH_LABELS = generateMonthLabels()

// ---------------------------------------------------------------------------
// Phase color hex values
// ---------------------------------------------------------------------------
const PHASE_HEX = {
  'phase-1': '#3b82f6',
  'phase-2': '#22c55e',
  'phase-3': '#f59e0b',
}

// ---------------------------------------------------------------------------
// Timeline view
// ---------------------------------------------------------------------------
function TimelineView({ phases, milestones }) {
  const today = new Date()

  // Group milestones by phase, interleaved with phase headers
  const sections = phases.map((phase) => ({
    phase,
    milestones: milestones.filter((m) => m.phase === phase.id),
  }))

  return (
    <div className="relative">
      {/* Vertical center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2 pointer-events-none" />

      {/* YOU ARE HERE marker */}
      <YouAreHereMarker phases={phases} today={today} milestones={milestones} />

      <div className="space-y-0">
        {sections.map(({ phase, milestones: phaseMilestones }) => {
          const cfg = getPhaseConfig(phase.id)
          return (
            <div key={phase.id}>
              {/* Phase header */}
              <div className="relative flex justify-center my-8">
                <div
                  className={`relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border shadow-sm
                    ${cfg.bgLight} ${cfg.text} border-current/20`}
                  style={{ borderColor: PHASE_HEX[phase.id] + '33' }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: PHASE_HEX[phase.id] }}
                  />
                  {phase.label}
                  <span className="text-xs font-normal opacity-70">
                    {formatShortDate(phase.startDate)} — {formatShortDate(phase.endDate)}
                  </span>
                </div>
              </div>

              {/* Milestones alternating left / right */}
              {phaseMilestones.map((milestone, idx) => {
                const isLeft = idx % 2 === 0
                const past = isPast(milestone.date)
                const MilestoneIcon = resolveIcon(milestone.icon)
                const color = PHASE_HEX[milestone.phase]

                return (
                  <div
                    key={milestone.id}
                    className={`relative flex items-start gap-0 mb-8 ${
                      isLeft ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Content card — takes up ~45% of the width */}
                    <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-4 text-right' : 'pl-4 text-left'}`}>
                      <div
                        className={`inline-block rounded-xl border p-4 shadow-sm transition-opacity
                          bg-surface-secondary border-slate-700
                          ${past ? 'opacity-60' : 'opacity-100'}`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-1 ${
                            isLeft ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <span
                            className="text-sm font-semibold"
                            style={{ color }}
                          >
                            {milestone.title}
                          </span>
                          {milestone.completed && (
                            <CheckCircle2
                              className="w-4 h-4 flex-shrink-0"
                              style={{ color }}
                            />
                          )}
                        </div>
                        <p
                          className={`text-xs text-slate-400 mb-2 ${
                            isLeft ? 'text-right' : 'text-left'
                          }`}
                        >
                          {formatDate(milestone.date)}
                        </p>
                        <p
                          className={`text-xs text-slate-400 leading-relaxed ${
                            isLeft ? 'text-right' : 'text-left'
                          }`}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="flex-shrink-0 w-16 flex justify-center items-start pt-3 relative z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-surface-primary"
                        style={{ backgroundColor: color + '22', borderColor: color }}
                      >
                        <MilestoneIcon
                          className="w-4 h-4"
                          style={{ color }}
                        />
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="w-[calc(50%-2rem)]" />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function YouAreHereMarker({ phases, today, milestones }) {
  // Find which phase we're currently in (or between)
  const currentPhase = phases.find(
    (p) => new Date(p.startDate) <= today && new Date(p.endDate) >= today
  )

  // Find the next upcoming milestone
  const upcoming = milestones
    .filter((m) => isFuture(m.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0]

  return (
    <div className="relative flex justify-center my-4">
      <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-bold">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        YOU ARE HERE — {formatDate(today)}
        {currentPhase && (
          <span className="ml-1 opacity-70">· {currentPhase.label}</span>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Gantt chart view
// ---------------------------------------------------------------------------
function GanttView({ phases, milestones, activities }) {
  const scrollRef = useRef(null)
  const today = new Date()
  const todayX = dateToX(today)

  // Scroll to current date on mount
  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth
      const scrollTarget = Math.max(0, todayX - containerWidth / 2)
      scrollRef.current.scrollLeft = scrollTarget
    }
  }, [todayX])

  const ROW_HEIGHT = 36
  const HEADER_HEIGHT = 56
  const LABEL_WIDTH = 220
  const SECTION_LABEL_HEIGHT = 28

  // Build rows: phases section + activities section
  const phaseRows = phases.map((p) => ({ type: 'phase', data: p }))
  const activityRows = activities.map((a) => ({ type: 'activity', data: a }))

  const allRows = [
    { type: 'section-header', label: 'Phases', id: 'sec-phases' },
    ...phaseRows,
    { type: 'section-header', label: 'Activities', id: 'sec-activities' },
    ...activityRows,
  ]

  // Calculate total chart height
  const chartHeight =
    allRows.reduce((acc, row) => {
      if (row.type === 'section-header') return acc + SECTION_LABEL_HEIGHT
      return acc + ROW_HEIGHT
    }, 0) + HEADER_HEIGHT

  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden bg-surface-secondary">
      <div className="flex">
        {/* Fixed left label column */}
        <div
          className="flex-shrink-0 border-r border-slate-700 bg-surface-secondary z-10"
          style={{ width: LABEL_WIDTH }}
        >
          {/* Header spacer */}
          <div
            className="border-b border-slate-700 flex items-end px-3 pb-2"
            style={{ height: HEADER_HEIGHT }}
          >
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Task / Phase
            </span>
          </div>

          {/* Row labels */}
          {allRows.map((row, idx) => {
            if (row.type === 'section-header') {
              return (
                <div
                  key={row.id}
                  className="flex items-center px-3 bg-surface-tertiary/50"
                  style={{ height: SECTION_LABEL_HEIGHT }}
                >
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {row.label}
                  </span>
                </div>
              )
            }

            const cfg = getPhaseConfig(row.data.phase || row.data.id)
            const color = PHASE_HEX[row.data.phase || row.data.id]

            return (
              <div
                key={row.data.id}
                className="flex items-center px-3 gap-2 border-b border-slate-700/50"
                style={{ height: ROW_HEIGHT }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="text-xs text-slate-300 truncate"
                  title={row.data.title || row.data.label}
                >
                  {row.data.title || row.data.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Scrollable chart area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto"
          style={{ maxHeight: '70vh' }}
        >
          <div
            className="relative"
            style={{ width: CHART_PX_WIDTH, minHeight: chartHeight }}
          >
            {/* Month header row */}
            <div
              className="flex sticky top-0 z-20 bg-surface-secondary border-b border-slate-700"
              style={{ height: HEADER_HEIGHT }}
            >
              {MONTH_LABELS.map((month, idx) => {
                const isJan = month.getMonth() === 0
                return (
                  <div
                    key={idx}
                    className={`flex-shrink-0 flex flex-col justify-end pb-2 px-1 border-r border-slate-700/40 ${
                      isJan ? 'border-r-slate-500' : ''
                    }`}
                    style={{ width: MONTH_WIDTH }}
                  >
                    {isJan && (
                      <span className="text-xs font-bold text-slate-300 mb-0.5">
                        {month.getFullYear()}
                      </span>
                    )}
                    <span
                      className={`text-xs ${
                        isJan ? 'text-slate-300 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {month.toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Grid lines (vertical, per month) */}
            <div className="absolute inset-0 pointer-events-none" style={{ top: HEADER_HEIGHT }}>
              {MONTH_LABELS.map((month, idx) => {
                const x = idx * MONTH_WIDTH
                const isJan = month.getMonth() === 0
                return (
                  <div
                    key={idx}
                    className={`absolute top-0 bottom-0 border-l ${
                      isJan ? 'border-slate-600' : 'border-slate-700/40'
                    }`}
                    style={{ left: x }}
                  />
                )
              })}
            </div>

            {/* Today line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: todayX, top: HEADER_HEIGHT }}
            >
              <div className="w-0.5 h-full bg-red-500/80 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500" />
                <div
                  className="absolute top-1 left-2 bg-red-900/80 border border-red-500/50 text-red-300 text-xs px-1.5 py-0.5 rounded whitespace-nowrap"
                >
                  Today
                </div>
              </div>
            </div>

            {/* Bars */}
            {(() => {
              let offsetY = HEADER_HEIGHT
              return allRows.map((row, idx) => {
                if (row.type === 'section-header') {
                  const y = offsetY
                  offsetY += SECTION_LABEL_HEIGHT
                  return (
                    <div
                      key={row.id}
                      className="absolute left-0 right-0 bg-surface-tertiary/30 border-b border-slate-700/50"
                      style={{ top: y, height: SECTION_LABEL_HEIGHT }}
                    />
                  )
                }

                const d = row.data
                const startDate = d.startDate || d.startDate
                const endDate = d.endDate || d.endDate
                const x1 = dateToX(startDate)
                const x2 = dateToX(endDate)
                const barWidth = Math.max(x2 - x1, 4)
                const color = PHASE_HEX[d.phase || d.id]
                const y = offsetY
                offsetY += ROW_HEIGHT

                return (
                  <div
                    key={d.id}
                    className="absolute border-b border-slate-700/30"
                    style={{ top: y, height: ROW_HEIGHT, left: 0, right: 0 }}
                  >
                    {/* Bar */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 rounded h-5 flex items-center px-2 overflow-hidden"
                      style={{
                        left: x1,
                        width: barWidth,
                        backgroundColor: color + (row.type === 'phase' ? '33' : '22'),
                        border: `1px solid ${color}55`,
                      }}
                    >
                      {barWidth > 60 && (
                        <span
                          className="text-xs font-medium truncate"
                          style={{ color }}
                        >
                          {d.title || d.label}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            })()}

            {/* Milestone diamonds */}
            {milestones.map((m) => {
              const x = dateToX(m.date)
              const color = PHASE_HEX[m.phase]
              return (
                <div
                  key={m.id}
                  className="absolute z-20 group"
                  style={{
                    left: x - 6,
                    top: HEADER_HEIGHT + 4,
                    transform: 'translateX(0)',
                  }}
                  title={`${m.title} — ${formatDate(m.date)}`}
                >
                  {/* Diamond shape via rotate */}
                  <div
                    className="w-3 h-3 rotate-45 border"
                    style={{
                      backgroundColor: color,
                      borderColor: color + 'aa',
                    }}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                    <div className="bg-surface-primary border border-slate-600 rounded-lg px-2.5 py-1.5 shadow-xl whitespace-nowrap">
                      <p className="text-xs font-semibold text-slate-200">{m.title}</p>
                      <p className="text-xs text-slate-400">{formatDate(m.date)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 px-4 py-3 border-t border-slate-700 bg-surface-primary/50 flex-wrap">
        {Object.entries(PHASE_HEX).map(([phaseId, color]) => {
          const cfg = getPhaseConfig(phaseId)
          return (
            <div key={phaseId} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: color + '44', border: `1px solid ${color}88` }}
              />
              <span className="text-xs text-slate-400">{cfg.title}</span>
            </div>
          )
        })}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-3 h-3 rotate-45 bg-slate-400 inline-block" />
          <span className="text-xs text-slate-400">Milestone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-4 bg-red-500" />
          <span className="text-xs text-slate-400">Today</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
const TABS = [
  { id: 'timeline', label: 'Timeline', icon: GitBranch },
  { id: 'gantt', label: 'Gantt Chart', icon: BarChart2 },
]

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState('timeline')
  const { phases, milestones, activities } = timelineData

  const completedCount = milestones.filter((m) => m.completed).length
  const totalCount = milestones.length

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Project Timeline</h1>
          <p className="text-sm text-slate-400 mt-1">
            Southern AI Literacy Initiative — Feb 2026 through Dec 2030
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-secondary border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-slate-100">{completedCount}</span>
              <span className="text-slate-400"> / {totalCount} milestones</span>
            </span>
          </div>
        </div>
      </div>

      {/* Phase badges overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {phases.map((phase) => {
          const cfg = getPhaseConfig(phase.id)
          const color = PHASE_HEX[phase.id]
          const phaseMilestones = milestones.filter((m) => m.phase === phase.id)
          const done = phaseMilestones.filter((m) => m.completed).length
          const isActive =
            new Date(phase.startDate) <= new Date() &&
            new Date(phase.endDate) >= new Date()
          const isComing = new Date(phase.startDate) > new Date()

          return (
            <div
              key={phase.id}
              className="rounded-xl border bg-surface-secondary p-4"
              style={{ borderColor: color + '33' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color }}
                >
                  {phase.label}
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active
                  </span>
                )}
                {isComing && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                    Upcoming
                  </span>
                )}
                {!isActive && !isComing && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                    Complete
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                {formatShortDate(phase.startDate)} — {formatShortDate(phase.endDate)}
              </p>
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-700">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${phaseMilestones.length ? (done / phaseMilestones.length) * 100 : 0}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {done} / {phaseMilestones.length} milestones
              </p>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* View content */}
      <div>
        {activeTab === 'timeline' && (
          <TimelineView phases={phases} milestones={milestones} />
        )}
        {activeTab === 'gantt' && (
          <GanttView
            phases={phases}
            milestones={milestones}
            activities={activities}
          />
        )}
      </div>
    </div>
  )
}
