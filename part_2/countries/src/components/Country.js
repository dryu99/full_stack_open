import React from 'react';

const Country = ({ country, includeDetails }) => {
  let componentContent;
  if (includeDetails) {
    componentContent = (
      <div>
        <h1>{country.name}</h1> 
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h2>Languages</h2>
        <ul>
          {country.languages.map((language, i) =>
            <li key={i}>{language.name}</li>  
          )}
        </ul>
        <img src={country.flag} alt={country.name + " flag"} height="100"></img>
      </div>
    );
  } else {
    componentContent = (
      <div>{country.name}</div>  
    );
  }

  return componentContent;
}

export default Country;