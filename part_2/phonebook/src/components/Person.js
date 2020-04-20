import React from "react";

const Person = ({ person, handleDeleteClick }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDeleteClick}>delete</button>
    </li>
  )
}

export default Person;