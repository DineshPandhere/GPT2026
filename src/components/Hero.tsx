import { useState, useEffect } from 'react';
import { Calendar, MapPin, Bike, Users, ArrowDown, Sparkles, Clock, Compass } from 'lucide-react';
import { calculateCountdown } from '../utils/date';
import { CountdownTime } from '../types/trip';

interface HeroProps {
  totalRegistrations: number;
  totalPeople: number;
}

export const Hero: React.FC<HeroProps> = ({ totalRegistrations, totalPeople }) => {
  const [countdown, setCountdown] = useState<CountdownTime>(calculateCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Deep Konkan Ocean Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Ganpatipule Konkan Coastline"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
        />
        {/* Ocean blue layered overlays for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/85 to-ocean-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-saffron-500/20 text-saffron-300 border border-saffron-500/40 backdrop-blur-sm">
            <Bike className="w-3.5 h-3.5 text-saffron-400" />
            Konkan Bike Expedition
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ocean-700/40 text-sky-200 border border-ocean-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Free Expression of Interest
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
          GPT — <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 via-amber-300 to-saffron-500">Ganpati Pule</span> Trip
        </h1>

        {/* Short Adventure Tagline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-200 font-medium mb-8 leading-relaxed">
          Ride the sun-kissed Konkan coast, experience divine serenity at the ocean shrine, and create lifelong memories across 3 thrilling days.
        </p>

        {/* Key Trip Info Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10 text-left">
          <div className="bg-ocean-900/60 backdrop-blur-md border border-ocean-700/50 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Dates</p>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">27–29 Nov 2026</p>
            </div>
          </div>

          <div className="bg-ocean-900/60 backdrop-blur-md border border-ocean-700/50 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ocean-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Location</p>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">Ganpatipule, MH</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-ocean-900/60 backdrop-blur-md border border-ocean-700/50 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Departure</p>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">27 Nov, 3:00 AM</p>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-ocean-900/70 backdrop-blur-md border border-ocean-700/60 rounded-3xl p-5 max-w-xl mx-auto mb-10 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-saffron-400 animate-spin" style={{ animationDuration: '6s' }} />
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {countdown.isPast ? "Trip Started!" : "Countdown to Departure (3:00 AM IST)"}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-ocean-950/80 rounded-2xl p-3 border border-ocean-800">
              <span className="block text-2xl sm:text-4xl font-black text-white font-heading">
                {String(countdown.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Days</span>
            </div>
            <div className="bg-ocean-950/80 rounded-2xl p-3 border border-ocean-800">
              <span className="block text-2xl sm:text-4xl font-black text-white font-heading">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Hours</span>
            </div>
            <div className="bg-ocean-950/80 rounded-2xl p-3 border border-ocean-800">
              <span className="block text-2xl sm:text-4xl font-black text-white font-heading">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Minutes</span>
            </div>
            <div className="bg-ocean-950/80 rounded-2xl p-3 border border-ocean-800">
              <span className="block text-2xl sm:text-4xl font-black text-saffron-400 font-heading">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Seconds</span>
            </div>
          </div>
        </div>

        {/* CTAs and Real Live Interested Participant Count */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 hover:from-saffron-600 hover:to-amber-600 text-ocean-950 font-extrabold text-lg shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span>I'm Interested in Joining</span>
            <span className="px-2 py-0.5 rounded-md text-xs uppercase font-black bg-ocean-950/20 text-ocean-950">
              Free
            </span>
          </a>

          <a
            href="#itinerary"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-sky-300" />
            <span>Explore Trip Plan</span>
          </a>
        </div>

        {/* Live Interest Tracker Banner */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-ocean-900/90 border border-ocean-700/80 text-sm text-slate-300 shadow-xl">
          <Users className="w-4 h-4 text-saffron-400 shrink-0" />
          <span>
            {totalPeople > 0 ? (
              <>
                <strong className="text-white font-bold">{totalPeople}</strong> travelers expressed interest ({totalRegistrations} registrations)
              </>
            ) : (
              <span>Be the first to express interest for this trip!</span>
            )}
          </span>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-slate-400 hidden md:block">
        <a href="#overview" className="flex flex-col items-center gap-1 hover:text-white transition-colors" aria-label="Scroll down">
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
