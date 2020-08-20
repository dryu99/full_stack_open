interface ExerciseValues {
  dailyExerciseHrs: Array<number>,
  target: number
}

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  value: 1 | 2 | 3,
  description: 'bad' | 'not too bad but could be better' | 'great'
}

const calculateExercises = (dailyExerciseHrs: Array<number>, target: number): Result => {
  const trainingDays: number = dailyExerciseHrs.reduce(
    (acc, curr) => curr > 0 ? acc + 1 : acc, 
    0 // initial val
  );

  const totalDailyHrs: number = dailyExerciseHrs.reduce(
    (acc, curr) => acc + curr,
    0
  )

  const average: number = totalDailyHrs / dailyExerciseHrs.length;

  const success: boolean = average >= target;

  let rating: Rating;
  if (success) {
    rating = {
      value: 3,
      description: 'great'
    };
  } else if (average > target / 2) {
    rating = {
      value: 2,
      description: 'not too bad but could be better'
    };
  } else {
    rating = {
      value: 1,
      description: 'bad'
    };
  }
  
  return {
    periodLength: dailyExerciseHrs.length,
    trainingDays,
    success,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average
  }
}

// first user arg = target value
// rest user args = dailyExerciseHrs array values
const processCalculatorArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('invalid number of args given');

  const [arg0, arg1, arg2, ...argRest] = args;
  
  const target: number = Number(arg2);
  const dailyExerciseHrs: Array<number> = argRest.map(n => Number(n));

  if (!isNaN(target) && dailyExerciseHrs.every((n) => !isNaN(n))) {
    return {
      target,
      dailyExerciseHrs
    }
  }

  throw new Error('invalid arg types given; need numbers!')
}

try {
  const { target, dailyExerciseHrs } = processCalculatorArgs(process.argv);
  console.log(calculateExercises(dailyExerciseHrs, target));
} catch (error) {
  console.error(error);
}
  