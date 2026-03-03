import { useState, useMemo } from 'react'
import {
  GraduationCap,
  BookOpen,
  ExternalLink,
  Search,
  Users,
  Building2,
  Handshake,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle,
  Clock,
  Monitor,
  ListChecks,
  Package,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import SearchInput from '../components/ui/SearchInput'
import Tabs from '../components/ui/Tabs'
import curriculumData from '../data/curriculum.json'

// Level badge variant mapping
const LEVEL_CONFIG = {
  beginner: { variant: 'success', label: 'Beginner' },
  intermediate: { variant: 'info', label: 'Intermediate' },
  advanced: { variant: 'purple', label: 'Advanced' },
  'all-levels': { variant: 'default', label: 'All Levels' },
}

// Cost badge variant mapping
const COST_CONFIG = {
  Free: { variant: 'success', label: 'Free' },
}

// Partnership status badge mapping
const PARTNERSHIP_STATUS_CONFIG = {
  prospect: { variant: 'warning', label: 'Prospect' },
  outreach: { variant: 'info', label: 'Outreach' },
  active: { variant: 'success', label: 'Active' },
}

// ── SCAiL Course Card ───────────────────────────────────────────────
function ScailCourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)
  const levelConfig = LEVEL_CONFIG[course.level] || LEVEL_CONFIG['all-levels']

  return (
    <div className="flex flex-col rounded-xl bg-surface-secondary border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden">
      <div className="flex-1 p-5 space-y-3">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={levelConfig.variant}>{levelConfig.label}</Badge>
          {course.format && <Badge variant="default">{course.format}</Badge>}
          {course.phase && (
            <Badge variant="purple">Phase {course.phase}</Badge>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-100 leading-snug">
          {course.title}
        </h4>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          {course.duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          )}
          {course.audience && (
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.audience}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Expand / Collapse toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center justify-center gap-1.5 px-5 py-2.5 border-t border-slate-700/50 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
      >
        {expanded ? (
          <>
            Hide details <ChevronUp className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            Show details <ChevronDown className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700/50 pt-4">
          {/* Modules */}
          {course.modules?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5" />
                Modules
              </p>
              <ol className="space-y-1.5 list-decimal list-inside">
                {course.modules.map((mod, i) => (
                  <li key={i} className="text-sm text-slate-300 leading-relaxed">
                    {mod}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Learning Outcomes */}
          {course.outcomes?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Learning Outcomes
              </p>
              <ul className="space-y-1.5">
                {course.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          {course.materials && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                Materials Needed
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{course.materials}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── External Course Card ────────────────────────────────────────────
function ExternalCourseCard({ course }) {
  const levelConfig = LEVEL_CONFIG[course.level] || LEVEL_CONFIG['all-levels']
  const isFree = course.cost === 'Free' || course.cost === '$0' || course.cost === 'free'
  const costConfig = isFree
    ? { variant: 'success', label: 'Free' }
    : { variant: 'warning', label: course.cost || 'Paid' }

  return (
    <div className="flex flex-col sm:flex-row rounded-xl bg-surface-secondary border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden group">
      <div className="flex-1 p-4 space-y-2">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {course.provider && (
            <Badge variant="info">{course.provider}</Badge>
          )}
          <Badge variant={levelConfig.variant}>{levelConfig.label}</Badge>
          <Badge variant={costConfig.variant}>{costConfig.label}</Badge>
          {course.nonTechnical && (
            <Badge variant="success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Non-Technical
            </Badge>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-blue-300 transition-colors">
          {course.title}
        </h4>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {course.platform && (
            <span className="inline-flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5" />
              {course.platform}
            </span>
          )}
          {course.duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          )}
          {course.category && (
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.category}
            </span>
          )}
        </div>

        {/* Description */}
        {course.description && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Why included */}
        {course.whyIncluded && (
          <div className="flex gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 mt-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200 leading-relaxed">
              <span className="font-semibold">Why included:</span> {course.whyIncluded}
            </p>
          </div>
        )}
      </div>

      {/* Link section */}
      {course.url && (
        <div className="flex items-center justify-end sm:justify-center px-4 pb-4 sm:pb-0 sm:pr-5 sm:border-l border-slate-700/50">
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
          >
            Open Course
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  )
}

// ── Partnership Card ────────────────────────────────────────────────
function PartnershipCard({ partner }) {
  const statusConfig = PARTNERSHIP_STATUS_CONFIG[partner.status] || {
    variant: 'default',
    label: partner.status || 'Unknown',
  }

  return (
    <div className="flex flex-col rounded-xl bg-surface-secondary border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden">
      <div className="flex-1 p-5 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {partner.type && <Badge variant="info">{partner.type}</Badge>}
          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
        </div>

        {/* Organization name */}
        <h4 className="text-sm font-bold text-slate-100 leading-snug">
          {partner.organization}
        </h4>

        {/* Description */}
        {partner.description && (
          <p className="text-xs text-slate-400 leading-relaxed">
            {partner.description}
          </p>
        )}

        {/* Notes */}
        {partner.notes && (
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
            <p className="text-xs text-blue-200 leading-relaxed">{partner.notes}</p>
          </div>
        )}
      </div>

      {/* Footer with link */}
      {partner.url && (
        <div className="px-5 py-3 border-t border-slate-700/50 flex items-center justify-end">
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Visit Site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  )
}

// ── Main Page Component ─────────────────────────────────────────────
export default function CurriculumPage() {
  const { scailCourses, externalCourses, partnerships } = curriculumData

  // Tab state
  const [activeTab, setActiveTab] = useState('scail')

  // External Resources filter state
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [freeOnly, setFreeOnly] = useState(false)

  // Extract unique filter values from external courses
  const platforms = useMemo(() => {
    const set = new Set(externalCourses.map((c) => c.platform).filter(Boolean))
    return ['All', ...Array.from(set).sort()]
  }, [externalCourses])

  const levels = useMemo(() => {
    const set = new Set(externalCourses.map((c) => c.level).filter(Boolean))
    return ['All', ...Array.from(set).sort()]
  }, [externalCourses])

  const categories = useMemo(() => {
    const set = new Set(externalCourses.map((c) => c.category).filter(Boolean))
    return ['All', ...Array.from(set).sort()]
  }, [externalCourses])

  // Filter external courses
  const filteredExternal = useMemo(() => {
    let result = externalCourses

    if (platformFilter !== 'All') {
      result = result.filter((c) => c.platform === platformFilter)
    }

    if (levelFilter !== 'All') {
      result = result.filter((c) => c.level === levelFilter)
    }

    if (categoryFilter !== 'All') {
      result = result.filter((c) => c.category === categoryFilter)
    }

    if (freeOnly) {
      result = result.filter(
        (c) => c.cost === 'Free' || c.cost === '$0' || c.cost === 'free'
      )
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.provider?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.whyIncluded?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q) ||
          c.platform?.toLowerCase().includes(q)
      )
    }

    return result
  }, [externalCourses, platformFilter, levelFilter, categoryFilter, freeOnly, search])

  // Tab definitions
  const tabs = [
    {
      id: 'scail',
      label: 'SCAiL Courses',
      icon: GraduationCap,
      count: scailCourses.length,
    },
    {
      id: 'external',
      label: 'External Resources',
      icon: BookOpen,
      count: externalCourses.length,
    },
    {
      id: 'partnerships',
      label: 'Partnerships',
      icon: Handshake,
      count: partnerships.length,
    },
  ]

  // Reset filters when switching tabs
  function handleTabChange(tabId) {
    setActiveTab(tabId)
    setSearch('')
    setPlatformFilter('All')
    setLevelFilter('All')
    setCategoryFilter('All')
    setFreeOnly(false)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-blue-500/10">
          <GraduationCap className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Curriculum</h1>
          <p className="text-slate-400 mt-1">
            SCAiL original courses and curated resources from leading platforms
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {/* ── Tab 1: SCAiL Courses ─────────────────────────────────── */}
      {activeTab === 'scail' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scailCourses.map((course) => (
              <ScailCourseCard key={course.id} course={course} />
            ))}
          </div>
          {scailCourses.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No SCAiL courses available yet.</p>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: External Resources ────────────────────────────── */}
      {activeTab === 'external' && (
        <div className="space-y-4">
          {/* Search bar */}
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by title, provider, description..."
          />

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              Filters:
            </div>

            {/* Platform */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                paddingRight: '1.75rem',
                appearance: 'none',
              }}
            >
              {platforms.map((p) => (
                <option key={p} value={p} className="bg-slate-800">
                  {p === 'All' ? 'All Platforms' : p}
                </option>
              ))}
            </select>

            {/* Level */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                paddingRight: '1.75rem',
                appearance: 'none',
              }}
            >
              {levels.map((l) => (
                <option key={l} value={l} className="bg-slate-800">
                  {l === 'All' ? 'All Levels' : LEVEL_CONFIG[l]?.label || l}
                </option>
              ))}
            </select>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                paddingRight: '1.75rem',
                appearance: 'none',
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-800">
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            {/* Free only toggle */}
            <label className="inline-flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/40 focus:ring-offset-0 cursor-pointer"
              />
              Free only
            </label>
          </div>

          {/* Results count */}
          {(search || platformFilter !== 'All' || levelFilter !== 'All' || categoryFilter !== 'All' || freeOnly) && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {filteredExternal.length} result{filteredExternal.length !== 1 ? 's' : ''}
                {search && <> for &ldquo;{search}&rdquo;</>}
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setPlatformFilter('All')
                  setLevelFilter('All')
                  setCategoryFilter('All')
                  setFreeOnly(false)
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Course list */}
          {filteredExternal.length > 0 ? (
            <div className="space-y-3">
              {filteredExternal.map((course) => (
                <ExternalCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No external courses match your filters.</p>
              <button
                onClick={() => {
                  setSearch('')
                  setPlatformFilter('All')
                  setLevelFilter('All')
                  setCategoryFilter('All')
                  setFreeOnly(false)
                }}
                className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: Partnerships ──────────────────────────────────── */}
      {activeTab === 'partnerships' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerships.map((partner) => (
              <PartnershipCard key={partner.id} partner={partner} />
            ))}
          </div>
          {partnerships.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Handshake className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No partnerships listed yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
