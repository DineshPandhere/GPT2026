import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripOverview } from './components/TripOverview';
import { Destinations } from './components/Destinations';
import { Itinerary } from './components/Itinerary';
import { InterestCounter } from './components/InterestCounter';
import { RegistrationForm } from './components/RegistrationForm';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { OrganizerModal } from './components/OrganizerModal';
import { getPublicInterestStats } from './services/registrationService';
import { InterestStats } from './types/trip';

export function App() {
  const [stats, setStats] = useState<InterestStats>({
    totalRegistrations: 0,
    totalPeople: 0,
    lastUpdated: new Date().toISOString()
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [isOrganizerModalOpen, setIsOrganizerModalOpen] = useState(false);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const data = await getPublicInterestStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-saffron-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        interestCount={stats.totalPeople}
        onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          totalRegistrations={stats.totalRegistrations}
          totalPeople={stats.totalPeople}
        />

        {/* Trip Overview */}
        <TripOverview />

        {/* Destinations */}
        <Destinations />

        {/* Tentative Itinerary */}
        <Itinerary />

        {/* Live Interest Counter */}
        <InterestCounter
          stats={stats}
          loading={statsLoading}
          onRefresh={loadStats}
          onOpenOrganizer={() => setIsOrganizerModalOpen(true)}
        />

        {/* Registration Form */}
        <RegistrationForm onSuccess={loadStats} />

        {/* About Section & FAQs */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onOpenOrganizer={() => setIsOrganizerModalOpen(true)} />

      {/* Organizer Access Modal */}
      <OrganizerModal
        isOpen={isOrganizerModalOpen}
        onClose={() => setIsOrganizerModalOpen(false)}
        onDataChanged={loadStats}
      />
    </div>
  );
}

export default App;
