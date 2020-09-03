interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescriptionBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescriptionBase {
  name: "Egg";
  groupProjectCount: number;
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;