import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const hook = () => {
    console.log('hooking');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promsie fulfilled!')
        setPersons(response.data);
        setFilteredPersons(response.data);
      });
  }

  useEffect(hook, []);
  console.log('persons length: ', persons.length);

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
      <Filter 
        filterName={filterName} 
        handleFilterNameChange={handleFilterNameChange}
      />

      <h2>Add a new</h2>      
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submitFormHandler={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App