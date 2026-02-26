import { useState } from 'react'
import {
  Scale,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Clock,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Wrench,
  FileText,
  Star,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Checkbox from '../components/ui/Checkbox'
import ProgressBar from '../components/ui/ProgressBar'
import StatusBadge from '../components/ui/StatusBadge'
import { useLocalStorage } from '../hooks/useLocalStorage'
import legalData from '../data/legalSteps.json'

const RESOURCE_TYPE_ICONS = {
  tool: Wrench,
  guide: BookOpen,
  form: FileText,
  template: Star,
}

function formatCost(min, max) {
  if (min === 0 && max === 0) return 'Free'
  if (min === 0) return `Free – $${max}`
  if (min === max) return `$${min}`
  return `$${min} – $${max}`
}

function SimpleExplanationCallout({ text }) {
  return (
    <div className="flex gap-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
      <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-200 leading-relaxed">{text}</p>
    </div>
  )
}

function TipCallout({ tips }) {
  return (
    <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">Tips</p>
      <ul className="space-y-1.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-2 text-sm text-blue-200">
            <span className="text-blue-400 flex-shrink-0">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StepCard({ step, stepNumber, status, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const isCompleted = status === 'completed'

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-green-500/5 border-green-500/20'
          : 'bg-surface-secondary border-slate-700 hover:border-slate-600'
      }`}
    >
      {/* Card Header — always visible */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Step number circle */}
          <div
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
              isCompleted
                ? 'bg-green-500 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4
                className={`text-sm font-semibold ${
                  isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'
                }`}
              >
                {step.title}
              </h4>
              <StatusBadge status={status} size="sm" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                <DollarSign className="w-3 h-3" />
                {formatCost(step.estimatedCost.min, step.estimatedCost.max)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {step.estimatedTime}
              </span>
            </div>
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            aria-label={expanded ? 'Collapse step' : 'Expand step'}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Simple explanation always visible */}
        <div className="mt-3">
          <SimpleExplanationCallout text={step.simpleExplanation} />
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-700/50 pt-4">
          {/* Detailed steps */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Step-by-Step
            </p>
            <ol className="space-y-2">
              {step.detailedSteps.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 text-slate-400 text-xs flex items-center justify-center font-medium mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {step.tips?.length > 0 && <TipCallout tips={step.tips} />}

          {/* Resources */}
          {step.resources?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Resources
              </p>
              <div className="space-y-2">
                {step.resources.map((res, i) => {
                  const Icon = RESOURCE_TYPE_ICONS[res.type] || FileText
                  return (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="group-hover:underline">{res.title}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-60" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completion checkbox */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between">
        <Checkbox
          checked={isCompleted}
          onChange={(e) => onStatusChange(step.id, e.target.checked ? 'completed' : 'not-started')}
          label={isCompleted ? 'Completed' : 'Mark as completed'}
        />
        {!isCompleted && (
          <button
            onClick={() =>
              onStatusChange(step.id, status === 'in-progress' ? 'not-started' : 'in-progress')
            }
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              status === 'in-progress'
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/10'
                : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {status === 'in-progress' ? 'In Progress' : 'Mark In Progress'}
          </button>
        )}
      </div>
    </div>
  )
}

function SectionBlock({ section, steps, statuses, onStatusChange }) {
  const sectionSteps = steps.filter((s) => s.section === section.id)
  const completedCount = sectionSteps.filter((s) => statuses[s.id] === 'completed').length
  const progress = sectionSteps.length > 0 ? Math.round((completedCount / sectionSteps.length) * 100) : 0

  return (
    <Card noPadding>
      {/* Section header */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-1">{section.title}</h3>
            <p className="text-sm text-slate-400">{section.simpleExplanation}</p>
          </div>
          <Badge variant={completedCount === sectionSteps.length ? 'success' : 'default'} className="flex-shrink-0 mt-0.5">
            {completedCount}/{sectionSteps.length}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar
            value={progress}
            color={completedCount === sectionSteps.length ? 'green' : 'blue'}
            size="sm"
            className="flex-1"
          />
          <span className="text-xs text-slate-400 flex-shrink-0 w-8 text-right">{progress}%</span>
        </div>
      </div>

      {/* Steps */}
      <div className="p-4 space-y-3">
        {sectionSteps.map((step, idx) => (
          <StepCard
            key={step.id}
            step={step}
            stepNumber={idx + 1}
            status={statuses[step.id] || 'not-started'}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </Card>
  )
}

export default function LegalStepsPage() {
  const [statuses, setStatuses] = useLocalStorage('legal-steps', {})

  const { sections, steps } = legalData

  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  const totalSteps = steps.length
  const completedSteps = steps.filter((s) => statuses[s.id] === 'completed').length
  const inProgressSteps = steps.filter((s) => statuses[s.id] === 'in-progress').length
  const overallProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

  // Calculate total cost range
  const totalMinCost = steps.reduce((sum, s) => sum + s.estimatedCost.min, 0)
  const totalMaxCost = steps.reduce((sum, s) => sum + s.estimatedCost.max, 0)

  function handleStatusChange(stepId, newStatus) {
    setStatuses((prev) => ({ ...prev, [stepId]: newStatus }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-blue-500/10">
          <Scale className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Legal Steps</h1>
          <p className="text-slate-400 mt-1">
            Everything you need to legally create your nonprofit — explained simply.
          </p>
        </div>
      </div>

      {/* Overall progress card */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Overall Progress</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {completedSteps} of {totalSteps} steps completed
                {inProgressSteps > 0 && ` · ${inProgressSteps} in progress`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-100">{overallProgress}%</p>
            </div>
          </div>

          <ProgressBar
            value={overallProgress}
            color={overallProgress === 100 ? 'green' : 'blue'}
            size="lg"
            className="w-full"
          />

          <div className="pt-1 border-t border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <span>
                Estimated total cost:{' '}
                <span className="font-semibold text-slate-100">
                  ${totalMinCost.toLocaleString()} – ${totalMaxCost.toLocaleString()}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 ml-6">
              Most of this is the $275 IRS 501(c)(3) filing fee. The rest is very affordable.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{completedSteps}</p>
          <p className="text-xs text-slate-400 mt-1">Completed</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{inProgressSteps}</p>
          <p className="text-xs text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="rounded-xl bg-surface-secondary border border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-slate-300">
            {totalSteps - completedSteps - inProgressSteps}
          </p>
          <p className="text-xs text-slate-400 mt-1">Not Started</p>
        </div>
      </div>

      {/* Section blocks */}
      {sortedSections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          steps={steps}
          statuses={statuses}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  )
}
