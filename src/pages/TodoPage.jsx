import { useState, useMemo } from 'react'
import {
  Zap,
  Calendar,
  Target,
  Rocket,
  ChevronDown,
  ChevronUp,
  User,
  AlertTriangle,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Checkbox from '../components/ui/Checkbox'
import PhaseTag from '../components/ui/PhaseTag'
import StatusBadge from '../components/ui/StatusBadge'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getPriorityConfig } from '../utils/statusHelpers'
import { formatDate, daysUntil } from '../utils/dateUtils'
import todoData from '../data/todos.json'

const TIMEFRAME_ICONS = {
  Zap,
  Calendar,
  Target,
  Rocket,
}

function PriorityBadge({ priority }) {
  const config = getPriorityConfig(priority)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

function DueDateBadge({ dueDate }) {
  if (!dueDate) return null
  const days = daysUntil(dueDate)
  const isOverdue = days < 0
  const isUrgent = days >= 0 && days <= 3

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ${
        isOverdue
          ? 'bg-red-500/10 text-red-400'
          : isUrgent
          ? 'bg-amber-500/10 text-amber-400'
          : 'bg-slate-500/10 text-slate-400'
      }`}
    >
      {isOverdue && <AlertTriangle className="w-3 h-3" />}
      {isOverdue ? `${Math.abs(days)}d overdue` : days === 0 ? 'Due today' : `Due ${formatDate(dueDate)}`}
    </span>
  )
}

function SubtaskItem({ subtask, checked, onChange }) {
  return (
    <div
      className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg transition-colors ${
        checked ? 'opacity-50' : 'hover:bg-slate-700/50'
      }`}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        label={subtask.title}
        className={checked ? 'line-through text-slate-500' : ''}
      />
    </div>
  )
}

