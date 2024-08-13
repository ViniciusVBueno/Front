import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import './Calendario.css'
import { getLabelforButton } from '../../utils/date.utils'
import { IoIosArrowDown } from 'react-icons/io'
import { ptBR } from 'date-fns/locale'

function Calendario(props) {
  const { date } = props
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()
  const calendarRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleDateChange = (date) => {
    const dataTratada = date.toISOString().slice(0, 10)
    setSelectedDate(date)
    setIsOpen(false)
    navigate(`/${dataTratada}`)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="dropdown-calendar" ref={calendarRef}>
      <button onClick={toggleDropdown} className="day-button">
        {<IoIosArrowDown />}
      </button>
      <span>{getLabelforButton(date)}</span>
      {isOpen && (
        <div className="calendar-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            locale={ptBR}
          />
        </div>
      )}
    </div>
  )
}

export default Calendario
