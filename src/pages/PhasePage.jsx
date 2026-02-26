import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  BookOpen,
  Rocket,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ExternalLink,
  DollarSign,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ListChecks,
  Target,
  Layers,
} from 'lucide-react'

import phasesData from '../data/phases.json'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import StatusBadge from '../components/ui/StatusBadge'
import Checkbox from '../components/ui/Checkbox'

// ─── Phase config ─────────────────────────────────────────────────────────────
const phaseConfig = {
  1: {
    Icon: BookOpen,
    color: 'blue',
    gradient: 'from-blue-600 to-blue-400',
    gradientBg: 'from-blue-500/10 to-transparent',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentBorder: 'border-blue-500/20',
    barColor: 'blue',
    stepBorder: 'border-blue-500/20',
    stepCompletedBg: 'bg-blue-500/5',
    numberBg: 'bg-blue-500',
    calloutBg: 'bg-blue-950/40 dark:bg-blue-950/50',
    calloutBorder: 'border-blue-500/25',
    calloutText: 'text-blue-300',
  },
  2: {
    Icon: Rocket,
    color: 'green',
    gradient: 'from-green-600 to-green-400',
    gradientBg: 'from-green-500/10 to-transparent',
    border: 'border-green-500/30',
    accent: 'text-green-400',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/20',
    barColor: 'green',
    stepBorder: 'border-green-500/20',
    stepCompletedBg: 'bg-green-500/5',
    numberBg: 'bg-green-500',
    calloutBg: 'bg-green-950/40 dark:bg-green-950/50',
    calloutBorder: 'border-green-500/25',
    calloutText: 'text-green-300',
  },
  3: {
    Icon: TrendingUp,
    color: 'amber',
    gradient: 'from-amber-600 to-amber-400',
    gradientBg: 'from-amber-500/10 to-transparent',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    barColor: 'amber',
    stepBorder: 'border-amber-500/20',
    stepCompletedBg: 'bg-amber-500/5',
    numberBg: 'bg-amber-500',
    calloutBg: 'bg-amber-950/40 dark:bg-amber-950/50',
    calloutBorder: 'border-amber-500/25',
    calloutText: 'text-amber-300',
  },
}

