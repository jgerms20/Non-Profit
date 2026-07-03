import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Scale,
  Calendar,
  CheckSquare,
  DollarSign,
  FolderOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Radar,
  GraduationCap,
  Globe,
  Info,
  UsersRound,
  Paintbrush,
  BarChart3,
  Presentation,
  ClipboardList,
  ScrollText,
  ShieldCheck,
  Rocket,
} from 'lucide-react'

const navSections = [
  {
    title: 'Overview',
    items: [
      { to: '/mission', icon: Rocket, label: 'Mission Control' },
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/hub', icon: Layers, label: 'Hub' },
      { to: '/board', icon: Users, label: 'Board of Directors' },
      { to: '/briefings', icon: BarChart3, label: 'Briefings' },
    ],
  },
  {
    title: 'Phases',
    items: [
      { to: '/phase/1', icon: BookOpen, label: 'Phase 1: Nonprofit', color: 'text-phase-1' },
      { to: '/phase/2', icon: Lightbulb, label: 'Phase 2: Incubator', color: 'text-phase-2' },
      { to: '/phase/3', icon: TrendingUp, label: 'Phase 3: Fund', color: 'text-phase-3' },
    ],
  },
  {
    title: 'Planning',
    items: [
      { to: '/contacts', icon: Users, label: 'Contacts' },
      { to: '/messages', icon: MessageSquare, label: 'Messages' },
      { to: '/timeline', icon: Clock, label: 'Timeline' },
      { to: '/legal', icon: Scale, label: 'Legal Steps' },
      { to: '/calendar', icon: Calendar, label: 'Calendar' },
      { to: '/todos', icon: CheckSquare, label: 'Action Items' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { to: '/grants', icon: DollarSign, label: 'Grants & Funding' },
      { to: '/market', icon: Radar, label: 'Market Intel' },
      { to: '/curriculum', icon: GraduationCap, label: 'Curriculum' },
      { to: '/curriculum-downloads', icon: Presentation, label: 'Slide Decks' },
      { to: '/survey-options', icon: ClipboardList, label: 'Survey Options' },
      { to: '/resources', icon: FolderOpen, label: 'Resources' },
      { to: '/docs', icon: BookOpen, label: 'Docs' },
      { to: '/brand', icon: Paintbrush, label: 'Brand Guide' },
    ],
  },
  {
    title: 'Governance',
    items: [
      { to: '/bylaws', icon: ScrollText, label: 'Bylaws' },
      { to: '/conflict-of-interest', icon: ShieldCheck, label: 'Conflict of Interest' },
    ],
  },
  {
    title: 'Archive',
    items: [
      { to: '/naming', icon: Sparkles, label: 'Naming Workshop' },
    ],
  },
  {
    title: 'Public Site',
    items: [
      { to: '/landing', icon: Globe, label: 'Landing Page' },
      { to: '/about', icon: Info, label: 'About' },
      { to: '/team', icon: UsersRound, label: 'Team' },
      { to: '/programs', icon: GraduationCap, label: 'Programs' },
    ],
  },
]

export default function Sidebar({ collapsed, onToggle, onMobileClose }) {
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-surface-secondary border-r border-slate-200 dark:border-surface-border">
      {/* Logo / Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-surface-border">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-phase-1 via-phase-2 to-phase-3 flex items-center justify-center text-white font-bold text-xs shrink-0">
              AI
            </div>
            <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
              SCAiL
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-lg bg-gradient-to-br from-phase-1 via-phase-2 to-phase-3 flex items-center justify-center text-white font-bold text-xs">
            AI
          </div>
        )}

        {/* Close button for mobile */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navSections.map((section) => (
          <div key={section.title} className="mb-4">
            {!collapsed && (
              <h3 className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </h3>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.to)
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onMobileClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-slate-100 dark:bg-surface-tertiary text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-surface-tertiary/50 hover:text-slate-900 dark:hover:text-white'
                      } ${collapsed ? 'justify-center px-2' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={`h-4.5 w-4.5 shrink-0 ${item.color && active ? item.color : ''}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block border-t border-slate-200 dark:border-surface-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg py-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-surface-tertiary hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
