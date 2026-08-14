import React from 'react';
import { 
  PlusCircle, 
  ArrowRight, 
  MapPin, 
  ChevronRight,
  Zap,
  Lock,
  ListTodo,
  Sparkles
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';
import type { ItemCategory, LostItemRecord } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { FIRST_THREE_STEPS } from '../data/safetyTips';

interface LandingPageProps {
  onStartReport: (category?: ItemCategory) => void;
  onSelectDemoItem: (item: LostItemRecord) => void;
  demoItems: LostItemRecord[];
  onOpenSafetyModal: () => void;
  onNavigateTracker: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartReport,
  onSelectDemoItem,
  demoItems,
  onOpenSafetyModal,
  onNavigateTracker
}) => {
  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-emerald-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Pakistan’s 1st Lost Document Recovery Assistant</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
            Kho gaya hai? <br />
            <span className="text-emerald-700">Agla qadam hum batayenge.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Important document ya item lose ho gaya? Amanat turns a stressful situation into a clear, step-by-step Pakistani recovery plan. Know what to prepare, where to go, and track every stage.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onStartReport()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2.5 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Report Lost Item</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNavigateTracker}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-98 transition-all shadow-2xs flex items-center justify-center gap-2"
            >
              <ListTodo className="w-5 h-5 text-emerald-600" />
              <span>Explore Recovery Steps</span>
            </button>
          </div>

          {/* Trust Banner */}
          <div className="pt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Your information stays private in this demo. No CNIC or OTP required.</span>
          </div>
        </div>
      </section>

      {/* Instant Action Grid: "What did you lose?" */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 font-heading">What did you lose?</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  فوری رہنمائی
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Select your lost item to immediately view customized Pakistani replacement steps:
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">Click any card to start</span>
          </div>

          {/* 9 Visual Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onStartReport(cat.id)}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/70 hover:border-emerald-300 transition-all text-left group focus:outline-hidden hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-2xs">
                  <CategoryIcon category={cat.id} className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700/90 mb-1">{cat.nameUrdu}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            How Amanat Solves Your Problem
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Pakistani bureaucracy and lost document stress made simple in 3 clear stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Report */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
              📝
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Step 1</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">Report</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Record what was lost, the last location (e.g. Saddar, Rawalpindi), and approximate date without exposing sensitive ID numbers.
            </p>
            <div className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span>Quick 5-step guided wizard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Recover */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-xs space-y-4 relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/20">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
              🧭
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Step 2</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">Recover</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get an instant tailored Pakistani action plan: Police Roznamcha, prerequisites to pack, official portals (NADRA, DLIMS, DGIP), and fee advice.
            </p>
            <div className="pt-2 text-xs text-amber-700 font-semibold flex items-center gap-1">
              <span>Actionable checklists & tips</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Track */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
              ✅
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Step 3</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-heading">Track</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Check off completed tasks, see progress bars update live, export printable summary sheets, and celebrate when your item is recovered!
            </p>
            <div className="pt-2 text-xs text-blue-700 font-semibold flex items-center gap-1">
              <span>Real-time local dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Judge Quick-Demo Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Zap className="w-64 h-64 text-emerald-400" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive 30-Second Judge Flow</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                  Try Pre-loaded Pakistani Recovery Cases
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Click any realistic sample case to see the live recovery plan, checklist progress, and recovery actions:
                </p>
              </div>

              <button
                onClick={onNavigateTracker}
                className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 transition-colors shrink-0"
              >
                View Full Tracker ({demoItems.length})
              </button>
            </div>

            {/* Demo items cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demoItems.map((item) => {
                const completedCount = item.recoverySteps.filter(s => s.completed).length;
                const totalCount = item.recoverySteps.length;
                const percent = Math.round((completedCount / totalCount) * 100);

                return (
                  <div
                    key={item.id}
                    className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 hover:border-emerald-500 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center">
                            <CategoryIcon category={item.category} className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white capitalize">
                              {item.category.replace('_', ' ')}
                            </h3>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <span>{item.area}, {item.city}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                          item.status === 'recovered'
                            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                            : item.status === 'in_progress'
                            ? 'bg-amber-900/80 text-amber-300 border border-amber-700'
                            : 'bg-rose-900/80 text-rose-300 border border-rose-700'
                        }`}>
                          {item.status === 'recovered' ? '🟢 Recovered' : item.status === 'in_progress' ? '🟡 In Progress' : '🔴 Lost'}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Recovery Tasks</span>
                          <span className="font-semibold text-slate-200">{completedCount} of {totalCount} ({percent}%)</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              percent === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.locationDetails}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectDemoItem(item)}
                      className="mt-4 w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Open Live Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency First Steps (Roman Urdu Spotlight) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-200/80 text-amber-900 text-xs font-bold mb-1">
                <span>فوری تدابیر</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Pareshan na hon — pehle yeh 3 kaam karein
              </h2>
              <p className="text-sm text-slate-700 mt-1">
                Before running to government offices, follow these critical first rules:
              </p>
            </div>

            <button
              onClick={onOpenSafetyModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 transition-colors flex items-center gap-1.5 self-start sm:self-center shrink-0"
            >
              <span>View Helplines & Safety</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {FIRST_THREE_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white p-4 rounded-xl border border-amber-200/70 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-amber-700 font-heading">{step.stepNumber}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs font-medium text-amber-800/90">{step.titleUrdu}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
