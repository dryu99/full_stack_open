export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;