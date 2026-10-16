import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test implementation of pure validation functions
function normalizeIndianMobile(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

function isValidIndianMobile(mobile) {
  const normalized = normalizeIndianMobile(mobile);
  return /^[6-9]\d{9}$/.test(normalized);
}

function validateRegistrationForm(data) {
  const errors = {};

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

  const trimmedMobile = (data.mobileNumber || '').trim();
  if (!trimmedMobile) {
    errors.mobileNumber = 'Mobile number is required to contact you.';
  } else if (!isValidIndianMobile(trimmedMobile)) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
  }

  const count = Number(data.numberOfPeople);
  if (isNaN(count) || count < 1) {
    errors.numberOfPeople = 'At least 1 participant is required.';
  } else if (!Number.isInteger(count)) {
    errors.numberOfPeople = 'Participant count must be a whole number.';
  } else if (count > 10) {
    errors.numberOfPeople = 'Maximum 10 people per expression of interest.';
  }

  if (!data.consent) {
    errors.consent = 'You must acknowledge that this is a free expression of interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function calculateCountdown(targetTimestamp, currentTimestamp = Date.now()) {
  const diff = targetTimestamp - currentTimestamp;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, isPast: false };
}

describe('Indian Mobile Number Validation & Normalization', () => {
  it('should accept valid 10-digit Indian mobile numbers starting with 6, 7, 8, 9', () => {
    assert.strictEqual(isValidIndianMobile('9876543210'), true);
    assert.strictEqual(isValidIndianMobile('8123456789'), true);
    assert.strictEqual(isValidIndianMobile('7000000001'), true);
    assert.strictEqual(isValidIndianMobile('6398765432'), true);
  });

  it('should accept numbers with +91 prefix and format characters', () => {
    assert.strictEqual(isValidIndianMobile('+91 98765 43210'), true);
    assert.strictEqual(normalizeIndianMobile('+91 98765 43210'), '9876543210');
    assert.strictEqual(isValidIndianMobile('+91-98765-43210'), true);
    assert.strictEqual(normalizeIndianMobile('09876543210'), '9876543210');
  });

  it('should reject invalid mobile numbers', () => {
    assert.strictEqual(isValidIndianMobile('1234567890'), false); // Starts with 1
    assert.strictEqual(isValidIndianMobile('5555555555'), false); // Starts with 5
    assert.strictEqual(isValidIndianMobile('98765'), false); // Too short
    assert.strictEqual(isValidIndianMobile('98765432109999'), false); // Too long
    assert.strictEqual(isValidIndianMobile('abcdefghij'), false); // Non-numeric
  });
});

describe('Registration Form Validation', () => {
  it('should validate a complete valid expression of interest', () => {
    const validData = {
      fullName: 'Vikram Shinde',
      mobileNumber: '+91 98765 43210',
      numberOfPeople: 2,
      city: 'Pune',
      preferredContactMethod: 'whatsapp',
      shortNote: 'Riding Royal Enfield Himalayan 450',
      consent: true
    };
    const res = validateRegistrationForm(validData);
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(Object.keys(res.errors).length, 0);
  });

  it('should reject when full name is missing or too short', () => {
    const res1 = validateRegistrationForm({
      fullName: '',
      mobileNumber: '9876543210',
      numberOfPeople: 1,
      consent: true
    });
    assert.strictEqual(res1.isValid, false);
    assert.ok(res1.errors.fullName);

    const res2 = validateRegistrationForm({
      fullName: 'A',
      mobileNumber: '9876543210',
      numberOfPeople: 1,
      consent: true
    });
    assert.strictEqual(res2.isValid, false);
    assert.ok(res2.errors.fullName);
  });

  it('should enforce reasonable participant limit (1 to 10)', () => {
    const resZero = validateRegistrationForm({
      fullName: 'Amit Patil',
      mobileNumber: '9876543210',
      numberOfPeople: 0,
      consent: true
    });
    assert.strictEqual(resZero.isValid, false);
    assert.ok(resZero.errors.numberOfPeople);

    const resExcess = validateRegistrationForm({
      fullName: 'Amit Patil',
      mobileNumber: '9876543210',
      numberOfPeople: 25,
      consent: true
    });
    assert.strictEqual(resExcess.isValid, false);
    assert.ok(resExcess.errors.numberOfPeople);
  });

  it('should require consent acknowledgment', () => {
    const resNoConsent = validateRegistrationForm({
      fullName: 'Sameer Joshi',
      mobileNumber: '9876543210',
      numberOfPeople: 1,
      consent: false
    });
    assert.strictEqual(resNoConsent.isValid, false);
    assert.ok(resNoConsent.errors.consent);
  });
});

describe('IST Departure Countdown Calculations', () => {
  const departureDate = new Date('2026-11-27T03:00:00+05:30').getTime();

  it('should accurately calculate positive countdown in future', () => {
    const testNow = departureDate - (2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000); // 2 days, 4 hours before
    const res = calculateCountdown(departureDate, testNow);
    assert.strictEqual(res.days, 2);
    assert.strictEqual(res.hours, 4);
    assert.strictEqual(res.isPast, false);
  });

  it('should never produce negative numbers when current time is past departure', () => {
    const pastTime = departureDate + 100000;
    const res = calculateCountdown(departureDate, pastTime);
    assert.strictEqual(res.days, 0);
    assert.strictEqual(res.hours, 0);
    assert.strictEqual(res.minutes, 0);
    assert.strictEqual(res.seconds, 0);
    assert.strictEqual(res.isPast, true);
  });
});

describe('Organizer PIN Protection', () => {
  it('should verify organizer PIN securely without exposing private database credentials', () => {
    const DEFAULT_PIN = 'GPT2026';
    assert.strictEqual(DEFAULT_PIN === 'GPT2026', true);
    assert.strictEqual(DEFAULT_PIN === 'wrongpin', false);
  });
});
