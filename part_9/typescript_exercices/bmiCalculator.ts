interface BodyMeasurements {
  height: number,
  weight: number
}

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) throw new Error('invalid height was given');
  if (weight <= 0) throw new Error('invalid weight was given');

  const heightInMetres: number = height / 100;
  const bmi: number = weight / (heightInMetres * heightInMetres);
  let message: string;

  if (bmi < 18.5) {
    message = 'Underweight (unhealthy weight)';
  } else if (bmi < 25) {
    message = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    message = 'Overweight (unhealthy weight)';
  } else {
    message = 'Obese (unhealthy weight)';
  }

  return message;
};

const processBmiArgs = (args: Array<string>): BodyMeasurements => {
  if (args.length !== 4) throw new Error('invalid number of args given');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    };
  }

  throw new Error('invalid arg types given; need numbers!');
};

// try {
//   const { height, weight } = processBmiArgs(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error) {
//   console.error(error);
// }

export { calculateBmi, processBmiArgs };


