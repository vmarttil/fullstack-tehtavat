import React, { useState, useEffect } from 'react'
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

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person => <Person key={person.name} person={person} deleteButtonHandler={props.deleteButtonHandler} />)}
    </div>
  )
}

const Person = (props) => {
  return (
    <>
    {props.person.name} {props.person.number} <DeleteButton key={props.person.name} id={props.person.id} deleteButtonHandler={props.deleteButtonHandler} /><br />
    </>
  )
}

const DeleteButton = (props) => {
  return (
    <button id={props.id} onClick={props.deleteButtonHandler}>delete</button>
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
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const handleDeleteButton = (event) => {
    const name = persons.find(person => person.id == event.target.id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService.del(event.target.id)
      setPersons(persons.filter(person => person.id != event.target.id))
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name == newName).id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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
        
      <Persons persons={personsToShow} deleteButtonHandler={handleDeleteButton} />

    </div>
  )

}

export default App