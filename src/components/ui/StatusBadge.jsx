import { getStatusConfig } from '../../utils/statusHelpers'

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
}

const textSizes = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
}

const padding = {
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-0.5',
  lg: 'px-3 py-1',
}

export default function StatusBadge({ status, size = 'md' }) {
  const config = getStatusConfig(status)

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${padding[size] || padding.md}
        ${textSizes[size] || textSizes.md}
        ${config.bg} ${config.text}
      `}
    >
      <span
        className={`rounded-full flex-shrink-0 ${dotSizes[size] || dotSizes.md} ${config.dot}`}
      />
      {config.label}
    </span>
  )
}
