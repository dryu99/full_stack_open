import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  console.log('persons length: ', persons.length);

  const handleFilterNameChange = (event) => {
    const newFilterName = event.target.value;
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

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });      
    }
  }

  const deletePerson = (deletedPerson) => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
      .remove(deletedPerson.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
      });
    }    
  }

  // on every render, filter persons list based on filter text
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

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
        handleFormSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App