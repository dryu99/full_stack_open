import patients  from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { createGuid } from '../utils';

const getEntries = (): Patient[] => {
  return patients;
};

const getEntryById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (patient === undefined) {
    throw new Error(`Patient ${id} doesn't exist`);
  }

  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: createGuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getEntryById,
  getNonSensitiveEntries,
  addEntry
};