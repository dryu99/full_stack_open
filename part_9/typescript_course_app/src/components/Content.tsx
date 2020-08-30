import React from 'react';
import { Course } from '../types'

interface ContentProps {
  courses: Course[];
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map(c => 
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content;