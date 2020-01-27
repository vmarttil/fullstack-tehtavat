import React from 'react'
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
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
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )

}


ReactDOM.render(<App />, 
    document.getElementById('root')
    )
