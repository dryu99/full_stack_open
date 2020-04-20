import React from "react";
import Person from './Person';

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person => 
        <Person 
          key={person.id}
          person={person}
          handleDeleteClick={() => deletePerson(person)}  
        />
      )}
    </ul>
  );
}

export default Persons;