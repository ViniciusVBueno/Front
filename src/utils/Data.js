import { format, parseISO } from 'date-fns'

export function formatarDataParaExibicao(date) {
  return format(parseISO(date), 'dd/MM/yyyy')
}

export function obterLabelDia(date) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const dateObj = new Date(date)
  dateObj.setDate(dateObj.getDate() + 1)

  if (dateObj.toLocaleDateString() === today.toLocaleDateString()) {
    return 'Hoje'
  } else if (dateObj.toLocaleDateString() === tomorrow.toLocaleDateString()) {
    return 'Amanhã'
  } else if (dateObj.toLocaleDateString() === yesterday.toLocaleDateString()) {
    return 'Ontem'
  } else {
    return dateObj.getDate()
  }
}
