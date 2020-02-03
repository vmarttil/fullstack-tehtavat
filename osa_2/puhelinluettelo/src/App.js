import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <p>filter shown with  <input 
                  value={props.string}
                  onChange={props.handler} />
    </p>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitter}>
        <div>
          name: <input 
                  value={props.nameValue}
                  onChange={props.nameHandler} />
        </div>
        <div>
          number: <input 
                  value={props.numberValue}
                  onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <>
    {person.name} {person.number}<br />
    </>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const handleFilterString = (event) => {
    setFilterString(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter string={filterString} handler={handleFilterString} />
      
      <h2>Add a new</h2>
      
      <PersonForm submitter={addPerson}
                  nameValue={newName}
                  nameHandler={handleNameChange}
                  numberValue={newNumber}
                  numberHandler={handleNumberChange} />
      
      <h2>Numbers</h2>
        
      <Persons persons={personsToShow} />

    </div>
  )

}

export default App