import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper, CheckCircle2, X, Sparkles } from 'lucide-react';
import type { LostItemRecord } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface FoundCelebrationModalProps {
  item: LostItemRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRecovered: (itemId: string, closePlan: boolean, notes?: string) => void;
}

export const FoundCelebrationModal: React.FC<FoundCelebrationModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmRecovered
}) => {
  const [resolutionNote, setResolutionNote] = useState<string>('Found safely. No further police or NADRA duplicate action required.');

  useEffect(() => {
    if (isOpen && item) {
      // Trigger festive confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10B981', '#F59E0B', '#3B82F6', '#6366F1']
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleMarkRecovered = (closePlan: boolean) => {
    onConfirmRecovered(item.id, closePlan, resolutionNote);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-6 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Badge */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <PartyPopper className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mubarak! Recovery Successful</span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
            Great! Your item has been recovered.
          </h2>
          <p className="text-xs font-semibold text-emerald-800 mt-1">
            "Aapka document mehfooz mil gaya hai."
          </p>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            We are glad you recovered your <strong className="text-slate-800 capitalize">{item.category.replace('_', ' ')}</strong> ({item.area}, {item.city}).
          </p>
        </div>

        {/* Item Summary Pill */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <CategoryIcon category={item.category} className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="font-bold text-slate-900 capitalize">{item.category.replace('_', ' ')}</p>
            <p className="text-slate-500 text-[11px]">Reported lost on {item.lostDate}</p>
          </div>
        </div>

        {/* Notes input */}
        <div className="text-left space-y-1">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Resolution Notes (Optional)
          </label>
          <input
            type="text"
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            placeholder="e.g. Found in car dashboard / Handed by bank staff"
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <p className="text-xs text-slate-600 font-medium">
            Do you want to close this recovery plan?
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleMarkRecovered(true)}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Yes, Mark Recovered</span>
            </button>

            <button
              onClick={() => handleMarkRecovered(false)}
              className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Keep Open
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Recovery completed on {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
};
