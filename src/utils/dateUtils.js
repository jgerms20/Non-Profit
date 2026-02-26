import { format, formatDistanceToNow, differenceInDays, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isToday, isSameDay, isSameMonth } from 'date-fns'

export function formatDate(date) {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatShortDate(date) {
  return format(new Date(date), 'MMM d')
}

export function formatMonthYear(date) {
  return format(new Date(date), 'MMMM yyyy')
}

export function timeFromNow(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function daysUntil(date) {
  return differenceInDays(new Date(date), new Date())
}

export function isPast(date) {
  return isBefore(new Date(date), new Date())
}

export function isFuture(date) {
  return isAfter(new Date(date), new Date())
}

export function getCalendarDays(date) {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)
  return eachDayOfInterval({ start: calStart, end: calEnd })
}

export { addMonths, subMonths, isToday, isSameDay, isSameMonth }
