import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { getLabelforButton } from '../../utils/date.utils';
import './Calendario.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

function Calendario(props) {
  const { date } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (newDate) => {
    const dataTratada = newDate.format('YYYY-MM-DD');
    setSelectedDate(newDate);
    setIsOpen(false);
    navigate(`/${dataTratada}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-calendar" ref={calendarRef}>
      <button onClick={toggleDropdown} className="day-button">
        {<IoIosArrowDown />}
      </button>
      <span>{getLabelforButton(date)}</span>
      {isOpen && (
        <div className="calendar-container">
          {<LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>}
        </div>
      )}
    </div>
  );
}

export default Calendario;
