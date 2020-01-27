import React from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good + (bad * -1)) / all
    const positive = good / all * 100

    return (
        <p>
            good {good}<br />
            neutral {neutral}<br />
            bad {bad}<br />
            all {all}<br />
            average {all === 0 ? 0 : average}<br />
            positive {all === 0 ? 0 : positive} %
        </p>
    )
}

const App = () => {
    const [ good, setGood ] = React.useState(0)
    const [ neutral, setNeutral ] = React.useState(0)
    const [ bad, setBad ] = React.useState(0)
    
    const clickGood = () => setGood(good + 1)
    const clickNeutral = () => setNeutral(neutral + 1)
    const clickBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={clickGood} text='good' />
            <Button handleClick={clickNeutral} text='neutral' />
            <Button handleClick={clickBad} text='bad' />
            <h1>statistics</h1>    
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )

}


ReactDOM.render(<App />, 
    document.getElementById('root')
    )
