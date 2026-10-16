import { RegistrationFormData } from '../types/trip';

export interface ValidationErrors {
  fullName?: string;
  mobileNumber?: string;
  numberOfPeople?: string;
  city?: string;
  shortNote?: string;
  consent?: string;
}

/**
 * Normalizes an Indian phone number string to a 10-digit standard format
 * Handles formats like:
 * "+91 98765 43210", "09876543210", "98765-43210", "+919876543210", "9876543210"
 */
export function normalizeIndianMobile(raw: string): string {
  // Remove all non-numeric characters
  const digits = raw.replace(/\D/g, '');

  // If starts with 91 and has 12 digits, strip country code
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  // If starts with 0 and has 11 digits (trunk prefix), strip leading 0
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}

/**
 * Validates Indian mobile number format:
 * Exactly 10 digits starting with 6, 7, 8, or 9
 */
export function isValidIndianMobile(mobile: string): boolean {
  const normalized = normalizeIndianMobile(mobile);
  return /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Validates the full registration form data
 */
export function validateRegistrationForm(data: RegistrationFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  // Full Name
  const trimmedName = (data.fullName || '').trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.fullName = 'Name must not exceed 80 characters.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
    errors.fullName = 'Please enter a valid name using letters and spaces.';
  }

  // Mobile Number
  const trimmedMobile = (data.mobileNumber || '').trim();
  if (!trimmedMobile) {
    errors.mobileNumber = 'Mobile number is required to contact you.';
  } else if (!isValidIndianMobile(trimmedMobile)) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
  }

  // Number of People
  const count = Number(data.numberOfPeople);
  if (isNaN(count) || count < 1) {
    errors.numberOfPeople = 'At least 1 participant is required.';
  } else if (!Number.isInteger(count)) {
    errors.numberOfPeople = 'Participant count must be a whole number.';
  } else if (count > 10) {
    errors.numberOfPeople = 'Maximum 10 people per expression of interest. For larger groups, please contact organizers directly.';
  }

  // Optional City
  if (data.city && data.city.trim().length > 60) {
    errors.city = 'City name cannot exceed 60 characters.';
  }

  // Optional Short Note
  if (data.shortNote && data.shortNote.trim().length > 500) {
    errors.shortNote = 'Note cannot exceed 500 characters.';
  }

  // Consent
  if (!data.consent) {
    errors.consent = 'You must acknowledge that this is a free expression of interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
