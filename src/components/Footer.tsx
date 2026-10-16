import { Bike, Mail, Phone, Lock } from 'lucide-react';
import { TRIP_INFO } from '../data/tripData';

interface FooterProps {
  onOpenOrganizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrganizer }) => {
  const currentYear = new Date().getFullYear();
  const organizerPhone = import.meta.env.VITE_ORGANIZER_PHONE;
  const organizerEmail = import.meta.env.VITE_ORGANIZER_EMAIL;

  return (
    <footer className="bg-ocean-950 text-slate-400 border-t border-ocean-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-ocean-900/80">
          {/* Col 1: Brand & Dates */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-saffron-500 text-ocean-950 flex items-center justify-center font-bold">
                <Bike className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                {TRIP_INFO.name}
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              A 3-day community bike journey to Ganpatipule along the scenic Konkan coast of Maharashtra. Bringing passionate riders together for divine blessings and coastal brotherhood.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-ocean-900 text-slate-200 border border-ocean-800">
                📅 {TRIP_INFO.dates}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-ocean-900 text-slate-200 border border-ocean-800">
                📍 {TRIP_INFO.location}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#overview" className="hover:text-white transition-colors">Trip Overview</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#itinerary" className="hover:text-white transition-colors">Tentative Schedule</a>
              </li>
              <li>
                <a href="#register" className="hover:text-white transition-colors text-saffron-400 font-semibold">
                  Register Interest (Free)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact (If configured) & Admin Access */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-heading">
              Organizers & Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              {organizerPhone || organizerEmail ? (
                <>
                  {organizerPhone && (
                    <a
                      href={`tel:${organizerPhone}`}
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
                      <span>{organizerPhone}</span>
                    </a>
                  )}
                  {organizerEmail && (
                    <a
                      href={`mailto:${organizerEmail}`}
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4 text-saffron-400 shrink-0" />
                      <span>{organizerEmail}</span>
                    </a>
                  )}
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Contact details will be shared directly with registered participants.
                </p>
              )}

              <div className="pt-2">
                <button
                  onClick={onOpenOrganizer}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ocean-900 hover:bg-ocean-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-ocean-800"
                >
                  <Lock className="w-3.5 h-3.5 text-saffron-400" />
                  <span>Organizer Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Privacy Banner */}
        <div className="py-6 border-b border-ocean-900/80 text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Disclaimer:</strong> The trip plan, schedule, accommodation at Bhakt Niwas, and route checkpoints are strictly tentative. This website serves purely to collect non-binding expressions of interest to evaluate community response. No payments, booking fees, or tickets are accepted.
          </p>
          <p>
            <strong className="text-slate-300">Privacy Notice:</strong> Any personal information submitted through the expression of interest form will be kept confidential and used solely by the organizers for communication regarding this trip.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>
            &copy; {currentYear} {TRIP_INFO.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built for riders & travelers exploring the Konkan coastline
          </p>
        </div>
      </div>
    </footer>
  );
};
