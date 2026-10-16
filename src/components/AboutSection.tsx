import { useState } from 'react';
import { Bike, HeartHandshake, ChevronDown } from 'lucide-react';
import { TRIP_FAQS } from '../data/tripData';

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-ocean-700" />
            Ride Philosophy & Mission
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About the Ganpati Pule Trip
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            What began as an aspiration between two riding enthusiasts is now an open invitation for fellow travel lovers to explore the Konkan coast together.
          </p>
        </div>

        {/* Narrative Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-snug">
              Bringing Motorcyclists & Coastal Explorers Together
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              The <strong>GPT — Ganpati Pule Trip</strong> was initiated by <strong>two main riders</strong> who share a deep love for motorcycle touring, coastal highways, and spiritual serenity. Ganpatipule offers the ideal confluence of open seas, winding coastal ghats, and the sacred Swayambhu Ganpati shrine right on the Arabian shores.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Instead of keeping it a closed duo expedition, we created this website to discover how many like-minded riders or passengers are interested in riding alongside us. 
            </p>
            
            <div className="bg-slate-50 border-l-4 border-saffron-500 p-4 rounded-r-2xl space-y-1">
              <h4 className="text-sm font-bold text-slate-900">100% Free & Community-Driven</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                There is zero profit or registration fee. Group bookings for Bhakt Niwas or homestays, meals, and route details will be finalized collectively with everyone who expresses interest.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80"
                alt="Motorcycle coastal road ride"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-saffron-400">Riders' Code</span>
                  <h4 className="text-lg font-bold">Safety, Fellowship, and Coastal Views</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Strict helmet rules, defensive riding, and group support throughout.</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-600 flex items-center justify-center font-bold">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">2 Lead Riders</p>
                <p className="text-[11px] text-slate-500">Welcoming new enthusiasts</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Common questions regarding registration, travel style, and accommodation
            </p>
          </div>

          <div className="space-y-3">
            {TRIP_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-800">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-ocean-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
