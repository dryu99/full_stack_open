import React from 'react';
import Country from './Country';

const Countries = ({ countries, setFilterCountry, setFilteredCountries }) => {
  const showCountryDetails = (country) => {
    setFilterCountry(country.name)
    setFilteredCountries([country]);
  }

  let componentContent;
  if (countries.length === 0) {
    componentContent = "No matches found, please retry search";
  } else if (countries.length > 0 && countries.length <= 10) {
    componentContent = countries.map(country => (        
        <Country 
          key={country.numericCode}
          country={country}
          includeDetails={countries.length === 1 ? true : false}
          showCountryDetails={showCountryDetails}
        />        
      )
    );
  } else {
    componentContent = "Too many matches, specify another filter";
  }

  return (
    <div>
      {componentContent}
    </div>
  )
}

export default Countries;