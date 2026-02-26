export default function Card({
  children,
  title,
  subtitle,
  icon: Icon,
  headerAction,
  noPadding = false,
  className = '',
}) {
  const hasHeader = title || subtitle || Icon || headerAction

  return (
    <div
      className={`bg-white dark:bg-surface-secondary rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}
    >
      {hasHeader && (
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex-shrink-0 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && (
            <div className="flex-shrink-0 ml-4">{headerAction}</div>
          )}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </div>
  )
}
