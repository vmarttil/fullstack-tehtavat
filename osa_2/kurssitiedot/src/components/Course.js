import React from 'react';

const Header = ({ name }) => {
  return (
      <h2>{name}</h2>   
  ) 
}
  
const Content = ({ parts }) => {
  return (
    <>
    {parts.map(part =>  <Part key={part.id} part={part} />)}
    </>
  )
}
  
const Part = ({ part }) => {
  return (
      <p>
          {part.name} {part.exercises}
      </p>
  )
}
  
const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = (accumulator, currentValue) => accumulator + currentValue
  return (
      <p><strong>total of {exercises.reduce(sum)} exercises</strong></p>
  )
}

const Course = ({course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course;