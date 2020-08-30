import React from 'react';
import { Course } from '../types';

interface TotalProps {
  courses: Course[];
}

const Total: React.FC<TotalProps> = ({ courses }) => {
  return (
    <p>
      Number of exercises 
      {courses.reduce(
        (acc, curr) => acc + curr.exerciseCount, 
        0
      )}      
    </p>
  )
}

export default Total;