import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const partData = [
    {
      part: part1,
      exercises: exercises1
    },
    {
      part: part2,
      exercises: exercises2
    },
    {
      part: part3,
      exercises: exercises3
    }
  ]

  return (
    <React.Fragment>
      <Header course={course} />
      <Content partData={partData}/>
      <Total exerciseCounts={[exercises1, exercises2, exercises3]}/>
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
  let partData = props.partData;
  return (
    <React.Fragment>
        <Part partName={partData[0].part} exerciseCount={partData[0].exercises}/>
        <Part partName={partData[1].part} exerciseCount={partData[1].exercises}/>
        <Part partName={partData[2].part} exerciseCount={partData[2].exercises}/>
    </React.Fragment>
  )
};

const Part = (props) => {
  return (
    <React.Fragment>
      <p>
        {props.partName} {props.exerciseCount}        
      </p>
    </React.Fragment>
  )
}

const Total = (props) => {
  let exerciseCounts = props.exerciseCounts;
  let totalExerciseCount = exerciseCounts.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);

  return (
    <React.Fragment>
      <p>Number of exercises {totalExerciseCount}</p>
    </React.Fragment>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))