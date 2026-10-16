import { Users, UserCheck, RefreshCw, Lock, Sparkles } from 'lucide-react';
import { InterestStats } from '../types/trip';

interface InterestCounterProps {
  stats: InterestStats;
  loading: boolean;
  onRefresh: () => void;
  onOpenOrganizer: () => void;
}

export const InterestCounter: React.FC<InterestCounterProps> = ({
  stats,
  loading,
  onRefresh,
  onOpenOrganizer
}) => {
  return (
    <section className="py-16 bg-ocean-950 text-white relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff9933_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-ocean-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-saffron-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800/80 border border-ocean-700 text-saffron-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Live Community Pulse
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Rider & Traveler Interest
          </h2>
          <p className="text-sm text-slate-300">
            Real expressions of interest submitted by fellow riders and travel enthusiasts.
          </p>
        </div>

        {/* Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {/* Total Registrations */}
          <div className="bg-ocean-900/80 border border-ocean-700/60 rounded-3xl p-6 sm:p-8 flex items-center gap-5 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                Valid Registrations
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-heading">
                  {loading ? '...' : stats.totalRegistrations}
                </span>
                <span className="text-xs text-slate-400 font-medium">submissions</span>
              </div>
            </div>
          </div>

          {/* Total People */}
          <div className="bg-ocean-900/80 border border-ocean-700/60 rounded-3xl p-6 sm:p-8 flex items-center gap-5 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                Total People Interested
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-saffron-400 font-heading">
                  {loading ? '...' : stats.totalPeople}
                </span>
                <span className="text-xs text-slate-400 font-medium">travelers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh & Privacy Assurance Info */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-ocean-900/40 border border-ocean-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Public privacy protected: Personal contact numbers & names are never displayed publicly.</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ocean-800 hover:bg-ocean-700 text-slate-200 transition-colors disabled:opacity-50"
              title="Refresh counter"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onOpenOrganizer}
              className="inline-flex items-center gap-1 text-saffron-400 hover:text-saffron-300 font-semibold underline underline-offset-2"
            >
              Organizer Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
