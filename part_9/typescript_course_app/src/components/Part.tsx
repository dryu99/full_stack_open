import React from 'react';
import { CoursePart } from '../types'

interface ContentProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part: React.FC<ContentProps> = ({ coursePart }) => {
  const style = {
    marginBottom: 50
  }

  let additionalContent: React.ReactElement;
  
  switch (coursePart.name) {
    case 'Fundamentals':
      additionalContent = 
        <React.Fragment>
          <p>Description: {coursePart.description}</p>  
        </React.Fragment>
      break;
    case 'Using props to pass data':
      additionalContent = 
        <React.Fragment>
          <p>Group Project Count: {coursePart.groupProjectCount}</p>  
        </React.Fragment>
      break;
    case 'Deeper type usage':
      additionalContent = 
        <React.Fragment>
          <p>Description: {coursePart.description}</p> 
          <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink}</p>
        </React.Fragment>
      break;
    case 'Egg':
      additionalContent = 
        <React.Fragment>
          <p>Description: {coursePart.description}</p> 
          <p>Group project count: {coursePart.groupProjectCount}</p> 
          <p>Exercise Submission Link: {coursePart.exerciseSubmissionLink}</p>
        </React.Fragment>
      break;
    default:
      return assertNever(coursePart);
  }
  return (
    <div style={style}>
      <p>Course Part Name: {coursePart.name}</p>
      <p>Exercise Count: {coursePart.exerciseCount}</p>
      {additionalContent}
    </div>
  )
}

export default Part;