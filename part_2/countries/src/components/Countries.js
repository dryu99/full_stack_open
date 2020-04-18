import React from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
  let componentContent = "Too many matches, specify another filter";

  if (countries.length === 1) {
    componentContent = (
      <Country 
        country={countries[0]}
        includeDetails={true}
      />
    );
  } else if (countries.length > 0 && countries.length <= 10) {
    componentContent = countries.map(country => 
      <Country 
        key={country.numericCode}
        country={country}
        includeDetails={false}
      />
    );
  } 

  return (
    <div>
      {componentContent}
    </div>
  )
}

export default Countries;