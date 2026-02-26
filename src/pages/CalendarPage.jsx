import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Users,
  DollarSign,
  Flag,
  Bell,
  CalendarDays,
  X,
} from 'lucide-react'
import PhaseTag from '../components/ui/PhaseTag'
import {
  formatMonthYear,
  formatDate,
  getCalendarDays,
  addMonths,
  subMonths,
  isToday,
  isSameDay,
  isSameMonth,
} from '../utils/dateUtils'
import calendarData from '../data/calendarEvents.json'

// ---------------------------------------------------------------------------
// Icon resolver for event types
// ---------------------------------------------------------------------------
const TYPE_ICONS = {
  deadline: AlertCircle,
  meeting: Users,
  'grant-window': DollarSign,
  milestone: Flag,
  reminder: Bell,
}

function getTypeIcon(type) {
  return TYPE_ICONS[type] || Bell
}

// ---------------------------------------------------------------------------
// Event type legend pill
// ---------------------------------------------------------------------------
function TypeLegend({ eventTypes }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(eventTypes).map(([key, config]) => {
        const Icon = getTypeIcon(key)
        return (
          <div
            key={key}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: config.color + '18',
              borderColor: config.color + '44',
              color: config.color,
            }}
          >
            <Icon className="w-3 h-3" />
            {config.label}
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Individual event detail card in the sidebar
// ---------------------------------------------------------------------------
function EventCard({ event, eventTypes }) {
  const typeConfig = eventTypes[event.type]
  const Icon = getTypeIcon(event.type)

  return (
    <div className="rounded-lg border border-slate-700 bg-surface-tertiary/40 p-3">
      <div className="flex items-start gap-3">
        {/* Color indicator */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
          style={{ backgroundColor: typeConfig?.color + '22' }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: typeConfig?.color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-semibold text-slate-100">{event.title}</span>
            {event.phase && <PhaseTag phase={event.phase} />}
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: typeConfig?.color }}
          >
            {typeConfig?.label}
          </span>
          {event.description && (
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Day cell in the calendar grid
// ---------------------------------------------------------------------------
function DayCell({ day, currentMonth, events, eventTypes, selected, onClick }) {
  const inMonth = isSameMonth(day, currentMonth)
  const today = isToday(day)
  const hasEvents = events.length > 0
  const visibleEvents = events.slice(0, 3)
  const overflowCount = events.length - 3

  return (
    <button
      onClick={() => hasEvents && onClick(day)}
      className={`
        relative flex flex-col p-2 rounded-lg border text-left transition-all duration-150 min-h-[80px]
        ${inMonth ? 'bg-surface-secondary' : 'bg-surface-primary/40'}
        ${today
          ? 'ring-2 ring-blue-500 border-blue-500/50 bg-blue-500/5'
          : 'border-slate-700/60'
        }
        ${selected && hasEvents ? 'border-blue-400/60 bg-blue-500/8' : ''}
        ${hasEvents ? 'cursor-pointer hover:border-slate-500 hover:bg-surface-tertiary/50' : 'cursor-default'}
      `}
    >
      {/* Day number */}
      <span
        className={`
          text-sm font-semibold mb-1.5 inline-flex items-center justify-center
          w-6 h-6 rounded-full
          ${today ? 'bg-blue-500 text-white' : ''}
          ${!today && inMonth ? 'text-slate-200' : ''}
          ${!today && !inMonth ? 'text-slate-600' : ''}
        `}
      >
        {day.getDate()}
      </span>

      {/* Event dots */}
      <div className="flex flex-col gap-0.5 flex-1">
        {visibleEvents.map((event) => {
          const typeConfig = eventTypes[event.type]
          return (
            <div
              key={event.id}
              className="flex items-center gap-1 leading-none"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: typeConfig?.color }}
              />
              <span
                className="text-xs truncate leading-tight"
                style={{ color: typeConfig?.color + 'dd', fontSize: '0.65rem' }}
              >
                {event.title}
              </span>
            </div>
          )
        })}
        {overflowCount > 0 && (
          <span className="text-xs text-slate-500 leading-tight" style={{ fontSize: '0.65rem' }}>
            +{overflowCount} more
          </span>
        )}
      </div>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Day names header row
// ---------------------------------------------------------------------------
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ---------------------------------------------------------------------------
// Main CalendarPage
// ---------------------------------------------------------------------------
export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const { eventTypes, events } = calendarData

  const calendarDays = getCalendarDays(currentMonth)

  function getEventsForDay(day) {
    return events.filter((e) => isSameDay(new Date(e.date), day))
  }

  function handleDayClick(day) {
    if (selectedDate && isSameDay(selectedDate, day)) {
      setSelectedDate(null)
    } else {
      setSelectedDate(day)
    }
  }

  function goToToday() {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : []

  // Count events in current month for the header stat
  const monthEvents = events.filter((e) => {
    const d = new Date(e.date)
    return isSameMonth(d, currentMonth)
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Calendar</h1>
          <p className="text-sm text-slate-400 mt-1">
            Deadlines, meetings, grant windows & milestones
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-secondary border border-slate-700">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-slate-100">{monthEvents.length}</span>
              <span className="text-slate-400"> events this month</span>
            </span>
          </div>
        </div>
      </div>

      {/* Calendar card */}
      <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
        {/* Calendar header: navigation + legend */}
        <div className="px-4 pt-4 pb-3 border-b border-slate-700 space-y-3">
          {/* Month navigation row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-slate-100 min-w-[160px] text-center">
                {formatMonthYear(currentMonth)}
              </h2>
              <button
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-600 text-slate-300 hover:text-slate-100 hover:border-slate-500 hover:bg-slate-700/50 transition-colors"
            >
              Today
            </button>
          </div>

          {/* Event type legend */}
          <TypeLegend eventTypes={eventTypes} />
        </div>

        {/* Day name headers */}
        <div className="grid grid-cols-7 border-b border-slate-700">
          {DAY_NAMES.map((name) => (
            <div
              key={name}
              className="px-2 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 p-2">
          {calendarDays.map((day, idx) => {
            const dayEvents = getEventsForDay(day)
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
            return (
              <DayCell
                key={idx}
                day={day}
                currentMonth={currentMonth}
                events={dayEvents}
                eventTypes={eventTypes}
                selected={isSelected}
                onClick={handleDayClick}
              />
            )
          })}
        </div>
      </div>

      {/* Selected day event detail panel */}
      {selectedDate && selectedEvents.length > 0 && (
        <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <CalendarDays className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {formatDate(selectedDate)}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Events list */}
          <div className="p-4 space-y-3">
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                eventTypes={eventTypes}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming events summary */}
      <UpcomingEventsList events={events} eventTypes={eventTypes} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Upcoming events list (next 5 events from today)
// ---------------------------------------------------------------------------
function UpcomingEventsList({ events, eventTypes }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6)

  if (upcoming.length === 0) return null

  return (
    <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
        <CalendarDays className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-200">Upcoming Events</h3>
      </div>
      <div className="divide-y divide-slate-700/50">
        {upcoming.map((event) => {
          const typeConfig = eventTypes[event.type]
          const Icon = getTypeIcon(event.type)
          const eventDate = new Date(event.date)
          const diffMs = eventDate - today
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

          return (
            <div key={event.id} className="flex items-center gap-4 px-4 py-3">
              {/* Date block */}
              <div className="flex-shrink-0 text-center w-12">
                <div className="text-xs text-slate-500 uppercase">
                  {eventDate.toLocaleString('default', { month: 'short' })}
                </div>
                <div className="text-lg font-bold text-slate-200 leading-tight">
                  {eventDate.getDate()}
                </div>
              </div>

              {/* Type icon */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: typeConfig?.color + '22' }}
              >
                <Icon className="w-4 h-4" style={{ color: typeConfig?.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {event.title}
                  </span>
                  {event.phase && <PhaseTag phase={event.phase} />}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: typeConfig?.color }}
                >
                  {typeConfig?.label}
                </span>
              </div>

              {/* Days until */}
              <div className="flex-shrink-0 text-right">
                {diffDays === 0 ? (
                  <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Today
                  </span>
                ) : diffDays === 1 ? (
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    Tomorrow
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    in {diffDays}d
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
