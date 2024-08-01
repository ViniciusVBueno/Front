import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import './Calendario.css'

function Calendario() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleDateChange = (date) => {
    const dataTratada = date.toISOString().slice(0, 10)
    setIsOpen(false)
    navigate(`/${dataTratada}`)
  }

  return (
    <div className="dropdown-calendar">
      <button onClick={toggleDropdown}>
        {selectedDate
          ? selectedDate.toLocaleDateString()
          : 'Selecione uma data'}
      </button>
      {isOpen && (
        <div className="calendar-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </div>
  )
}

export default Calendario
