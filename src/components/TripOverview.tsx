import { Bike, Calendar, Bed, CheckCircle2, ShieldAlert, Sparkles, Navigation, Users } from 'lucide-react';

export const TripOverview: React.FC = () => {
  const highlights = [
    {
      icon: <Calendar className="w-6 h-6 text-saffron-500" />,
      title: "3 Days Coastal Tour",
      subtitle: "27 Nov – 29 Nov 2026",
      desc: "Weekend getaway designed for coastal lovers. Departs Friday at 3:00 AM, returns Sunday at 3:00 PM."
    },
    {
      icon: <Bike className="w-6 h-6 text-ocean-600" />,
      title: "Pure Bike Ride Adventure",
      subtitle: "2 Main Riders + Open Community",
      desc: "Experience scenic Konkan roads and ghat curves on two wheels with safety-first riding etiquette."
    },
    {
      icon: <Bed className="w-6 h-6 text-emerald-600" />,
      title: "Stay at Bhakt Niwas",
      subtitle: "Planned Accommodation (Unconfirmed)",
      desc: "Budget-friendly, spiritual, and located within close proximity to the temple and beach. Final bookings pending group confirmation."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Zero Registration Fee",
      subtitle: "100% Free Expression of Interest",
      desc: "No hidden charges, tickets, or upfront fees. Expenses for food, fuel, and stay will be split transparently on-the-go."
    }
  ];

  return (
    <section id="overview" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            Trip Brief & Format
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Konkan Calling: Ride, Sea & Serenity
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A 3-day motorcycle expedition to Ganpatipule along the legendary Maharashtra coastline. Here is an overview of what makes this ride special.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 font-heading">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verified Detail</span>
              </div>
            </div>
          ))}
        </div>

        {/* Essential Disclaimers & Transparency Card */}
        <div className="bg-gradient-to-br from-ocean-900 to-ocean-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-ocean-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-saffron-500/20 border border-saffron-500/30 text-saffron-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg sm:text-xl font-bold text-white font-heading">
                  Expression of Interest Notice
                </h4>
                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Registering interest is completely free and helps the two main riders coordinate interest and logistical estimates. 
                  It <strong className="text-white font-semibold">does not guarantee a confirmed seat or booking</strong>. 
                  Accommodation at Bhakt Niwas and specific routes remain tentative and will be confirmed collectively with interested riders.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="#register"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-ocean-950 font-bold text-sm shadow-glow transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Join Interest List</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
