import React from 'react'

const Header = ({ handlePrevDay, handleNextDay, dateLabel, formattedDate }) => {
  return (
    <header>
      <nav>
        <h1>Tarefas</h1>
        <ul>
          <li>
            <button onClick={handlePrevDay}>{'<'}</button>
          </li>
          <li>
            <hgroup>
              <h3>{dateLabel}</h3>
              <p>{formattedDate}</p>
            </hgroup>
          </li>
          <li>
            <button onClick={handleNextDay}>{'>'}</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
