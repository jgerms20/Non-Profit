export default function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-end gap-1 border-b border-slate-200 dark:border-slate-700">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium
              border-b-2 -mb-px
              transition-colors duration-150 whitespace-nowrap
              ${
                isActive
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
              rounded-t-lg
            `}
            aria-selected={isActive}
            role="tab"
          >
            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`
                  inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold
                  ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
