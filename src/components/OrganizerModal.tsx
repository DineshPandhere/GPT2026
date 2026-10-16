import { useState } from 'react';
import {
  X,
  Lock,
  KeyRound,
  Download,
  Trash2,
  Search,
  Users,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { RegistrationRecord } from '../types/trip';
import {
  fetchOrganizerRegistrations,
  removeRegistration,
  clearAllRegistrations,
  exportRegistrationsToCSV
} from '../services/registrationService';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await fetchOrganizerRegistrations(pin.trim());
      if (result.success && result.data) {
        setIsAuthenticated(true);
        setRecords(result.data);
      } else {
        setError(result.error || 'Incorrect passcode. Access denied.');
      }
    } catch (err: unknown) {
      setError('Unable to authenticate organizer session.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const result = await fetchOrganizerRegistrations(pin.trim());
    if (result.success && result.data) {
      setRecords(result.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the registration for "${name}"?`)) {
      setDeletingId(id);
      await removeRegistration(id, pin.trim());
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setDeletingId(null);
      onDataChanged();
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to remove ALL registered users? This will clear the entire list.')) {
      setLoading(true);
      await clearAllRegistrations(pin.trim());
      setRecords([]);
      setLoading(false);
      onDataChanged();
    }
  };

  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(q) ||
      r.mobileNumber.toLowerCase().includes(q) ||
      (r.city && r.city.toLowerCase().includes(q)) ||
      (r.shortNote && r.shortNote.toLowerCase().includes(q))
    );
  });

  const totalPeopleSum = records.reduce((sum, r) => sum + (Number(r.numberOfPeople) || 1), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-ocean-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading">
                Organizer Dashboard
              </h3>
              <p className="text-xs text-slate-300">
                Authorized access to view registered expressions of interest
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* PIN Screen */
            <div className="max-w-md mx-auto py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1 font-heading">
                Organizer Authentication
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Enter your organizer passcode to access the participant contact directory.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter passcode (Default: GPT2026)"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-ocean-600 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none"
                    autoFocus
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !pin}
                  className="w-full py-3 px-4 rounded-xl bg-ocean-950 hover:bg-ocean-900 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Unlock Organizer Records'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Organizer View */
            <div>
              {/* Stats & Actions Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 rounded-xl px-4 py-2">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                      Registrations
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      {records.length}
                    </span>
                  </div>
                  <div className="bg-saffron-50 rounded-xl px-4 py-2 border border-saffron-200">
                    <span className="text-[11px] uppercase tracking-wider text-saffron-800 font-bold block">
                      Total People
                    </span>
                    <span className="text-xl font-extrabold text-saffron-900">
                      {totalPeopleSum}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={() => exportRegistrationsToCSV(records)}
                    disabled={records.length === 0}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleClearAll}
                    disabled={records.length === 0 || loading}
                    className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50"
                    title="Remove all registered users"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search Filter */}
              <div className="my-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, phone, city, or note..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-ocean-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 max-h-96">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4">Participant</th>
                      <th className="py-3 px-4">Phone / Contact</th>
                      <th className="py-3 px-4">People</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Note</th>
                      <th className="py-3 px-4">Registered On</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          {records.length === 0
                            ? 'No registrations received yet.'
                            : 'No matching registrations found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">
                              {item.fullName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={`tel:+91${item.mobileNumber}`}
                              className="font-medium text-ocean-700 hover:underline flex items-center gap-1"
                            >
                              <PhoneCall className="w-3 h-3 text-slate-400" />
                              <span>+91 {item.mobileNumber}</span>
                            </a>
                            <span className="inline-block mt-0.5 text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {item.preferredContactMethod || 'whatsapp'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-ocean-50 text-ocean-800">
                              <Users className="w-3 h-3" />
                              {item.numberOfPeople}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {item.city || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.shortNote}>
                            {item.shortNote || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDelete(item.id, item.fullName)}
                              disabled={deletingId === item.id}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
