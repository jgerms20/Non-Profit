import { useEffect, useState } from 'react'
import { Download, GraduationCap, FileText, Presentation, AlertCircle } from 'lucide-react'

const COURSE_COLORS = {
  'sc-1': 'from-blue-500 to-blue-600',
  'sc-2': 'from-teal-500 to-teal-600',
  'sc-3': 'from-amber-500 to-amber-600',
  'sc-4': 'from-green-500 to-green-600',
  'sc-5': 'from-red-500 to-red-600',
  'sc-6': 'from-purple-500 to-purple-600',
  'sc-7': 'from-indigo-500 to-indigo-600',
  'sc-8': 'from-slate-500 to-slate-600',
}

const COURSE_DESCRIPTIONS = {
  'sc-1': '90 min · Beginner · In-person — Plain-language intro to AI for community members with zero experience.',
  'sc-2': 'Half-day · Beginner — Practical AI skills for working adults and job seekers.',
  'sc-3': '4-week hybrid — AI adoption for local business owners and entrepreneurs.',
  'sc-4': 'Half-day · Beginner — AI for SC farmers and agricultural workers.',
  'sc-5': '2 hours · Beginner — AI safety and scam recognition for all community members.',
  'sc-6': '6-week in-person · Ages 14-22 — Build your first AI project culminating in demo day.',
  'sc-7': '8-week hybrid · Intermediate — Lead AI adoption in your organization.',
  'sc-8': '12-week hybrid — Certification for teachers, librarians, and community educators.',
}

export default function CurriculumDownloadsPage() {
  const [index, setIndex] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/docs/curriculum/index.json')
      .then((r) => {
        if (!r.ok) throw new Error('Curriculum index not found')
        return r.json()
      })
      .then(setIndex)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Curriculum Downloads</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            SCAiL-branded slide decks for every course. Download the .pptx files to edit in PowerPoint, Google Slides, or Keynote.
          </p>
        </div>
        <a
          href="/#/curriculum"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-surface-tertiary text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-surface-tertiary/70 transition-colors text-sm font-medium shrink-0"
        >
          <GraduationCap className="h-4 w-4" />
          Full Curriculum
        </a>
      </div>

      {/* Intro callout */}
      <div className="rounded-xl p-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
        <div className="flex items-start gap-3">
          <Presentation className="h-6 w-6 text-brand-gold shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Every SCAiL course, ready to teach.</h3>
            <p className="text-sm text-white/80 mt-1">
              These slide decks follow the SCAiL brand system — navy, gold, teal — and are designed to be dropped into any workshop,
              community center, or library venue. Edit them, customize them, remix them. They're yours.
            </p>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-300">Curriculum files are being built.</p>
            <p className="text-amber-800 dark:text-amber-400 mt-1">
              If you're seeing this in production, the slide decks may not have been committed yet. Run
              <code className="mx-1 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-xs">python3 scripts/generate-curriculum-pptx.py</code>
              locally and redeploy.
            </p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!error && !index && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 dark:bg-surface-tertiary animate-pulse" />
          ))}
        </div>
      )}

      {/* Course grid */}
      {index && (
        <div className="grid gap-4 sm:grid-cols-2">
          {index.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary overflow-hidden hover:shadow-md dark:hover:border-surface-border/80 transition-all"
            >
              <div className={`h-1.5 bg-gradient-to-r ${COURSE_COLORS[course.id] || 'from-slate-500 to-slate-600'}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight">
                    {course.title}
                  </h3>
                  <FileText className="h-5 w-5 text-slate-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {COURSE_DESCRIPTIONS[course.id]}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-surface-tertiary text-slate-600 dark:text-slate-300 font-medium">
                    {course.slides} slides
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {course.sizeKB} KB · .pptx
                  </span>
                </div>
                <a
                  href={`/docs/curriculum/${course.filename}`}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors text-sm font-medium w-full justify-center"
                >
                  <Download className="h-4 w-4" />
                  Download .pptx
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How to use */}
      <div className="rounded-xl p-6 bg-slate-50 dark:bg-surface-tertiary border border-slate-200 dark:border-surface-border">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">How to use these decks</h3>
        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
          <li><strong>PowerPoint:</strong> Download the .pptx file and open directly.</li>
          <li><strong>Google Slides:</strong> Go to Google Slides → File → Import Slides → Upload the .pptx.</li>
          <li><strong>Keynote:</strong> Drag the .pptx onto Keynote to convert.</li>
          <li><strong>Customization:</strong> The decks use Inter font and the SCAiL brand palette. Edit the title slide to add your venue, date, and instructor name.</li>
          <li><strong>Regeneration:</strong> Run <code className="px-1.5 py-0.5 rounded bg-white dark:bg-surface-secondary">python3 scripts/generate-curriculum-pptx.py</code> to rebuild all decks from the latest curriculum.json.</li>
        </ul>
      </div>
    </div>
  )
}
