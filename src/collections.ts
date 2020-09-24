import {
    EmploymentStatus,
    EducationLevel,
    EmploymentPayFrequency,
    PropertyStatus,
    BankAccountType,
    CitizenshipStatus,
    KnownCreditRatings,
    ProvidedCreditRating,
  } from "./types";
  export const EMPLOYMENT_PAY_FREQUENCIES: EmploymentPayFrequency[] = [
    "weekly",
    "biweekly",
    "twice_monthly",
    "monthly",
    "unknown",
  ];
  export const EMPLOYMENT_STATUSES: EmploymentStatus[] = [
    "employed_full_time",
    "employed_part_time",
    "military",
    "not_employed",
    "self_employed",
    "retired",
    "other",
    "unknown",
  ];
  export const EDUCATION_LEVELS: EducationLevel[] = [
    "high_school",
    "associate",
    "bachelors",
    "masters",
    "doctorate",
    "other_grad_degree",
    "other",
    "unknown",
  ];
  export const PROPERTY_STATUSES: PropertyStatus[] = [
    "own_outright",
    "own_with_mortgage",
    "rent",
    "unknown",
  ];
  export const BANK_ACCOUNT_TYPES: BankAccountType[] = [
    "checking",
    "savings",
    "other",
    "unknown",
  ];
  export const PROVIDED_CREDIT_RATINGS: ProvidedCreditRating[] = [
    "excellent",
    "good",
    "fair",
    "poor",
    "limited",
    "unknown",
  ];
  export const KNOWN_CREDIT_RATINGS: KnownCreditRatings[] = [
    "excellent",
    "good",
    "fair",
    "poor",
  ];
  export const CITIZENSHIP_STATUSES: CitizenshipStatus[] = [
    "citizen",
    "permanent_resident",
    "other",
    "unknown",
  ];
  