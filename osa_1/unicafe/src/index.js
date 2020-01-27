import React from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const StatisticLine = (props) => {
    return (
    <p>{props.text} {props.value}</p>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good + (bad * -1)) / all
    const positive = good / all * 100

    if (all === 0) {
        return (<p>No feedback given</p>)
    } else {
        return (
            <div>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                <StatisticLine text='all' value={all} />
                <StatisticLine text='average' value={average} />
                <StatisticLine text='positive' value={positive + ' %'} />
            </div>
        )
    }
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
