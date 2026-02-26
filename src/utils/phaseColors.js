export const phaseConfig = {
  'phase-1': { color: 'phase-1', bg: 'bg-phase-1', bgLight: 'bg-phase-1/10', text: 'text-phase-1', label: 'Phase 1', title: 'AI Literacy Nonprofit', icon: 'BookOpen' },
  'phase-2': { color: 'phase-2', bg: 'bg-phase-2', bgLight: 'bg-phase-2/10', text: 'text-phase-2', label: 'Phase 2', title: 'Innovation Incubator', icon: 'Lightbulb' },
  'phase-3': { color: 'phase-3', bg: 'bg-phase-3', bgLight: 'bg-phase-3/10', text: 'text-phase-3', label: 'Phase 3', title: 'Investment Fund', icon: 'TrendingUp' },
}

export function getPhaseConfig(phaseId) {
  return phaseConfig[phaseId] || phaseConfig['phase-1']
}
