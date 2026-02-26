import { useLocation } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const routeTitles = {
  '/': 'Dashboard',
  '/phase/1': 'Phase 1: AI Literacy Nonprofit',
  '/phase/2': 'Phase 2: Innovation Incubator',
  '/phase/3': 'Phase 3: Investment Fund',
  '/contacts': 'Contacts',
  '/messages': 'Message Generator',
  '/timeline': 'Timeline',
  '/legal': 'Legal Steps',
  '/calendar': 'Calendar',
  '/todos': 'Action Items',
  '/grants': 'Grants & Funding',
  '/resources': 'Resources',
  '/naming': 'Naming Workshop',
}

export default function TopBar({ onMenuClick }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const title = routeTitles[location.pathname] || 'Southern AI Literacy Initiative'

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-surface-border bg-white dark:bg-surface-secondary px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-surface-tertiary transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}
