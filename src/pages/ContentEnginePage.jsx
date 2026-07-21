import {
  Cpu,
  Newspaper,
  GraduationCap,
  Images,
  CalendarClock,
  Circle,
  ArrowUpRight,
  History,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import engine from '../data/contentEngine.json'

const LOOP_ICONS = {
  'loop-news': Newspaper,
  'loop-curriculum': GraduationCap,
  'loop-media': Images,
  'loop-events': CalendarClock,
}

const MODEL_STYLES = {
  Opus: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
  Sonnet: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  Haiku: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Fable: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
}

function modelClass(model) {
  return MODEL_STYLES[model] || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
}

export default function ContentEnginePage() {
  const { meta, loops, log } = engine

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/15">
            <Cpu className="w-5 h-5 text-brand-gold" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Content Engine
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {meta.purpose}
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-brand-gold/30 bg-brand-gold/5 p-4">
          <Sparkles className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-600 dark:text-slate-300 italic">
            {meta.philosophy}
          </p>
        </div>
      </div>

      {/* Loops */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Active Loops
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loops.map((loop) => {
            const Icon = LOOP_ICONS[loop.id] || Cpu
            return (
              <div
                key={loop.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-secondary p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-teal/10">
                      <Icon className="w-4.5 h-4.5 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                        {loop.name}
                      </h3>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {loop.cadence}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <Circle className="w-2 h-2 fill-current" />
                    {loop.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {loop.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${modelClass(
                      loop.model
                    )}`}
                  >
                    {loop.model}
                  </span>
                  {loop.outputs.map((out) => (
                    <span
                      key={out}
                      className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400 font-mono"
                    >
                      {out}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Public site link */}
      <div className="mb-10">
        <Link
          to="/site"
          className="group flex items-center justify-between rounded-xl border border-brand-navy/20 dark:border-brand-teal/20 bg-gradient-to-r from-brand-navy/5 to-brand-teal/5 p-5 hover:border-brand-teal/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-navy/10 dark:bg-brand-teal/10">
              <Rocket className="w-5 h-5 text-brand-navy dark:text-brand-teal" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                View the live public site
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The SCAiL brand house — everything the engine keeps current
              </p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
        </Link>
      </div>

      {/* Log */}
      <div>
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          <History className="w-3.5 h-3.5" />
          Update Log
        </h2>
        <div className="space-y-3">
          {log.map((entry, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-secondary p-4"
            >
              <div className="flex-shrink-0 text-center">
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {entry.date}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {entry.loop}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${modelClass(
                      entry.model
                    )}`}
                  >
                    {entry.model}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {entry.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
