import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, BarChart3, MessagesSquare, Download, FileText } from 'lucide-react'

const BRIEFS = [
  {
    id: 'week',
    title: 'This Week',
    subtitle: 'April 13–19, 2026',
    icon: Calendar,
    file: '/docs/week-of-april-13.md',
    accent: 'from-blue-500 to-blue-600',
  },
  {
    id: 'state',
    title: 'State of the State',
    subtitle: 'AI sentiment & market brief, April 2026',
    icon: BarChart3,
    file: '/docs/state-of-the-state-april-2026.md',
    accent: 'from-teal-500 to-teal-600',
  },
  {
    id: 'interviews',
    title: 'Community Interview Questions',
    subtitle: 'Conversation guide for field research',
    icon: MessagesSquare,
    file: '/docs/community-interview-questions.md',
    accent: 'from-amber-500 to-amber-600',
  },
]

export default function BriefingsPage() {
  const [activeId, setActiveId] = useState('week')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const active = BRIEFS.find((b) => b.id === activeId) || BRIEFS[0]

  useEffect(() => {
    setLoading(true)
    fetch(active.file)
      .then((r) => r.text())
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => {
        setContent('Could not load this briefing.')
        setLoading(false)
      })
  }, [active.file])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Briefings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Strategic documents — this week's action list, market intelligence, and community research tools.
        </p>
      </div>

      {/* Tab Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        {BRIEFS.map((brief) => {
          const Icon = brief.icon
          const isActive = brief.id === activeId
          return (
            <button
              key={brief.id}
              onClick={() => setActiveId(brief.id)}
              className={`text-left rounded-xl overflow-hidden border transition-all ${
                isActive
                  ? 'border-brand-navy dark:border-brand-teal shadow-md'
                  : 'border-slate-200 dark:border-surface-border hover:border-slate-300 dark:hover:border-surface-border/80'
              }`}
            >
              <div className={`h-1 bg-gradient-to-r ${brief.accent}`} />
              <div className="p-4 bg-white dark:bg-surface-secondary">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${isActive ? 'text-brand-teal' : 'text-slate-400'}`} />
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm ${isActive ? 'text-brand-navy dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {brief.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {brief.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <FileText className="h-4 w-4" />
          <span>{active.title}</span>
        </div>
        <a
          href={active.file}
          download
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-surface-tertiary text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-surface-tertiary/70 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Download Markdown
        </a>
      </div>

      {/* Content */}
      <div className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary p-6 sm:p-10">
        {loading ? (
          <div className="space-y-3">
            <div className="h-6 w-2/3 bg-slate-100 dark:bg-surface-tertiary rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-100 dark:bg-surface-tertiary rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-100 dark:bg-surface-tertiary rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-slate-100 dark:bg-surface-tertiary rounded animate-pulse" />
          </div>
        ) : (
          <article className="prose-scail">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  )
}
