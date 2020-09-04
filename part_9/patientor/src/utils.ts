/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from './types';

export const createGuid = (): string => {
  function _p8(s: boolean): string {
     const p = (Math.random().toString(16) + '000000000').substr(2,8);
     return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
  }
  return _p8(false) + _p8(true) + _p8(true) + _p8(false);
};

export const toNewPatient = (object: any): NewPatient => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`patient name is missing or invalid: ${name}`);
  }
  return name;
};

const parseDateOfBirth = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error(`patient date of birth is missing or invalid: ${dob}`);
  }
  return dob;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`patient ssn is missing or invalid: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`patient gender is missing or invalid: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`patient occupation is missing or invalid: ${occupation}`);
  }
  return occupation;
};

const isString = (val: any): val is string => {
  return typeof val === 'string' || val instanceof String;
};

const isDate = (val: string): boolean => {
  return Boolean(Date.parse(val));
};

const isGender = (val: any): val is Gender => {
  return Object.values(Gender).includes(val);
};