function TodoCard({ todo, status, subtaskStatuses, onStatusChange, onSubtaskChange }) {
  const [expanded, setExpanded] = useState(false)
  const isCompleted = status === 'completed'

  const subtaskCount = todo.subtasks?.length || 0
  const completedSubtaskCount = todo.subtasks?.filter((st) => subtaskStatuses[st.id]).length || 0
  const allSubtasksDone = subtaskCount > 0 && completedSubtaskCount === subtaskCount

  function handleSubtaskChange(subtaskId, checked) {
    onSubtaskChange(subtaskId, checked)
    // If all subtasks are now done, auto-complete the parent
    const newSubtaskStatuses = { ...subtaskStatuses, [subtaskId]: checked }
    const allDone = todo.subtasks?.every((st) => newSubtaskStatuses[st.id])
    if (allDone && !isCompleted) {
      onStatusChange(todo.id, 'completed')
    } else if (!allDone && isCompleted) {
      onStatusChange(todo.id, 'in-progress')
    }
  }

  function handleParentCheck(checked) {
    onStatusChange(todo.id, checked ? 'completed' : 'not-started')
    // If completing, also complete all subtasks
    if (checked && todo.subtasks) {
      todo.subtasks.forEach((st) => onSubtaskChange(st.id, true))
    }
  }

  return (
    <div
      className={`rounded-xl border transition-all duration-150 ${
        isCompleted
          ? 'bg-green-500/5 border-green-500/20 opacity-75'
          : 'bg-surface-secondary border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Checkbox
              checked={isCompleted}
              onChange={(e) => handleParentCheck(e.target.checked)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p
                className={`text-sm font-semibold leading-snug ${
                  isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                }`}
              >
                {todo.title}
              </p>
              {todo.subtasks?.length > 0 && (
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="flex-shrink-0 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors ml-1"
                >
                  <span className="text-xs">
                    {completedSubtaskCount}/{subtaskCount}
                  </span>
                  {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {todo.description && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {todo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <PriorityBadge priority={todo.priority} />
              <PhaseTag phase={todo.phase} />
              {todo.dueDate && <DueDateBadge dueDate={todo.dueDate} />}
              {todo.assignee && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <User className="w-3 h-3" />
                  {todo.assignee}
                </span>
              )}
            </div>

            {subtaskCount > 0 && (
              <div className="mt-2.5">
                <div className="w-full h-1 rounded-full bg-slate-700">
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      allSubtasksDone ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${subtaskCount > 0 ? (completedSubtaskCount / subtaskCount) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtasks expanded */}
      {expanded && todo.subtasks?.length > 0 && (
        <div className="px-3 pb-3 border-t border-slate-700/50 pt-2">
          <p className="text-xs font-medium text-slate-500 px-3 mb-1">Subtasks</p>
          {todo.subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              checked={!!subtaskStatuses[subtask.id]}
              onChange={(e) => handleSubtaskChange(subtask.id, e.target.checked)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TimeframeSection({ timeframe, todos, statuses, subtaskStatuses, onStatusChange, onSubtaskChange }) {
  const Icon = TIMEFRAME_ICONS[timeframe.icon] || Calendar
  const remaining = todos.filter((t) => statuses[t.id] !== 'completed').length

  if (todos.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 rounded-lg bg-slate-800">
          <Icon className="w-4 h-4 text-slate-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-100">{timeframe.label}</h3>
            <Badge variant={remaining === 0 ? 'success' : 'default'}>
              {remaining === 0 ? 'All done!' : `${remaining} remaining`}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{timeframe.simpleExplanation}</p>
        </div>
      </div>

      <div className="space-y-2 pl-0">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            status={statuses[todo.id] || 'not-started'}
            subtaskStatuses={subtaskStatuses}
            onStatusChange={onStatusChange}
            onSubtaskChange={onSubtaskChange}
          />
        ))}
      </div>
    </div>
  )
}

const PHASES = ['all', 'phase-1', 'phase-2', 'phase-3']
const PRIORITIES = ['all', 'high', 'medium', 'low']
const STATUSES = ['all', 'not-started', 'in-progress', 'completed']

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  )
}

export default function TodoPage() {
  const [todoStatuses, setTodoStatuses] = useLocalStorage('todo-statuses', {})
  const [subtaskStatuses, setSubtaskStatuses] = useLocalStorage('todo-subtasks', {})

  const [filterPhase, setFilterPhase] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const { timeframes, todos } = todoData

  function handleStatusChange(todoId, newStatus) {
    setTodoStatuses((prev) => ({ ...prev, [todoId]: newStatus }))
  }

  function handleSubtaskChange(subtaskId, checked) {
    setSubtaskStatuses((prev) => ({ ...prev, [subtaskId]: checked }))
  }

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filterPhase !== 'all' && todo.phase !== filterPhase) return false
      if (filterPriority !== 'all' && todo.priority !== filterPriority) return false
      const currentStatus = todoStatuses[todo.id] || todo.status || 'not-started'
      if (filterStatus !== 'all' && currentStatus !== filterStatus) return false
      return true
    })
  }, [todos, filterPhase, filterPriority, filterStatus, todoStatuses])

  const totalTodos = todos.length
  const completedCount = todos.filter((t) => todoStatuses[t.id] === 'completed').length
  const inProgressCount = todos.filter((t) => todoStatuses[t.id] === 'in-progress').length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-green-500/10">
          <Target className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Action Items</h1>
          <p className="text-slate-400 mt-1">
            Everything you need to do — organized by when to do it.
          </p>
        </div>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          <p className="text-xs text-slate-400 mt-1">Completed</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{inProgressCount}</p>
          <p className="text-xs text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-slate-300">
            {totalTodos - completedCount - inProgressCount}
          </p>
          <p className="text-xs text-slate-400 mt-1">Remaining</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-3">
          {/* Phase filter */}
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">Phase</p>
            <div className="flex flex-wrap gap-2">
              {PHASES.map((p) => (
                <FilterButton
                  key={p}
                  active={filterPhase === p}
                  onClick={() => setFilterPhase(p)}
                >
                  {p === 'all' ? 'All Phases' : p === 'phase-1' ? 'Phase 1' : p === 'phase-2' ? 'Phase 2' : 'Phase 3'}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Priority filter */}
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">Priority</p>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => (
                <FilterButton
                  key={p}
                  active={filterPriority === p}
                  onClick={() => setFilterPriority(p)}
                >
                  {p === 'all' ? 'All Priorities' : p.charAt(0).toUpperCase() + p.slice(1)}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Status filter */}
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <FilterButton
                  key={s}
                  active={filterStatus === s}
                  onClick={() => setFilterStatus(s)}
                >
                  {s === 'all'
                    ? 'All Statuses'
                    : s === 'not-started'
                    ? 'Not Started'
                    : s === 'in-progress'
                    ? 'In Progress'
                    : 'Completed'}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Active filters summary */}
      {(filterPhase !== 'all' || filterPriority !== 'all' || filterStatus !== 'all') && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing {filteredTodos.length} of {totalTodos} items
          </p>
          <button
            onClick={() => {
              setFilterPhase('all')
              setFilterPriority('all')
              setFilterStatus('all')
            }}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Timeframe sections */}
      <div className="space-y-8">
        {timeframes.map((timeframe) => {
          const timeframeTodos = filteredTodos.filter((t) => t.timeframe === timeframe.id)
          return (
            <TimeframeSection
              key={timeframe.id}
              timeframe={timeframe}
              todos={timeframeTodos}
              statuses={todoStatuses}
              subtaskStatuses={subtaskStatuses}
              onStatusChange={handleStatusChange}
              onSubtaskChange={handleSubtaskChange}
            />
          )
        })}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <Target className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No items match your current filters.</p>
          <button
            onClick={() => {
              setFilterPhase('all')
              setFilterPriority('all')
              setFilterStatus('all')
            }}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
