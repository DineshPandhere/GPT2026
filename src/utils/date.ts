import { CountdownTime } from '../types/trip';

// Departure time: 27 Nov 2026 at 3:00 AM IST (+05:30)
export const DEPARTURE_TIMESTAMP_MS = new Date('2026-11-27T03:00:00+05:30').getTime();

// Return time: 29 Nov 2026 at 3:00 PM IST (+05:30)
export const RETURN_TIMESTAMP_MS = new Date('2026-11-29T15:00:00+05:30').getTime();

/**
 * Calculates time remaining until departure in Indian Standard Time.
 * Ensures values never drop below zero.
 */
export function calculateCountdown(targetTimestamp: number = DEPARTURE_TIMESTAMP_MS): CountdownTime {
  const now = Date.now();
  const diff = targetTimestamp - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false
  };
}

/**
 * Formats standard date strings for display
 */
export function formatTripDateDisplay(): string {
  return '27 Nov 2026 – 29 Nov 2026';
}
