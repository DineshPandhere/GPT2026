import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Bike, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenOrganizer: () => void;
  interestCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrganizer, interestCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Trip Overview', href: '#overview' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Itinerary', href: '#itinerary' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ocean-950/90 backdrop-blur-md shadow-lg border-b border-ocean-800/50 py-3'
          : 'bg-gradient-to-b from-ocean-950/80 via-ocean-950/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-white group focus:outline-none focus:ring-2 focus:ring-saffron-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Bike className="w-5 h-5 text-ocean-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl tracking-tight text-white">
                  GPT
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-saffron-500/20 text-saffron-300 border border-saffron-500/30">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wider uppercase font-medium">
                Ganpati Pule Trip
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Count Pill */}
            {interestCount > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-ocean-900/80 border border-ocean-700/60 text-xs text-sky-200">
                <Flame className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
                <span><strong className="text-white font-bold">{interestCount}</strong> Interested</span>
              </div>
            )}

            {/* Register CTA */}
            <a
              href="#register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-ocean-950 font-bold text-sm shadow-glow hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Register Interest</span>
              <span className="text-[10px] uppercase font-extrabold bg-ocean-950/20 px-1.5 py-0.5 rounded text-ocean-950">
                Free
              </span>
            </a>

            {/* Organizer View Trigger */}
            <button
              onClick={onOpenOrganizer}
              title="Organizer Portal Login"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-saffron-500"
              aria-label="Organizer Login"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenOrganizer}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Organizer Login"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-ocean-950/95 backdrop-blur-xl border-b border-ocean-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-ocean-800 flex flex-col gap-2">
            <a
              href="#register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-ocean-950 font-bold text-base shadow-glow"
            >
              Express Interest (100% Free)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
