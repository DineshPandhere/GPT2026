import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Phone,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { RegistrationFormData, ContactMethod } from '../types/trip';
import { validateRegistrationForm, ValidationErrors } from '../utils/validation';
import { submitRegistration } from '../services/registrationService';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    mobileNumber: '',
    numberOfPeople: 1,
    city: '',
    preferredContactMethod: 'whatsapp',
    shortNote: '',
    consent: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
    numberOfPeople: number;
  } | null>(null);

  const contactOptions: { value: ContactMethod; label: string; icon: string }[] = [
    { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { value: 'call', label: 'Phone Call', icon: '📞' },
    { value: 'sms', label: 'SMS', icon: '✉️' },
    { value: 'email', label: 'Email', icon: '📧' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error as user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handlePeopleCountChange = (count: number) => {
    if (count >= 1 && count <= 10) {
      setFormData((prev) => ({ ...prev, numberOfPeople: count }));
      if (errors.numberOfPeople) {
        setErrors((prev) => ({ ...prev, numberOfPeople: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side validation
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitRegistration(formData);

      if (!result.success) {
        setServerError(result.error || 'Submission failed. Please check your information and try again.');
        setIsSubmitting(false);
        return;
      }

      // Successful submission
      setSubmittedData({
        id: result.id || `REG-${Date.now().toString().slice(-6)}`,
        fullName: formData.fullName,
        numberOfPeople: Number(formData.numberOfPeople)
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if canvas-confetti is not loaded
      }

      // Notify parent to refresh counts
      onSuccess();

      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        numberOfPeople: 1,
        city: '',
        preferredContactMethod: 'whatsapp',
        shortNote: '',
        consent: false
      });
      setErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            Join the Express Interest List
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Register Your Interest
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Completely free with zero obligations. Let us know you want to join our Konkan bike trip so organizers can coordinate arrangements and stay plans.
          </p>
        </div>

        {/* Success Modal / State */}
        {submittedData ? (
          <div className="bg-emerald-50 border-2 border-emerald-400/80 rounded-3xl p-8 sm:p-10 text-center shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-heading mb-2">
              Expression of Interest Received!
            </h3>
            
            <p className="text-emerald-800 text-base sm:text-lg max-w-xl mx-auto mb-6">
              Thank you, <strong>{submittedData.fullName}</strong>! You have expressed interest for{' '}
              <strong>{submittedData.numberOfPeople} traveler{submittedData.numberOfPeople > 1 ? 's' : ''}</strong> for the Ganpati Pule Trip.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-emerald-200 max-w-md mx-auto text-left mb-6 text-sm text-slate-700 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-100">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Reference ID:</span>
                <span className="font-mono font-bold text-ocean-950">{submittedData.id}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-800 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your contact details are securely stored. No public access.</span>
              </div>
              <div className="text-xs text-slate-500 italic">
                * Note: This is an expression of interest to plan group logistics, not a ticket or booking confirmation. The organizers will reach out with finalized updates as trip dates approach.
              </div>
            </div>

            <button
              onClick={() => setSubmittedData(null)}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
            {/* Top informational banner */}
            <div className="mb-8 p-4 rounded-2xl bg-ocean-50 border border-ocean-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-ocean-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-ocean-950 leading-relaxed">
                <strong className="font-semibold">Privacy Guarantee:</strong> We collect only the minimum info needed to contact you. No payment info, passwords, or identity documents are ever asked or required.
              </div>
            </div>

            {/* Global Server Error Alert */}
            {serverError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm">{serverError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Full Name & Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-bold text-slate-800 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Deshmukh"
                      maxLength={80}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-500'
                          : 'border-slate-300 focus:border-ocean-600 focus:ring-ocean-500/20'
                      }`}
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-bold text-slate-800 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit number (e.g. 9876543210)"
                      maxLength={15}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 ${
                        errors.mobileNumber
                          ? 'border-red-400 bg-red-50/30 focus:ring-red-500'
                          : 'border-slate-300 focus:border-ocean-600 focus:ring-ocean-500/20'
                      }`}
                      required
                    />
                  </div>
                  {errors.mobileNumber ? (
                    <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.mobileNumber}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Indian numbers (+91 supported). Used solely for trip coordination.
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Number of People & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number of People */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Number of People Interested <span className="text-red-500">*</span>
                  </label>
                  
                  {/* Stepper / Quick buttons */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => handlePeopleCountChange(num)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                          formData.numberOfPeople === num
                            ? 'bg-ocean-950 text-white border-ocean-950 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    
                    {/* Select for larger count up to 10 */}
                    <div className="w-24">
                      <select
                        name="numberOfPeople"
                        value={formData.numberOfPeople > 5 ? formData.numberOfPeople : ''}
                        onChange={(e) => {
                          if (e.target.value) {
                            handlePeopleCountChange(Number(e.target.value));
                          }
                        }}
                        className={`w-full py-2.5 px-2 rounded-xl border text-sm font-bold bg-slate-50 ${
                          formData.numberOfPeople > 5
                            ? 'bg-ocean-950 text-white border-ocean-950'
                            : 'text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="" disabled>More...</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  {errors.numberOfPeople && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.numberOfPeople}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-slate-400">
                    Max 10 people per expression of interest.
                  </p>
                </div>

                {/* City (Optional) */}
                <div>
                  <label htmlFor="city" className="block text-sm font-bold text-slate-800 mb-2">
                    Your City / Departure Area <span className="text-xs font-normal text-slate-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Pune / Mumbai / Kolhapur"
                      maxLength={60}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base focus:border-ocean-600 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Preferred Contact Method */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Preferred Contact Method <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {contactOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs sm:text-sm font-semibold transition-all ${
                        formData.preferredContactMethod === opt.value
                          ? 'bg-ocean-950 text-white border-ocean-950 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={opt.value}
                        checked={formData.preferredContactMethod === opt.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 4: Short Note (Optional) */}
              <div>
                <label htmlFor="shortNote" className="block text-sm font-bold text-slate-800 mb-2">
                  Short Note / Questions <span className="text-xs font-normal text-slate-400">(Optional — e.g. bike model, riding experience)</span>
                </label>
                <div className="relative">
                  <textarea
                    id="shortNote"
                    name="shortNote"
                    value={formData.shortNote}
                    onChange={handleInputChange}
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us about your bike (e.g. Hunter 350, Himalayan), if you're riding solo or with pillion, or any queries you have..."
                    className="w-full p-4 rounded-xl border border-slate-300 text-sm sm:text-base focus:border-ocean-600 focus:ring-2 focus:ring-ocean-500/20 focus:outline-none resize-none"
                  />
                  <div className="text-right text-[11px] text-slate-400 mt-1">
                    {formData.shortNote.length}/500
                  </div>
                </div>
              </div>

              {/* Row 5: Mandatory Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        formData.consent
                          ? 'bg-saffron-500 border-saffron-600 text-white'
                          : 'bg-white border-slate-300 group-hover:border-slate-400'
                      }`}
                    >
                      {formData.consent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 select-none leading-relaxed">
                    I understand that this is a <strong className="text-slate-800">free expression of interest</strong> (not a confirmed booking or ticket). I consent to the organizers contacting me regarding trip updates, coordination, and route plans.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1 pl-8">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 hover:from-saffron-600 hover:to-amber-600 text-ocean-950 font-extrabold text-base sm:text-lg shadow-glow hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-ocean-950 border-t-transparent rounded-full animate-spin" />
                      <span>Recording Your Interest...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Free Expression of Interest</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance Disclaimer Footer */}
              <p className="text-center text-xs text-slate-400 mt-4">
                🔒 Free expression of interest • No payment details requested • Safe & spam-free
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
