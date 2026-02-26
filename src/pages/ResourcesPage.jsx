import { useState, useMemo } from 'react'
import {
  FolderOpen,
  Lightbulb,
  ExternalLink,
  FileText,
  Brain,
  DollarSign,
  FileCheck,
  Map,
  Wrench,
  BookOpen,
  Star,
  Building2,
  Zap,
  Settings,
  Users,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import PhaseTag from '../components/ui/PhaseTag'
import SearchInput from '../components/ui/SearchInput'
import Tabs from '../components/ui/Tabs'
import resourcesData from '../data/resources.json'

// Map category icon string names to Lucide components
const CATEGORY_ICONS = {
  FileText,
  Brain,
  DollarSign,
  FileCheck,
  Map,
  BookOpen,
  Wrench,
  Star,
  Building2,
  Zap,
  Settings,
  Users,
}

// Map resource type to badge variant and label
const TYPE_CONFIG = {
  tool: { variant: 'info', label: 'Tool' },
  guide: { variant: 'purple', label: 'Guide' },
  form: { variant: 'warning', label: 'Form' },
  template: { variant: 'default', label: 'Template' },
  organization: { variant: 'success', label: 'Organization' },
  partner: { variant: 'success', label: 'Partner' },
  grant: { variant: 'success', label: 'Grant' },
  reference: { variant: 'default', label: 'Reference' },
  curriculum: { variant: 'purple', label: 'Curriculum' },
}

function SimpleExplanationCallout({ text }) {
  return (
    <div className="flex gap-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
      <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-200 leading-relaxed">{text}</p>
    </div>
  )
}

function ResourceCard({ resource }) {
  const typeConfig = TYPE_CONFIG[resource.type] || { variant: 'default', label: resource.type }

  return (
    <div className="flex flex-col rounded-xl bg-surface-secondary border border-slate-700 hover:border-slate-600 transition-all duration-150 overflow-hidden group">
      <div className="flex-1 p-4 space-y-3">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-start gap-2 mb-1.5">
            <Badge variant={typeConfig.variant}>{typeConfig.label}</Badge>
            {resource.isFree && (
              <Badge variant="success">Free</Badge>
            )}
            <PhaseTag phase={resource.phase} />
          </div>
          <h4 className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-blue-300 transition-colors">
            {resource.title}
          </h4>
        </div>

        {/* Description */}
        {resource.description && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
            {resource.description}
          </p>
        )}

        {/* Simple explanation callout */}
        {resource.simpleExplanation && (
          <SimpleExplanationCallout text={resource.simpleExplanation} />
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700/50 flex items-center justify-between">
        {resource.cost && !resource.isFree && (
          <span className="text-xs text-slate-500">{resource.cost}</span>
        )}
        {resource.contactName && (
          <span className="text-xs text-slate-500">Contact: {resource.contactName}</span>
        )}
        <div className="ml-auto">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Open Link
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const { categories, resources } = resourcesData

  // Build filtered resources
  const filteredResources = useMemo(() => {
    let result = resources

    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.simpleExplanation?.toLowerCase().includes(q) ||
          r.type?.toLowerCase().includes(q)
      )
    }

    return result
  }, [resources, activeCategory, search])

  // Count per category for tab badges
  const countByCategory = useMemo(() => {
    const counts = {}
    resources.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1
    })
    return counts
  }, [resources])

  // Build tabs array
  const tabs = [
    {
      id: 'all',
      label: 'All Resources',
      count: resources.length,
    },
    ...categories.map((cat) => {
      const Icon = CATEGORY_ICONS[cat.icon]
      return {
        id: cat.id,
        label: cat.label,
        icon: Icon,
        count: countByCategory[cat.id] || 0,
      }
    }),
  ]

  const activeCategoryData = categories.find((c) => c.id === activeCategory)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-purple-500/10">
          <FolderOpen className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Resources</h1>
          <p className="text-slate-400 mt-1">
            Curated links and tools — everything you need to build your nonprofit.
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search resources by name, description, or type..."
      />

      {/* Tabs */}
      <div className="overflow-x-auto">
        <Tabs
          tabs={tabs}
          activeTab={activeCategory}
          onChange={(id) => {
            setActiveCategory(id)
            setSearch('')
          }}
        />
      </div>

      {/* Category description */}
      {activeCategoryData && !search && (
        <div className="flex gap-3 rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3">
          {CATEGORY_ICONS[activeCategoryData.icon] && (
            <span>
              {(() => {
                const Icon = CATEGORY_ICONS[activeCategoryData.icon]
                return <Icon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              })()}
            </span>
          )}
          <p className="text-sm text-slate-400">{activeCategoryData.simpleExplanation}</p>
        </div>
      )}

      {/* Results count when searching */}
      {search && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
          <button
            onClick={() => setSearch('')}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Resource grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No resources found.</p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  )
}
