import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
      <button onClick={props.handleClick}>
          {props.text}
      </button>
  )
}

const Votes = (props) => {
  return (
    <>
      has {props.votes[props.selected]} votes<br />
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const clickRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const clickVote = () => {
    const newTable = [ ...votes ]
    newTable[selected] += 1
    setVotes(newTable)
  }
  
  const winner = votes.indexOf(Math.max.apply(null, votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}<br />
        <Votes selected={selected} votes={votes} />
        <Button text='vote' handleClick={clickVote} />
        <Button text='next anecdote' handleClick={clickRandom} />
      </div>
      <h1>Anecdote with most votes</h1>
        {props.anecdotes[winner]}<br />
        <Votes selected={winner} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)