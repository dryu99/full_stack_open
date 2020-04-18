import React from 'react';

const Filter = ({ label, filterText, handleFilterTextChange}) => {
  return (
    <div>
      {label}
      <input value={filterText} onChange={handleFilterTextChange}/>
    </div>
  )
}

export default Filter;