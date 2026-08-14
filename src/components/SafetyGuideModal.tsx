import React from 'react';
import { X, AlertCircle, ArrowRight } from 'lucide-react';
import { FIRST_THREE_STEPS } from '../data/safetyTips';

interface SafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAllHelplines: () => void;
}

export const SafetyGuideModal: React.FC<SafetyGuideModalProps> = ({
  isOpen,
  onClose,
  onViewAllHelplines
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Pehle Yeh 3 Kaam Karein
              </h2>
              <p className="text-xs text-amber-800 font-medium">
                Emergency 3-Step Action Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Steps */}
        <div className="space-y-3">
          {FIRST_THREE_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-800">
                  Step {step.stepNumber}: {step.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                  {step.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Emergency Numbers */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 space-y-2">
          <span className="text-xs font-bold text-amber-900 block uppercase tracking-wider">
            Quick Pakistani Emergency Hotlines:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[11px]">Police Emergency</span>
              <strong className="text-slate-900 font-mono text-sm">15</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[11px]">NADRA Helpline</span>
              <strong className="text-slate-900 font-mono text-sm">1777</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[11px]">PTA Handset Block</span>
              <strong className="text-slate-900 font-mono text-sm">0800-55055</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[11px]">CPLC Karachi</span>
              <strong className="text-slate-900 font-mono text-sm">1102</strong>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onViewAllHelplines();
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>View All Bank & Government Helplines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
