import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

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

    const person = persons.find(person => person.name === newName);
    if (person) {
      if (window.confirm(`'${newName}' is already added to phonebook, replace old number with a new one?`)) {
        updatePersonNumber(person);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          displayNotificationMessage(`Added ${returnedPerson.name}`);
        });      
    }
  }

  const updatePersonNumber = (person) => {
    const changedPerson = { ...person, number: newNumber};
    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => 
          p.id === returnedPerson.id ? returnedPerson : p              
        ));
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`Updated ${person.name}`);
      })
      .catch(error => {
        setPersons(persons.filter(p => 
          p.id !== changedPerson.id
        ));
        displayNotificationMessage(`Information of ${changedPerson.name} has already been removed from server`, 'red');
      });
  }

  const deletePerson = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personService
        .remove(deletedPerson.id)
        .then(response => {
          setPersons(persons.filter(person => 
            person.id !== deletedPerson.id
          ));
          displayNotificationMessage(`Deleted ${deletedPerson.name}`)
      });
    }    
  }

  const displayNotificationMessage = (text, color) => {
    setNotificationMessage({text, color});
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }

  // on every render, filter persons list based on filter text
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>   
      <Notification message={notificationMessage}/> 
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