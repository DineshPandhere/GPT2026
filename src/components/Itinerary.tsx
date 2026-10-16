import { useState } from 'react';
import { Calendar, Clock, Bike, Utensils, Sparkles, AlertCircle, Compass, Sun, Moon } from 'lucide-react';
import { ITINERARY_DAYS } from '../data/tripData';
import { ItineraryStop } from '../types/trip';

export const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const currentPlan = ITINERARY_DAYS.find(d => d.day === activeDay) || ITINERARY_DAYS[0];

  const getStopIcon = (type: ItineraryStop['type']) => {
    switch (type) {
      case 'ride':
        return <Bike className="w-4 h-4 text-ocean-600" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'temple':
        return <Sparkles className="w-4 h-4 text-saffron-500" />;
      case 'rest':
        return <Moon className="w-4 h-4 text-indigo-600" />;
      case 'sightseeing':
      default:
        return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section id="itinerary" className="py-20 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            3-Day Schedule
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tentative Ride Itinerary
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A flexible blueprint built around safe riding, coastal sights, and divine temple darshan. 
            All stop durations and route detours remain open to collective adjustment.
          </p>
        </div>

        {/* Tentative Banner Notice */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="font-semibold">Tentative Plan Notice:</strong> Departure begins sharp at <strong>3:00 AM on 27 Nov</strong> and the return ride starts at <strong>3:00 PM on 29 Nov</strong>. Intermediate food stops, fuel breaks, and scenic viewpoints are flexible and will be coordinated among participants.
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10">
          {ITINERARY_DAYS.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`p-3 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 ${
                activeDay === day.day
                  ? 'bg-ocean-950 text-white border-ocean-950 shadow-xl scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                  activeDay === day.day ? 'text-saffron-400' : 'text-slate-500'
                }`}>
                  Day {day.day}
                </span>
                <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                  activeDay === day.day ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {day.day === 1 ? 'Fri' : day.day === 2 ? 'Sat' : 'Sun'}
                </span>
              </div>
              <h3 className="text-xs sm:text-base font-bold truncate">
                {day.title}
              </h3>
              <p className={`text-[11px] sm:text-xs truncate hidden sm:block mt-0.5 ${
                activeDay === day.day ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {day.dateStr}
              </p>
            </button>
          ))}
        </div>

        {/* Active Day Card & Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
          {/* Day Title & Date */}
          <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 uppercase tracking-wider mb-1">
                <Sun className="w-4 h-4" />
                Day {currentPlan.day} of 3
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {currentPlan.title}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">{currentPlan.dateStr}</p>
            </div>
            <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-ocean-50 text-ocean-800 border border-ocean-100">
              {currentPlan.stops.length} Planned Checkpoints
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 mb-8 italic bg-slate-50 p-4 rounded-2xl border-l-4 border-ocean-600">
            "{currentPlan.summary}"
          </p>

          {/* Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {currentPlan.stops.map((stop, index) => (
              <div key={index} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[30px] sm:-left-[38px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-300 group-hover:border-saffron-500 flex items-center justify-center shadow-sm transition-colors">
                  {getStopIcon(stop.type)}
                </div>

                {/* Content */}
                <div className="bg-slate-50 hover:bg-slate-100/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-ocean-950 bg-ocean-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-ocean-600" />
                      {stop.time}
                    </span>
                    {stop.tentative && (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300/50">
                        Tentative
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    {stop.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {stop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
