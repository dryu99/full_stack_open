import React from 'react';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import { Course } from './types'

function App() {
  const courseName = "Half Stack application development";
  const courseParts: Course[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
