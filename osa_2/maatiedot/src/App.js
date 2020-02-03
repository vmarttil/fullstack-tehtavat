import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
        )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <Country key={country.name} country={country} />)}
      </div> 
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => <CountryData key={country.name} country={country} />)}
      </div>
    )
  }
}

const Country = (props) => {
  return (
    <>{props.country.name}<br /></>
  )
}

const CountryData = (props) => {
  return (
  <div>
  <h1>{props.country.name}</h1>
  <p>
    capital {props.country.capital}<br />
    population {props.country.population}
  </p>
  <h2>languages</h2>
  <ul>
    {props.country.languages.map(language => <Language key={language.iso639_2} language={language} />)}
  </ul>
  <img src={props.country.flag} alt={`flag of ${props.country.name}`} height="100px"/>
  </div>
  )
}

const Language = (props) => {
  return (
    <li>{props.language.name}</li>
  )
}



const App = () => {
  const [ countries, setCountries] = useState([])
  const [ searchString, setSearchString ] = useState('')


  const handleSearchString = (event) => {
    setSearchString(event.target.value)

  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])
  
  return (
    <div>
        
        <p>find countries  <input 
                  value={searchString}
                  onChange={handleSearchString} /></p>

          <Countries countriesToShow={countriesToShow} />      
    </div>
  );
}

export default App;
