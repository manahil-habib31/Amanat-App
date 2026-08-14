import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileText, 
  Printer, 
  Share2, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  PartyPopper,
  ArrowLeft,
  Lock,
  Info,
  Check
} from 'lucide-react';
import type { LostItemRecord } from '../types';
import { CATEGORY_GUIDANCE_INFO } from '../data/recoveryPlans';
import { CategoryIcon } from './CategoryIcon';

interface RecoveryPlanViewProps {
  item: LostItemRecord;
  onUpdateItem: (updatedItem: LostItemRecord) => void;
  onOpenFoundModal: (item: LostItemRecord) => void;
  onBackToTracker: () => void;
  onShowToast: (message: string) => void;
}

export const RecoveryPlanView: React.FC<RecoveryPlanViewProps> = ({
  item,
  onUpdateItem,
  onOpenFoundModal,
  onBackToTracker,
  onShowToast
}) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'checklist' | 'preparation' | 'safety'>('checklist');

  const guidance = CATEGORY_GUIDANCE_INFO[item.category] || CATEGORY_GUIDANCE_INFO.other;
  
  const completedSteps = item.recoverySteps.filter(s => s.completed).length;
  const totalSteps = item.recoverySteps.length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  // Toggle step completion
  const handleToggleStep = (stepId: string) => {
    const updatedSteps = item.recoverySteps.map(step => {
      if (step.id === stepId) {
        const nextState = !step.completed;
        return {
          ...step,
          completed: nextState,
          completedAt: nextState ? new Date().toISOString() : undefined
        };
      }
      return step;
    });

    const newCompletedCount = updatedSteps.filter(s => s.completed).length;
    let newStatus = item.status;
    if (newCompletedCount === 0) {
      newStatus = 'lost';
    } else if (newCompletedCount === totalSteps) {
      newStatus = 'recovered';
    } else {
      newStatus = 'in_progress';
    }

    const updatedItem: LostItemRecord = {
      ...item,
      recoverySteps: updatedSteps,
      status: newStatus
    };

    onUpdateItem(updatedItem);

    const toggledStep = item.recoverySteps.find(s => s.id === stepId);
    if (toggledStep && !toggledStep.completed) {
      onShowToast(`Step marked complete! Progress: ${newCompletedCount}/${totalSteps}`);
    }
  };

  // Copy checklist text
  const handleCopyChecklist = () => {
    const lines = [
      `AMANAT Recovery Plan for ${item.category.toUpperCase()}`,
      `Location: ${item.area}, ${item.city}`,
      `Date Lost: ${item.lostDate}`,
      `Progress: ${completedSteps}/${totalSteps} tasks completed (${progressPercent}%)`,
      '',
      'CHECKLIST:',
      ...item.recoverySteps.map((s, idx) => `[${s.completed ? 'X' : ' '}] Step ${idx + 1}: ${s.title}`),
      '',
      `Official Authority: ${guidance.officialAuthority}`,
      'Generated via AMANAT Pakistan (https://amanat.pk demo)'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    onShowToast('Recovery plan copied to clipboard!');
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-fade-in space-y-6">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={onBackToTracker}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tracker</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyChecklist}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Copy Plan</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Sheet</span>
          </button>

          {item.status !== 'recovered' ? (
            <button
              onClick={() => onOpenFoundModal(item)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <PartyPopper className="w-3.5 h-3.5 text-emerald-700" />
              <span>I Found It! (Mil Gaya)</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Recovered 🎉</span>
            </span>
          )}
        </div>
      </div>

      {/* Plan Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
              <CategoryIcon category={item.category} className="w-7 h-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  🚨 {item.category.replace('_', ' ').toUpperCase()} LOST
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  item.status === 'recovered'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : item.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {item.status === 'recovered' ? '🟢 Recovered' : item.status === 'in_progress' ? '🟡 Recovery in Progress' : '🔴 Lost'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Recovery Action Plan
              </h1>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <strong>{item.area}, {item.city}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lost on: {item.lostDate} ({item.lostTimeOfDay || 'Day'})</span>
                </span>
                {item.hasPhotoOrCopy && (
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    <FileText className="w-3 h-3" />
                    <span>Copy Available</span>
                  </span>
                )}
              </div>

              {item.identifyingDetails && (
                <p className="text-xs text-slate-600 mt-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                  "Identifying Notes: {item.identifyingDetails}"
                </p>
              )}
            </div>
          </div>

          {/* Quick Authority & Urgency badge */}
          <div className="text-left md:text-right shrink-0 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl">
            <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">Primary Authority</span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">{guidance.officialAuthority}</span>
            {guidance.officialUrl && (
              <a
                href={guidance.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold mt-1"
              >
                <span>Official Portal (Demo Link)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-slate-800">
              Recovery Progress: <span className="text-emerald-700">{completedSteps} of {totalSteps} completed</span>
            </span>
            <span className="font-extrabold text-emerald-800 font-heading text-base">
              {progressPercent}%
            </span>
          </div>

          {/* Graphical Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                progressPercent === 100 
                  ? 'bg-emerald-600' 
                  : progressPercent > 0 
                  ? 'bg-emerald-500' 
                  : 'bg-slate-300'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Check off each task as you complete it</span>
            {progressPercent === 100 && (
              <span className="text-emerald-700 font-bold">🎉 All checklist tasks complete!</span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs for switching between Checklist, What to Prepare, and Safety */}
      <div className="flex border-b border-slate-200 no-print">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Step-by-Step Checklist</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-slate-100 text-slate-700">
            {completedSteps}/{totalSteps}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('preparation')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'preparation'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>What to Prepare</span>
          <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-md font-semibold">
            {guidance.whatToPrepare.length} items
          </span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'safety'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Safety & Privacy Tips</span>
        </button>
      </div>

      {/* TAB CONTENT 1: Interactive Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Official Verification Disclaimer Banner */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Demo guidance:</strong> {guidance.demoNotice} <em>"Verify official requirements before visiting an office."</em>
            </p>
          </div>

          <div className="space-y-3">
            {item.recoverySteps.map((step, index) => {
              const isExpanded = expandedStepId === step.id;

              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl border transition-all ${
                    step.completed
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-slate-200 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex items-start gap-3.5">
                    {/* Interactive Checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggleStep(step.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        step.completed
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'border-2 border-slate-300 hover:border-emerald-600 bg-white text-transparent'
                      }`}
                      aria-label={step.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 font-heading">
                            STEP {index + 1}
                          </span>
                          {step.isUrgent && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                              Urgent / Pehla Kaam
                            </span>
                          )}
                          {step.authority && (
                            <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                              {step.authority}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 no-print"
                        >
                          <span>{isExpanded ? 'Less info' : 'Details'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Step Title */}
                      <h3
                        onClick={() => handleToggleStep(step.id)}
                        className={`text-base font-bold cursor-pointer transition-colors ${
                          step.completed
                            ? 'text-slate-400 line-through'
                            : 'text-slate-900 hover:text-emerald-800'
                        }`}
                      >
                        {step.title}
                      </h3>

                      {step.titleUrdu && (
                        <p className="text-xs font-medium text-emerald-800/80 mt-0.5">
                          {step.titleUrdu}
                        </p>
                      )}

                      <p className={`text-xs mt-1.5 leading-relaxed ${step.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                        {step.description}
                      </p>

                      {/* Expandable Details & Action Tips */}
                      {isExpanded && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-2 animate-fade-in">
                          {step.detailTips && step.detailTips.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-xs font-bold text-slate-700 block">Practical Tips / Zaroori Nukaat:</span>
                              <ul className="space-y-1 text-xs text-slate-600">
                                {step.detailTips.map((tip, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {step.actionUrl && (
                            <div className="pt-2">
                              <a
                                href={step.actionUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                <span>{step.actionLabel || 'Visit Official Portal'}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Completed At Timestamp */}
                      {step.completed && step.completedAt && (
                        <div className="mt-2 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Task completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer for Plan */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {progressPercent === 100 ? '🎉 All steps completed!' : 'Did you find or recover your document?'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Marking your item recovered will celebrate your success and update your tracker dashboard.
              </p>
            </div>

            {item.status !== 'recovered' ? (
              <button
                onClick={() => onOpenFoundModal(item)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Mark Item as Recovered</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">
                Status: Recovered on {item.recoveredAt ? new Date(item.recoveredAt).toLocaleDateString('en-PK') : 'Recently'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: What to Prepare */}
      {activeTab === 'preparation' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Official Checklist</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                {guidance.officialAuthority}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 font-heading">
              What to prepare before visiting the office
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Yeh cheezein pehle se tayar kar len taake bar bar chakkar na laganey paren:
            </p>
          </div>

          <div className="space-y-3">
            {guidance.whatToPrepare.map((itemStr, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {itemStr}
                </p>
              </div>
            ))}
          </div>

          {/* Time and Fee Estimates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Timeline</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{guidance.estimatedTimeline || '7 to 15 business days'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Policy</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{guidance.estimatedFeeNote || 'Standard government processing token fees apply.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Safety & Privacy */}
      {activeTab === 'safety' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Identity Protection</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 font-heading">
              Keep this information safe
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Apni zati maloomat aur identity theft se bachne ke zaroori usool:
            </p>
          </div>

          <div className="space-y-3">
            {guidance.keepSafeTips.map((tip, idx) => (
              <div key={idx} className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/80 text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
                {tip}
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <Lock className="w-4 h-4" />
              <span>Amanat Privacy Guarantee</span>
            </div>
            <p className="leading-relaxed text-emerald-800/90">
              Amanat does not store your confidential credentials on public servers. Your recovery progress is stored strictly in your browser session storage.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
