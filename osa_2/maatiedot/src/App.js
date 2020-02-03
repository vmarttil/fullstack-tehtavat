import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = (props) => {
  if (props.countriesToShow.length === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
        )
  } else if (props.countriesToShow.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (props.countriesToShow.length > 1) {
    return (
      <div>
        {props.countriesToShow.map(country => <Country key={country.name} country={country} infoButtonHandler={props.infoButtonHandler} />)}
      </div> 
    )
  } else {
    return (
      <div>
        {props.countriesToShow.map(country => <CountryData key={country.name} country={country} />)}
      </div>
    )
  }
}

const Country = (props) => {
  return (
    <>{props.country.name} <InfoButton key={props.country.name} country={props.country} infoButtonHandler={props.infoButtonHandler} /> <br /></>
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

const InfoButton = (props) => {
  return (
    <button id={props.country.name} onClick={props.infoButtonHandler}>show</button>
  )
}


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ searchString, setSearchString ] = useState('')


  const handleSearchString = (event) => {
    setSearchString(event.target.value)
  }

  const handleInfoButton = (event) => {
    setSearchString(event.target.id)
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

          <Countries countriesToShow={countriesToShow} infoButtonHandler={handleInfoButton} />      
    </div>
  );
}

export default App;
