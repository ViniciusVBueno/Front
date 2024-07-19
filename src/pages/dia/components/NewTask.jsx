import React from 'react'

const NewTask = ({ input, setInput, handleSubmit }) => {
  return (
    <div className="new-task">
      <form role="group" onSubmit={handleSubmit}>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">+</button>
      </form>
    </div>
  )
}

export default NewTask
