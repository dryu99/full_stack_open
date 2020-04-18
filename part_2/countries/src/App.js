import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filterCountry, setFilterCountry] = useState('Korea (De');

  const hook = () => {
    console.log("fetching countries data...");
    axios 
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fulfilled!");
        setCountries(response.data);
        filterCountries(response.data, filterCountry);
      });
  }

  console.log("countries length:", countries.length);
  useEffect(hook, []);

  const handleFilterCountryChange = (event) => {
    const newFilterCountry = event.target.value;
    setFilterCountry(newFilterCountry);
    filterCountries(countries, newFilterCountry);
  }

  const filterCountries = (countries, filterText) => {
    const newFilteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredCountries(newFilteredCountries);
  }

  return (
    <React.Fragment>
      <Filter 
        label={'find countries'}
        filterText={filterCountry} 
        handleFilterTextChange={handleFilterCountryChange}
      />
      <Countries countries={filteredCountries}/>
    </React.Fragment>    
  );
}

export default App;
