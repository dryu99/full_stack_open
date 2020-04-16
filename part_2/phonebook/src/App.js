import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const handleFilterNameChange = (event) => {
    const newFilterName = event.target.value;
    const newFilteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(newFilterName.toLowerCase())
    );

    setFilteredPersons(newFilteredPersons);
    setFilterName(newFilterName);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personAlreadyExists = persons.some(person =>
      person.name === newName
    );

    if (personAlreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      var newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson));
      if (newPerson.name.includes(filterName)) {
        setFilteredPersons(filteredPersons.concat(newPerson));
      }
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <div>
        filter shown with:
        <input value={filterName} onChange={handleFilterNameChange}/>
      </div>

      <h2>Add a new</h2>      
      <form onSubmit={addPerson}>
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

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
          <Person key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )
}

export default App