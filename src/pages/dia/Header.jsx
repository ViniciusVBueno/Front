import { parseISO, addDays } from 'date-fns'
import { formatDate, getLabel } from '../../utils/date.utils'
import { Link } from 'react-router-dom'

function Header(props) {
  const { date } = props
  const selectedDate = parseISO(date)
  const formattedDate = formatDate(date)
  const label = getLabel(date)
  const prevDate = addDays(selectedDate, -1).toISOString().slice(0, 10)
  const nextDate = addDays(selectedDate, 1).toISOString().slice(0, 10)

  return (
    <header>
      <nav>
        <h1>Tarefas</h1>
        <ul>
          <li>
            <Link role="button" to={`/${prevDate}`}>
              {'<'}
            </Link>
          </li>
          <li>
            <hgroup>
              <h3>{label}</h3>
              <p>{formattedDate}</p>
            </hgroup>
          </li>
          <li>
            <Link role="button" to={`/${nextDate}`}>
              {'>'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
