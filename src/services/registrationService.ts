import { RegistrationFormData, RegistrationRecord, InterestStats } from '../types/trip';
import { validateRegistrationForm, normalizeIndianMobile } from '../utils/validation';
import { supabase, isSupabaseConfigured } from './supabase';

// Anti-spam submission tracker (in-memory rate limiting)
const submissionCooldownMap = new Map<string, number>();
const MIN_SUBMISSION_INTERVAL_MS = 10000; // 10 seconds between submissions per phone

export const DEFAULT_ORGANIZER_PIN = 'GPT2026';

export interface SubmissionResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Checks if a submission is rate-limited
 */
function isRateLimited(mobileNumber: string): boolean {
  const normalized = normalizeIndianMobile(mobileNumber);
  const lastTime = submissionCooldownMap.get(normalized);
  if (lastTime && Date.now() - lastTime < MIN_SUBMISSION_INTERVAL_MS) {
    return true;
  }
  return false;
}

/**
 * Submits an expression of interest directly to Supabase cloud database
 */
export async function submitRegistration(data: RegistrationFormData): Promise<SubmissionResult> {
  // 1. Validate form fields
  const { isValid, errors } = validateRegistrationForm(data);
  if (!isValid) {
    const firstErrorMessage = Object.values(errors)[0] || 'Please correct the errors in the form.';
    return { success: false, error: firstErrorMessage };
  }

  const normalizedMobile = normalizeIndianMobile(data.mobileNumber);

  // 2. Rate-limiting check
  if (isRateLimited(normalizedMobile)) {
    return {
      success: false,
      error: 'A submission was recently made for this phone number. Please wait a moment before trying again.'
    };
  }

  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: 'Supabase database is not configured. Please check your .env configuration.'
    };
  }

  // Record timestamp for rate limit
  submissionCooldownMap.set(normalizedMobile, Date.now());

  try {
    const payload = {
      full_name: data.fullName.trim(),
      mobile_number: normalizedMobile,
      number_of_people: Math.min(10, Math.max(1, Math.round(Number(data.numberOfPeople)))),
      city: data.city?.trim() || null,
      preferred_contact_method: data.preferredContactMethod || 'whatsapp',
      short_note: data.shortNote?.trim() || null
    };

    const { error } = await supabase
      .from('registrations')
      .insert([payload]);

    if (error) {
      console.error('Supabase insert error:', error);
      if (error.code === '23505') {
        return {
          success: false,
          error: 'This mobile number is already registered for this trip.'
        };
      }
      return {
        success: false,
        error: error.message || 'Failed to submit registration to database.'
      };
    }

    return {
      success: true,
      id: `REG-${Date.now().toString().slice(-6)}`
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Database network error occurred.';
    return {
      success: false,
      error: msg
    };
  }
}

/**
 * Retrieves public interest statistics strictly from Supabase cloud database
 */
export async function getPublicInterestStats(): Promise<InterestStats> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.rpc('get_registration_stats');
      if (!error && data) {
        return {
          totalRegistrations: Number(data.totalRegistrations) || 0,
          totalPeople: Number(data.totalPeople) || 0,
          lastUpdated: new Date().toISOString()
        };
      }
      if (error) {
        console.warn('Supabase get_registration_stats error:', error);
      }
    } catch (err) {
      console.warn('Could not query Supabase public stats:', err);
    }
  }

  return {
    totalRegistrations: 0,
    totalPeople: 0,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Organizer Verification & Data Access - Directly from Supabase Cloud
 */
export async function fetchOrganizerRegistrations(
  enteredPin: string
): Promise<{ success: boolean; data?: RegistrationRecord[]; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: 'Supabase cloud database is not configured.'
    };
  }

  try {
    const { data, error } = await supabase.rpc('get_organizer_registrations', {
      organizer_pin: enteredPin.trim()
    });

    if (error) {
      console.error('Organizer RPC error:', error);
      return {
        success: false,
        error: 'Invalid organizer passcode or access denied by database.'
      };
    }

    const records: RegistrationRecord[] = (data || []).map((item: {
      id: string;
      full_name: string;
      mobile_number: string;
      number_of_people: number;
      city?: string;
      preferred_contact_method?: string;
      short_note?: string;
      created_at: string;
    }) => ({
      id: item.id,
      fullName: item.full_name,
      mobileNumber: item.mobile_number,
      numberOfPeople: item.number_of_people,
      city: item.city || undefined,
      preferredContactMethod: item.preferred_contact_method as any,
      shortNote: item.short_note || undefined,
      createdAt: item.created_at
    }));

    return { success: true, data: records };
  } catch (err: unknown) {
    return {
      success: false,
      error: 'Failed to communicate with Supabase database.'
    };
  }
}

/**
 * Deletes a registration record from Supabase Cloud
 */
export async function removeRegistration(id: string, enteredPin: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase.rpc('delete_registration_by_id', {
      record_id: id,
      organizer_pin: enteredPin.trim()
    });
    return !error;
  } catch (e) {
    console.error('Failed to delete on Supabase:', e);
    return false;
  }
}

/**
 * Clears all registration records from Supabase Cloud
 */
export async function clearAllRegistrations(enteredPin: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase.rpc('clear_all_registrations_admin', {
      organizer_pin: enteredPin.trim()
    });
    return !error;
  } catch (e) {
    console.error('Failed to clear on Supabase:', e);
    return false;
  }
}

/**
 * Helper to export registrations to CSV
 */
export function exportRegistrationsToCSV(records: RegistrationRecord[]): void {
  const headers = ['ID', 'Full Name', 'Mobile Number', 'People Count', 'City', 'Preferred Contact', 'Short Note', 'Registration Date'];
  
  const rows = records.map(r => [
    `"${r.id}"`,
    `"${(r.fullName || '').replace(/"/g, '""')}"`,
    `"${r.mobileNumber}"`,
    r.numberOfPeople,
    `"${(r.city || '').replace(/"/g, '""')}"`,
    `"${r.preferredContactMethod || 'whatsapp'}"`,
    `"${(r.shortNote || '').replace(/"/g, '""')}"`,
    `"${new Date(r.createdAt).toLocaleString('en-IN')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `GPT_Ganpatipule_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
