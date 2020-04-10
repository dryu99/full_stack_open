import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  
  return (
    <React.Fragment>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </React.Fragment>
  )
}

const Header = (props) => {
  return (
    <React.Fragment>
      <h1>{props.course}</h1>
    </React.Fragment>
  )
};

const Content = (props) => {
  let parts = props.parts;
  return (
    <React.Fragment>
        <Part part={parts[0]}/>
        <Part part={parts[1]}/>
        <Part part={parts[2]}/>
    </React.Fragment>
  )
};

const Part = (props) => {
  let part = props.part;
  return (
    <React.Fragment>
      <p>
        {part.name} {part.exercises}        
      </p>
    </React.Fragment>
  )
}

const Total = (props) => {
  let parts = props.parts;
  let totalExercises = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <React.Fragment>
      <p>Number of exercises {totalExercises}</p>
    </React.Fragment>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))