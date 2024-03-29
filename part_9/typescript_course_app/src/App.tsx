import React from 'react';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import { CoursePart } from './types'

function App() {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Egg",
      exerciseCount: 14,
      description: "Confusing description",
      groupProjectCount: 2,
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div className="App">
      <Header text={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
}

export default App;