// ─── Simple Explanation Callout ───────────────────────────────────────────────
function SimpleExplanationCallout({ text, cfg }) {
  if (!text) return null
  return (
    <div
      className={`flex gap-3 rounded-xl border p-4 ${cfg.calloutBg} ${cfg.calloutBorder}`}
    >
      <div className={`flex-shrink-0 mt-0.5 p-1.5 rounded-lg ${cfg.accentBg}`}>
        <Lightbulb className={`w-4 h-4 ${cfg.calloutText}`} />
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${cfg.calloutText}`}>
          Simple Explanation
        </p>
        <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  )
}

// ─── Resource Link ─────────────────────────────────────────────────────────────
function ResourceLink({ resource, cfg }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 border transition-all
        ${cfg.accentBg} ${cfg.accentBorder} ${cfg.accent}
        hover:brightness-110`}
    >
      {resource.title}
      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ step, stepIndex, phase, cfg, isExpanded, onToggle, substepStates, onSubstepChange, isCompleted }) {
  const substepCount = step.substeps?.length ?? 0
  const doneCount = step.substeps?.filter((_, i) => substepStates[`${step.id}-${i}`]).length ?? 0
  const localProgress = substepCount > 0 ? Math.round((doneCount / substepCount) * 100) : 0

  const hasResources = step.resources && step.resources.length > 0

  const cardBg = isCompleted
    ? cfg.stepCompletedBg
    : 'bg-white dark:bg-surface-secondary'

  const cardBorder = isCompleted
    ? cfg.stepBorder
    : 'border-slate-200 dark:border-slate-700'

  const costLabel =
    step.estimatedCost
      ? step.estimatedCost.min === step.estimatedCost.max
        ? step.estimatedCost.min === 0
          ? 'Free'
          : `$${step.estimatedCost.min}`
        : `$${step.estimatedCost.min} – $${step.estimatedCost.max}`
      : null

  return (
    <div
      className={`rounded-xl border shadow-sm transition-all duration-200 ${cardBg} ${cardBorder} ${isExpanded ? 'shadow-md' : ''}`}
    >
      {/* ── Collapsed / Header Row ─────────────────────────────── */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-5 py-4 text-left"
        aria-expanded={isExpanded}
      >
        {/* Step number */}
        <div
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold shadow-sm mt-0.5 ${
            isCompleted ? cfg.numberBg : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <span>{stepIndex + 1}</span>
          )}
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className={`text-sm font-semibold leading-snug ${
                  isCompleted
                    ? 'text-slate-400 dark:text-slate-500 line-through'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {step.title}
              </h3>
              {/* Sub-stats row */}
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <StatusBadge status={isCompleted ? 'completed' : step.status} size="sm" />
                {costLabel && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                    <DollarSign className="w-3 h-3" />
                    {costLabel}
                  </span>
                )}
                {substepCount > 0 && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {doneCount}/{substepCount} tasks
                  </span>
                )}
              </div>
              {/* Mini progress bar (only if substeps exist and card is collapsed) */}
              {!isExpanded && substepCount > 0 && (
                <div className="mt-2 max-w-xs">
                  <ProgressBar value={localProgress} color={cfg.barColor} size="sm" />
                </div>
              )}
            </div>
            <div className="flex-shrink-0 mt-0.5 text-slate-400 dark:text-slate-500">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </div>
      </button>

      {/* ── Expanded Content ───────────────────────────────────── */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-slate-100 dark:border-slate-700/50 pt-4">

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {step.description}
          </p>

          {/* Simple Explanation Callout */}
          {step.simpleExplanation && (
            <SimpleExplanationCallout text={step.simpleExplanation} cfg={cfg} />
          )}

          {/* Substeps */}
          {substepCount > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <ListChecks className="w-3.5 h-3.5" />
                  Checklist
                </h4>
                <span className={`text-xs font-semibold ${cfg.accent}`}>
                  {localProgress}% complete
                </span>
              </div>
              <ProgressBar value={localProgress} color={cfg.barColor} size="sm" className="mb-3" />
              <div className="space-y-2">
                {step.substeps.map((substep, i) => {
                  const substepKey = `${step.id}-${i}`
                  const checked = substepStates[substepKey] ?? false
                  const label = typeof substep === 'string' ? substep : substep.title
                  return (
                    <div
                      key={substepKey}
                      className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 transition-colors ${
                        checked
                          ? 'bg-slate-50 dark:bg-slate-800/40'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onChange={() => onSubstepChange(substepKey, !checked)}
                        className="mt-0.5"
                      />
                      <span
                        className={`text-sm leading-snug ${
                          checked
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Resources */}
          {hasResources && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {step.resources.map((resource, i) => (
                  <ResourceLink key={i} resource={resource} cfg={cfg} />
                ))}
              </div>
            </div>
          )}

          {/* Mark complete button */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onSubstepChange('__stepComplete__' + step.id, !isCompleted)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all border ${
                isCompleted
                  ? `${cfg.accentBg} ${cfg.accentBorder} ${cfg.accent} hover:brightness-110`
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Marked Complete
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark as Complete
                </>
              )}
            </button>
            {!isCompleted && substepCount > 0 && doneCount === substepCount && (
              <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                All tasks done — ready to mark complete!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PhasePage() {
  const { phaseNumber } = useParams()
  const num = parseInt(phaseNumber, 10)

  const phase = useMemo(
    () => phasesData.find((p) => p.number === num),
    [num]
  )

  const cfg = phaseConfig[num] ?? phaseConfig[1]
  const { Icon, gradient, gradientBg, accent, accentBg, accentBorder, barColor, border } = cfg

  // ── localStorage ──────────────────────────────────────────────
  const [phaseSteps, setPhaseSteps] = useLocalStorage('phase-steps', {})
  const [phaseSubsteps, setPhaseSubsteps] = useLocalStorage('phase-substeps', {})

  // ── Expanded steps state ──────────────────────────────────────
  const [expandedSteps, setExpandedSteps] = useState(new Set())

  const toggleStep = (stepId) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepId)) next.delete(stepId)
      else next.add(stepId)
      return next
    })
  }

  // ── Handle substep checkbox changes ──────────────────────────
  const handleSubstepChange = (step, substepKey, value) => {
    if (substepKey.startsWith('__stepComplete__')) {
      // Direct step completion toggle
      const sid = substepKey.replace('__stepComplete__', '')
      setPhaseSteps((prev) => ({
        ...prev,
        [sid]: value ? 'completed' : 'not-started',
      }))
      return
    }

    // Update substep
    const newSubsteps = { ...phaseSubsteps, [substepKey]: value }
    setPhaseSubsteps(newSubsteps)

    // Auto-complete step if all substeps done
    const substepCount = step.substeps?.length ?? 0
    if (substepCount > 0) {
      const allDone = step.substeps.every((_, i) => newSubsteps[`${step.id}-${i}`])
      const anyDone = step.substeps.some((_, i) => newSubsteps[`${step.id}-${i}`])
      setPhaseSteps((prev) => ({
        ...prev,
        [step.id]: allDone ? 'completed' : anyDone ? 'in-progress' : 'not-started',
      }))
    }
  }

  // ── Progress calculation ──────────────────────────────────────
  const { totalSteps, completedCount, inProgressCount, progressPct } = useMemo(() => {
    if (!phase) return { totalSteps: 0, completedCount: 0, inProgressCount: 0, progressPct: 0 }
    const steps = phase.steps ?? []
    const total = phase.keyMetrics?.totalSteps ?? steps.length
    const completed = steps.filter((s) => phaseSteps[s.id] === 'completed').length
    const inProg = steps.filter((s) => phaseSteps[s.id] === 'in-progress').length
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0
    return { totalSteps: total, completedCount: completed, inProgressCount: inProg, progressPct: pct }
  }, [phase, phaseSteps])

  // ── Cost summary ──────────────────────────────────────────────
  const costRange = useMemo(() => {
    if (!phase) return null
    if (phase.keyMetrics?.estimatedTotalCost) {
      const { min, max } = phase.keyMetrics.estimatedTotalCost
      return `$${min.toLocaleString()} – $${max.toLocaleString()}`
    }
    return null
  }, [phase])

  if (!phase) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">Phase {phaseNumber} not found.</p>
        <Link to="/" className="text-blue-400 hover:underline mt-2 inline-block text-sm">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const steps = phase.steps ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Phase Hero Header ────────────────────────────────────── */}
      <div className={`relative rounded-2xl border overflow-hidden mb-8 mt-6 ${border}`}>
        {/* Gradient background layer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} pointer-events-none`} />

        <div className="relative px-6 pt-6 pb-5">
          {/* Back nav */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 mb-5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </Link>

          {/* Phase badge + icon */}
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent}`}>
                  Phase {phase.number}
                </span>
                <StatusBadge status={phase.status} size="sm" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {phase.title}
              </h1>
              <p className={`text-sm font-medium mt-0.5 ${accent}`}>{phase.subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-4 max-w-2xl">
            {phase.description}
          </p>

          {/* Key metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className={`rounded-xl border px-4 py-3 ${accentBg} ${accentBorder}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Layers className={`w-3.5 h-3.5 ${accent}`} />
                <span className="text-xs text-slate-400 dark:text-slate-400">Total Steps</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{totalSteps}</span>
            </div>
            <div className={`rounded-xl border px-4 py-3 ${accentBg} ${accentBorder}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accent}`} />
                <span className="text-xs text-slate-400 dark:text-slate-400">Completed</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{completedCount}</span>
            </div>
            <div className={`rounded-xl border px-4 py-3 ${accentBg} ${accentBorder}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Target className={`w-3.5 h-3.5 ${accent}`} />
                <span className="text-xs text-slate-400 dark:text-slate-400">In Progress</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{inProgressCount}</span>
            </div>
            {costRange && (
              <div className={`rounded-xl border px-4 py-3 ${accentBg} ${accentBorder}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className={`w-3.5 h-3.5 ${accent}`} />
                  <span className="text-xs text-slate-400 dark:text-slate-400">Est. Cost</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{costRange}</span>
              </div>
            )}
          </div>

          {/* Overall progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Overall Progress</span>
              <span className={`text-sm font-bold ${accent}`}>{progressPct}%</span>
            </div>
            <ProgressBar value={progressPct} color={barColor} size="lg" />
          </div>
        </div>
      </div>

      {/* ── Steps List ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            Steps ({steps.length})
          </h2>
          <button
            onClick={() => {
              if (expandedSteps.size === steps.length) {
                setExpandedSteps(new Set())
              } else {
                setExpandedSteps(new Set(steps.map((s) => s.id)))
              }
            }}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {expandedSteps.size === steps.length ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        {steps.map((step, idx) => {
          const isCompleted = phaseSteps[step.id] === 'completed'
          const isExpanded = expandedSteps.has(step.id)
          return (
            <StepCard
              key={step.id}
              step={step}
              stepIndex={idx}
              phase={phase}
              cfg={cfg}
              isExpanded={isExpanded}
              onToggle={() => toggleStep(step.id)}
              substepStates={phaseSubsteps}
              onSubstepChange={(substepKey, value) =>
                handleSubstepChange(step, substepKey, value)
              }
              isCompleted={isCompleted}
            />
          )
        })}

        {steps.length === 0 && (
          <Card>
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
              No steps defined for this phase yet.
            </p>
          </Card>
        )}
      </div>

      {/* ── Phase Navigation ─────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
        {num > 1 ? (
          <Link
            to={`/phase/${num - 1}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Phase {num - 1}
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        )}

        {num < 3 ? (
          <Link
            to={`/phase/${num + 1}`}
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${accentBg} ${accentBorder} border ${accent} hover:brightness-110`}
          >
            Phase {num + 1}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        ) : (
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${accentBg} ${accentBorder} border ${accent} hover:brightness-110`}
          >
            Dashboard
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        )}
      </div>
    </div>
  )
}
