import {
  EmploymentStatus,
  EducationLevel,
  EmploymentPayFrequency,
  PropertyStatus,
  BankAccountType,
  CitizenshipStatus,
  KnownCreditRatings,
  ProvidedCreditRating,
  GraduateDegreeType,
} from './types';
export const EMPLOYMENT_PAY_FREQUENCIES: EmploymentPayFrequency[] = [
  'weekly',
  'biweekly',
  'twice_monthly',
  'monthly',
  'unknown',
];
export const EMPLOYMENT_STATUSES: EmploymentStatus[] = [
  'employed_full_time',
  'employed_part_time',
  'military',
  'not_employed',
  'self_employed',
  'retired',
  'other',
  'unknown',
];
export const EDUCATION_LEVELS: EducationLevel[] = [
  'high_school',
  'associate',
  'bachelors',
  'masters',
  'doctorate',
  'other_grad_degree',
  'other',
  'unknown',
];
export const PROPERTY_STATUSES: PropertyStatus[] = [
  'own_outright',
  'own_with_mortgage',
  'rent',
  'unknown',
];
export const BANK_ACCOUNT_TYPES: BankAccountType[] = [
  'checking',
  'savings',
  'other',
  'unknown',
];
export const PROVIDED_CREDIT_RATINGS: ProvidedCreditRating[] = [
  'excellent',
  'good',
  'fair',
  'poor',
  'limited',
  'unknown',
];
export const KNOWN_CREDIT_RATINGS: KnownCreditRatings[] = [
  'excellent',
  'good',
  'fair',
  'poor',
];
export const CITIZENSHIP_STATUSES: CitizenshipStatus[] = [
  'citizen',
  'permanent_resident',
  'other',
  'unknown',
];

export const GRADUATE_DEGREE_TYPES: GraduateDegreeType[] = [
  'doctor_of_medicine',
  'doctor_of_osteopathic_medicine',
  'doctor_of_optometry',
  'doctor_of_dental_medicine',
  'dentariae_medicinae_doctoris',
  'doctor_of_dental_surgery',
  'doctor_of_veterinary_medicine',
  'doctor_of_pharmacy',
  'veterinariae_medicinae_doctoris',
  'master_of_arts',
  'master_of_science',
  'master_of_research',
  'master_of_research_project',
  'master_of_studies',
  'master_of_business_administration',
  'master_of_library_science',
  'master_of_public_administration',
  'master_of_public_health',
  'master_of_laws',
  'master_of_arts_liberal_studies',
  'master_of_fine_arts',
  'master_of_music',
  'master_of_education',
  'master_of_engineering',
  'master_of_architecture',
  'juris_doctor',
  'other',
  'unknown',
];
