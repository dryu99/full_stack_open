import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  try {
    res.send(patientService.getEntryById(id));
  } catch (e) {
    const error: Error = e as Error;
    res.status(404).send(error.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addEntry(newPatient);
    res.json(addedPatient);
  } catch (e) {
    const error: Error = e as Error;
    res.status(404).send(error.message);
  }
});

export default router;