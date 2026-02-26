const trackSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  slate: 'bg-slate-500',
}

export default function ProgressBar({
  value = 0,
  color = 'blue',
  size = 'md',
  showLabel = false,
  className = '',
}) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const trackSize = trackSizes[size] || trackSizes.md
  const fillColor = colorMap[color] || colorMap.blue

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Progress
          </span>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {clampedValue}%
          </span>
        </div>
      )}
      <div
        className={`w-full ${trackSize} rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden`}
      >
        <div
          className={`${trackSize} rounded-full ${fillColor} transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
