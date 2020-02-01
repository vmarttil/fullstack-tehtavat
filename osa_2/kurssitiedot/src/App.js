import React from 'react';

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )

}

const Header = (props) => {
  return (
      <h2>{props.name}</h2>   
  ) 
}

const Content = (props) => {
  return (
    <>
    {props.parts.map(part =>  <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = (props) => {
  return (
      <p>
          {props.part.name} {props.part.exercises}
      </p>
  )
}

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const sum = (accumulator, currentValue) => accumulator + currentValue
  return (
      <p><strong>total of {exercises.reduce(sum)} exercises</strong></p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>  <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App;
