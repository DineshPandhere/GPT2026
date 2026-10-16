export type ContactMethod = 'whatsapp' | 'call' | 'sms' | 'email';

export interface RegistrationFormData {
  fullName: string;
  mobileNumber: string;
  numberOfPeople: number;
  city: string;
  preferredContactMethod: ContactMethod;
  shortNote: string;
  consent: boolean;
}

export interface RegistrationRecord {
  id: string;
  fullName: string;
  mobileNumber: string;
  numberOfPeople: number;
  city?: string;
  preferredContactMethod?: ContactMethod;
  shortNote?: string;
  createdAt: string;
}

export interface InterestStats {
  totalRegistrations: number;
  totalPeople: number;
  lastUpdated: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  category: 'Temple' | 'Beach' | 'Fort' | 'Scenic Coastal Road';
  tagline: string;
  description: string;
  imageUrl: string;
  status: 'Confirmed Stop' | 'Tentative Suggestion';
  approxDistance: string;
  badgeColor: string;
}

export interface ItineraryStop {
  time: string;
  title: string;
  description: string;
  tentative?: boolean;
  type: 'ride' | 'temple' | 'food' | 'rest' | 'sightseeing';
}

export interface ItineraryDayPlan {
  day: number;
  title: string;
  dateStr: string;
  summary: string;
  stops: ItineraryStop[];
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
