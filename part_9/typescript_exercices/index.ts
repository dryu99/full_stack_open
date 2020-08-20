import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Ful Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (!isNaN(height) && !isNaN(weight)) {
    const bmi: string = calculateBmi(height, weight);
    res.json({
      height,
      weight,
      bmi
    });  
  } else {
    res.status(404).json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercises', (req, res) => {
  // const { daily_exercises: dailyExerciseHrs, target } = req.body;
  const dailyExerciseHrs: any = req.body.daily_exercises;
  const target: any = req.body.target;

  if (!dailyExerciseHrs || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else if (!isNaN(target) && dailyExerciseHrs.every((n: number) => !isNaN(n))) {
    const result = calculateExercises(dailyExerciseHrs, target);
    res.json({ result });
  } else {
    res.status(400).json({ error: 'malformatted params' });
  }
});

const PORT = 3003; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});