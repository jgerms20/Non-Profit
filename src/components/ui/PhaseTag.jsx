import { getPhaseConfig } from '../../utils/phaseColors'

export default function PhaseTag({ phase, className = '' }) {
  const config = getPhaseConfig(phase)

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bgLight} ${config.text} ${className}`}
    >
      {config.label}
    </span>
  )
}
