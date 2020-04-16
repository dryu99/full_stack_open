import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personAlreadyExists = persons.some(person =>
      person.name === newName
    );

    if (personAlreadyExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      var newPerson = {
        name: newName
      }

      setPersons(persons.concat(newPerson));
      setNewName('');
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )
}

export default App