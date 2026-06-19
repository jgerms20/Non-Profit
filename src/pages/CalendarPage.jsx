import { useState, useMemo } from 'react'
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
  Check,
  RotateCcw,
  ExternalLink,
  Pencil,
  CalendarPlus,
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
import { useLocalStorage } from '../hooks/useLocalStorage'
import calendarData from '../data/calendarEvents.json'

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

function buildGoogleCalendarUrl(event) {
  const date = new Date(event.date)
  const pad = (n) => String(n).padStart(2, '0')
  const y = date.getFullYear()
  const m = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const dateStr = `${y}${m}${d}`
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  const ny = nextDay.getFullYear()
  const nm = pad(nextDay.getMonth() + 1)
  const nd = pad(nextDay.getDate())
  const endStr = `${ny}${nm}${nd}`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${dateStr}/${endStr}`,
    details: event.description || '',
    sf: 'true',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

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

function EventCard({ event, eventTypes, onToggleComplete, onDateChange, completed }) {
  const typeConfig = eventTypes[event.type]
  const Icon = getTypeIcon(event.type)
  const [editing, setEditing] = useState(false)
  const [dateInput, setDateInput] = useState(event.date)

  function handleSaveDate() {
    if (dateInput && dateInput !== event.date) {
      onDateChange(event.id, dateInput)
    }
    setEditing(false)
  }

  return (
    <div className={`rounded-lg border p-3 transition-all ${completed ? 'border-green-700/40 bg-green-500/5' : 'border-slate-700 bg-surface-tertiary/40'}`}>
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
          style={{ backgroundColor: typeConfig?.color + '22' }}
        >
          <Icon className="w-4 h-4" style={{ color: typeConfig?.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-sm font-semibold ${completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
              {event.title}
            </span>
            {event.phase && <PhaseTag phase={event.phase} />}
          </div>
          <span className="text-xs font-medium" style={{ color: typeConfig?.color }}>
            {typeConfig?.label}
          </span>

          {/* Date display / edit */}
          <div className="flex items-center gap-2 mt-1.5">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="text-xs bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSaveDate}
                  className="p-1 rounded text-green-400 hover:bg-green-500/20 transition-colors"
                  title="Save date"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setEditing(false); setDateInput(event.date) }}
                  className="p-1 rounded text-slate-400 hover:bg-slate-700 transition-colors"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                title="Edit date"
              >
                <CalendarDays className="w-3 h-3" />
                {formatDate(event.date)}
                <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
              </button>
            )}
          </div>

          {event.description && (
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{event.description}</p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onToggleComplete(event.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                completed
                  ? 'border-green-600/40 text-green-400 bg-green-500/10 hover:bg-green-500/20'
                  : 'border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 hover:bg-slate-700/50'
              }`}
            >
              <Check className="w-3 h-3" />
              {completed ? 'Done' : 'Mark done'}
            </button>

            <a
              href={buildGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors"
              title="Add to Google Calendar"
            >
              <CalendarPlus className="w-3 h-3" />
              Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function DayCell({ day, currentMonth, events, eventTypes, selected, onClick, completedEvents }) {
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

      <div className="flex flex-col gap-0.5 flex-1">
        {visibleEvents.map((event) => {
          const typeConfig = eventTypes[event.type]
          const done = completedEvents[event.id]
          return (
            <div key={event.id} className="flex items-center gap-1 leading-none">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? 'opacity-40' : ''}`}
                style={{ backgroundColor: typeConfig?.color }}
              />
              <span
                className={`text-xs truncate leading-tight ${done ? 'line-through opacity-40' : ''}`}
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

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [completedEvents, setCompletedEvents] = useLocalStorage('scail-calendar-completed', {})
  const [dateOverrides, setDateOverrides] = useLocalStorage('scail-calendar-dates', {})

  const { eventTypes } = calendarData

  const events = useMemo(() => {
    return calendarData.events.map((e) => ({
      ...e,
      date: dateOverrides[e.id] || e.date,
    }))
  }, [dateOverrides])

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

  function toggleComplete(eventId) {
    setCompletedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }))
  }

  function handleDateChange(eventId, newDate) {
    setDateOverrides((prev) => ({
      ...prev,
      [eventId]: newDate,
    }))
  }

  function resetAllDates() {
    setDateOverrides({})
  }

  function resetAllCompleted() {
    setCompletedEvents({})
  }

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : []
  const monthEvents = events.filter((e) => isSameMonth(new Date(e.date), currentMonth))

  const completedCount = Object.values(completedEvents).filter(Boolean).length
  const overrideCount = Object.keys(dateOverrides).length

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const overdueEvents = events.filter((e) => {
    const d = new Date(e.date)
    d.setHours(0, 0, 0, 0)
    return d < today && !completedEvents[e.id] && (e.type === 'deadline' || e.type === 'milestone')
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
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-secondary border border-slate-700">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-slate-100">{monthEvents.length}</span>
              <span className="text-slate-400"> events this month</span>
            </span>
          </div>
          {completedCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-700/40">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">{completedCount} completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Overdue alerts */}
      {overdueEvents.length > 0 && (
        <div className="rounded-xl border border-amber-600/40 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-300">
              {overdueEvents.length} overdue item{overdueEvents.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="space-y-2">
            {overdueEvents.slice(0, 5).map((event) => {
              const d = new Date(event.date)
              d.setHours(0, 0, 0, 0)
              const daysLate = Math.ceil((today - d) / (1000 * 60 * 60 * 24))
              return (
                <div key={event.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-slate-300 truncate">{event.title}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-amber-400">{daysLate}d overdue</span>
                    <button
                      onClick={() => toggleComplete(event.id)}
                      className="text-xs px-2 py-0.5 rounded border border-green-600/40 text-green-400 hover:bg-green-500/20 transition-colors"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        const newDate = new Date()
                        newDate.setDate(newDate.getDate() + 7)
                        handleDateChange(event.id, newDate.toISOString().slice(0, 10))
                      }}
                      className="text-xs px-2 py-0.5 rounded border border-slate-600 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                    >
                      +7 days
                    </button>
                  </div>
                </div>
              )
            })}
            {overdueEvents.length > 5 && (
              <p className="text-xs text-amber-400/60">+{overdueEvents.length - 5} more overdue</p>
            )}
          </div>
        </div>
      )}

      {/* Calendar card */}
      <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-slate-700 space-y-3">
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
            <div className="flex items-center gap-2">
              {overrideCount > 0 && (
                <button
                  onClick={resetAllDates}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-600/40 text-amber-400 hover:bg-amber-500/10 transition-colors"
                  title="Reset all dates to original values"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset dates ({overrideCount})
                </button>
              )}
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-600 text-slate-300 hover:text-slate-100 hover:border-slate-500 hover:bg-slate-700/50 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
          <TypeLegend eventTypes={eventTypes} />
        </div>

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
                completedEvents={completedEvents}
              />
            )
          })}
        </div>
      </div>

      {/* Selected day event detail panel */}
      {selectedDate && selectedEvents.length > 0 && (
        <div className="rounded-xl border border-slate-700 bg-surface-secondary overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <CalendarDays className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">{formatDate(selectedDate)}</h3>
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
          <div className="p-4 space-y-3">
            {selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                eventTypes={eventTypes}
                completed={!!completedEvents[event.id]}
                onToggleComplete={toggleComplete}
                onDateChange={handleDateChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming events */}
      <UpcomingEventsList
        events={events}
        eventTypes={eventTypes}
        completedEvents={completedEvents}
        onToggleComplete={toggleComplete}
        onDateChange={handleDateChange}
      />
    </div>
  )
}

function UpcomingEventsList({ events, eventTypes, completedEvents, onToggleComplete, onDateChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = events
    .filter((e) => new Date(e.date) >= today && !completedEvents[e.id])
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8)

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
              <div className="flex-shrink-0 text-center w-12">
                <div className="text-xs text-slate-500 uppercase">
                  {eventDate.toLocaleString('default', { month: 'short' })}
                </div>
                <div className="text-lg font-bold text-slate-200 leading-tight">
                  {eventDate.getDate()}
                </div>
              </div>

              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: typeConfig?.color + '22' }}
              >
                <Icon className="w-4 h-4" style={{ color: typeConfig?.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-200 truncate">{event.title}</span>
                  {event.phase && <PhaseTag phase={event.phase} />}
                </div>
                <span className="text-xs font-medium" style={{ color: typeConfig?.color }}>
                  {typeConfig?.label}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={buildGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                  title="Add to Google Calendar"
                >
                  <CalendarPlus className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onToggleComplete(event.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                  title="Mark complete"
                >
                  <Check className="w-4 h-4" />
                </button>
                {diffDays === 0 ? (
                  <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Today
                  </span>
                ) : diffDays === 1 ? (
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    Tomorrow
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 min-w-[3rem] text-right">in {diffDays}d</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
