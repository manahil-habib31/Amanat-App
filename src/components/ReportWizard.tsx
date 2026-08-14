import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  UploadCloud,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import type { ItemCategory, LostItemRecord } from '../types';
import { CATEGORIES_DATA, PAKISTAN_CITIES } from '../data/categories';
import { DEFAULT_RECOVERY_STEPS } from '../data/recoveryPlans';
import { CategoryIcon } from './CategoryIcon';

interface ReportWizardProps {
  initialCategory?: ItemCategory;
  onPlanCreated: (newRecord: LostItemRecord) => void;
  onCancel: () => void;
}

export const ReportWizard: React.FC<ReportWizardProps> = ({
  initialCategory = 'cnic',
  onPlanCreated,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState<ItemCategory>(initialCategory);
  const [customCategoryName, setCustomCategoryName] = useState<string>('');
  
  // Date state
  const todayStr = new Date().toISOString().split('T')[0];
  const [lostDate, setLostDate] = useState<string>(todayStr);
  const [lostTimeOfDay, setLostTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'unknown'>('afternoon');
  
  // Location state
  const [city, setCity] = useState<string>('Rawalpindi');
  const [area, setArea] = useState<string>('Saddar');
  const [locationDetails, setLocationDetails] = useState<string>('Last seen near Commercial Market / Bank Road.');
  
  // Identifying details
  const [identifyingDetails, setIdentifyingDetails] = useState<string>('Navy blue holder with metro pass card');
  
  // Copy availability
  const [hasPhotoOrCopy, setHasPhotoOrCopy] = useState<boolean>(true);
  const [mockFileAttached, setMockFileAttached] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Quick preset helper for dates
  const handleSetQuickDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setLostDate(d.toISOString().split('T')[0]);
  };

  // Step navigation validation
  const canProceedStep1 = Boolean(category);
  const canProceedStep2 = Boolean(lostDate);
  const canProceedStep3 = Boolean(city.trim() && area.trim());

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const baseSteps = DEFAULT_RECOVERY_STEPS[category] || DEFAULT_RECOVERY_STEPS.other;
    
    // Create new record
    const newRecord: LostItemRecord = {
      id: `record-${Date.now()}`,
      category,
      customCategoryName: category === 'other' ? customCategoryName : undefined,
      lostDate,
      lostTimeOfDay,
      city: city.trim(),
      area: area.trim(),
      locationDetails: locationDetails.trim() || undefined,
      identifyingDetails: identifyingDetails.trim() || undefined,
      hasPhotoOrCopy,
      mockUploadedFileName: hasPhotoOrCopy && mockFileAttached ? mockFileAttached : (hasPhotoOrCopy ? 'document_reference_scan.pdf' : undefined),
      status: 'lost',
      createdAt: new Date().toISOString(),
      recoverySteps: baseSteps.map(s => ({ ...s, completed: false })),
      notes: `Report created on ${new Date().toLocaleDateString('en-PK')}. Recovery plan initialized.`
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPlanCreated(newRecord);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Step {step} of 5
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-8">
        <div 
          className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Wizard Form Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        
        {/* STEP 1: What did you lose? */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Question 1</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-heading">
                What did you lose?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Aapki konsi zaroori cheez ya document gum hua hai? Select the category below:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES_DATA.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <CategoryIcon category={cat.id} className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{cat.name}</h3>
                      <p className="text-xs text-emerald-700 font-semibold mt-0.5">{cat.nameUrdu}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {category === 'other' && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Describe Item Name (e.g. Domicile, Gold Ring, Car Keys, Stamp Paper)
                </label>
                <input
                  type="text"
                  value={customCategoryName}
                  onChange={(e) => setCustomCategoryName(e.target.value)}
                  placeholder="e.g. Domicile Certificate Rawalpindi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50"
                />
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedStep1}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: When did you lose it? */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Question 2</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-heading">
                When did you lose it?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Yeh cheez kab gum hui thi? Approximate date helps determine urgency and police DDR timeline.
              </p>
            </div>

            {/* Quick date presets */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSetQuickDate(0)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 transition-colors"
              >
                Today (آج)
              </button>
              <button
                type="button"
                onClick={() => handleSetQuickDate(1)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 transition-colors"
              >
                Yesterday (کل)
              </button>
              <button
                type="button"
                onClick={() => handleSetQuickDate(3)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 transition-colors"
              >
                3 Days Ago
              </button>
              <button
                type="button"
                onClick={() => handleSetQuickDate(7)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 transition-colors"
              >
                Last Week
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={lostDate}
                    max={todayStr}
                    onChange={(e) => setLostDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Approximate Time of Day
                </label>
                <select
                  value={lostTimeOfDay}
                  onChange={(e) => setLostTimeOfDay(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                >
                  <option value="morning">Morning (صبح)</option>
                  <option value="afternoon">Afternoon (دوپہر)</option>
                  <option value="evening">Evening (شام)</option>
                  <option value="night">Night (رات)</option>
                  <option value="unknown">Not sure / Unspecified</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Police stations in Pakistan generally request the approximate date and time for Roznamcha registration.
              </span>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedStep2}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Where did you last have it? */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Question 3</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-heading">
                Where did you last have it?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Aapne aakhri martaba yeh cheez kahan dekhi ya use ki thi? (City, area, market).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City (شہر) *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white font-medium"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Area / Sector / Bazaar (علاقہ / مارکیٹ) *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Saddar, Gulberg, Blue Area, F-10, DHA"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Optional Location Description / Landmark
              </label>
              <textarea
                rows={2}
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                placeholder='e.g. "Last seen near commercial market photocopy shop" or "Misplaced in taxi between Metro station and office"'
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
              />
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedStep3}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Identifying Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Any identifying details? */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Question 4</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-heading">
                Any identifying details?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Koi aisi nishani jisse yeh pehchani ja sake? (Color, pouch, cover, keychain, accompanying items).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Identifying Description (Optional)
              </label>
              <textarea
                rows={3}
                value={identifyingDetails}
                onChange={(e) => setIdentifyingDetails(e.target.value)}
                placeholder='e.g. "Blue passport cover with UAE transit sticker", "CNIC in black leather wallet with metro card", "Honda bike key with red ribbon keychain"'
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
              />
            </div>

            {/* Privacy reminder */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Privacy Safeguard:</strong> Please do <em>NOT</em> enter your full 13-digit CNIC number, bank account digits, or PIN codes here. Use generic physical descriptions only.
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Document Copy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Do you still have a photo/copy? */}
        {step === 5 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Question 5 (Final Step)</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-heading">
                Do you have a photo or copy of the document?
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Kya aapke paas is document ki koi purani photocopy ya mobile picture mojood hai?
              </p>
            </div>

            {/* Yes / No Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setHasPhotoOrCopy(true)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  hasPhotoOrCopy
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl mb-1">📄</div>
                <div className="text-sm font-bold">Yes, I have a copy</div>
                <div className="text-xs text-slate-500 mt-0.5">Photocopy or phone scan</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHasPhotoOrCopy(false);
                  setMockFileAttached('');
                }}
                className={`p-4 rounded-xl border text-center transition-all ${
                  !hasPhotoOrCopy
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl mb-1">❌</div>
                <div className="text-sm font-bold">No copy available</div>
                <div className="text-xs text-slate-500 mt-0.5">Will follow zero-copy flow</div>
              </button>
            </div>

            {/* Mock Upload Box with strict Hackathon Privacy Rule */}
            {hasPhotoOrCopy && (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center space-y-3 bg-slate-50/50">
                <UploadCloud className="w-8 h-8 mx-auto text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Simulate Document Reference (Optional Demo Attachment)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For your security, real original documents are never uploaded to servers.
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMockFileAttached('sample_photocopy_reference.pdf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      mockFileAttached === 'sample_photocopy_reference.pdf'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Attach Demo Copy (sample_photocopy.pdf)
                  </button>
                </div>
              </div>
            )}

            {/* Mandatory Warning as specified in prompt */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Hackathon Security Notice:</strong>
                <p className="mt-0.5 leading-relaxed">
                  "Don't upload sensitive personal documents to this demo." Amanat stores your preferences locally in your browser memory for testing.
                </p>
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Item:</span>
                <span className="font-bold text-slate-900 capitalize">{category.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-900">{area}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-medium text-slate-900">{lostDate}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-md shadow-emerald-700/25 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isSubmitting ? 'Generating Plan...' : 'Create My Recovery Plan'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
