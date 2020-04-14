import React from "react";

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (sumSoFar, part) => sumSoFar + part.exercises,
    0
  );

  return(
    <p>Number of exercises {sum}</p>
  );
}

export default Total;