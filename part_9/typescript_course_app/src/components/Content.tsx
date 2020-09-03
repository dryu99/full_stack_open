import React from 'react';
import Part from './Part'
import { CoursePart } from '../types'

interface ContentProps {
  courses: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map(c => 
        <Part key={c.name} coursePart={c}/>
      )}
    </div>
  )
}

export default Content;