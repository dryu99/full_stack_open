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

  return (
    <div>
      <Header course={course} />
      <Content partName={part1} exerciseCount={exercises1}/>
      <Content partName={part2} exerciseCount={exercises2}/>
      <Content partName={part3} exerciseCount={exercises3}/>
      <Total exerciseCounts={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.partName} {props.exerciseCount}
      </p>
    </div>
  )
};

const Total = (props) => {
  let exerciseCounts = props.exerciseCounts;
  let totalExerciseCount = exerciseCounts.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);

  return (
    <div>
      <p>Number of exercises {totalExerciseCount}</p>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))