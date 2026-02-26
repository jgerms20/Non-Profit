export const statusConfig = {
  'not-started': { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-500', label: 'Not Started' },
  'in-progress': { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500', label: 'In Progress' },
  'completed': { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', label: 'Completed' },
  'not-contacted': { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-500', label: 'Not Contacted' },
  'reached-out': { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500', label: 'Reached Out' },
  'meeting-scheduled': { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500', label: 'Meeting Scheduled' },
  'connected': { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', label: 'Connected' },
  'researching': { bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-500', label: 'Researching' },
  'preparing': { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500', label: 'Preparing Application' },
  'submitted': { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500', label: 'Submitted' },
  'awarded': { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', label: 'Awarded' },
  'denied': { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500', label: 'Denied' },
}

export const priorityConfig = {
  high: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500', label: 'High Priority' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500', label: 'Medium Priority' },
  low: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500', label: 'Low Priority' },
}

export function getStatusConfig(status) {
  return statusConfig[status] || statusConfig['not-started']
}

export function getPriorityConfig(priority) {
  return priorityConfig[priority] || priorityConfig.medium
}
