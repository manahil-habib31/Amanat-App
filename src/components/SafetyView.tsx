import React from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  AlertCircle
} from 'lucide-react';
import { PAKISTANI_HELPLINES, FIRST_THREE_STEPS } from '../data/safetyTips';

interface SafetyViewProps {
  onShowToast: (message: string) => void;
  onStartReport: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({
  onShowToast,
  onStartReport
}) => {
  const [copiedPhone, setCopiedPhone] = React.useState<string | null>(null);

  const handleCopyPhone = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    onShowToast(`Copied ${name} phone: ${phone}`);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in space-y-10">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Emergency First Actions & Pakistani Helplines</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
          Pareshan na hon — pehle yeh 3 kaam karein
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          If you just lost your CNIC, passport, wallet, or phone, follow these urgent security safeguards to prevent identity theft and unauthorized transactions.
        </p>
      </div>

      {/* 3 Immediate First Steps Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          The 3 Golden Rules (سب سے پہلے کیا کرنا ہے؟)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIRST_THREE_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-emerald-800 font-heading">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{step.title}</h3>
                <p className="text-xs font-semibold text-emerald-800">{step.titleUrdu}</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Police Roznamcha (DDR) vs FIR Explained */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900">
          <FileText className="w-5 h-5" />
          <h2 className="text-lg font-bold font-heading">
            DDR (Roznamcha) vs FIR: What is the difference?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700">
          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">Daily Diary Report (DDR / Roznamcha)</h3>
            <p>
              A DDR is recorded when an item is <strong>accidentally lost or misplaced</strong> (e.g. dropped wallet, misplaced CNIC/License). It is issued in 5-10 minutes at any Police Khidmat Markaz and serves as the official legal proof required by NADRA and DGIP.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">First Information Report (FIR)</h3>
            <p>
              An FIR is lodged when a <strong>crime</strong> has taken place (e.g., armed mugging, vehicle snatching, house break-in). If your documents were stolen during a robbery, request the investigating officer to include all stolen IDs in the FIR copy.
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Pakistani Helplines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Official Pakistani Helplines (24/7)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct emergency numbers to block cards, SIMs, IMEI, or inquire about official duplicate status.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PAKISTANI_HELPLINES.map((hl, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {hl.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{hl.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{hl.note}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700">{hl.phone}</span>
                <button
                  type="button"
                  onClick={() => handleCopyPhone(hl.phone, hl.name)}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors flex items-center gap-1"
                >
                  {copiedPhone === hl.phone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPhone === hl.phone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold font-heading">Ready to generate your step-by-step recovery plan?</h3>
          <p className="text-xs text-slate-400">It only takes 45 seconds to get a clear Pakistani recovery checklist.</p>
        </div>
        <button
          onClick={onStartReport}
          className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shrink-0 shadow-sm"
        >
          Report Lost Item Now
        </button>
      </div>

    </div>
  );
};
