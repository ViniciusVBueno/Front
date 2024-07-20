import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns'

export function formatDate(date) {
  return format(parseISO(date), 'dd/MM/yyyy')
}

export function getLabel(date) {
  const selectedDate = parseISO(date)

  if (isToday(selectedDate)) return 'Hoje'
  if (isTomorrow(selectedDate)) return 'Amanhã'
  if (isYesterday(selectedDate)) return 'Ontem'

  return selectedDate.getDate()
}
