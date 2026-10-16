import { useState } from 'react';
import { MapPin, Info, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { DESTINATIONS } from '../data/tripData';

export const Destinations: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Confirmed Stop' | 'Tentative Suggestion'>('all');

  const filteredDestinations = filter === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.status === filter);

  return (
    <section id="destinations" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Coastal Attractions & Landmarks
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Destinations Along the Route
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From the 400-year-old ocean-facing Swayambhu temple to cliffside marine drives and coastal fortresses. 
            Confirmed stops are anchored; scenic side stops are kept tentative for group feedback.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'bg-ocean-950 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Spots ({DESTINATIONS.length})
          </button>
          <button
            onClick={() => setFilter('Confirmed Stop')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'Confirmed Stop'
                ? 'bg-saffron-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed Stops ({DESTINATIONS.filter(d => d.status === 'Confirmed Stop').length})
          </button>
          <button
            onClick={() => setFilter('Tentative Suggestion')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'Tentative Suggestion'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Tentative Suggestions ({DESTINATIONS.filter(d => d.status === 'Tentative Suggestion').length})
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
                      dest.status === 'Confirmed Stop'
                        ? 'bg-saffron-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {dest.status === 'Confirmed Stop' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {dest.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-ocean-950/80 text-white backdrop-blur-md border border-white/20">
                    {dest.category}
                  </span>
                </div>

                {/* Location Distance */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs font-medium text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
                  <span className="truncate">{dest.approxDistance}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-ocean-700 transition-colors font-heading mb-1.5">
                    {dest.name}
                  </h3>
                  <p className="text-xs font-semibold text-saffron-600 mb-3">
                    {dest.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* Bottom Status Note */}
                <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    {dest.status === 'Confirmed Stop' ? 'Core Itinerary Anchor' : 'Subject to Rider Consensus'}
                  </span>
                  <a
                    href="#register"
                    className="font-bold text-ocean-700 hover:text-ocean-900 hover:underline"
                  >
                    Vote / Join &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
