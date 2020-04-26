import React from 'react';

const Note = ({ note, toggleImportance }) => {  
  const noteStyle = {
    color: 'grey',
    paddingTop: 3,
    fontSize: 15
  }

  const label = note.important 
    ? "make not important" : "make important";
    
  return (    
    <li style={noteStyle}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>   
  );
}

export default Note;