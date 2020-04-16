import React from "react";

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, submitFormHandler}) => {
  return (
    <form onSubmit={submitFormHandler}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;