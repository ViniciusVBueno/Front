import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(date) {
  return format(parseISO(date), 'dd/MM/yyyy')
}

export function getLabel(date) {
  const selectedDate = parseISO(date)

  if (isToday(selectedDate)) return 'Hoje, '
  if (isTomorrow(selectedDate)) return 'Amanhã, '
  if (isYesterday(selectedDate)) return 'Ontem, '

  return ''
}

export function getLabelforButton(date) {
  const selectedDate = parseISO(date)

  if (isToday(selectedDate)) return 'Hoje'
  if (isTomorrow(selectedDate)) return 'Amanhã'
  if (isYesterday(selectedDate)) return 'Ontem'

  return `Dia ${selectedDate.getDate().toString()}`
}

export function showDate(date) {
  const dataObj = parseISO(date)
  return format(dataObj, "EEEE dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}
