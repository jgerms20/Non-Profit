const positionStyles = {
  top: {
    container: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800 dark:border-t-slate-700 border-x-transparent border-b-transparent border-4',
  },
  bottom: {
    container: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 dark:border-b-slate-700 border-x-transparent border-t-transparent border-4',
  },
  left: {
    container: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800 dark:border-l-slate-700 border-y-transparent border-r-transparent border-4',
  },
  right: {
    container: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-slate-800 dark:border-r-slate-700 border-y-transparent border-l-transparent border-4',
  },
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  className = '',
}) {
  const pos = positionStyles[position] || positionStyles.top

  if (!content) return <>{children}</>

  return (
    <span className={`group relative inline-flex ${className}`}>
      {children}
      <span
        className={`
          absolute z-50 ${pos.container}
          pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
          whitespace-nowrap
        `}
        role="tooltip"
      >
        <span className="relative block px-2.5 py-1.5 text-xs font-medium text-white bg-slate-800 dark:bg-slate-700 rounded-lg shadow-lg">
          {content}
          <span className={`absolute ${pos.arrow} w-0 h-0`} />
        </span>
      </span>
    </span>
  )
}
